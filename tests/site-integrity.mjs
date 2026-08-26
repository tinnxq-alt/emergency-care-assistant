import { readFile, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['index.html', 'emergency.html', 'flows.html', 'drugs.html', 'todo.html'];
const failures = [];

async function exists(path) {
  try { await access(resolve(root, path)); return true; } catch { return false; }
}

for (const page of pages) {
  const html = await readFile(resolve(root, page), 'utf8');
  for (const required of ['lang="zh-CN"', '<meta name="viewport"', '<title>', '<main', 'aria-label="主要导航"']) {
    if (!html.includes(required)) failures.push(`${page}: 缺少 ${required}`);
  }
  const refs = [...html.matchAll(/(?:src|href)="\.\/([^"?#]+)(?:[?#][^"]*)?"/g)].map((match) => match[1]);
  for (const ref of refs) if (!(await exists(ref))) failures.push(`${page}: 本地资源不存在 ${ref}`);
}

const serviceWorker = await readFile(resolve(root, 'sw.js'), 'utf8');
for (const page of pages) if (!serviceWorker.includes(`'./${page}'`)) failures.push(`sw.js: 未缓存 ${page}`);
for (const asset of ['./flow-data.js', './flows.js', './flows.css']) if (!serviceWorker.includes(`'${asset}'`)) failures.push(`sw.js: 未缓存 ${asset}`);

const manifest = JSON.parse(await readFile(resolve(root, 'manifest.webmanifest'), 'utf8'));
if (!manifest.description?.includes('v0.20')) failures.push('manifest.webmanifest: 描述版本不是 v0.20');

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`站点完整性检查通过：${pages.length} 个页面及离线资源均有效。`);
