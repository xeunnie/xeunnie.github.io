"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectShot } from "@/lib/constants";

interface Props {
  shots: ProjectShot[];
  /** 세로로 긴 휴대기기 캡처면 한 장을 좁게 잡는다 */
  phone?: boolean;
}

/**
 * 화면 캡처를 좌우로 넘겨 본다.
 * 열 장 넘는 프로젝트에서 세로로 쌓으면 상세 페이지가 캡처만으로 몇 화면이 된다.
 * 스크롤 스냅으로 만들어 마우스·터치·키보드 모두 그대로 동작하고,
 * 버튼은 그 위에 얹기만 한다.
 */
export default function ShotCarousel({ shots, phone = false }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState(0);

  // scrollIntoView 는 페이지까지 같이 끌고 가므로 트랙만 직접 움직인다
  const scrollTo = useCallback((i: number) => {
    const track = trackRef.current;
    const item = track?.children[i] as HTMLElement | undefined;
    if (!track || !item) return;
    track.scrollTo({
      left: item.offsetLeft - (track.clientWidth - item.offsetWidth) / 2,
      behavior: "smooth",
    });
    setAt(i);
  }, []);

  // 손으로 넘겼을 때도 현재 위치를 따라간다
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const mid = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let dist = Infinity;
      Array.from(track.children).forEach((c, i) => {
        const el = c as HTMLElement;
        const center = el.offsetLeft + el.offsetWidth / 2;
        const d = Math.abs(center - mid);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      setAt(best);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const width = phone ? "w-[62%] sm:w-[32%]" : "w-[88%] sm:w-[68%]";

  return (
    <div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {shots.map((shot) => (
          <figure key={shot.src} className={`${width} shrink-0 snap-center`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shot.src}
              alt={shot.caption}
              loading="lazy"
              decoding="async"
              className="w-full rounded-xl border border-slate-800 bg-slate-900"
            />
            <figcaption className="mt-3 text-sm leading-relaxed text-slate-400">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => scrollTo(Math.max(0, at - 1))}
          disabled={at === 0}
          aria-label="이전 화면"
          className="rounded-full border border-slate-800 p-2 text-slate-400 transition-colors hover:border-ice-500/30 hover:text-ice-500 disabled:opacity-30 disabled:hover:border-slate-800 disabled:hover:text-slate-400"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 3L5 8l5 5" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scrollTo(Math.min(shots.length - 1, at + 1))}
          disabled={at === shots.length - 1}
          aria-label="다음 화면"
          className="rounded-full border border-slate-800 p-2 text-slate-400 transition-colors hover:border-ice-500/30 hover:text-ice-500 disabled:opacity-30 disabled:hover:border-slate-800 disabled:hover:text-slate-400"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 3l5 5-5 5" />
          </svg>
        </button>
        <span className="font-mono text-xs text-slate-500">
          {at + 1} / {shots.length}
        </span>
      </div>
    </div>
  );
}
