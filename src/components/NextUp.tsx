"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MORE_ITEMS, COLLABORATIONS, PEER_REVIEWS, CHRONICLE } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

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
  return (
    <section className="py-32 sm:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-10 flex items-center gap-4 text-[11px] font-medium tracking-[0.16em] text-slate-500"
        >
          <span aria-hidden className="rule" />
          이어서 볼 것
        </motion.h2>

        <ul className="border-t border-slate-700">
          {MORE_ITEMS.map((item, i) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 + i * 0.1 }}
              className="border-b border-slate-800"
            >
              <Link
                href={item.href}
                className="group grid gap-x-10 gap-y-3 py-10 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)_auto] sm:items-baseline"
              >
                <span aria-hidden className="font-serif text-[26px] italic leading-none text-slate-500 transition-colors duration-500 group-hover:text-slate-200">
                  {item.label}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[clamp(1.25rem,2.2vw,1.6rem)] font-semibold tracking-[-0.04em] text-slate-100 transition-colors duration-500 group-hover:text-ice-500">
                    {item.question}
                  </h3>
                  <p className="mt-3 max-w-xl text-[14px] leading-[1.85] text-slate-400">{item.desc}</p>
                </div>

                <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                  <span className="text-[12px] text-slate-500">{COUNTS[item.href]}</span>
                  <span className="inline-flex items-center gap-1.5 text-[13px] text-slate-300 transition-all duration-500 group-hover:gap-3 group-hover:text-ice-500">
                    {item.ko}
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                      <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
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
