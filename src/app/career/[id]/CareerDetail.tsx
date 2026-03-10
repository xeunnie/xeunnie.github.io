"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Career } from "@/lib/constants";
import TechBadge from "@/components/TechBadge";

const TYPE_STYLE = {
  "full-time": { label: "정규직", color: "bg-ice-500/15 text-ice-400 border-ice-500/25" },
  intern: { label: "인턴", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  education: { label: "교육", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
} as const;

interface Props {
  career: Career;
  prev: { id: number; name: string } | null;
  next: { id: number; name: string } | null;
}

export default function CareerDetail({ career, prev, next }: Props) {
  const style = TYPE_STYLE[career.type];

  return (
    <main className="min-h-screen bg-slate-950">
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-white/5">
        <div className="mx-auto max-w-4xl px-6 h-16 flex items-center justify-between">
          <Link
            href="/#career"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-ice-400 transition-colors"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 3L5 9l6 6" />
            </svg>
            Home
          </Link>
        </div>
      </nav>

      <section className="pt-32 pb-16 mesh-bg">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full border ${style.color}`}>
                {style.label}
              </span>
              <span className="text-xs font-mono text-slate-500">{career.period}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-50 mb-3">
              {career.company}
            </h1>
            <p className="text-lg text-ice-400/80 font-medium mb-2">{career.role}</p>
            <p className="text-sm font-mono text-slate-500">{career.chapter}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-6">Overview</h2>
            <p className="text-base text-slate-300 leading-relaxed">{career.summary}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-6">Details</h2>
            <ul className="space-y-4">
              {career.details.map((d, i) => (
                <motion.li
                  key={d}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-ice-500 shrink-0" />
                  <span className="text-sm text-slate-300 leading-relaxed">{d}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {career.projects && career.projects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h2 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-6">참여 프로젝트</h2>
              <div className="flex flex-wrap gap-2">
                {career.projects.map((p) => (
                  <span
                    key={p}
                    className="text-sm px-3 py-1.5 rounded-lg bg-slate-800/60 text-slate-300 border border-slate-700/40"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-6">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {career.techs.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-slate-800/60 py-12">
        <div className="mx-auto max-w-4xl px-6 flex justify-between items-center">
          {prev ? (
            <Link
              href={`/career/${prev.id}`}
              className="group flex items-center gap-3 text-sm text-slate-400 hover:text-ice-400 transition-colors"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 3L5 9l6 6" />
              </svg>
              <div>
                <p className="text-xs text-slate-600 mb-0.5">이전</p>
                <p className="group-hover:text-ice-400">{prev.name}</p>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              href={`/career/${next.id}`}
              className="group flex items-center gap-3 text-sm text-slate-400 hover:text-ice-400 transition-colors text-right"
            >
              <div>
                <p className="text-xs text-slate-600 mb-0.5">다음</p>
                <p className="group-hover:text-ice-400">{next.name}</p>
              </div>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 3l6 6-6 6" />
              </svg>
            </Link>
          ) : <div />}
        </div>
      </section>

      <footer className="border-t border-slate-800/60 py-8 text-center">
        <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Seungeun Choi</p>
      </footer>
    </main>
  );
}
