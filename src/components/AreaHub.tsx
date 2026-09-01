"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { NAV_ITEMS, PROJECTS, CAREERS, COLLABORATIONS, CHRONICLE } from "@/lib/constants";

/** 각 영역이 지금 몇 개의 항목을 담고 있는지 — 데이터에서 직접 센다 */
const COUNTS: Record<string, string> = {
  "/projects": `${PROJECTS.length}개 프로젝트`,
  "/growth": `${CHRONICLE.length}개 연차 · 블로그 연동`,
  "/about": `협업 기록 ${COLLABORATIONS.length}건`,
  "/resume": `경력 ${CAREERS.filter((c) => c.type !== "education").length}곳 · PDF`,
};

export default function AreaHub() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-28" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-50 mb-4">
            보고 싶은 것부터
          </h2>
          <div className="h-px w-16 bg-ice-500 mb-6" />
          <p className="text-slate-400 max-w-xl leading-relaxed">
            목적에 따라 필요한 게 다를 것 같아 영역을 나눠 두었습니다. 한 번에 다 읽지 않아도 됩니다.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {NAV_ITEMS.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
            >
              <Link
                href={item.href}
                className="group flex h-full flex-col justify-between p-7 rounded-2xl border border-slate-800/60 bg-slate-900/30 hover:border-ice-500/25 hover:bg-slate-900/50 card-hover transition-all duration-300"
              >
                <div>
                  <div className="flex items-baseline gap-2.5 mb-4">
                    <span className="text-xl font-bold text-slate-50 group-hover:text-ice-300 transition-colors">
                      {item.ko}
                    </span>
                    <span className="font-mono text-[11px] tracking-widest uppercase text-ice-500">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-7 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">{COUNTS[item.href]}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ice-400 group-hover:gap-2.5 transition-all">
                    보기
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 3l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
