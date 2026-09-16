"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/constants";
import type { Project } from "@/lib/constants";
import TechBadge from "./TechBadge";

const CATEGORY_STYLE = {
  company: { label: "Company", color: "bg-ice-100 text-ice-400 border-ice-500/20" },
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
      whileHover={{ y: -6 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block relative rounded-2xl border border-slate-800/60 bg-slate-900/20 hover:border-ice-500/20 hover:bg-slate-900/40 card-hover transition-all duration-500 overflow-hidden"
      >
        <div className="absolute inset-0 bg-ice-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

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
                  <span className="text-xs text-slate-400">@ {project.company}</span>
                )}
                <span className="text-xs text-slate-500">{project.period}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-50 group-hover:text-ice-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-ice-400 font-medium mt-1">{project.subtitle}</p>
            </div>
          </div>

          <p className="text-xs font-mono text-slate-400 mb-3">Role: {project.role}</p>
          <p className="text-sm text-slate-300 leading-relaxed mb-5">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techs.slice(0, 6).map((tech) => (
              <TechBadge key={tech} name={tech} size="sm" />
            ))}
            {project.techs.length > 6 && (
              <span className="text-xs text-slate-500 self-center ml-1">+{project.techs.length - 6}</span>
            )}
          </div>

          <span className="inline-flex items-center gap-2 text-sm font-medium text-ice-400 group-hover:gap-3 transition-all">
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

/** 홈에 놓이는 미리보기. 전체 목록은 /projects 가 담당한다. */
export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const featured = [...PROJECTS]
    .sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999))
    .slice(0, 3);
  const rest = PROJECTS.length - featured.length;

  return (
    <section id="projects" className="relative py-28" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-end justify-between gap-4 mb-4"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-50">Featured Work</h2>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-ice-400 hover:gap-3 transition-all"
          >
            전체 {PROJECTS.length}개 보기
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 3l6 6-6 6" />
            </svg>
          </Link>
        </motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-px w-16 bg-ice-500 origin-left mb-12"
        />

        <div className="space-y-6">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {rest > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 text-sm text-slate-500"
          >
            이 외에 {rest}개의 프로젝트가 더 있습니다.{" "}
            <Link href="/projects" className="text-ice-400 hover:text-ice-300 transition-colors">
              프로젝트 페이지에서 전체 보기 →
            </Link>
          </motion.p>
        )}
      </div>
    </section>
  );
}
