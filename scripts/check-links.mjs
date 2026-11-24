// Checks that local href/src targets in HTML pages exist in the repo.
import { readFileSync, existsSync, statSync } from 'node:fs';
import { dirname, join, normalize } from 'node:path';

const files = process.argv.slice(2);
// GitHub Pages project base path: /TriScreen/... maps to repo root.
const BASE = '/TriScreen/';
const attr = /\b(?:href|src)\s*=\s*["']([^"']+)["']/gi;
let broken = 0;

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(attr)) {
    const url = m[1].trim();
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#|\$\{|\{)/i.test(url) || url.includes('${')) continue;
    const path = decodeURI(url.split(/[?#]/)[0]);
    if (!path) continue;
    const local = path.startsWith(BASE) ? path.slice(BASE.length - 1) : path;
    let target = local.startsWith('/') ? normalize('.' + local) : normalize(join(dirname(file), local));
    if (existsSync(target) && statSync(target).isDirectory()) target = join(target, 'index.html');
    if (!existsSync(target)) {
      const line = html.slice(0, m.index).split('\n').length;
      console.error(`${file}:${line}: broken link "${url}"`);
      broken++;
    }
  }
}
console.log(broken ? `${broken} broken link(s)` : 'All local links OK');
process.exit(broken ? 1 : 0);
