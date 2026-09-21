"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import ShotCarousel from "@/components/ShotCarousel";
import DetailSections from "@/components/DetailSections";
import Lightbox from "@/components/Lightbox";
import type { Project, Career } from "@/lib/constants";
import TechBadge from "@/components/TechBadge";

const CATEGORY_LABEL = { company: "회사 프로젝트", personal: "개인 프로젝트" } as const;
const CATEGORY_DOT = { company: "bg-ice-500", personal: "bg-emerald-400" } as const;
const CATEGORY_STYLE = {
  company: "border border-slate-800 bg-slate-950 text-slate-300",
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
  const lead = project.shots?.[0];
  const rest = project.shots?.slice(1) ?? [];
  const shots = project.shots ?? [];
  const [zoom, setZoom] = useState<number | null>(null);

  return (
    <main className="landing min-h-screen">
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
          {/* 상세에 들어오면 나갈 길이 뒤로가기뿐이라 홈으로 가는 문을 둔다 */}
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-slate-400 transition-colors hover:text-ice-400"
          >
            {SITE.name}
          </Link>
        </div>
      </nav>

      {/* ── 여는 면 ──
          팜플렛 표지처럼 표제를 오른쪽으로 몰고, 그 아래를 두 단으로 나눈다.
          왼쪽은 판권면처럼 사실만, 오른쪽은 무엇을 만들었는지. 한 화면에서 끝난다. */}
      <section className="flex min-h-[100svh] items-center px-6 pt-28 pb-16">
        <div className="mx-auto w-full max-w-5xl">
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium ${CATEGORY_STYLE[project.category]}`}
              >
                <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${CATEGORY_DOT[project.category]}`} />
                {CATEGORY_LABEL[project.category]}
              </span>
            </div>
            <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="mt-4 text-lg font-medium leading-snug text-ice-500 sm:text-xl">
              {project.subtitle}
            </p>
          </motion.header>

          {/* 표제와 본문을 가르는 선 — 오른쪽에서 왼쪽으로 옅어진다 */}
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
            className="my-9 h-px w-full bg-gradient-to-r from-ice-500/60 via-slate-700 to-transparent lg:my-12"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="grid gap-10 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:gap-14"
          >
            {/* 판권면 — 누가, 언제, 무엇을 맡았는지 */}
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 self-start sm:grid-cols-3 lg:grid-cols-1 lg:border-r lg:border-slate-800 lg:pr-10">
              <div>
                <dt className="mb-1.5 text-[11px] font-semibold tracking-[0.06em] text-slate-500">
                  맡은 일
                </dt>
                <dd className="text-[13px] leading-relaxed text-slate-200">{project.role}</dd>
              </div>
              <div>
                <dt className="mb-1.5 text-[11px] font-semibold tracking-[0.06em] text-slate-500">
                  기간
                </dt>
                <dd className="font-mono text-[13px] text-slate-200">{project.period}</dd>
              </div>
              <div>
                <dt className="mb-1.5 text-[11px] font-semibold tracking-[0.06em] text-slate-500">
                  소속
                </dt>
                <dd className="text-[13px] leading-relaxed text-slate-200">
                  {project.company ?? project.org}
                  {project.team && <span className="block text-slate-400">{project.team}</span>}
                </dd>
              </div>
              {project.award && (
                <div className="col-span-2 sm:col-span-3 lg:col-span-1">
                  <dt className="mb-1.5 text-[11px] font-semibold tracking-[0.06em] text-amber-400">
                    수상
                  </dt>
                  <dd className="flex items-start gap-2 text-[13px] font-medium leading-relaxed text-amber-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden>
                      <circle cx="12" cy="8" r="6" />
                      <path d="M8.2 13.9 7 22l5-3 5 3-1.2-8.1" />
                    </svg>
                    {project.award}
                  </dd>
                </div>
              )}
            </dl>

            {/* 본문 — 첫 문단을 한 단 크게 잡아 들어가는 문이 되게 */}
            <div>
              <h2 className="mb-6 text-xl font-bold tracking-tight text-slate-50 sm:text-2xl">
                무엇을 만들었나
              </h2>
              <div className="space-y-4">
                {toParagraphs(project.overview).map((para, i) => (
                  <p
                    key={para}
                    className={
                      i === 0
                        ? "text-[19px] leading-[1.75] text-slate-200"
                        : "text-[17px] leading-[1.85] text-slate-300"
                    }
                  >
                    <Marked text={para} subtle />
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-12 flex items-center gap-2 font-mono text-[11px] text-slate-500"
          >
            아래로
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M8 3v10M4 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.p>
        </div>
      </section>

      {/* 여는 면 바로 다음 한 장 — 글로 읽은 것을 눈으로 확인하는 자리 */}
      {(lead || project.awardImage) && (
        <ScrollSection className="pb-24">
          <div className="mx-auto grid max-w-5xl items-end gap-6 px-6 lg:grid-cols-[minmax(0,1fr)_auto]">
            {lead && (
              <figure>
                <button
                  type="button"
                  onClick={() => setZoom(0)}
                  aria-label="대표 화면 크게 보기"
                  className="group block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={lead.src}
                    alt={lead.caption}
                    className="w-full transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </button>
                <figcaption className="mt-3 text-xs leading-relaxed text-slate-500">
                  {lead.caption}
                </figcaption>
              </figure>
            )}
            {project.awardImage && (
              <figure className={lead ? "lg:w-60" : "mx-auto max-w-md"}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.awardImage}
                  alt={project.award ?? "수상"}
                  loading="lazy"
                  className="w-full rounded-xl border border-amber-400/25"
                />
                <figcaption className="mt-3 text-xs leading-relaxed text-slate-500">
                  {project.award}
                </figcaption>
              </figure>
            )}
          </div>
        </ScrollSection>
      )}

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 space-y-28">
          {/* 요약은 앞의 넷만 펼쳐 두고 나머지는 접는다 — 전부 같은 무게로 쌓이면 안 읽힌다 */}
          <ScrollSection>
            <h2 className="mb-8 text-xl font-bold tracking-tight text-slate-50 sm:text-2xl">
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

          {rest.length > 0 && (
            <ScrollSection>
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl font-bold tracking-tight text-slate-50 sm:text-2xl">화면</h2>
                <p className="text-xs text-slate-500">좌우로 넘겨 보실 수 있습니다</p>
              </div>
              <ShotCarousel
                shots={rest}
                phone={project.shotsLayout === "phone"}
                onOpen={(i) => setZoom(i + 1)}
              />
              <p className="mt-6 text-xs leading-relaxed text-slate-500">
                {project.shotsNote ??
                  "실제 운영 화면입니다. 손님·직원의 이름과 CCTV에 잡힌 이용객은 알아볼 수 없게 처리했고, 내부 접속 주소는 잘라냈습니다."}
              </p>
            </ScrollSection>
          )}

          {project.sections && project.sections.length > 0 && (
            <ScrollSection>
              <DetailSections
                sections={project.sections}
                renderItem={(item) => <Bullet text={item} />}
              />
            </ScrollSection>
          )}

          {project.learned && project.learned.length > 0 && (
            <ScrollSection>
              <h2 className="mb-2 text-xl font-bold tracking-tight text-slate-50 sm:text-2xl">
                이 프로젝트에서 배운 것
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-slate-400">
                끝난 뒤에 남은 것들을 적었습니다.
              </p>
              <ol className="divide-y divide-slate-800/60 border-y border-slate-800/60">
                {project.learned.map((item, i) => {
                  const [head, ...body] = item.split(" — ");
                  const text = body.join(" — ");
                  return (
                    <li
                      key={item}
                      className="grid gap-x-8 gap-y-2 py-7 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]"
                    >
                      <p className="flex items-baseline gap-3">
                        <span className="font-mono text-xs font-semibold tabular-nums text-ice-500">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-base font-bold tracking-tight text-slate-100">
                          {text ? head : "배운 것"}
                        </span>
                      </p>
                      <p className="max-w-[38rem] text-[16px] leading-[1.9] text-slate-300">
                        <Marked text={text || head} subtle />
                      </p>
                    </li>
                  );
                })}
              </ol>
            </ScrollSection>
          )}

          <ScrollSection>
            <h2 className="mb-7 text-xl font-bold tracking-tight text-slate-50 sm:text-2xl">쓴 기술</h2>
            <div className="flex flex-wrap gap-2">
              {project.techs.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </ScrollSection>

          {project.links && project.links.length > 0 && (
            <ScrollSection>
              <h2 className="mb-7 text-xl font-bold tracking-tight text-slate-50 sm:text-2xl">링크</h2>
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
            <h2 className="mb-7 text-xl font-bold tracking-tight text-slate-50 sm:text-2xl">
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
                <p className="text-xs text-slate-600 mb-0.5">이전</p>
                <p className="group-hover:text-ice-400">{prevProject.title}</p>
              </div>
            </Link>
          ) : <div />}
          {nextProject ? (
            <Link href={`/projects/${nextProject.slug}`} className="group flex items-center gap-3 text-sm text-slate-400 hover:text-ice-400 transition-colors text-right">
              <div>
                <p className="text-xs text-slate-600 mb-0.5">다음</p>
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

      {zoom !== null && (
        <Lightbox
          shots={shots}
          index={zoom}
          onIndex={setZoom}
          onClose={() => setZoom(null)}
        />
      )}
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
          <p className="text-sm leading-relaxed text-slate-400">
            <Marked text={desc} />
          </p>
        </>
      ) : (
        <p className="text-sm leading-relaxed text-slate-300">
          <Marked text={title} />
        </p>
      )}
    </div>
  );
}

/**
 * 문장에서 "재어 본 값"만 형광펜으로 집는다.
 * 단위가 붙은 수치만 고른다 — 아무 숫자나 칠하면 형광펜이 배경색이 된다.
 */
const MEASURE =
  /(\d[\d,.]*\s?(?:커밋|개월|개|건|명|줄|파일|편|배|ms|초|분|시간|일|주|년|KB|MB|GB|LOC|%|px))/g;

function Marked({ text, subtle = false }: { text: string; subtle?: boolean }) {
  const parts = text.split(MEASURE);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          // 긴 문단에서 형광펜을 여러 번 치면 얼룩처럼 보인다.
          // 문단은 굵게만, 짧은 항목에서만 형광펜을 쓴다.
          subtle ? (
            <strong key={i} className="font-semibold text-slate-100">
              {part}
            </strong>
          ) : (
            <mark
              key={i}
              className="rounded bg-ice-100 px-1 py-0.5 font-semibold text-ice-500 [box-decoration-break:clone]"
            >
              {part}
            </mark>
          )
        ) : (
          part
        )
      )}
    </>
  );
}

/**
 * 개요는 한 문단으로 들어오는데, 대여섯 문장이 이어지면 눈이 미끄러진다.
 * 두 문장씩 끊어 문단으로 나눈다. 원문은 건드리지 않는다.
 */
function toParagraphs(text: string, per = 2): string[] {
  const parts = text.match(/[^.]+\.(?:\s|$)/g) ?? [text];
  const out: string[] = [];
  for (let i = 0; i < parts.length; i += per) {
    out.push(parts.slice(i, i + per).join("").trim());
  }
  return out.filter(Boolean);
}
