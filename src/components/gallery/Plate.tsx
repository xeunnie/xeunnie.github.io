"use client";

import { useRef } from "react";

/**
 * 액자 하나.
 * 매트(여백) 안에 내용을 넣고, 마우스 자리에 아주 옅은 빛을 비춘다.
 * 빛은 CSS 변수(--x, --y)만 바꾸므로 리렌더가 없다.
 */
export default function Plate({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} onMouseMove={onMove} className={`plate ${className}`}>
      <div className="plate-inner">{children}</div>
      <span aria-hidden className="plate-light" />
    </div>
  );
}

/** 작품 번호 — "No. 07" 처럼. 세리프 이탤릭으로 작게 */
export function PlateNo({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span className={`font-serif text-[15px] italic tracking-normal text-slate-500 ${className}`}>
      No.&thinsp;{String(n).padStart(2, "0")}
    </span>
  );
}
