"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectShot } from "@/lib/constants";

interface Props {
  shots: ProjectShot[];
  /** 세로로 긴 휴대기기 캡처면 한 장을 좁게 잡는다 */
  phone?: boolean;
  /** 크게 보기 요청 — 몇 번째 캡처인지 넘긴다 */
  onOpen?: (i: number) => void;
}

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d={dir === "prev" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * 화면 캡처를 좌우로 넘겨 본다.
 * 스크롤 스냅 위에 조작을 얹는 방식이라 마우스·터치·키보드가 모두 그대로 동작한다.
 * 지금 보는 장만 또렷하게 두고 옆 장은 살짝 죽여서, 어디를 읽어야 하는지 헷갈리지 않게 했다.
 */
export default function ShotCarousel({ shots, phone = false, onOpen }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState(0);

  // scrollIntoView 는 페이지까지 같이 끌고 가므로 트랙만 직접 움직인다
  const go = useCallback(
    (i: number) => {
      const next = Math.min(shots.length - 1, Math.max(0, i));
      const track = trackRef.current;
      const item = track?.children[next] as HTMLElement | undefined;
      if (!track || !item) return;
      track.scrollTo({
        left: item.offsetLeft - (track.clientWidth - item.offsetWidth) / 2,
        behavior: "smooth",
      });
      setAt(next);
    },
    [shots.length]
  );

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
        const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid);
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

  // 비율을 고정해 카드 높이를 맞춘다. 지연 로딩 중에도 자리가 잡혀 있어야
  // 이미지가 들어올 때 레이아웃이 밀리지 않는다.
  // 세로 캡처는 기기마다 길이가 달라 잘라내지 않고 contain 으로 담는다.
  const width = phone ? "w-[62%] sm:w-[34%]" : "w-[88%] sm:w-[62%]";
  const media = phone
    ? "aspect-[9/16] w-full bg-slate-950 object-contain"
    : "aspect-[16/10] w-full object-cover object-left-top";

  const btn =
    "rounded-full border border-slate-800 p-2 text-slate-400 transition-colors hover:border-ice-500/40 hover:text-ice-500 disabled:opacity-25 disabled:hover:border-slate-800 disabled:hover:text-slate-400";

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="font-mono text-xs text-slate-500">
          <span className="text-ice-500">{String(at + 1).padStart(2, "0")}</span>
          <span className="mx-1 text-slate-700">/</span>
          {String(shots.length).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => go(at - 1)} disabled={at === 0} aria-label="이전 화면" className={btn}>
            <Arrow dir="prev" />
          </button>
          <button
            type="button"
            onClick={() => go(at + 1)}
            disabled={at === shots.length - 1}
            aria-label="다음 화면"
            className={btn}
          >
            <Arrow dir="next" />
          </button>
        </div>
      </div>

      {/* 잘린 카드가 실수처럼 보이지 않도록 양 끝을 흐린다 */}
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-slate-950 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-slate-950 to-transparent"
        />
        <div
          ref={trackRef}
          tabIndex={0}
          role="group"
          aria-label="화면 캡처"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              go(at + 1);
            }
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              go(at - 1);
            }
          }}
          className="flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto pb-2 outline-none [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-ice-500/30 [&::-webkit-scrollbar]:hidden"
        >
          {shots.map((shot, i) => (
            <figure
              key={shot.src}
              className={`${width} shrink-0 snap-center transition-all duration-300 ${
                i === at ? "opacity-100" : "opacity-45 saturate-50"
              }`}
            >
              <div
                className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-slate-900 transition-colors ${
                  i === at ? "border-ice-500/30" : "border-slate-800"
                }`}
              >
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => onOpen?.(i)}
                    aria-label={`${i + 1}번째 화면 크게 보기`}
                    className="group/zoom block w-full cursor-zoom-in"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={shot.src}
                      alt={shot.caption}
                      loading="lazy"
                      decoding="async"
                      className={media}
                    />
                    <span className="pointer-events-none absolute inset-0 bg-slate-950/0 transition-colors group-hover/zoom:bg-slate-950/10" />
                  </button>
                  <span className="absolute left-3 top-3 rounded-full bg-slate-950/85 px-2.5 py-1 font-mono text-[11px] font-medium text-slate-300 backdrop-blur">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                {/* 설명은 옅은 형광 바탕에 올려 이미지와 한 덩어리로 보이게 */}
                <figcaption className="flex-1 border-t border-slate-800 bg-ice-50 px-5 py-4 text-sm leading-relaxed text-slate-300">
                  {shot.caption}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* 얼마나 남았는지 — 점을 열세 개 찍는 것보다 막대가 읽기 쉽다 */}
      <div className="mt-4 h-0.5 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-ice-500 transition-all duration-300"
          style={{ width: `${((at + 1) / shots.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
