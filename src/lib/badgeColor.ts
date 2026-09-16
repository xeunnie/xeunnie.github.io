/**
 * 기술 배지의 점 색깔.
 *
 * 브랜드 색을 그대로 쓰면 흰 배경에서 노란색(F7DF1E)이 안 보이고,
 * 어두운 배경에서 검정 계열(000000 · 010101 · 17202C)이 사라진다.
 * 색상(hue)은 유지한 채 명도만 테마가 감당하는 범위로 밀어 넣는다.
 */

type Rgb = [number, number, number];

function hexToRgb(hex: string): Rgb {
  const v = hex.replace("#", "");
  const n = parseInt(v.length === 3 ? v.replace(/./g, "$&$&") : v, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function luminance([r, g, b]: Rgb): number {
  const f = (x: number) => {
    const c = x / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function rgbToHsl([r, g, b]: Rgb): [number, number, number] {
  const [rr, gg, bb] = [r / 255, g / 255, b / 255];
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rr) h = ((gg - bb) / d + (gg < bb ? 6 : 0)) / 6;
  else if (max === gg) h = ((bb - rr) / d + 2) / 6;
  else h = ((rr - gg) / d + 4) / 6;
  return [h, s, l];
}

function hslToRgb(h: number, s: number, l: number): Rgb {
  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const f = (t: number) => {
    let x = t;
    if (x < 0) x += 1;
    if (x > 1) x -= 1;
    if (x < 1 / 6) return p + (q - p) * 6 * x;
    if (x < 1 / 2) return q;
    if (x < 2 / 3) return p + (q - p) * (2 / 3 - x) * 6;
    return p;
  };
  return [Math.round(f(h + 1 / 3) * 255), Math.round(f(h) * 255), Math.round(f(h - 1 / 3) * 255)];
}

const toHex = ([r, g, b]: Rgb) => "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");

/** 밝기를 목표 범위로 민다. step 을 잘게 줘야 색이 튀지 않는다. */
function shift(hex: string, dir: "darken" | "lighten", limit: number): string {
  const [h, s, l0] = rgbToHsl(hexToRgb(hex));
  let l = l0;
  for (let i = 0; i < 40; i++) {
    const rgb = hslToRgb(h, s, l);
    const lum = luminance(rgb);
    if (dir === "darken" ? lum <= limit : lum >= limit) return toHex(rgb);
    l += dir === "darken" ? -0.025 : 0.025;
    if (l <= 0 || l >= 1) break;
  }
  return toHex(hslToRgb(h, s, Math.min(Math.max(l, 0), 1)));
}

const cache = new Map<string, { light: string; dark: string }>();

/** 흰 배경용 · 어두운 배경용 점 색을 함께 돌려준다. */
export function dotColors(logoColor?: string): { light: string; dark: string } {
  const base = `#${(logoColor ?? "64748B").replace("#", "")}`;
  const hit = cache.get(base);
  if (hit) return hit;

  const lum = luminance(hexToRgb(base));
  const out = {
    // 흰 종이 위 — 너무 밝으면(노랑·하늘색) 눌러 준다
    light: lum > 0.42 ? shift(base, "darken", 0.42) : base,
    // 어두운 배경 위 — 너무 어두우면(검정 계열) 끌어올린다
    dark: lum < 0.16 ? shift(base, "lighten", 0.16) : base,
  };
  cache.set(base, out);
  return out;
}
