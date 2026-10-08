"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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
    <section className="flex min-h-screen items-center py-32" ref={ref}>
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* 고른 별명이 제목을 완성한다 — 문장이 살아 움직이는 게 이 구간의 인상이다 */}
          <h2 className="text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.35] tracking-[-0.04em] text-slate-50">
            명함에는 프론트엔드 개발자,
            <br />
            현장에서는{" "}
            <motion.span
              key={current.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block text-ice-500"
            >
              {current.name}
            </motion.span>
          </h2>
          <p className="mt-6 max-w-2xl text-[16px] leading-[1.9] text-slate-400">
            일하는 방식을 길게 설명하는 것보다, 그동안 불린 이름을 보여 드리는 편이 빠를 것
            같았습니다.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 border-t border-slate-700/80 pt-12 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-20">
          <motion.ol
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.15 }}
            className="flex flex-wrap gap-x-6 gap-y-3 lg:flex-col lg:gap-1"
          >
            {NICKNAMES.map((n, i) => {
              const on = i === picked;
              return (
                <li key={n.name}>
                  <button
                    onClick={() => setPicked(i)}
                    aria-pressed={on}
                    className="group flex items-baseline gap-3 py-1.5 text-left"
                  >
                    <span className={`w-6 font-serif text-[15px] italic transition-colors ${on ? "text-ice-500" : "text-slate-500"}`}>
                      {["i", "ii", "iii", "iv", "v", "vi"][i]}.
                    </span>
                    <span
                      className={`text-[15px] transition-colors ${
                        on ? "font-semibold text-slate-50" : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    >
                      {n.name}
                    </span>
                    <span
                      aria-hidden
                      className={`hidden h-px self-center bg-ice-500 transition-all duration-500 lg:block ${on ? "w-8 opacity-100" : "w-0 opacity-0"}`}
                    />
                  </button>
                </li>
              );
            })}
          </motion.ol>

          <motion.figure
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[12rem]"
          >
            <span aria-hidden className="absolute -top-6 -left-1 font-serif text-[5rem] leading-none text-slate-700 select-none">
              &ldquo;
            </span>
            <motion.blockquote
              key={current.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative pt-6 text-[clamp(1.05rem,1.6vw,1.25rem)] leading-[1.95] text-slate-200"
            >
              {current.story}
            </motion.blockquote>
            <motion.figcaption
              key={`${current.name}-src`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8 flex items-center gap-4 text-[12px] tracking-[0.08em] text-slate-500"
            >
              <span aria-hidden className="rule" />
              {current.hrefLabel}에서 있었던 일입니다
            </motion.figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
