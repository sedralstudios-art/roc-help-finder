// scripts/lib/relay.cjs
//
// relay(promptText, opts) → Promise<responseText>
//
// Sends a prompt to claude.ai via the CDP-attached relay-Chrome (started by
// scripts/relay-chrome-launch.cjs). Each call opens a NEW chat at
// claude.ai/new — no conversation reuse, no context carryover. This matches
// the user's "fresh chat for freshness" workflow.
//
// Long prompts: pasted via clipboard, not typed. Typing 3000+ characters
// with page.keyboard.type() is slow and triggers paste-blocker heuristics.
// navigator.clipboard.writeText() + Ctrl+V is fast and indistinguishable
// from a human paste.
//
// Streaming completion: detected by watching the "stop response" button
// appear → disappear. Falls back to a 60-second text-stable poll if the
// button selector misses.
//
// Usage as a module:
//   const { relay } = require('./lib/relay.cjs');
//   const response = await relay(longPromptString, { timeoutMs: 300000 });
//
// Usage as a CLI:
//   node scripts/relay.cjs --file prompt.txt
//   node scripts/relay.cjs --prompt "audit this entry: ..."

const { chromium } = require('playwright');

const CDP_URL = 'http://localhost:9222';
const NEW_CHAT_URL = 'https://claude.ai/new';

async function relay(promptText, opts = {}) {
  const timeoutMs = opts.timeoutMs || 300000;          // 5 min default
  const debug = !!opts.debug;

  const log = (msg) => { if (debug) console.error('[relay] ' + msg); };

  log('connecting to ' + CDP_URL);
  let browser;
  try {
    browser = await chromium.connectOverCDP(CDP_URL);
  } catch (e) {
    throw new Error('Could not connect to relay-Chrome at ' + CDP_URL +
      '. Did you run scripts/relay-chrome-launch.cjs first? ' + e.message);
  }

  const contexts = browser.contexts();
  if (contexts.length === 0) {
    throw new Error('No browser contexts found.');
  }
  const context = contexts[0];

  // Allow clipboard access for paste
  try {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'], {
      origin: 'https://claude.ai',
    });
  } catch (e) {
    log('grantPermissions warning (often safe to ignore): ' + e.message);
  }

  log('opening fresh chat: ' + NEW_CHAT_URL);
  const page = await context.newPage();
  await page.goto(NEW_CHAT_URL, { waitUntil: 'domcontentloaded' });

  log('waiting for chat input');
  const inputLocator = page.locator('[data-testid="chat-input"]').first();
  await inputLocator.waitFor({ timeout: 20000 });

  log('writing prompt to clipboard (' + promptText.length + ' chars)');
  // Clipboard write needs a focused page and the permission granted above.
  await page.bringToFront();
  await page.evaluate(async (text) => {
    await navigator.clipboard.writeText(text);
  }, promptText);

  log('pasting into chat input');
  await inputLocator.click();
  await page.keyboard.press('Control+V');

  // Brief wait so the paste settles in the contenteditable
  await page.waitForTimeout(300);

  log('sending');
  await page.keyboard.press('Enter');

  log('waiting for streaming to start, then complete');
  const stopButton = page.getByRole('button', {
    name: /stop response|stop generating/i,
  }).first();
  let usedButtonDetection = false;
  try {
    await stopButton.waitFor({ state: 'visible', timeout: 20000 });
    usedButtonDetection = true;
    await stopButton.waitFor({ state: 'hidden', timeout: timeoutMs });
    log('streaming done (button vanished)');
  } catch (e) {
    if (!usedButtonDetection) {
      log('stop button never appeared — falling back to text-stable poll');
    } else {
      log('stop button never disappeared within ' + timeoutMs + 'ms — using text-stable poll');
    }
  }

  // Settling period: button vanishing is necessary but not sufficient for
  // long responses. Always confirm text stability before extracting.
  log('confirming assistant text is stable (settling period)');
  await waitForTextStable(page, { quietMs: 2000, maxMs: 30000 });

  log('extracting response text');
  const responseText = await extractLastAssistantTurn(page);

  if (!opts.keepOpen) {
    await page.close();
  }
  // Disconnect from CDP. Per Playwright docs, browser.close() on a
  // connectOverCDP browser DISCONNECTS the WebSocket but does NOT kill the
  // underlying Chrome process — the user's relay-Chrome stays running.
  // Without this, the open WebSocket keeps Node's event loop alive and the
  // script hangs after writing the response file.
  await browser.close();

  return responseText;
}

async function waitForTextStable(page, { quietMs, maxMs }) {
  const start = Date.now();
  let lastText = '';
  let lastChange = Date.now();
  while (Date.now() - start < maxMs) {
    const current = await extractLastAssistantTurn(page).catch(() => '');
    if (current && current !== lastText) {
      lastText = current;
      lastChange = Date.now();
    }
    if (Date.now() - lastChange >= quietMs && lastText.length > 0) {
      return;
    }
    await page.waitForTimeout(500);
  }
}

async function extractLastAssistantTurn(page) {
  return await page.evaluate(() => {
    // claude.ai marks the assistant message's action footer with
    // data-testid="action-bar-copy". Walking up from the LAST copy button
    // to its enclosing .group ancestor gives the assistant message bubble.
    // The bubble's innerText starts with a screen-reader-only prefix like
    // "Claude responded: <summary>\n\n<actual message>". Strip up to the
    // first \n\n and return the rest.
    const copies = document.querySelectorAll('[data-testid="action-bar-copy"]');
    if (copies.length === 0) return '';
    const lastCopy = copies[copies.length - 1];
    const bubble = lastCopy.closest('.group');
    if (!bubble) return '';
    const full = bubble.innerText || '';
    const idx = full.indexOf('\n\n');
    const visible = idx >= 0 ? full.slice(idx + 2) : full;
    return visible.trim();
  });
}

module.exports = { relay };
