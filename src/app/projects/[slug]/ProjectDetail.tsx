"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import type { Project, Career } from "@/lib/constants";
import TechBadge from "@/components/TechBadge";
import ViewCounter from "@/components/ViewCounter";

const CATEGORY_LABEL = { company: "Company Project", personal: "Personal Project" } as const;
const CATEGORY_STYLE = {
  company: "bg-ice-100 text-ice-400 border border-ice-500/20",
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
  related: Project[];
  career: { index: number; career: Career } | null;
}

export default function ProjectDetail({
  project,
  prevProject,
  nextProject,
  related,
  career,
}: Props) {
  return (
    <main className="min-h-screen">
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-white/5">
        <div className="mx-auto max-w-4xl px-6 h-16 flex items-center justify-between">
          <Link
            href="/projects"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-ice-400 transition-colors"
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 3L5 9l6 6" />
            </svg>
            프로젝트 목록
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
              {!project.company && project.org && (
                <span className="text-xs text-slate-500">{project.org}</span>
              )}
              <span className="text-xs font-mono text-slate-500">{project.period}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-50 mb-3">{project.title}</h1>
            <p className="text-lg text-ice-400 font-medium mb-2">{project.subtitle}</p>
            <p className="text-sm font-mono text-slate-500">Role: {project.role}</p>
            {project.award && (
              <div className="mt-6 inline-flex items-start gap-3 rounded-xl border border-amber-400/25 bg-amber-400/[0.07] px-5 py-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-amber-300" aria-hidden>
                  <circle cx="12" cy="8" r="6" />
                  <path d="M8.2 13.9 7 22l5-3 5 3-1.2-8.1" />
                </svg>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-amber-300/80 mb-1">
                    Award
                  </p>
                  <p className="text-base font-semibold text-amber-400">{project.award}</p>
                  {project.awardImage && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={project.awardImage}
                      alt={project.award}
                      className="mt-4 max-w-sm w-full rounded-lg border border-amber-400/20"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 space-y-20">
          {/* 맥락 먼저 — 무엇을 왜 만들었는지 */}
          <ScrollSection>
            <h2 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-6">Overview</h2>
            <p className="text-base text-slate-300 leading-relaxed">{project.overview}</p>
          </ScrollSection>

          {/* 요약은 앞의 넷만 펼쳐 두고 나머지는 접는다 — 전부 같은 무게로 쌓이면 안 읽힌다 */}
          <ScrollSection>
            <h2 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-8">
              이 프로젝트의 핵심
            </h2>
            <div className="space-y-5">
              {project.highlights.slice(0, 4).map((h) => (
                <Bullet key={h} text={h} lead />
              ))}
            </div>
            {project.highlights.length > 4 && (
              <details className="group mt-6">
                <summary className="inline-flex cursor-pointer select-none items-center gap-1.5 text-sm text-slate-400 hover:text-ice-400 transition-colors [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">
                    나머지 {project.highlights.length - 4}개 더 보기
                  </span>
                  <span className="hidden group-open:inline">접기</span>
                </summary>
                <div className="mt-5 space-y-5">
                  {project.highlights.slice(4).map((h) => (
                    <Bullet key={h} text={h} lead />
                  ))}
                </div>
              </details>
            )}
          </ScrollSection>

          {project.shots && project.shots.length > 0 && (
            <ScrollSection>
              <h2 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-6">
                Screens
              </h2>
              {/* 세로 캡처는 한 장씩 전폭으로 두면 화면 몇 개 분량이 되므로 격자로 */}
              <div
                className={
                  project.shotsLayout === "phone"
                    ? "grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-8"
                    : "flex flex-col gap-10"
                }
              >
                {project.shots.map((shot) => (
                  <figure key={shot.src}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={shot.src}
                      alt={shot.caption}
                      loading="lazy"
                      decoding="async"
                      className={`w-full border border-slate-800 bg-slate-900 ${
                        project.shotsLayout === "phone" ? "rounded-2xl" : "rounded-xl"
                      }`}
                    />
                    <figcaption
                      className={`mt-3 text-slate-400 leading-relaxed ${
                        project.shotsLayout === "phone" ? "text-xs" : "text-sm"
                      }`}
                    >
                      {shot.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
              <p className="mt-6 text-xs text-slate-500 leading-relaxed">
                {project.shotsNote ??
                  "실제 운영 화면입니다. 손님·직원의 이름과 CCTV에 잡힌 이용객은 알아볼 수 없게 처리했고, 내부 접속 주소는 잘라냈습니다."}
              </p>
            </ScrollSection>
          )}

          {/* 상세는 접어 둔다. 앞의 둘만 펼쳐 두고, 필요한 사람이 나머지를 연다 */}
          {project.sections && project.sections.length > 0 && (
            <ScrollSection>
              <h2 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-6">
                자세히
              </h2>
              <div className="space-y-3">
                {project.sections.map((section, i) => (
                  <details
                    key={section.title}
                    open={i < 2}
                    className="group rounded-xl border border-slate-800/60 bg-slate-900/25"
                  >
                    <summary className="flex cursor-pointer select-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                      <span className="text-sm font-semibold text-slate-200">{section.title}</span>
                      <span className="shrink-0 text-xs font-mono text-slate-500 group-open:text-ice-400">
                        {section.items.length}
                      </span>
                    </summary>
                    <div className="space-y-4 px-5 pb-5">
                      {section.items.map((item) => (
                        <Bullet key={item} text={item} />
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </ScrollSection>
          )}

          <ScrollSection>
            <h2 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-6">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techs.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </ScrollSection>

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
</div>
      </section>

      {(related.length > 0 || career) && (
        <section className="border-t border-slate-800/60 py-12">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-6">
              이어서 볼 것
            </h2>

            {career && (
              <Link
                href={`/career/${career.index}`}
                className="group mb-4 flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/40 px-5 py-4 transition-colors hover:border-ice-500/40"
              >
                <span>
                  <span className="block text-xs text-slate-500 mb-1">이 프로젝트를 한 자리</span>
                  <span className="text-sm font-semibold text-slate-100 group-hover:text-ice-400 transition-colors">
                    {career.career.company}
                    {career.career.team ? ` · ${career.career.team}` : ""}
                    <span className="ml-2 font-mono text-xs font-normal text-slate-500">
                      {career.career.period}
                    </span>
                  </span>
                </span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-slate-600 group-hover:text-ice-500 transition-colors" aria-hidden>
                  <path d="M5 3l5 5-5 5" />
                </svg>
              </Link>
            )}

            {related.length > 0 && (
              <>
                <p className="mb-3 text-xs text-slate-500">
                  {project.company ?? project.org}에서 한 다른 프로젝트
                </p>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/projects/${r.slug}`}
                        className="group flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/40 px-5 py-4 transition-colors hover:border-ice-500/40"
                      >
                        <span className="flex items-baseline gap-2">
                          <span className="text-sm font-semibold text-slate-100 group-hover:text-ice-400 transition-colors">
                            {r.title}
                          </span>
                          {r.group === project.group && r.group && (
                            <span className="rounded border border-ice-500/25 bg-ice-100 px-1.5 py-px font-mono text-[9px] uppercase text-ice-400">
                              같은 제품군
                            </span>
                          )}
                        </span>
                        <span className="mt-1 text-xs text-slate-400 leading-relaxed">
                          {r.subtitle}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>
      )}

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

/**
 * "제목 — 설명" 형태의 한 줄을 점 찍힌 항목으로 그린다.
 * lead 는 상단 요약용(조금 더 진하게), 그 외는 상세 항목용.
 */
function Bullet({ text, lead = false }: { text: string; lead?: boolean }) {
  const [title, ...rest] = text.split(" — ");
  const desc = rest.join(" — ");
  return (
    <div
      className={`relative pl-6 border-l-2 transition-colors ${
        lead ? "border-ice-500/20 hover:border-ice-500/50" : "border-slate-800/60 hover:border-ice-500/40"
      }`}
    >
      <span
        className={`absolute top-1.5 rounded-full ${
          lead ? "left-[-5px] h-2 w-2 bg-ice-500" : "left-[-4px] h-1.5 w-1.5 bg-ice-500/60"
        }`}
      />
      {desc ? (
        <>
          <p className={`mb-0.5 text-sm text-slate-200 ${lead ? "font-semibold" : "font-medium"}`}>
            {title}
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
        </>
      ) : (
        <p className="text-sm text-slate-300 leading-relaxed">{title}</p>
      )}
    </div>
  );
}
