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

const CHAPTER_CHIP: Record<string, { keyword: string; color: string }> = {
  "운영": { keyword: "운영", color: "bg-ice-500/10 text-ice-300 border-ice-500/20" },
  "심화": { keyword: "심화", color: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
  "성장": { keyword: "성장", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  "확장": { keyword: "확장", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  "시작": { keyword: "시작", color: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
};

function getChapterChip(chapter: string) {
  const keyword = chapter.split(" — ")[0];
  return CHAPTER_CHIP[keyword] || null;
}

function CareerCard({ career, index }: { career: Career; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const style = TYPE_STYLE[career.type];
  const chip = getChapterChip(career.chapter);

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
              <h3 className="text-lg font-bold text-slate-50 group-hover:text-ice-300 transition-colors">
                {career.company}
              </h3>
              {career.team && (
                <span className="text-[10px] font-medium tracking-wider px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/40">
                  {career.team}
                </span>
              )}
              <span className={`text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full border ${style.color}`}>
                {style.label}
              </span>
              {chip && (
                <span className={`text-[10px] font-medium tracking-wider px-2 py-0.5 rounded-full border ${chip.color}`}>
                  {chip.keyword}
                </span>
              )}
            </div>
            <p className="text-sm text-ice-400/90 font-medium">{career.role}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono text-slate-400">{career.period}</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-600 group-hover:text-ice-400 transition-colors">
              <path d="M5 3l6 6-6 6" />
            </svg>
          </div>
        </div>

        <p className="text-xs text-slate-400 font-mono mb-3">{career.chapter}</p>
        <p className="text-sm text-slate-300 leading-relaxed mb-4 line-clamp-2">{career.summary}</p>

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

function GroupedCareerCard({ careers, startIndex }: { careers: Career[]; startIndex: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const company = careers[0].company;
  const period = `${careers[careers.length - 1].period.split(" — ")[0]} — ${careers[0].period.split(" — ")[1]}`;
  const allTechs = [...new Set(careers.flatMap((c) => c.techs))];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-slate-800/60 bg-slate-900/30 hover:border-ice-500/20 transition-all duration-300 overflow-hidden"
    >
      <div className="p-6 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h3 className="text-lg font-bold text-slate-50">{company}</h3>
              <span className="text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full border bg-ice-500/15 text-ice-400 border-ice-500/25">
                정규직
              </span>
            </div>
            <p className="text-sm text-slate-300">Frontend · Full-stack Developer</p>
          </div>
          <span className="text-xs font-mono text-slate-400 shrink-0">{period}</span>
        </div>
      </div>

      <div className="divide-y divide-slate-800/40">
        {careers.map((career, i) => {
          const chip = getChapterChip(career.chapter);
          return (
            <Link
              key={career.team}
              href={`/career/${startIndex + i}`}
              className="group block px-6 py-5 hover:bg-slate-900/50 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <div className="flex flex-wrap items-center gap-2">
                  {career.team && (
                    <span className="text-xs font-medium tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-200 border border-slate-700/40">
                      {career.team}
                    </span>
                  )}
                  {chip && (
                    <span className={`text-[10px] font-medium tracking-wider px-2 py-0.5 rounded-full border ${chip.color}`}>
                      {chip.keyword}
                    </span>
                  )}
                  <span className="text-xs text-ice-400/80 font-medium">{career.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500">{career.period}</span>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-600 group-hover:text-ice-400 transition-colors">
                    <path d="M5 3l6 6-6 6" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">{career.summary}</p>
            </Link>
          );
        })}
      </div>

      <div className="px-6 py-4 border-t border-slate-800/40">
        <div className="flex flex-wrap gap-1.5">
          {allTechs.slice(0, 8).map((tech) => (
            <TechBadge key={tech} name={tech} size="sm" />
          ))}
          {allTechs.length > 8 && (
            <span className="text-xs text-slate-500 self-center ml-1">+{allTechs.length - 8}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  // Group 플럭시티 careers together
  const groups: { type: "single" | "group"; careers: Career[]; startIndex: number }[] = [];
  let i = 0;
  while (i < CAREERS.length) {
    const current = CAREERS[i];
    const groupCareers = [current];
    let j = i + 1;
    while (j < CAREERS.length && CAREERS[j].company === current.company) {
      groupCareers.push(CAREERS[j]);
      j++;
    }
    if (groupCareers.length > 1) {
      groups.push({ type: "group", careers: groupCareers, startIndex: i });
    } else {
      groups.push({ type: "single", careers: [current], startIndex: i });
    }
    i = j;
  }

  return (
    <section id="career" className="relative py-32 mesh-bg" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold tracking-tight text-slate-50 mb-4"
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
          className="text-sm text-slate-400 mb-14"
        >
          최근부터 시작까지, 한 단계씩 깊어진 성장의 기록
        </motion.p>

        <div className="space-y-4">
          {groups.map((group) =>
            group.type === "group" ? (
              <GroupedCareerCard
                key={group.careers[0].company + group.startIndex}
                careers={group.careers}
                startIndex={group.startIndex}
              />
            ) : (
              <CareerCard
                key={group.careers[0].company}
                career={group.careers[0]}
                index={group.startIndex}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
