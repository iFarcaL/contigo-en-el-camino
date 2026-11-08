// Behavioral tests run the production script with isolated browser-like documents.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/medicion.js'), 'utf8');
const KEY = 'cc_preferencia_medicion_v1';

function page(storage, opts = {}) {
  const loads = [], listeners = {}, winListeners = {}, controls = {}, cookies = [];
  const status = { textContent: '' };
  const preference = { addEventListener: (_, fn) => { controls.open = fn; } };
  const makeButton = name => ({ addEventListener: (_, fn) => { controls[name] = fn; }, focus() {} });
  const buttons = { accepted: makeButton('accept'), rejected: makeButton('reject'), close: makeButton('close') };
  const panel = { hidden: false, setAttribute() {}, querySelector(selector) {
    if (selector === '.cc-medicion-estado') return status;
    if (selector.includes('accepted')) return buttons.accepted;
    if (selector.includes('rejected')) return buttons.rejected;
    if (selector === '.cc-medicion-cerrar') return buttons.close;
    throw Error(selector);
  }};
  const document = {
    head: { appendChild(script) { loads.push(script.src); } },
    body: { appendChild() {} },
    createElement(tag) { return tag === 'section' ? panel : {}; },
    querySelectorAll() { return [preference]; },
    addEventListener(name, fn) { listeners[name] = fn; },
    get cookie() { return '_ga=old; _ga_X6H9QE31MJ=old'; },
    set cookie(value) { cookies.push(value); }
  };
  const localStorage = {
    getItem(k) { if (opts.blockStorage) throw Error('blocked'); return storage[k] ?? null; },
    setItem(k, v) { if (opts.blockStorage) throw Error('blocked'); storage[k] = v; }
  };
  let reloads = 0;
  const location = { hostname:'www.contigoenelcamino.com', pathname:'/biblioteca/', reload() { reloads++; } };
  const window = { addEventListener(name, fn) { winListeners[name] = fn; } };
  vm.runInNewContext(source, { window, document, localStorage, location, Date });
  return { loads, controls, panel, status, cookies, window, listeners, winListeners, get reloads() { return reloads; } };
}

const stored = {};
let p = page(stored);
assert.equal(p.loads.length, 0, 'no Google tag before choosing');
assert.equal(p.panel.hidden, false);
p.controls.close();
assert.equal(p.panel.hidden, true, 'can continue without deciding');
assert.equal(p.loads.length, 0);
p = page(stored);
p.controls.reject();
assert.equal(stored[KEY], 'rejected');
assert.equal(p.loads.length, 0, 'reject does not load tag');
let next = page(stored);
assert.equal(next.panel.hidden, true);
assert.equal(next.loads.length, 0, 'rejection persists on another page');
next.controls.open();
next.controls.accept();
assert.equal(stored[KEY], 'accepted');
assert.equal(next.loads.length, 1, 'accept loads tag once');
assert.match(next.loads[0], /^https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=/);
let commands = next.window.dataLayer.map(args => Array.from(args));
assert.equal(commands[0][0], 'consent');
assert.equal(commands[0][1], 'default');
assert.equal(commands[0][2].ad_storage, 'denied');
assert.equal(commands[1][2].analytics_storage, 'granted');
let acceptedPage = page(stored);
assert.equal(acceptedPage.loads.length, 1, 'acceptance persists on next page');
acceptedPage.controls.open();
acceptedPage.controls.reject();
assert.equal(acceptedPage.window['ga-disable-G-X6H9QE31MJ'], true);
assert.equal(acceptedPage.reloads, 1, 'revocation reloads to unload tag');
assert.ok(acceptedPage.cookies.length, 'revocation attempts to remove cookies');
assert.equal(page(stored).loads.length, 0, 'after revocation no tag on next load');
assert.equal(page(stored).panel.hidden, true);
let blocked = page({}, { blockStorage: true });
blocked.controls.accept();
assert.equal(blocked.loads.length, 0, 'unpersistable consent never enables collection');
assert.match(blocked.status.textContent, /No pudimos guardar/);
stored[KEY] = 'accepted';
let tab = page(stored);
stored[KEY] = 'rejected';
tab.winListeners.storage({key: KEY});
assert.equal(tab.window['ga-disable-G-X6H9QE31MJ'], true, 'other tabs stop when consent revoked');
assert.equal(tab.reloads, 1);

function htmlFiles(dir) { return fs.readdirSync(dir, {withFileTypes:true}).flatMap(x => x.isDirectory() ? htmlFiles(path.join(dir,x.name)) : x.name.endsWith('.html') ? [path.join(dir,x.name)] : []); }
const pages = htmlFiles(root);
assert.equal(pages.length, 54);
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  assert.doesNotMatch(html, /googletagmanager\.com|google-analytics\.com|gtag\s*\(/i, file);
  assert.match(html, /src="\/assets\/medicion\.js"/);
  assert.match(html, /data-cc-preferencias/);
}
console.log('OK: no-choice, reject, accept, cross-page persistence, revocation, blocked storage, other tabs, and 54-page static audit');
