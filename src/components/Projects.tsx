"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/constants";
import type { Project } from "@/lib/constants";
import TechBadge from "./TechBadge";
import ViewCounter from "./ViewCounter";

const CATEGORY_STYLE = {
  company: { label: "Company", color: "bg-ice-500/10 text-ice-400 border-ice-500/20" },
  personal: { label: "Personal", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
} as const;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const style = CATEGORY_STYLE[project.category];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block relative rounded-2xl border border-slate-800/60 bg-slate-900/20 hover:border-ice-500/20 hover:bg-slate-900/40 transition-all duration-500 overflow-hidden"
      >
        <div className="absolute inset-0 bg-ice-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-xs text-ice-500 tracking-widest">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={`text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full border ${style.color}`}>
                  {style.label}
                </span>
                {project.company && (
                  <span className="text-xs text-slate-500">@ {project.company}</span>
                )}
                <span className="text-xs text-slate-600">{project.period}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-100 group-hover:text-ice-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-ice-400/80 font-medium mt-1">{project.subtitle}</p>
            </div>
            <ViewCounter slug={project.slug} />
          </div>

          <p className="text-xs font-mono text-slate-500 mb-3">Role: {project.role}</p>
          <p className="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-2">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techs.slice(0, 6).map((tech) => (
              <TechBadge key={tech} name={tech} size="sm" />
            ))}
            {project.techs.length > 6 && (
              <span className="text-xs text-slate-500 self-center ml-1">+{project.techs.length - 6}</span>
            )}
          </div>

          <span className="inline-flex items-center gap-2 text-sm font-medium text-ice-400 group-hover:text-ice-300 transition-colors">
            자세히 보기
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 3l6 6-6 6" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

function CompactCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const style = CATEGORY_STYLE[project.category];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block p-5 rounded-2xl border border-slate-800/60 bg-slate-900/20 hover:border-ice-500/20 hover:bg-slate-900/40 transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className={`text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full border ${style.color}`}>
                {style.label}
              </span>
              <span className="text-xs text-slate-600">{project.period}</span>
            </div>
            <h4 className="text-lg font-bold text-slate-100 group-hover:text-ice-300 transition-colors">
              {project.title}
            </h4>
            <p className="text-xs text-ice-400/80 font-medium mt-0.5">{project.subtitle}</p>
          </div>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-600 group-hover:text-ice-400 transition-colors mt-2 shrink-0">
            <path d="M5 3l6 6-6 6" />
          </svg>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed mb-3 line-clamp-1">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.techs.slice(0, 5).map((tech) => (
            <TechBadge key={tech} name={tech} size="sm" />
          ))}
          {project.techs.length > 5 && (
            <span className="text-xs text-slate-500 self-center ml-1">+{project.techs.length - 5}</span>
          )}
        </div>
      </Link>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [showMore, setShowMore] = useState(false);

  const featured = PROJECTS.filter((p) => p.featured);
  const additional = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-32" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold tracking-tight text-slate-100 mb-4"
        >
          Projects
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-px w-16 bg-ice-500 origin-left mb-16"
        />

        <h3 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-6">Featured</h3>
        <div className="space-y-6 mb-12">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {additional.length > 0 && (
          <div>
            <button
              onClick={() => setShowMore(!showMore)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-800/60 bg-slate-900/30 text-sm text-slate-400 hover:border-ice-500/20 hover:text-ice-400 transition-all"
            >
              More Projects ({additional.length})
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`transition-transform duration-300 ${showMore ? "rotate-180" : ""}`}
              >
                <path d="M3 5l4 4 4-4" />
              </svg>
            </button>

            <AnimatePresence>
              {showMore && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    {additional.map((project, i) => (
                      <CompactCard key={project.slug} project={project} index={i} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
