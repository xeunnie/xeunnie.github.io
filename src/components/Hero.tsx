"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  PROJECTS,
  HERO_PROOF,
  DEV_SINCE,
  workedMonths,
  formatMonths,
} from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

function rise(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  };
}

/**
 * 개발을 시작한 해와 실무 경력은 다른 축이라 나란히 둔다.
 * 경력은 실제 재직한 달만 합산한다 — 부트캠프 기간을 경력으로 세지 않기 위해서.
 */
const STATS = [
  { value: `${DEV_SINCE} —`, label: "개발 시작" },
  { value: formatMonths(workedMonths()), label: "실무 경력" },
  { value: `${PROJECTS.length}`, label: "프로젝트" },
  { value: `${PROJECTS.filter((p) => p.award).length}`, label: "수상" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center px-6 pt-28 pb-20"
    >
      <div className="w-full max-w-3xl mx-auto text-center">
        <motion.p
          {...rise(0.05)}
          className="text-sm font-medium text-ice-500 mb-6 tracking-tight"
        >
          Frontend Developer · {DEV_SINCE}년부터
        </motion.p>

        <motion.h1
          {...rise(0.12)}
          className="text-[clamp(2.3rem,7vw,4.4rem)] font-bold leading-[1.12] text-slate-50"
        >
          화면만 아는 프론트엔드는
          <br />
          되고 싶지 않았습니다
        </motion.h1>

        <motion.p
          {...rise(0.2)}
          className="mt-7 text-lg text-slate-400 leading-relaxed max-w-xl mx-auto"
        >
          디자인도, 서버도, 배포도 한 번씩은 끝까지 해 봤습니다.
          <br className="hidden sm:block" />
          덕분에 문제가 어디서 났는지 먼저 짚습니다.
        </motion.p>

        {/* 분야 나열 대신 실제로 푼 문제를 먼저 보여준다 */}
        <motion.ul {...rise(0.3)} className="mt-10 flex flex-col gap-2.5 text-left">
          {HERO_PROOF.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="group flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3.5 transition-colors hover:border-ice-500/40"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0 text-ice-500"
                  aria-hidden
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="flex-1 text-[15px] text-slate-200 leading-relaxed group-hover:text-slate-50 transition-colors">
                  {p.text}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="mt-1 shrink-0 text-slate-600 group-hover:text-ice-500 transition-colors"
                  aria-hidden
                >
                  <path d="M5 3l5 5-5 5" />
                </svg>
              </Link>
            </li>
          ))}
        </motion.ul>

        <motion.div
          {...rise(0.4)}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/projects"
            className="rounded-full bg-ice-500 px-7 py-3.5 text-[15px] font-semibold text-slate-950 transition-colors hover:bg-ice-600"
          >
            프로젝트 보기
          </Link>
          <Link
            href="/growth"
            className="rounded-full border border-slate-700 px-7 py-3.5 text-[15px] font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:text-slate-50"
          >
            타임라인
          </Link>
        </motion.div>

        <motion.dl
          {...rise(0.5)}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-slate-800 bg-slate-800"
        >
          {STATS.map((s) => (
            <div key={s.label} className="bg-slate-950 px-4 py-6">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block text-xl sm:text-2xl font-bold text-slate-50 tabular-nums">
                  {s.value}
                </span>
                <span className="mt-1.5 block text-xs sm:text-sm text-slate-500">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
