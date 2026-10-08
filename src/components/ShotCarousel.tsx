"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectShot } from "@/lib/constants";
import Plate from "@/components/gallery/Plate";

interface Props {
  shots: ProjectShot[];
  /** 세로로 긴 휴대기기 캡처면 한 장을 좁게 잡는다 */
  phone?: boolean;
  /** 크게 보기 요청 — 몇 번째 캡처인지 넘긴다 */
  onOpen?: (i: number) => void;
  /** 번호를 몇 번부터 매길지 — 앞에 대표 화면이 따로 걸려 있으면 2부터 */
  start?: number;
}

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d={dir === "prev" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * 화면 캡처를 좌우로 넘겨 본다.
 * 한 장 한 장을 액자에 넣어 벽에 나란히 건 것처럼 — 지금 보는 장만 또렷하고 옆 장은 물러나 있다.
 * 스크롤 스냅 위에 조작을 얹는 방식이라 마우스·터치·키보드가 모두 그대로 동작한다.
 */
export default function ShotCarousel({ shots, phone = false, onOpen, start = 1 }: Props) {
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

  // 비율을 고정해 높이를 맞춘다. 지연 로딩 중에도 자리가 잡혀 있어야
  // 이미지가 들어올 때 레이아웃이 밀리지 않는다.
  // 세로 캡처는 기기마다 길이가 달라 잘라내지 않고 contain 으로 담는다.
  const width = phone ? "w-[64%] sm:w-[30%]" : "w-[86%] sm:w-[64%]";
  const media = phone
    ? "block aspect-[9/16] w-full bg-[var(--mat)] object-contain"
    : "block aspect-[16/10] w-full object-cover object-left-top";

  const btn =
    "flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition-colors duration-500 hover:border-slate-400 hover:text-slate-50 disabled:opacity-30 disabled:hover:border-slate-700 disabled:hover:text-slate-400";

  return (
    <div>
      <div className="mb-2 flex items-end justify-between gap-4">
        <p className="font-serif tracking-normal text-slate-500" aria-live="polite">
          <span className="text-[15px] italic">Pl.&thinsp;</span>
          <span className="text-[26px] leading-none text-slate-100">{at + start}</span>
          <span className="mx-2 text-[15px] italic">of</span>
          <span className="text-[15px]">{shots.length + start - 1}</span>
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

      {/* 액자 그림자가 잘리지 않게 트랙 위아래에 여백을 둔다. 양 끝은 벽색으로 흐린다 */}
      <div className="relative -mx-6 sm:mx-0">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-slate-950 to-transparent sm:w-14"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-slate-950 to-transparent sm:w-14"
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
          className="flex snap-x snap-mandatory items-start gap-8 overflow-x-auto px-[7%] pt-8 pb-16 outline-none [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:ring-1 focus-visible:ring-slate-500 sm:gap-14 [&::-webkit-scrollbar]:hidden"
        >
          {shots.map((shot, i) => (
            <figure
              key={shot.src}
              className={`${width} shrink-0 snap-center transition-opacity duration-700 ${
                i === at ? "opacity-100" : "opacity-35"
              }`}
            >
              <Plate>
                <button
                  type="button"
                  onClick={() => onOpen?.(i)}
                  aria-label={`${i + 1}번째 화면 크게 보기`}
                  className="block w-full cursor-zoom-in"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={shot.src} alt={shot.caption} loading="lazy" decoding="async" className={media} />
                </button>
              </Plate>
              <figcaption className="mt-6 grid grid-cols-[3rem_minmax(0,1fr)] gap-x-3 text-[13px] leading-[1.8] text-slate-400">
                <span className="font-serif text-[15px] italic leading-[1.6] tracking-normal text-slate-500">
                  Pl.&thinsp;{i + start}
                </span>
                <span>{shot.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* 얼마나 남았는지 — 가는 선 하나 */}
      <div className="h-px w-full bg-slate-800">
        <div
          className="h-full bg-slate-400 transition-all duration-700"
          style={{ width: `${((at + 1) / shots.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
