"use client";

import { useCallback, useEffect, useRef } from "react";
import type { ProjectShot } from "@/lib/constants";

interface Props {
  shots: ProjectShot[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}

/**
 * 캡처를 크게 보는 창.
 * 전시장처럼 어둡게 깔고 작품만 띄운 뒤, 아래에 설명을 도록처럼 붙인다.
 * Esc·좌우 키·바깥 클릭으로 닫거나 넘길 수 있어야 한다.
 */
export default function Lightbox({ shots, index, onIndex, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const shot = shots[index];

  const move = useCallback(
    (d: number) => onIndex(Math.min(shots.length - 1, Math.max(0, index + d))),
    [index, onIndex, shots.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    document.addEventListener("keydown", onKey);
    // 뒤 페이지가 같이 스크롤되면 보는 흐름이 끊긴다
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [move, onClose]);

  if (!shot) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="화면 크게 보기"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col bg-[#0b0d10]/96 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between px-5 py-4 sm:px-8">
        <p className="font-mono text-xs text-white/50">
          <span className="text-white">{String(index + 1).padStart(2, "0")}</span>
          <span className="mx-1">/</span>
          {String(shots.length).padStart(2, "0")}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* 작품 자리 — 클릭이 바깥으로 새지 않게 여기서 멈춘다 */}
      <figure
        onClick={(e) => e.stopPropagation()}
        className="flex min-h-0 flex-1 flex-col items-center justify-center gap-6 px-5 pb-8 sm:px-10"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={shot.src}
          alt={shot.caption}
          className="max-h-[70vh] w-auto max-w-full rounded-lg object-contain shadow-[0_24px_80px_rgb(0_0_0_/_0.55)]"
        />
        <figcaption className="max-w-2xl text-center text-sm leading-relaxed text-white/70">
          {shot.caption}
        </figcaption>
      </figure>

      {/* 넘기기 — 이미지 양옆이 아니라 아래에 둬서 작품을 가리지 않게 */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-center gap-3 pb-8"
      >
        <button
          type="button"
          onClick={() => move(-1)}
          disabled={index === 0}
          aria-label="이전 화면"
          className="rounded-full border border-white/15 p-2.5 text-white/70 transition-colors hover:border-white/40 hover:text-white disabled:opacity-25"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          disabled={index === shots.length - 1}
          aria-label="다음 화면"
          className="rounded-full border border-white/15 p-2.5 text-white/70 transition-colors hover:border-white/40 hover:text-white disabled:opacity-25"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
