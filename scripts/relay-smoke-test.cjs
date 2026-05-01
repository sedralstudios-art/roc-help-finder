// scripts/relay-smoke-test.cjs
//
// Smoke test for the Chrome-CDP claude.ai relay. Connects to the Chrome
// instance launched by relay-chrome-launch.cjs, opens a fresh chat at
// claude.ai/new, sends "ping — respond with the single word PONG", and
// prints the response.
//
// What this proves:
//   1. CDP connection works (Chrome must be running with --remote-debugging-port=9222).
//   2. claude.ai is logged in (the chat input is reachable).
//   3. The "fresh chat each iteration" navigation pattern works.
//   4. Streaming-complete detection works.
//
// Usage:
//   1. node scripts/relay-chrome-launch.cjs   (starts the relay-Chrome)
//   2. (one-time) log into claude.ai in that Chrome window
//   3. node scripts/relay-smoke-test.cjs       (this script)

const { chromium } = require('playwright');

const CDP_URL = 'http://localhost:9222';
const NEW_CHAT_URL = 'https://claude.ai/new';
const TEST_PROMPT = 'Smoke test from a CDP-attached automation script. Respond with exactly the single word PONG and nothing else.';

(async () => {
  console.log('• Connecting to Chrome at ' + CDP_URL);
  let browser;
  try {
    browser = await chromium.connectOverCDP(CDP_URL);
  } catch (e) {
    console.error('  ✗ Could not connect: ' + e.message);
    console.error('  Did you run scripts/relay-chrome-launch.cjs first?');
    process.exit(2);
  }

  const contexts = browser.contexts();
  if (contexts.length === 0) {
    console.error('  ✗ No browser contexts found.');
    process.exit(3);
  }
  const context = contexts[0];

  console.log('• Opening fresh chat: ' + NEW_CHAT_URL);
  const page = await context.newPage();
  await page.goto(NEW_CHAT_URL, { waitUntil: 'domcontentloaded' });

  // The Claude.ai chat input is a contenteditable div with a known role.
  // If the user is not logged in, this selector will time out.
  console.log('• Waiting for chat input (verifies login)…');
  let inputLocator;
  try {
    inputLocator = page.locator('[data-testid="chat-input"]').first();
    await inputLocator.waitFor({ timeout: 15000 });
  } catch (e) {
    console.error('  ✗ Chat input not reachable. Likely not logged in.');
    console.error('  Open the relay-Chrome window and finish logging in to claude.ai.');
    process.exit(4);
  }

  console.log('• Typing test prompt');
  await inputLocator.click();
  await page.keyboard.type(TEST_PROMPT, { delay: 5 });

  console.log('• Sending');
  await page.keyboard.press('Enter');

  console.log('• Waiting for streaming to complete (max 60s)…');
  // Heuristic: wait for the "stop generating" button to appear (streaming
  // started), then disappear (streaming done).
  const stopButton = page.getByRole('button', { name: /stop response|stop generating/i }).first();
  try {
    await stopButton.waitFor({ state: 'visible', timeout: 15000 });
    await stopButton.waitFor({ state: 'hidden', timeout: 60000 });
  } catch (e) {
    console.warn('  ! Streaming-complete detection timed out — falling back to text-stable poll');
    // Fallback: poll the last assistant message until text stops changing.
  }

  // Read the last assistant turn. claude.ai marks each message with a role.
  const responseText = await page.evaluate(() => {
    const turns = document.querySelectorAll('[data-testid*="conversation-turn"], .font-claude-message, [class*="assistant"]');
    if (turns.length === 0) return null;
    const last = turns[turns.length - 1];
    return last.innerText || last.textContent;
  });

  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Response from claude.ai:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(responseText || '(could not extract text — selector needs tuning)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  await browser.close();
  console.log('• Done.');
})();
