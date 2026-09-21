"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/constants";
import type { Project } from "@/lib/constants";
import TechBadge from "./TechBadge";

const CATEGORY_STYLE = {
  company: { label: "회사", color: "border-slate-800 bg-slate-950 text-slate-300", dot: "bg-ice-500" },
  personal: { label: "개인", color: "border-emerald-500/20 bg-slate-950 text-slate-300", dot: "bg-emerald-400" },
} as const;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const style = CATEGORY_STYLE[project.category];
  const shot = project.shots?.[0];
  const flip = index % 2 === 1; // 좌우를 번갈아 두면 카드가 세 장 쌓여도 지루하지 않다

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group grid items-center gap-8 rounded-3xl border border-slate-800/60 bg-slate-950 p-6 transition-all duration-300 hover:border-ice-500/25 hover:shadow-[0_14px_40px_rgb(15_23_42_/_0.09)] sm:p-8 md:grid-cols-2 md:gap-12"
      >
        <div className={flip ? "md:order-2" : ""}>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm font-semibold text-ice-500">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${style.color}`}
            >
              <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
              {style.label}
            </span>
            {project.company && <span className="text-xs text-slate-400">{project.company}</span>}
            <span className="text-xs text-slate-500">{project.period}</span>
          </div>

          <h3 className="text-2xl font-bold leading-tight tracking-tight text-slate-50 transition-colors group-hover:text-ice-500 sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-2 text-sm font-medium text-ice-400">{project.subtitle}</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">{project.description}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.techs.slice(0, 5).map((tech) => (
              <TechBadge key={tech} name={tech} size="sm" />
            ))}
            {project.techs.length > 5 && (
              <span className="self-center text-xs text-slate-500">
                +{project.techs.length - 5}
              </span>
            )}
          </div>

          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ice-500 transition-all group-hover:gap-3">
            자세히 보기
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 3l5 5-5 5" />
            </svg>
          </span>
        </div>

        {/* 이미지가 있으면 화면을, 없으면 번호를 크게 — 빈 액자를 두지 않는다 */}
        <div
          className={`overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 ${
            flip ? "md:order-1" : ""
          }`}
        >
          {shot ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={shot.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex aspect-[4/3] w-full items-center justify-center">
              <span className="font-mono text-7xl font-bold text-slate-800 transition-colors group-hover:text-ice-500/30">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          )}
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
    <section id="projects" className="relative flex min-h-screen items-center py-28" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-end justify-between gap-4 mb-4"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-50">대표 작업 셋</h2>
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
