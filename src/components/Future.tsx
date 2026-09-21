"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FUTURE, DEV_SINCE, workedMonths, formatMonths } from "@/lib/constants";

/**
 * 앞으로 되고 싶은 모습.
 * 지나온 것(타임라인)이 뒤를 보여 준다면 이 구간은 앞을 본다.
 * 그래서 같은 문법으로 그린다 — 세로 선이 위에서 아래로 그어지고,
 * 지금 서 있는 자리에서 3 · 5 · 10 년이 차례로 찍힌다.
 * 바람만 적으면 글이 되므로, 칸마다 그때까지 할 일을 같이 둔다.
 */
export default function Future() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="mb-3 font-mono text-xs font-semibold tabular-nums text-ice-500">05</p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
            앞으로 이런 개발자이고 싶습니다
          </h2>
        </motion.div>

        <div className="relative pl-10 sm:pl-16">
          {/* 지나온 쪽은 옅게, 앞으로 갈수록 진하게 — 선이 위에서 아래로 그어진다 */}
          <motion.span
            aria-hidden
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top" }}
            className="absolute bottom-8 left-[7px] top-2 w-px bg-gradient-to-b from-slate-700 via-ice-500/60 to-ice-500 sm:left-[11px]"
          />

          {/* 출발점 — 앞을 재려면 지금 어디인지부터 */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative pb-14"
          >
            <span
              aria-hidden
              className="absolute -left-10 top-1 h-4 w-4 rounded-full border-2 border-slate-700 bg-slate-950 sm:-left-16 sm:h-6 sm:w-6"
            />
            <p className="font-mono text-sm font-semibold text-slate-500">지금</p>
            <p className="mt-1.5 text-[15px] text-slate-400">
              {DEV_SINCE}년에 시작해 실무 {formatMonths(workedMonths())}째입니다.
            </p>
          </motion.div>

          <ol>
            {FUTURE.map((step, i) => (
              <motion.li
                key={step.when}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.25 + i * 0.15 }}
                className="relative pb-16 last:pb-0"
              >
                {/* 마디 — 튀어나오듯 찍힌다 */}
                <motion.span
                  aria-hidden
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 20,
                    delay: 0.35 + i * 0.15,
                  }}
                  className="absolute -left-10 top-1 h-4 w-4 rounded-full border-2 border-ice-500 bg-slate-950 sm:-left-16 sm:h-6 sm:w-6"
                />

                <div className="grid gap-x-12 gap-y-4 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
                  <div className="lg:sticky lg:top-28 lg:self-start">
                    <p className="font-mono text-sm font-semibold text-ice-500">{step.when}</p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
                      {step.title}
                    </h3>
                  </div>

                  <div className="min-w-0">
                    <p className="max-w-[40rem] text-[17px] leading-[1.9] text-slate-300">
                      {step.body}
                    </p>

                    <p className="mb-3 mt-7 text-[11px] font-semibold tracking-[0.06em] text-slate-500">
                      그때까지 할 일
                    </p>
                    <ul className="max-w-[40rem] divide-y divide-slate-800/60 border-y border-slate-800/60">
                      {step.doing.map((d, j) => (
                        <motion.li
                          key={d}
                          initial={{ opacity: 0, x: 8 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.5 + i * 0.15 + j * 0.06 }}
                          className="flex items-start gap-3 py-3"
                        >
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="mt-1.5 shrink-0 text-ice-500"
                            aria-hidden
                          >
                            <path d="M3 8h9M8.5 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span className="text-[15px] leading-[1.8] text-slate-300">{d}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
