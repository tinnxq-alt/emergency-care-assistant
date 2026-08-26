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

for (const file of ['index.html', 'drugs.html', 'README.md', 'CLINICAL_AUDIT_V018.md']) {
  const content = await readFile(resolve(root, file), 'utf8');
  if (content.includes('166')) failures.push(`${file}: 仍包含已停用的病房药库数量 166`);
}

const home = await readFile(resolve(root, 'index.html'), 'utf8');
if (home.includes('内容安全状态')) failures.push('index.html: 主页仍显示内容安全状态');
const enhancements = await readFile(resolve(root, 'enhancements.js'), 'utf8');
if (enhancements.includes('开发预览版')) failures.push('enhancements.js: 仍显示开发预览版标记');
const decorators = await readFile(resolve(root, 'clinical-decorators.js'), 'utf8');
if (!decorators.includes('last.textContent!==nextText') || !decorators.includes('mark.textContent!==text')) {
  failures.push('clinical-decorators.js: 缺少避免状态装饰器自触发循环的更新保护');
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`站点完整性检查通过：${pages.length} 个页面及离线资源均有效。`);
