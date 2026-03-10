"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { CAREERS } from "@/lib/constants";
import type { Career } from "@/lib/constants";
import TechBadge from "./TechBadge";

const TYPE_STYLE = {
  "full-time": { label: "정규직", color: "bg-ice-500/15 text-ice-400 border-ice-500/25" },
  intern: { label: "인턴", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  education: { label: "교육", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
} as const;

function CareerCard({ career, index }: { career: Career; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const style = TYPE_STYLE[career.type];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <Link
        href={`/career/${index}`}
        className="group block p-6 rounded-2xl border border-slate-800/60 bg-slate-900/30 hover:border-ice-500/20 hover:bg-slate-900/50 transition-all duration-300"
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h3 className="text-lg font-bold text-slate-100 group-hover:text-ice-300 transition-colors">
                {career.company}
              </h3>
              {career.team && (
                <span className="text-[10px] font-medium tracking-wider px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/40">
                  {career.team}
                </span>
              )}
              <span className={`text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full border ${style.color}`}>
                {style.label}
              </span>
            </div>
            <p className="text-sm text-ice-400/80 font-medium">{career.role}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono text-slate-500">{career.period}</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-600 group-hover:text-ice-400 transition-colors">
              <path d="M5 3l6 6-6 6" />
            </svg>
          </div>
        </div>

        <p className="text-xs text-slate-500 font-mono mb-3">{career.chapter}</p>
        <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">{career.summary}</p>

        <div className="flex flex-wrap gap-1.5">
          {career.techs.slice(0, 6).map((tech) => (
            <TechBadge key={tech} name={tech} size="sm" />
          ))}
          {career.techs.length > 6 && (
            <span className="text-xs text-slate-500 self-center ml-1">+{career.techs.length - 6}</span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="career" className="relative py-32 mesh-bg" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold tracking-tight text-slate-100 mb-4"
        >
          Career
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-px w-16 bg-ice-500 origin-left mb-6"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm text-slate-500 mb-14"
        >
          최근부터 시작까지, 한 단계씩 깊어진 성장의 기록
        </motion.p>

        <div className="space-y-4">
          {CAREERS.map((career, i) => (
            <CareerCard key={career.company} career={career} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
