"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { NAV_ITEMS, CAREERS, COLLABORATIONS, PEER_REVIEWS, CHRONICLE, PROJECTS } from "@/lib/constants";

/**
 * 대표 작업을 본 다음에 생기는 질문을 받는 자리.
 * 순서를 번호로 지시하지 않는다 — 페이지에 놓인 차례가 곧 순서다.
 * 프로젝트는 바로 위 Featured Work 에서 이미 안내하므로 여기서 뺀다.
 */
/** 연차 표기는 오래된 해부터 — 배열 순서(최신 우선)에 기대지 않는다 */
const YEARS = [...CHRONICLE.map((c) => c.year)].sort();

const COUNTS: Record<string, string> = {
  "/about": `협업 기록 ${COLLABORATIONS.length}건 · 동료 평가 ${PEER_REVIEWS.length}건`,
  "/growth": `${YEARS[0]} — ${YEARS[YEARS.length - 1]} · ${CHRONICLE.length}개 연차`,
  "/resume": `경력 ${CAREERS.filter((c) => c.type !== "education").length}곳 · 프로젝트 ${PROJECTS.length}개 · PDF`,
};

export default function AreaHub() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const items = NAV_ITEMS.filter((i) => i.href !== "/projects");

  return (
    <section className="relative py-24" ref={ref}>
      <div className="mx-auto max-w-4xl px-6">
        <ul className="divide-y divide-slate-800/60 border-y border-slate-800/60">
          {items.map((item, i) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={item.href}
                className="group flex flex-col gap-2 py-8 transition-colors sm:flex-row sm:items-baseline sm:gap-8"
              >
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-xl font-semibold text-slate-100 transition-colors group-hover:text-ice-400 sm:text-2xl">
                      {item.question}
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">
                      {item.label}
                    </span>
                  </div>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">{item.desc}</p>
                </div>

                <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-1.5">
                  <span className="font-mono text-xs text-slate-500">{COUNTS[item.href]}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-ice-400 transition-all group-hover:gap-2">
                    {item.ko}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 3l5 5-5 5" />
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
