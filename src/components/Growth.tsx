"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GROWTH } from "@/lib/constants";
import type { GrowthStage } from "@/lib/constants";
import TechBadge from "./TechBadge";

function Stage({ stage, index }: { stage: GrowthStage; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const last = index === GROWTH.length - 1;

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="relative pl-8 sm:pl-12 pb-12 last:pb-0"
    >
      {/* 세로선 */}
      {!last && (
        <span
          aria-hidden
          className="absolute left-[5px] sm:left-[7px] top-4 bottom-0 w-px bg-gradient-to-b from-ice-500/40 to-slate-800/60"
        />
      )}
      {/* 점 */}
      <span
        aria-hidden
        className={`absolute left-0 top-2 h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 rounded-full border-2 ${
          last ? "border-ice-400 bg-ice-500/40" : "border-slate-700 bg-slate-950"
        }`}
      />

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
        <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-ice-400">
          {stage.phase}
        </span>
        <span className="font-mono text-xs text-slate-500">{stage.period}</span>
        <span className="text-xs text-slate-400">{stage.where}</span>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-slate-50 leading-snug mb-4">
        {stage.title}
      </h3>

      <ul className="space-y-1.5 mb-5">
        {stage.did.map((d) => (
          <li key={d} className="relative pl-4 text-sm text-slate-300 leading-relaxed">
            <span aria-hidden className="absolute left-0 text-slate-600">
              –
            </span>
            {d}
          </li>
        ))}
      </ul>

      <div className="rounded-xl border border-ice-500/15 bg-ice-100 p-4 mb-4">
        <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-ice-400 mb-2">
          그 전과 달라진 것
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">{stage.shift}</p>
      </div>

      <div className="mb-5">
        <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-slate-500 mb-2.5">
          탑재한 능력
        </p>
        <ul className="flex flex-wrap gap-2">
          {stage.gained.map((g) => (
            <li
              key={g}
              className="inline-flex items-start gap-1.5 rounded-lg border border-slate-800/70 bg-slate-900/40 px-3 py-1.5 text-xs text-slate-300 leading-relaxed"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 shrink-0 text-ice-500"
                aria-hidden
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {g}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {stage.techs.map((t) => (
          <TechBadge key={t} name={t} size="sm" />
        ))}
      </div>
    </motion.li>
  );
}

export default function Growth() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="growth" className="relative py-24 border-t border-slate-800/40" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-50 mb-4">성장 흐름</h2>
          <div className="h-px w-16 bg-ice-500 mb-6" />
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            &ldquo;무엇을 했는가&rdquo;가 아니라 &ldquo;무엇을 할 수 있게 됐는가&rdquo;로 정리했습니다.
            각 단계의 <span className="text-ice-400">그 전과 달라진 것</span>이 이전 단계에는 없던
            능력입니다.
          </p>
        </motion.div>

        <ol className="max-w-3xl">
          {GROWTH.map((stage, i) => (
            <Stage key={stage.period} stage={stage} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
