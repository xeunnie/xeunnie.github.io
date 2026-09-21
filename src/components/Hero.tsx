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
      className="relative flex min-h-screen items-center justify-center px-6 pt-24 pb-16"
    >
      <div className="w-full max-w-3xl mx-auto text-center">
        <motion.p
          {...rise(0.05)}
          className="mb-5 text-sm font-medium tracking-tight text-ice-500"
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
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-400"
        >
          디자인도, 서버도, 배포도 한 번씩은 끝까지 해 봤습니다.
          <br className="hidden sm:block" />
          덕분에 문제가 어디서 났는지 먼저 짚습니다.
        </motion.p>

        {/*
          여기 있던 세 줄은 각각 프로젝트 상세로 들어가는 링크였다.
          첫 화면에서 누를 것이 여럿이면 어디부터 볼지 고르다 지친다.
          읽히기만 하면 되는 문장이라 링크를 걷어냈다 — 누르는 곳은 아래 하나뿐이다.
        */}
        <motion.ul {...rise(0.3)} className="mt-8 flex flex-col gap-2 text-left">
          {HERO_PROOF.map((p) => (
            <li
              key={p.href}
              className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3"
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
              <span className="flex-1 text-[15px] leading-relaxed text-slate-200">{p.text}</span>
            </li>
          ))}
        </motion.ul>

        {/* 첫 화면의 단 하나의 행동 */}
        <motion.div {...rise(0.4)} className="mt-8 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full bg-ice-500 px-8 py-4 text-[15px] font-semibold text-slate-950 transition-colors hover:bg-ice-600"
          >
            무엇을 만들었는지 보기
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5" aria-hidden>
              <path d="M5 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

        <motion.dl
          {...rise(0.5)}
          className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-800 bg-slate-800 sm:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.label} className="bg-slate-950 px-4 py-5">
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
