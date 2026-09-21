"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { MORE_ITEMS, COLLABORATIONS, PEER_REVIEWS, CHRONICLE } from "@/lib/constants";

/**
 * 일하는 방식을 다 읽은 사람에게만 여는 다음 문.
 * 상단 메뉴를 셋으로 줄이면서 협업 기록·타임라인이 푸터로만 닿게 됐는데,
 * 다 읽고 내려온 자리에서 한 번 더 권하는 편이 묻히지 않는다.
 */
const COUNTS: Record<string, string> = {
  "/collaboration": `협업 기록 ${COLLABORATIONS.length}건 · 동료 평가 ${PEER_REVIEWS.length}건`,
  "/growth": `${CHRONICLE.length}개 연차`,
};

export default function NextUp() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl"
        >
          이어서 볼 것
        </motion.h2>

        <ul className="divide-y divide-slate-800/60 border-y border-slate-800/60">
          {MORE_ITEMS.map((item, i) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <Link
                href={item.href}
                className="group flex flex-col gap-2 py-7 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-semibold text-slate-100 transition-colors group-hover:text-ice-500 sm:text-2xl">
                    {item.question}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-1.5">
                  <span className="font-mono text-xs text-slate-500">{COUNTS[item.href]}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-ice-500 transition-all group-hover:gap-2">
                    {item.ko}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M5 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
