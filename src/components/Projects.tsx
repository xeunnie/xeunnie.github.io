"use client";

import { useCallback, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import { PROJECTS } from "@/lib/constants";
import type { Project } from "@/lib/constants";
import TechBadge from "./TechBadge";

/**
 * 액자 한 칸.
 * 세로로 긴 휴대기기 캡처를 16:10 틀에 object-cover 로 넣으면 윗부분만 잘려 보인다.
 * 그런 프로젝트는 석 장을 나란히 세워 기기 모양 그대로 보여 준다.
 */
function Frame({ project }: { project: Project }) {
  const shots = project.shots ?? [];
  if (shots.length === 0) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center bg-slate-900">
        <span className="font-mono text-6xl font-bold text-slate-800">{project.title.slice(0, 1)}</span>
      </div>
    );
  }

  if (project.shotsLayout === "phone") {
    return (
      // 좁은 화면에서는 틀을 세로로 키운다 — 16:10 에 석 장을 넣으면 기기가 너무 작아진다
      <div className="flex aspect-[4/3] w-full items-center justify-center gap-3 overflow-hidden bg-slate-950 px-4 py-5 sm:aspect-[16/10] sm:gap-5 sm:px-8 sm:py-8">
        {shots.slice(0, 3).map((s) => (
          <span key={s.src} className="flex h-full min-w-0 flex-1 items-center justify-center">
            {/* 최대 높이·너비로만 묶어 두면 그려진 크기가 곧 상자라, 테두리가 기기에 딱 붙는다 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.src}
              alt={s.caption}
              loading="lazy"
              decoding="async"
              className="max-h-full max-w-full rounded-xl border border-slate-800 object-contain shadow-[0_8px_24px_rgb(0_0_0_/_0.18)]"
            />
          </span>
        ))}
      </div>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={shots[0].src}
      alt={shots[0].caption}
      loading="lazy"
      decoding="async"
      className="aspect-[16/10] w-full object-cover object-left-top"
    />
  );
}

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path
        d={dir === "prev" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * 대표 작업 셋.
 * 카드 세 장을 위아래로 쌓으니 두 화면을 넘어가 세로로 보기 불편했다.
 * 전시장처럼 한 점씩 걸고 좌우로 넘긴다 — 끌어서, 화살표로, 키보드로.
 */
export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [[at, dir], setAt] = useState<[number, number]>([0, 0]);

  const featured = [...PROJECTS]
    .sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999))
    .slice(0, 3);
  const current = featured[at];
  const rest = PROJECTS.length - featured.length;

  const go = useCallback(
    (next: number) => {
      const i = Math.min(featured.length - 1, Math.max(0, next));
      setAt(([prev]) => [i, i > prev ? 1 : -1]);
    },
    [featured.length]
  );

  const btn =
    "rounded-full border border-slate-800 p-2.5 text-slate-400 transition-colors hover:border-ice-500/40 hover:text-ice-500 disabled:opacity-25 disabled:hover:border-slate-800 disabled:hover:text-slate-400";

  return (
    <section id="projects" className="flex min-h-screen items-center py-24" ref={ref}>
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="mb-3 text-[10px] font-semibold tracking-[0.16em] text-ice-500">
              대표 작업
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
              이 셋을 먼저 보여 드립니다
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <p className="font-mono text-xs tabular-nums text-slate-500">
              <span className="text-ice-500">{String(at + 1).padStart(2, "0")}</span>
              <span className="mx-1 text-slate-700">/</span>
              {String(featured.length).padStart(2, "0")}
            </p>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => go(at - 1)} disabled={at === 0} aria-label="이전 작업" className={btn}>
                <Arrow dir="prev" />
              </button>
              <button
                type="button"
                onClick={() => go(at + 1)}
                disabled={at === featured.length - 1}
                aria-label="다음 작업"
                className={btn}
              >
                <Arrow dir="next" />
              </button>
            </div>
          </div>
        </motion.div>

        <div
          tabIndex={0}
          role="group"
          aria-label="대표 작업"
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
          className="grid items-start gap-10 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ice-500/30 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14"
        >
          {/* 액자 — 끌어서도 넘어간다 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
          >
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={current.slug}
                custom={dir}
                initial={{ opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60 || info.velocity.x < -450) go(at + 1);
                  else if (info.offset.x > 60 || info.velocity.x > 450) go(at - 1);
                }}
                className="cursor-grab active:cursor-grabbing"
              >
                <Frame project={current} />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* 도록의 캡션 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="min-w-0"
            >
              <p className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                <span>{current.company ?? current.org}</span>
                <span aria-hidden className="h-3 w-px bg-slate-800" />
                <span className="font-mono">{current.period}</span>
              </p>

              <h3 className="text-2xl font-bold leading-tight tracking-tight text-slate-50 sm:text-3xl">
                {current.title}
              </h3>
              <p className="mt-2.5 text-[15px] font-medium text-ice-500">{current.subtitle}</p>
              <p className="mt-5 text-[15px] leading-[1.85] text-slate-300">
                {current.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {current.techs.slice(0, 5).map((tech) => (
                  <TechBadge key={tech} name={tech} size="sm" />
                ))}
                {current.techs.length > 5 && (
                  <span className="self-center text-xs text-slate-500">
                    +{current.techs.length - 5}
                  </span>
                )}
              </div>

              <Link
                href={`/projects/${current.slug}`}
                className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ice-500 transition-all hover:gap-3"
              >
                자세히 보기
                <Arrow dir="next" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 얼마나 남았는지 */}
        <div className="mt-8 h-px w-full overflow-hidden bg-slate-800">
          <motion.div
            className="h-full bg-ice-500"
            animate={{ width: `${((at + 1) / featured.length) * 100}%` }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {rest > 0 && (
          <p className="mt-5 text-sm text-slate-500">
            이 외에 {rest}개의 프로젝트가 더 있습니다. 아래에서 이어집니다.
          </p>
        )}
      </div>
    </section>
  );
}
