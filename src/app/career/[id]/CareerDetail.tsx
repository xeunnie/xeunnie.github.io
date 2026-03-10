"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import type { Career } from "@/lib/constants";
import TechBadge from "@/components/TechBadge";

const TYPE_STYLE = {
  "full-time": { label: "정규직", color: "bg-ice-500/15 text-ice-400 border-ice-500/25" },
  intern: { label: "인턴", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  education: { label: "교육", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
} as const;

function ScrollSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

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
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full border ${style.color}`}>
                {style.label}
              </span>
              {career.team && (
                <span className="text-[10px] font-medium tracking-wider px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-400 border border-slate-700/40">
                  {career.team}
                </span>
              )}
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
        <div className="mx-auto max-w-4xl px-6 space-y-20">
          <ScrollSection>
            <h2 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-6">Overview</h2>
            <p className="text-base text-slate-300 leading-relaxed">{career.summary}</p>
          </ScrollSection>

          <ScrollSection>
            <h2 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-8">What I Did</h2>
            <div className="space-y-6">
              {career.details.map((d, i) => {
                const [title, ...rest] = d.split(" — ");
                const desc = rest.join(" — ");
                return (
                  <motion.div
                    key={d}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="relative pl-6 border-l-2 border-ice-500/20 hover:border-ice-500/50 transition-colors"
                  >
                    <span className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-ice-500" />
                    {desc ? (
                      <>
                        <p className="text-sm font-semibold text-slate-200 mb-1">{title}</p>
                        <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
                      </>
                    ) : (
                      <p className="text-sm text-slate-300 leading-relaxed">{title}</p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </ScrollSection>

          {career.projects && career.projects.length > 0 && (
            <ScrollSection>
              <h2 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-6">Projects</h2>
              <div className="flex flex-wrap gap-2">
                {career.projects.map((p, i) => (
                  <motion.span
                    key={p}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="text-sm px-4 py-2 rounded-xl bg-slate-800/60 text-slate-300 border border-slate-700/40 hover:border-ice-500/30 hover:text-ice-400 transition-all"
                  >
                    {p}
                  </motion.span>
                ))}
              </div>
            </ScrollSection>
          )}

          <ScrollSection>
            <h2 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-6">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {career.techs.map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <TechBadge name={tech} />
                </motion.div>
              ))}
            </div>
          </ScrollSection>
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
                <p className="text-xs text-slate-600 mb-0.5">Prev</p>
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
                <p className="text-xs text-slate-600 mb-0.5">Next</p>
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
