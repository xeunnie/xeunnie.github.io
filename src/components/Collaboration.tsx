"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { COLLABORATIONS, PARTNER_ORDER, PROJECTS } from "@/lib/constants";
import type { Collaboration, Partner } from "@/lib/constants";

const PARTNER_STYLE: Record<Partner, string> = {
  백엔드: "bg-ice-100 text-ice-400 border-ice-500/20",
  디자이너: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  협업처: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  팀: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  현장: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const STEPS = [
  { key: "situation", label: "상황" },
  { key: "action", label: "내가 한 일" },
  { key: "result", label: "결과" },
] as const;

function Card({ item, index }: { item: Collaboration; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.3) }}
      className="p-7 rounded-2xl border border-slate-800/60 bg-slate-900/25"
    >
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span
          className={`text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full border ${PARTNER_STYLE[item.partner]}`}
        >
          with {item.partner}
        </span>
        {item.project &&
          (() => {
            // 프로젝트명이 실제 항목과 맞으면 상세로 이어준다
            const hit = PROJECTS.find((p) => item.project?.includes(p.title));
            return hit ? (
              <Link
                href={`/projects/${hit.slug}`}
                className="text-xs text-slate-500 underline decoration-slate-700 underline-offset-4 transition-colors hover:text-ice-400"
              >
                {item.project}
              </Link>
            ) : (
              <span className="text-xs text-slate-500">{item.project}</span>
            );
          })()}
      </div>

      <h3 className="text-lg font-bold text-slate-50 leading-snug mb-5">{item.title}</h3>

      <dl className="space-y-4">
        {STEPS.map((step) => (
          <div key={step.key} className="grid grid-cols-[68px_1fr] gap-4 items-baseline">
            <dt className="font-mono text-[10px] tracking-widest uppercase text-slate-500 pt-0.5">
              {step.label}
            </dt>
            <dd className="text-sm text-slate-300 leading-relaxed">{item[step.key]}</dd>
          </div>
        ))}
      </dl>

      {item.evidence && (
        <p className="mt-5 pt-4 border-t border-slate-800/60 font-mono text-xs text-slate-500 break-all">
          {item.evidence}
        </p>
      )}
    </motion.article>
  );
}

export default function CollaborationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [filter, setFilter] = useState<Partner | "all">("all");

  const filters = useMemo(() => {
    const counts = PARTNER_ORDER.map((p) => ({
      key: p,
      label: p,
      count: COLLABORATIONS.filter((c) => c.partner === p).length,
    })).filter((f) => f.count > 0);
    return [{ key: "all" as const, label: "전체", count: COLLABORATIONS.length }, ...counts];
  }, []);

  const visible =
    filter === "all" ? COLLABORATIONS : COLLABORATIONS.filter((c) => c.partner === filter);

  return (
    <section id="collaboration" className="relative py-24 border-t border-slate-800/40" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-50 mb-4">협업 기록</h2>
          <div className="h-px w-16 bg-ice-500 mb-6" />
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            &ldquo;협업을 잘합니다&rdquo;라고 쓰는 대신, 실제로 무엇을 어떻게 했는지를 적었습니다.
            모두 근거가 남아 있는 건들입니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                filter === f.key
                  ? "border-ice-500/40 bg-ice-100 text-ice-300"
                  : "border-slate-800/60 bg-slate-900/30 text-slate-400 hover:border-ice-500/20 hover:text-ice-400"
              }`}
            >
              {f.label}
              <span className="ml-2 text-xs opacity-70">{f.count}</span>
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid lg:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <Card key={item.title} item={item} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
