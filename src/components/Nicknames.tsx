"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { NICKNAMES } from "@/lib/constants";

/**
 * 히어로 다음에 놓이는 자기소개.
 * 기술 나열은 아래 Skills 가 하므로, 여기서는 "어떤 식으로 일하는 사람인가"만 보여준다.
 * 하나를 고르면 그 이야기가 펼쳐지는 방식 — 네 개를 한꺼번에 늘어놓으면 아무것도 안 읽힌다.
 */
export default function Nicknames() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [picked, setPicked] = useState(0);
  const current = NICKNAMES[picked];

  return (
    <section className="py-24" ref={ref}>
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* 고른 별명이 제목을 완성한다 — 문장이 살아 움직이는 게 이 구간의 인상이다 */}
          <h2 className="text-3xl font-bold leading-snug tracking-tight text-slate-50 sm:text-4xl">
            명함에는 프론트엔드 개발자,
            <br />
            현장에서는{" "}
            <span className="relative inline-block">
              <motion.span
                key={current.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="inline-block text-ice-500"
              >
                {current.name}
              </motion.span>
              <motion.span
                layoutId="nickname-underline"
                className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-ice-500/35"
                transition={{ type: "spring", stiffness: 340, damping: 30 }}
              />
            </span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400">
            일하는 방식을 길게 설명하는 것보다, 그동안 불린 이름을 보여 드리는 편이 빠를 것
            같았습니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 flex flex-wrap gap-2"
        >
          {NICKNAMES.map((n, i) => {
            const on = i === picked;
            return (
              <button
                key={n.name}
                onClick={() => setPicked(i)}
                aria-pressed={on}
                className={`relative rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  on
                    ? "border-ice-500/40 text-ice-500"
                    : "border-slate-800/60 text-slate-400 hover:border-ice-500/25 hover:text-ice-400"
                }`}
              >
                {on && (
                  // 선택 표시가 칩 사이를 미끄러지듯 따라간다
                  <motion.span
                    layoutId="nickname-pill"
                    className="chip-on absolute inset-0 -z-10 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {n.name}
              </button>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-6 rounded-2xl border border-slate-800/60 bg-slate-900/25 p-7"
        >
          <motion.p
            key={current.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
            className="text-base leading-relaxed text-slate-300"
          >
            {current.story}
          </motion.p>
          <Link
            href={current.href}
            className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ice-400 transition-all hover:gap-2.5"
          >
            {current.hrefLabel}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 3l5 5-5 5" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
