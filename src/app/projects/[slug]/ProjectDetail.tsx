"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import type { Project } from "@/lib/constants";
import TechBadge from "@/components/TechBadge";
import ViewCounter from "@/components/ViewCounter";

const CATEGORY_LABEL = { company: "Company Project", personal: "Personal Project" } as const;
const CATEGORY_STYLE = {
  company: "bg-ice-500/10 text-ice-400 border border-ice-500/20",
  personal: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
} as const;

function ScrollSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface Props {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

export default function ProjectDetail({ project, prevProject, nextProject }: Props) {
  return (
    <main className="min-h-screen bg-slate-950">
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-white/5">
        <div className="mx-auto max-w-4xl px-6 h-16 flex items-center justify-between">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-ice-400 transition-colors"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 3L5 9l6 6" />
            </svg>
            Home
          </Link>
          <ViewCounter slug={project.slug} />
        </div>
      </nav>

      <section className="pt-32 pb-16 mesh-bg">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full ${CATEGORY_STYLE[project.category]}`}>
                {CATEGORY_LABEL[project.category]}
              </span>
              {project.company && <span className="text-xs text-slate-500">@ {project.company}</span>}
              <span className="text-xs font-mono text-slate-500">{project.period}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-50 mb-3">{project.title}</h1>
            <p className="text-lg text-ice-400/80 font-medium mb-2">{project.subtitle}</p>
            <p className="text-sm font-mono text-slate-500">Role: {project.role}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 space-y-20">
          <ScrollSection>
            <h2 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-6">Overview</h2>
            <p className="text-base text-slate-300 leading-relaxed">{project.overview}</p>
          </ScrollSection>

          <ScrollSection>
            <h2 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-6">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techs.map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                >
                  <TechBadge name={tech} />
                </motion.div>
              ))}
            </div>
          </ScrollSection>

          <ScrollSection>
            <h2 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-8">Key Highlights</h2>
            <div className="space-y-5">
              {project.highlights.map((h, i) => {
                const [title, ...rest] = h.split(" — ");
                const desc = rest.join(" — ");
                return (
                  <motion.div
                    key={h}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
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

          {project.sections && project.sections.length > 0 && project.sections.map((section) => (
            <ScrollSection key={section.title}>
              <h2 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-8">{section.title}</h2>
              <div className="space-y-4">
                {section.items.map((item, i) => {
                  const [title, ...rest] = item.split(" — ");
                  const desc = rest.join(" — ");
                  return (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="relative pl-6 border-l-2 border-slate-800/60 hover:border-ice-500/40 transition-colors"
                    >
                      <span className="absolute left-[-4px] top-1.5 w-1.5 h-1.5 rounded-full bg-ice-500/60" />
                      {desc ? (
                        <>
                          <p className="text-sm font-medium text-slate-200 mb-0.5">{title}</p>
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
          ))}

          {project.links && project.links.length > 0 && (
            <ScrollSection>
              <h2 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-6">Links</h2>
              <div className="flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-800/60 bg-slate-900/30 text-sm text-slate-300 hover:border-ice-500/30 hover:text-ice-400 transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    {link.label}
                  </a>
                ))}
              </div>
            </ScrollSection>
          )}

          <ScrollSection>
            <h2 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-6">Screenshots</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {Array.from({ length: project.imageCount ?? 2 }, (_, i) => (
                <div key={i} className="aspect-video rounded-xl bg-slate-900/50 border border-slate-800/60 flex items-center justify-center">
                  <p className="text-xs text-slate-600">이미지 추가 예정</p>
                </div>
              ))}
            </div>
          </ScrollSection>
        </div>
      </section>

      <section className="border-t border-slate-800/60 py-12">
        <div className="mx-auto max-w-4xl px-6 flex justify-between items-center">
          {prevProject ? (
            <Link href={`/projects/${prevProject.slug}`} className="group flex items-center gap-3 text-sm text-slate-400 hover:text-ice-400 transition-colors">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 3L5 9l6 6" /></svg>
              <div>
                <p className="text-xs text-slate-600 mb-0.5">Prev</p>
                <p className="group-hover:text-ice-400">{prevProject.title}</p>
              </div>
            </Link>
          ) : <div />}
          {nextProject ? (
            <Link href={`/projects/${nextProject.slug}`} className="group flex items-center gap-3 text-sm text-slate-400 hover:text-ice-400 transition-colors text-right">
              <div>
                <p className="text-xs text-slate-600 mb-0.5">Next</p>
                <p className="group-hover:text-ice-400">{nextProject.title}</p>
              </div>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 3l6 6-6 6" /></svg>
            </Link>
          ) : <div />}
        </div>
      </section>

      <footer className="border-t border-slate-800/60 py-8 text-center">
        <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} {SITE.name}</p>
      </footer>
    </main>
  );
}
