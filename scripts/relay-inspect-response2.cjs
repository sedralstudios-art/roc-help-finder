// scripts/relay-inspect-response2.cjs
// Tighter diagnostic. Finds the deepest (smallest) element containing the
// probe text, dumps its tag/data-testid/class + ancestors, and also prints
// every unique data-testid on the page so we can pick a stable selector.

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

  const PROBE = 'INSPECT-PROBE-9X8Y7Z';
  const prompt = 'Respond with exactly this and nothing else: ' + PROBE;

  await page.bringToFront();
  await page.evaluate(async (text) => { await navigator.clipboard.writeText(text); }, prompt);
  await input.click();
  await page.keyboard.press('Control+V');
  await page.waitForTimeout(300);
  await page.keyboard.press('Enter');

  console.log('• Sent. Waiting for streaming…');
  const stop = page.getByRole('button', { name: /stop response|stop generating/i }).first();
  try {
    await stop.waitFor({ state: 'visible', timeout: 20000 });
    await stop.waitFor({ state: 'hidden', timeout: 60000 });
  } catch (e) {}
  await page.waitForTimeout(2000);

  const result = await page.evaluate((probe) => {
    // Find the DEEPEST element whose innerText contains the probe.
    // Deepest = the one with the fewest descendant elements that still
    // contains the probe.
    const all = document.querySelectorAll('*');
    let smallest = null;
    let smallestCount = Infinity;
    for (const el of all) {
      const t = el.innerText || el.textContent || '';
      if (!t.includes(probe)) continue;
      const count = el.querySelectorAll('*').length;
      if (count < smallestCount) {
        smallest = el;
        smallestCount = count;
      }
    }

    const chain = [];
    if (smallest) {
      let cur = smallest;
      for (let d = 0; d < 8 && cur; d++) {
        chain.push({
          depth: d,
          tag: cur.tagName,
          dataTestid: cur.getAttribute('data-testid'),
          role: cur.getAttribute('role'),
          ariaLabel: cur.getAttribute('aria-label'),
          className: (cur.getAttribute('class') || '').slice(0, 120),
          innerTextSnippet: (cur.innerText || '').slice(0, 100),
        });
        cur = cur.parentElement;
      }
    }

    // Also dump every unique data-testid on the page.
    const testids = new Set();
    document.querySelectorAll('[data-testid]').forEach((el) => {
      testids.add(el.getAttribute('data-testid'));
    });

    return {
      foundProbe: !!smallest,
      smallestDescendantCount: smallestCount,
      chain,
      testids: [...testids].sort(),
    };
  }, PROBE);

  console.log('Probe found in DOM: ' + result.foundProbe);
  if (result.foundProbe) {
    console.log('Smallest container had ' + result.smallestDescendantCount + ' descendants.');
    console.log('Ancestor chain (deepest first):');
    result.chain.forEach((c) => {
      console.log('  d' + c.depth + ': ' + c.tag +
        '  data-testid=' + c.dataTestid +
        '  role=' + c.role +
        '  aria-label=' + c.ariaLabel +
        '  class=' + c.className);
      console.log('       text: ' + JSON.stringify(c.innerTextSnippet));
    });
  }
  console.log('');
  console.log('All unique data-testid values on the page:');
  result.testids.forEach((t) => console.log('  ' + t));

  console.log('');
  console.log('Page left open. Disconnect.');
})();
