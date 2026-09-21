"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import { PROJECTS } from "@/lib/constants";
import TechBadge from "./TechBadge";

/**
 * 대표 작업 셋.
 * 카드 세 장을 위아래로 쌓으니 두 화면을 넘어가 세로로 보기 불편했다.
 * 전시장처럼 한 점씩 크게 건다 — 위에서 고르면 가운데 액자만 바뀐다.
 * 별명 구간과 같은 방식이라, 사이트 안에서 같은 동작은 같은 모양이 된다.
 */
export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [picked, setPicked] = useState(0);

  const featured = [...PROJECTS]
    .sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999))
    .slice(0, 3);
  const current = featured[picked];
  const shot = current.shots?.[0];
  const rest = PROJECTS.length - featured.length;

  return (
    <section id="projects" className="flex min-h-screen items-center py-24" ref={ref}>
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-wrap items-baseline justify-between gap-4"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
            대표 작업 셋
          </h2>
          <Link
            href="/projects"
            className="text-sm font-medium text-slate-400 underline-offset-4 transition-colors hover:text-ice-500 hover:underline"
          >
            전체 {PROJECTS.length}개 보기
          </Link>
        </motion.div>

        {/* 고르는 자리 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          {featured.map((p, i) => {
            const on = i === picked;
            return (
              <button
                key={p.slug}
                onClick={() => setPicked(i)}
                aria-pressed={on}
                className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  on
                    ? "border-ice-500/40 text-ice-500"
                    : "border-slate-800/60 text-slate-400 hover:border-ice-500/25 hover:text-ice-500"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="featured-pill"
                    className="chip-on absolute inset-0 -z-10 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="font-mono text-[11px] tabular-nums opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="ml-2">{p.title}</span>
              </button>
            );
          })}
        </motion.div>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
          {/* 액자 — 한 점만 크게 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
          >
            <AnimatePresence mode="wait">
              {shot ? (
                <motion.img
                  key={shot.src}
                  src={shot.src}
                  alt={shot.caption}
                  loading="lazy"
                  decoding="async"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="aspect-[16/10] w-full object-cover object-left-top"
                />
              ) : (
                <motion.div
                  key={current.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex aspect-[16/10] w-full items-center justify-center"
                >
                  <span className="font-mono text-7xl font-bold text-slate-800">
                    {String(picked + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 설명 — 도록의 캡션처럼 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
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
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M5 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {rest > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 text-sm text-slate-500"
          >
            이 외에 {rest}개의 프로젝트가 더 있습니다.
          </motion.p>
        )}
      </div>
    </section>
  );
}
