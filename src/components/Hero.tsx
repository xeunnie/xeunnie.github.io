"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HERO_PROOF, PIPELINE, DEV_SINCE } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

function rise(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  };
}

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
          <span className="text-ice-500">화면만</span> 아는 프론트엔드는
          <br />
          되고 싶지 않았습니다
        </motion.h1>

        {/*
          "전 과정을 해 봤다" 는 문장으로 읽히기 전에 모양으로 보여야 한다.
          네 칸을 한 줄에 놓고 지금 서 있는 자리만 칠한다.
        */}
        <motion.ol
          {...rise(0.2)}
          className="mx-auto mt-8 flex max-w-lg items-center justify-center gap-1.5 sm:gap-2.5"
        >
          {PIPELINE.map((step, i) => (
            <li key={step.area} className="flex items-center gap-1.5 sm:gap-2.5">
              <span
                className={`rounded-full border px-2.5 py-1.5 text-[11px] font-semibold sm:px-3.5 sm:text-[13px] ${
                  step.current
                    ? "border-ice-500/50 bg-ice-100 text-ice-500"
                    : "border-slate-800 text-slate-400"
                }`}
              >
                {step.area}
              </span>
              {i < PIPELINE.length - 1 && (
                <span aria-hidden className="h-px w-2 bg-slate-700 sm:w-3.5" />
              )}
            </li>
          ))}
        </motion.ol>

        <motion.p
          {...rise(0.26)}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-400"
        >
          디자인도, 서버도, 배포도 한 번씩은 끝까지 해 봤습니다.
          <br className="hidden sm:block" />
          덕분에 문제가 어디서 났는지 먼저 짚습니다.
        </motion.p>

        {/*
          여기 있던 세 줄은 각각 프로젝트 상세로 들어가는 링크였다.
          첫 화면에서 누를 것이 여럿이면 어디부터 볼지 고르다 지친다.
          링크는 걷어내고, 대신 한 조각씩 크게 세웠다 — 다 읽지 않아도 걸리도록.
        */}
        <motion.ul {...rise(0.34)} className="mt-10 grid gap-3 text-left sm:grid-cols-3">
          {HERO_PROOF.map((p) => (
            <li
              key={p.href}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 px-5 py-5"
            >
              <p className="mb-2 text-lg font-bold tracking-tight text-ice-500 sm:text-xl">
                {p.lead}
              </p>
              <p className="text-[14px] leading-[1.7] text-slate-300">{p.text}</p>
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

      </div>
    </section>
  );
}
