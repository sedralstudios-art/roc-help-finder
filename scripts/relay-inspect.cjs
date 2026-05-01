// scripts/relay-inspect.cjs
//
// Diagnostic: connect to relay-Chrome, open claude.ai/new, wait for full
// render, then dump every textbox/textarea/contenteditable element on the
// page along with its accessible name and a short snippet of surrounding
// markup. Use the output to tune the chat-input selector in
// scripts/lib/relay.cjs.

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.connectOverCDP('http://localhost:9222');
  const ctx = browser.contexts()[0];
  const page = await ctx.newPage();
  await page.goto('https://claude.ai/new', { waitUntil: 'domcontentloaded' });

  console.log('• Waiting 8s for React render…');
  await page.waitForTimeout(8000);

  const inputs = await page.evaluate(() => {
    const out = [];
    const all = document.querySelectorAll(
      'textarea, input[type="text"], [contenteditable="true"], [role="textbox"]'
    );
    all.forEach((el, i) => {
      out.push({
        idx: i,
        tag: el.tagName,
        role: el.getAttribute('role'),
        ariaLabel: el.getAttribute('aria-label'),
        ariaLabelledby: el.getAttribute('aria-labelledby'),
        placeholder: el.getAttribute('placeholder'),
        contenteditable: el.getAttribute('contenteditable'),
        dataTestid: el.getAttribute('data-testid'),
        className: (el.getAttribute('class') || '').slice(0, 80),
        outer: el.outerHTML.slice(0, 200),
      });
    });
    return out;
  });

  console.log('Found ' + inputs.length + ' candidate inputs:');
  inputs.forEach((el) => {
    console.log('---');
    console.log('[' + el.idx + '] ' + el.tag + ' role=' + el.role);
    console.log('    aria-label: ' + el.ariaLabel);
    console.log('    placeholder: ' + el.placeholder);
    console.log('    contenteditable: ' + el.contenteditable);
    console.log('    data-testid: ' + el.dataTestid);
    console.log('    class: ' + el.className);
    console.log('    outer (200ch): ' + el.outer);
  });

  console.log('');
  console.log('Leave the page open. Disconnect.');
})();
