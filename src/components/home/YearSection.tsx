"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { YearBlock } from "@/lib/home";
import { HIGHLIGHTS, PLATE_NO } from "@/lib/home";
import Plate, { PlateNo } from "@/components/gallery/Plate";
import Work, { Cover } from "./Work";

const EASE = [0.16, 1, 0.3, 1] as const;

const fade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease: EASE },
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-4 text-[11px] tracking-[0.16em] text-slate-500">
      <span aria-hidden className="rule" />
      {children}
    </p>
  );
}

/**
 * 한 해.
 * 큰 연도와 그해의 한 문장 → 크게 보여 줄 프로젝트 → 작은 프로젝트 → 스터디·활동 순으로 내려간다.
 * 날짜별 기록은 접어 둔다. 다 펼쳐 두면 프로젝트보다 글이 먼저 눈에 걸린다.
 */
export default function YearSection({ block }: { block: YearBlock }) {
  const { chronicle, works, smallWorks, activities } = block;

  return (
    <section
      id={block.id}
      aria-labelledby={`${block.id}-title`}
      className="scroll-mt-16 py-32 sm:py-44"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.header {...fade} className="grid items-end gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div className="border-b border-slate-700/80 pb-6">
            <p
              aria-hidden
              className="font-serif text-[clamp(5.5rem,16vw,12rem)] leading-[0.82] tracking-[-0.02em] text-slate-50"
            >
              {chronicle.year}
            </p>
            <p className="mt-6 flex items-center justify-between text-[12px] tracking-[0.14em] text-slate-500">
              <span className="text-ice-500">{chronicle.chapter}</span>
              <span className="font-serif text-[15px] italic tracking-normal">
                {works.length + smallWorks.length > 0 ? `${works.length + smallWorks.length} works` : ""}
              </span>
            </p>
          </div>

          <div className="lg:pb-7">
            <h2
              id={`${block.id}-title`}
              className="text-[clamp(1.35rem,2.5vw,1.85rem)] font-semibold leading-[1.5] tracking-[-0.03em] text-slate-50"
            >
              <span className="sr-only">{chronicle.year}년 — </span>
              {chronicle.headline}
            </h2>
            <p className="mt-5 text-[16px] leading-[1.9] text-slate-400">{chronicle.story[0]}</p>

            <details className="group mt-6">
              <summary className="inline-flex cursor-pointer select-none items-center gap-2 text-[13px] font-medium text-slate-500 transition-colors hover:text-ice-500 [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">그해 기록 {chronicle.moments.length}건 보기</span>
                <span className="hidden group-open:inline">접기</span>
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-open:rotate-180" aria-hidden>
                  <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <ol className="mt-4 border-l border-slate-800 pl-5">
                {chronicle.moments.map((m) => (
                  <li key={m.when + m.what} className="py-1.5 text-[13px] leading-relaxed">
                    <span className="mr-3 tabular-nums text-slate-500">{m.when}</span>
                    <span className="text-slate-400">{m.what}</span>
                  </li>
                ))}
              </ol>
            </details>
          </div>
        </motion.header>

        {works.length > 0 && (
          <div className="mt-28 flex flex-col gap-32 sm:mt-36 sm:gap-48">
            {works.map((project, i) => (
              <Work
                key={project.slug}
                project={project}
                highlight={HIGHLIGHTS.has(project.slug)}
                flip={i % 2 === 1}
                no={PLATE_NO.get(project.slug)}
              />
            ))}
          </div>
        )}

        {smallWorks.length > 0 && (
          <motion.div {...fade} className="mt-32 sm:mt-40">
            <Label>작은 프로젝트</Label>
            <ul className="mt-10 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {smallWorks.map((p) => (
                <li key={p.slug} id={`work-${p.slug}`} className="scroll-mt-24">
                  <Link href={`/projects/${p.slug}`} className="group block">
                    <Plate>
                      <Cover project={p} phoneCount={2} />
                    </Plate>
                    <p className="mt-6 flex items-baseline justify-between gap-3">
                      <span className="font-semibold tracking-tight text-slate-100 transition-colors group-hover:text-ice-500">
                        {p.title}
                      </span>
                      {PLATE_NO.has(p.slug) && <PlateNo n={PLATE_NO.get(p.slug)!} className="shrink-0 text-[13px]" />}
                    </p>
                    <p className="mt-1 text-[12px] tabular-nums text-slate-500">{p.period}</p>
                    {/* 캡처 없는 카드는 이미 부제를 크게 보여 준다 */}
                    {p.shots?.length ? (
                      <p className="mt-1 text-[13px] leading-relaxed text-slate-400">{p.subtitle}</p>
                    ) : null}
                    <p className="mt-1 text-[12px] text-slate-500">{p.role}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {activities.length > 0 && (
          <motion.div {...fade} className="mt-32 sm:mt-40">
            <Label>{activities.every((a) => a.category === "leadership") ? "활동" : "스터디 · 활동"}</Label>
            <ul className="mt-8 divide-y divide-slate-800 border-y border-slate-800">
              {activities.map((a) => (
                <li key={a.name}>
                  <Link
                    href={`/activity/${a.slug}`}
                    className="group grid gap-1 py-5 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
                  >
                    <span className="font-semibold text-slate-100 transition-colors group-hover:text-ice-500">{a.name}</span>
                    <span className="line-clamp-2 text-[14px] leading-relaxed text-slate-400">
                      {a.role} — {a.highlights[0]}
                    </span>
                    <span className="text-[12px] tabular-nums text-slate-500">{a.period}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  );
}
