"use client";

import { motion } from "framer-motion";
import { FUTURE, DEV_SINCE, workedMonths, formatMonths } from "@/lib/constants";
import { SectionHead } from "./About";

const EASE = [0.16, 1, 0.3, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 1, ease: EASE, delay },
});

/**
 * 앞으로 되고 싶은 모습.
 * 지금 서 있는 자리에서 3 · 5 · 10 년이 가는 세로선 위에 차례로 찍힌다.
 * 바람만 적으면 글이 되므로, 칸마다 그때까지 할 일을 같이 둔다.
 */
export default function Future() {
  return (
    <section className="py-32 sm:py-44">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...fade()} className="mb-20 sm:mb-28">
          <SectionHead mark="Ahead" title="앞으로 이런 개발자이고 싶습니다" />
        </motion.div>

        <div className="relative pl-8 sm:pl-14">
          {/* 가는 세로선 — 위에서 아래로 천천히 그어진다 */}
          <motion.span
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.6, ease: EASE }}
            style={{ transformOrigin: "top" }}
            className="absolute bottom-6 left-[3px] top-2 w-px bg-slate-700 sm:left-[5px]"
          />

          {/* 출발점 — 앞을 재려면 지금 어디인지부터 */}
          <motion.div {...fade()} className="relative pb-20">
            <span
              aria-hidden
              className="absolute -left-8 top-[7px] h-[7px] w-[7px] rounded-full bg-slate-500 sm:-left-14 sm:h-[11px] sm:w-[11px] sm:top-[5px]"
            />
            <p className="text-[11px] tracking-[0.16em] text-slate-500">지금</p>
            <p className="mt-2 text-[15px] text-slate-400">
              {DEV_SINCE}년에 시작해 실무 {formatMonths(workedMonths())}째입니다.
            </p>
          </motion.div>

          <ol>
            {FUTURE.map((step, i) => (
              <motion.li key={step.when} {...fade(0.1)} className="relative pb-24 last:pb-0 sm:pb-32">
                <span
                  aria-hidden
                  className={`absolute -left-8 top-[7px] h-[7px] w-[7px] rounded-full border bg-slate-950 sm:-left-14 sm:h-[11px] sm:w-[11px] sm:top-[5px] ${
                    i === FUTURE.length - 1 ? "border-ice-500" : "border-slate-500"
                  }`}
                />

                <div className="grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
                  <div className="lg:sticky lg:top-32 lg:self-start">
                    <p className="text-[11px] tracking-[0.16em] text-slate-500">{step.when}</p>
                    <h3 className="mt-4 text-[clamp(1.8rem,3.4vw,2.5rem)] font-semibold leading-none tracking-[-0.045em] text-slate-50">
                      {step.title}
                    </h3>
                  </div>

                  <div className="min-w-0">
                    <p className="max-w-[40rem] text-[17px] leading-[1.95] text-slate-300">{step.body}</p>

                    <dl className="wall-label mt-10 max-w-[36rem]">
                      <dt className="mb-3">그때까지 할 일</dt>
                      <dd>
                        <ul className="border-t border-slate-800">
                          {step.doing.map((d, j) => (
                            <li
                              key={d}
                              className="grid grid-cols-[1.75rem_minmax(0,1fr)] items-baseline border-b border-slate-800 py-3"
                            >
                              <span aria-hidden className="font-serif text-[13px] italic text-slate-500">
                                {j + 1}
                              </span>
                              <span className="text-[14px] leading-[1.8] text-slate-400">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </dl>
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
