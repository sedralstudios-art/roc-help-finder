// scripts/relay-inspect-response.cjs
//
// Diagnostic: send a known prompt, wait for streaming to complete, then dump
// every element on the page that could plausibly be an assistant message.
// Use the output to tune the response-extraction selectors in
// scripts/lib/relay.cjs.

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const ctx = browser.contexts()[0];
  await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], {
    origin: 'https://claude.ai',
  }).catch(() => {});

  const page = await ctx.newPage();
  await page.goto('https://claude.ai/new', { waitUntil: 'domcontentloaded' });

  const input = page.locator('[data-testid="chat-input"]').first();
  await input.waitFor({ timeout: 20000 });

  const prompt = 'Respond with exactly: INSPECT-PROBE-XYZ';
  await page.bringToFront();
  await page.evaluate(async (text) => {
    await navigator.clipboard.writeText(text);
  }, prompt);
  await input.click();
  await page.keyboard.press('Control+V');
  await page.waitForTimeout(300);
  await page.keyboard.press('Enter');

  console.log('• Sent. Waiting for streaming to complete…');
  const stop = page.getByRole('button', { name: /stop response|stop generating/i }).first();
  try {
    await stop.waitFor({ state: 'visible', timeout: 20000 });
    await stop.waitFor({ state: 'hidden', timeout: 60000 });
  } catch (e) {
    console.warn('Stop-button watch timed out — continuing anyway');
  }
  await page.waitForTimeout(1500);

  console.log('• Dumping candidate assistant-message elements…');
  const dump = await page.evaluate(() => {
    const probe = 'INSPECT-PROBE-XYZ';
    const out = [];

    // Strategy: walk all elements, find any whose text contains the probe
    // string, record its tag/class/data-testid + ancestors.
    const all = document.querySelectorAll('*');
    const matches = [];
    for (const el of all) {
      const text = el.innerText || el.textContent || '';
      if (text.includes(probe) && el.children.length < 30) {
        matches.push(el);
      }
    }

    // For each match, walk up ~5 ancestors and record their identifiers.
    matches.slice(0, 5).forEach((el, i) => {
      const chain = [];
      let cur = el;
      for (let depth = 0; depth < 6 && cur; depth++) {
        chain.push({
          depth,
          tag: cur.tagName,
          dataTestid: cur.getAttribute('data-testid'),
          role: cur.getAttribute('role'),
          className: (cur.getAttribute('class') || '').slice(0, 100),
        });
        cur = cur.parentElement;
      }
      out.push({
        matchIdx: i,
        chain,
        innerTextSnippet: (el.innerText || '').slice(0, 150),
      });
    });

    return { totalMatches: matches.length, samples: out };
  });

  console.log('Total elements containing probe text: ' + dump.totalMatches);
  dump.samples.forEach((s) => {
    console.log('---');
    console.log('Match #' + s.matchIdx + ' text snippet: ' + s.innerTextSnippet);
    s.chain.forEach((c) => {
      console.log('  depth ' + c.depth + ': ' + c.tag +
        '  data-testid=' + c.dataTestid +
        '  role=' + c.role +
        '  class=' + c.className);
    });
  });

  console.log('');
  console.log('Page left open. Disconnect.');
})();
