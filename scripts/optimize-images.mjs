// public/shot 의 JPG·PNG 를 WebP 로 바꾸고, src 안의 경로도 함께 고친다.
// 새 캡처를 넣은 뒤 `pnpm images` 한 번이면 된다. 이미 WebP 인 파일은 건너뛴다.
//
// 가로 1800px 를 넘으면 줄인다 — 상세 화면에서 가장 크게 보일 때도 이 이상은 필요 없다.
import { readdir, readFile, writeFile, stat, unlink } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

const SHOT_DIR = "public/shot";
const SRC_DIR = "src";
const MAX_WIDTH = 1800;
const QUALITY = 80;

const kb = (n) => `${Math.round(n / 1024).toLocaleString()}KB`;

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(ts|tsx|md|mdx|css)$/.test(e.name)) out.push(p);
  }
  return out;
}

const files = (await readdir(SHOT_DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f));
if (files.length === 0) {
  console.log("바꿀 이미지가 없습니다.");
  process.exit(0);
}

let before = 0;
let after = 0;
const renamed = new Map();

for (const f of files) {
  const from = join(SHOT_DIR, f);
  const name = `${basename(f, extname(f))}.webp`;
  const to = join(SHOT_DIR, name);
  const size = (await stat(from)).size;

  await sharp(from)
    .rotate() // EXIF 방향을 실제 픽셀에 반영
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(to);

  const next = (await stat(to)).size;
  before += size;
  after += next;
  renamed.set(`/shot/${f}`, `/shot/${name}`);
  await unlink(from);
  console.log(`${f.padEnd(34)} ${kb(size).padStart(8)} → ${kb(next).padStart(7)}`);
}

// 코드 안의 경로를 새 이름으로
let touched = 0;
for (const file of await walk(SRC_DIR)) {
  const text = await readFile(file, "utf8");
  let updated = text;
  for (const [a, b] of renamed) updated = updated.split(a).join(b);
  if (updated !== text) {
    await writeFile(file, updated);
    touched++;
  }
}

console.log(`\n${files.length}장 · ${kb(before)} → ${kb(after)} (−${Math.round((1 - after / before) * 100)}%) · 경로를 고친 파일 ${touched}개`);
