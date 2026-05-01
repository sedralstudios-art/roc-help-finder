// scripts/relay-inspect-response3.cjs
// Find the assistant response by walking up from the action-bar-copy button.

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const ctx = browser.contexts()[0];
  await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: 'https://claude.ai' }).catch(() => {});

  const page = await ctx.newPage();
  await page.goto('https://claude.ai/new', { waitUntil: 'domcontentloaded' });

  const input = page.locator('[data-testid="chat-input"]').first();
  await input.waitFor({ timeout: 20000 });

  const PROBE = 'PROBE-V3-A1B2C3';
  await page.bringToFront();
  await page.evaluate(async (t) => { await navigator.clipboard.writeText(t); },
    'Reply with exactly this string and nothing else: ' + PROBE);
  await input.click();
  await page.keyboard.press('Control+V');
  await page.waitForTimeout(300);
  await page.keyboard.press('Enter');

  const stop = page.getByRole('button', { name: /stop response|stop generating/i }).first();
  try { await stop.waitFor({ state: 'visible', timeout: 20000 }); await stop.waitFor({ state: 'hidden', timeout: 60000 }); } catch (e) {}
  await page.waitForTimeout(2000);

  const result = await page.evaluate(() => {
    const copies = document.querySelectorAll('[data-testid="action-bar-copy"]');
    if (copies.length === 0) return { ok: false, reason: 'no action-bar-copy found' };
    const lastCopy = copies[copies.length - 1];

    // Walk up looking for an ancestor that contains substantial text beyond
    // the action-bar buttons themselves. Stop at the first ancestor whose
    // innerText is at least 5 chars longer than the action-bar's text.
    let cur = lastCopy.parentElement;
    const chain = [];
    let messageContainer = null;
    while (cur && chain.length < 10) {
      const text = (cur.innerText || '').trim();
      chain.push({
        tag: cur.tagName,
        dataTestid: cur.getAttribute('data-testid'),
        className: (cur.getAttribute('class') || '').slice(0, 100),
        textLen: text.length,
        textHead: text.slice(0, 80),
      });
      // Heuristic: if this ancestor has more text than just "Copy Retry…" stuff
      if (!messageContainer && text.length > 30 && /[a-z]{3}/i.test(text)) {
        messageContainer = cur;
      }
      cur = cur.parentElement;
    }

    return {
      ok: true,
      copyCount: copies.length,
      chain,
      messageText: messageContainer ? (messageContainer.innerText || '').trim() : null,
      messageTextLen: messageContainer ? (messageContainer.innerText || '').length : 0,
    };
  });

  console.log('action-bar-copy elements found: ' + result.copyCount);
  console.log('Walking up from last copy button:');
  result.chain.forEach((c, i) => {
    console.log('  d' + i + ': ' + c.tag + '  data-testid=' + c.dataTestid + '  textLen=' + c.textLen + '  class=' + c.className);
    console.log('       text head: ' + JSON.stringify(c.textHead));
  });
  console.log('');
  console.log('Extracted message text (length ' + result.messageTextLen + '):');
  console.log(JSON.stringify(result.messageText));
  console.log('');
  console.log('Page left open. Disconnect.');
})();
