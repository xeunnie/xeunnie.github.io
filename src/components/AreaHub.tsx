"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { NAV_ITEMS, PROJECTS, CAREERS, COLLABORATIONS, CHRONICLE } from "@/lib/constants";

/** 각 영역이 지금 몇 개의 항목을 담고 있는지 — 데이터에서 직접 센다 */
/** 읽는 순서와 대략 걸리는 시간 — 처음 온 사람이 길을 잃지 않게 */
const GUIDE: Record<string, { step: string; time: string }> = {
  "/projects": { step: "①", time: "5분" },
  "/about": { step: "②", time: "3분" },
  "/growth": { step: "③", time: "5분" },
  "/resume": { step: "④", time: "1분" },
};

const COUNTS: Record<string, string> = {
  "/projects": `${PROJECTS.length}개 프로젝트`,
  "/growth": `${CHRONICLE[0].year} — ${CHRONICLE[CHRONICLE.length - 1].year} · 블로그 연결`,
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
            이 사이트 보는 순서
          </h2>
          <p className="max-w-xl text-base text-slate-400 leading-relaxed">
            위에서부터 순서대로 읽으면 무엇을 만들었고, 어떻게 일하고, 어떻게 여기까지
            왔는지가 이어집니다. 시간이 없으면 <strong className="font-semibold text-slate-200">①번의 대표 프로젝트 셋</strong>만 보셔도 됩니다.
          </p>
          <div className="mt-6 h-px w-16 bg-ice-500" />
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
                    <span className="font-mono text-base text-ice-500">{GUIDE[item.href]?.step}</span>
                    <span className="text-xl font-bold text-slate-50 group-hover:text-ice-300 transition-colors">
                      {item.ko}
                    </span>
                    <span className="font-mono text-[11px] tracking-widest uppercase text-ice-500">
                      {item.label}
                    </span>
                    <span className="ml-auto font-mono text-[11px] text-slate-500">
                      {GUIDE[item.href]?.time}
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
