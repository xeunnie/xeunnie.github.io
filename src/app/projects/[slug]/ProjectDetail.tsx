"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import ShotCarousel from "@/components/ShotCarousel";
import DetailSections from "@/components/DetailSections";
import Lightbox from "@/components/Lightbox";
import type { Project, Career } from "@/lib/constants";
import TechBadge from "@/components/TechBadge";
import SiteSheet from "@/components/SiteSheet";
import Plate from "@/components/gallery/Plate";

const CATEGORY_LABEL = { company: "회사 프로젝트", personal: "개인 프로젝트" } as const;
const ROMAN = ["i", "ii", "iii"] as const;
const EASE = [0.16, 1, 0.3, 1] as const;

function ScrollSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * 한 구간 — 왼쪽 좁은 열에 짧은 장식선과 이름표, 오른쪽에 내용.
 * wide 면 이름표를 위에 두고 내용을 한 폭 전부 쓴다 (캡처 넘기기처럼 넓어야 하는 것).
 */
function Row({
  label,
  mark,
  aside,
  wide = false,
  children,
}: {
  label: string;
  /** 이름표 옆에 놓는 라틴 한 단어 — 세리프 이탤릭 */
  mark?: string;
  aside?: React.ReactNode;
  wide?: boolean;
  children: React.ReactNode;
}) {
  const head = (
    <div className="flex flex-col gap-3">
      <span aria-hidden className="rule text-slate-500" />
      <h2 className="flex items-baseline gap-3">
        <span className="text-[12px] font-medium tracking-[0.16em] text-slate-400">{label}</span>
        {mark && <span className="font-serif text-[15px] italic tracking-normal text-slate-500">{mark}</span>}
      </h2>
      {aside && <div className="text-[12px] leading-relaxed text-slate-500">{aside}</div>}
    </div>
  );

  return (
    <ScrollSection className="border-t border-slate-800 pt-12">
      {wide ? (
        <>
          <div className="mb-10">{head}</div>
          {children}
        </>
      ) : (
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[12rem_minmax(0,1fr)]">
          {head}
          <div className="min-w-0">{children}</div>
        </div>
      )}
    </ScrollSection>
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
      <nav className="glass fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href="/projects"
            className="flex items-center gap-2 text-[13px] text-slate-400 transition-colors hover:text-slate-50"
          >
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path d="M11 3L5 9l6 6" />
            </svg>
            프로젝트 목록
          </Link>
          {/* 상세에 들어오면 나갈 길이 뒤로가기뿐이라 홈으로 가는 문을 둔다 */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-[13px] font-medium tracking-tight text-slate-400 transition-colors hover:text-slate-50"
            >
              {SITE.name}
            </Link>
            <SiteSheet />
          </div>
        </div>
      </nav>

      {/* ── 제목 벽 ──
          위에 기간 한 줄, 큰 제목, 부제. 그 아래 가는 선으로 끊고
          왼쪽은 설명판(맡은 일·기간·소속·수상), 오른쪽은 무엇을 만들었는지. */}
      <section className="flex min-h-[100svh] items-end px-6 pt-36 pb-20">
        <div className="mx-auto w-full max-w-[69rem]">
          <motion.header
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="max-w-4xl"
          >
            <p className="mb-9 flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-500">
              <span className="font-serif text-[22px] italic tabular-nums tracking-normal text-slate-300">
                <Latin text={project.period} />
              </span>
              <span aria-hidden className="rule" />
              <span className="text-[12px] tracking-[0.16em]">{CATEGORY_LABEL[project.category]}</span>
            </p>
            <h1 className="text-[clamp(2.5rem,6.4vw,5rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-slate-50">
              {project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-[clamp(1.05rem,1.6vw,1.25rem)] leading-[1.6] text-slate-400">
              {project.subtitle}
            </p>
          </motion.header>

          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
            style={{ transformOrigin: "left" }}
            className="mt-16 mb-12 h-px w-full bg-slate-700/80"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: EASE }}
            className="grid gap-12 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16"
          >
            {/* 설명판 — 누가, 언제, 무엇을 맡았는지 */}
            <dl className="wall-label grid grid-cols-2 content-start gap-x-8 gap-y-6 text-[13px] leading-[1.75] sm:grid-cols-3 lg:grid-cols-1">
              <div>
                <dt className="mb-1.5">맡은 일</dt>
                <dd className="text-slate-200">{project.role}</dd>
              </div>
              <div>
                <dt className="mb-1.5">기간</dt>
                <dd className="font-serif text-[16px] tabular-nums tracking-normal text-slate-200">
                  <Latin text={project.period} />
                </dd>
              </div>
              <div>
                <dt className="mb-1.5">소속</dt>
                <dd className="text-slate-200">
                  {project.company ?? project.org}
                  {project.team && <span className="block text-slate-400">{project.team}</span>}
                </dd>
              </div>
              {project.award && (
                <div className="col-span-2 sm:col-span-3 lg:col-span-1">
                  <dt className="mb-1.5">수상</dt>
                  <dd className="text-amber-400">{project.award}</dd>
                </div>
              )}
            </dl>

            {/* 본문 — 첫 문단을 한 단 크게 잡아 들어가는 문이 되게 */}
            <div className="max-w-[44rem] space-y-5">
              {toParagraphs(project.overview).map((para, i) => (
                <p
                  key={para}
                  className={
                    i === 0
                      ? "text-[clamp(1.08rem,1.5vw,1.2rem)] leading-[1.85] text-slate-200"
                      : "text-[16px] leading-[1.95] text-slate-300"
                  }
                >
                  <Marked text={para} subtle />
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/*
        상세를 열자마자 읽혀야 하는 세 칸.
        무엇이 막혔고 · 무엇을 했고 · 어떻게 됐는지.
        상자 대신 가는 선과 로마 숫자로 나누고, 결과만 글자를 한 단 진하게.
      */}
      {project.par && (
        <section className="px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-[69rem]">
            <ol className="grid gap-x-12 gap-y-14 lg:grid-cols-3">
              {(
                [
                  { key: "problem", label: "Problem", text: project.par.problem },
                  { key: "action", label: "Action", text: project.par.action },
                  { key: "result", label: "Result", text: project.par.result },
                ] as const
              ).map((step, i) => {
                const last = step.key === "result";
                return (
                  <motion.li
                    key={step.key}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 1, delay: i * 0.12, ease: EASE }}
                    className="border-t border-slate-700/80 pt-7"
                  >
                    <h2 className="mb-6 flex items-baseline gap-3 font-serif tracking-normal">
                      <span className={`text-[28px] italic leading-none ${last ? "text-ice-500" : "text-slate-500"}`}>
                        {ROMAN[i]}.
                      </span>
                      <span className="text-[17px] italic text-slate-300">{step.label}</span>
                    </h2>
                    <p className={`text-[15px] leading-[1.95] ${last ? "text-slate-100" : "text-slate-300"}`}>
                      <Marked text={step.text} subtle={!last} />
                    </p>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </section>
      )}

      {/* 대표 화면 한 장 — 글로 읽은 것을 눈으로 확인하는 자리 */}
      {(lead || project.awardImage) && (
        <section className="px-6 pt-8 pb-28 sm:pb-36">
          <ScrollSection className="mx-auto max-w-[69rem]">
            <div
              className={`grid items-end gap-14 ${
                lead && project.awardImage ? "lg:grid-cols-[minmax(0,1fr)_16rem]" : ""
              }`}
            >
              {lead && (
                <figure className={project.shotsLayout === "phone" ? "mx-auto w-full max-w-[17rem]" : ""}>
                  <Plate>
                    <button
                      type="button"
                      onClick={() => setZoom(0)}
                      aria-label="대표 화면 크게 보기"
                      className="block w-full cursor-zoom-in"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={lead.src} alt={lead.caption} className="block w-full" />
                    </button>
                  </Plate>
                  <PlateCaption n={1}>{lead.caption}</PlateCaption>
                </figure>
              )}
              {project.awardImage && (
                <figure className={lead ? "mx-auto w-full max-w-[16rem]" : "mx-auto max-w-md"}>
                  <Plate>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.awardImage}
                      alt={project.award ?? "수상"}
                      loading="lazy"
                      className="block w-full"
                    />
                  </Plate>
                  <figcaption className="mt-5 text-[12.5px] leading-[1.75] text-slate-500">
                    {project.award}
                  </figcaption>
                </figure>
              )}
            </div>
          </ScrollSection>
        </section>
      )}

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-[69rem] space-y-28 sm:space-y-36">
          {/* 요약은 앞의 넷만 펼쳐 두고 나머지는 접는다 — 전부 같은 무게로 쌓이면 안 읽힌다 */}
          <Row label="핵심">
            <ol className="space-y-8">
              {project.highlights.slice(0, 4).map((h, i) => (
                <Numbered key={h} n={i + 1}>
                  <Bullet text={h} lead />
                </Numbered>
              ))}
            </ol>
            {project.highlights.length > 4 && (
              <details className="group mt-8">
                <summary className="inline-flex cursor-pointer select-none items-center gap-3 text-[13px] text-slate-400 transition-colors hover:text-slate-50 [&::-webkit-details-marker]:hidden">
                  <span aria-hidden className="h-px w-6 bg-current" />
                  <span className="group-open:hidden">나머지 {project.highlights.length - 4}개 더 보기</span>
                  <span className="hidden group-open:inline">접기</span>
                </summary>
                <ol className="mt-8 space-y-8">
                  {project.highlights.slice(4).map((h, i) => (
                    <Numbered key={h} n={i + 5}>
                      <Bullet text={h} lead />
                    </Numbered>
                  ))}
                </ol>
              </details>
            )}
          </Row>

          {rest.length > 0 && (
            <Row label="화면" wide aside="좌우로 넘겨 보실 수 있습니다">
              <ShotCarousel
                shots={rest}
                start={2}
                phone={project.shotsLayout === "phone"}
                onOpen={(i) => setZoom(i + 1)}
              />
              <p className="mt-8 max-w-2xl text-[12.5px] leading-[1.8] text-slate-500">
                {project.shotsNote ??
                  "실제 운영 화면입니다. 손님·직원의 이름과 CCTV에 잡힌 이용객은 알아볼 수 없게 처리했고, 내부 접속 주소는 잘라냈습니다."}
              </p>
            </Row>
          )}

          {project.sections && project.sections.length > 0 && (
            <ScrollSection>
              <DetailSections sections={project.sections} renderItem={(item) => <Bullet text={item} />} />
            </ScrollSection>
          )}

          {project.learned && project.learned.length > 0 && (
            <Row label="배운 것" aside="끝난 뒤에 남은 것들을 적었습니다.">
              <div className="max-w-[40rem] space-y-12">
                {project.learned.map((item) => {
                  const [head, ...body] = item.split(" — ");
                  const text = body.join(" — ");
                  return (
                    <div key={item}>
                      {text && (
                        <h3 className="mb-3 text-[16px] font-semibold tracking-[-0.02em] text-slate-100">{head}</h3>
                      )}
                      <p className="text-[16px] leading-[1.95] text-slate-300">
                        <Marked text={text || head} subtle />
                      </p>
                    </div>
                  );
                })}
              </div>
            </Row>
          )}

          <Row label="쓴 기술">
            <div className="flex flex-wrap gap-2">
              {project.techs.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </Row>

          {project.links && project.links.length > 0 && (
            <Row label="링크">
              <ul className="divide-y divide-slate-800 border-y border-slate-800">
                {project.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 py-4 text-[14px] text-slate-200 transition-colors hover:text-ice-500"
                    >
                      {link.label}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0 text-slate-500 transition-colors group-hover:text-ice-500">
                        <path d="M7 17L17 7M8 7h9v9" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </Row>
          )}
        </div>
      </section>

      {(related.length > 0 || career) && (
        <section className="px-6 pb-28">
          <div className="mx-auto max-w-[69rem]">
            <Row label="이어서 볼 것">
              {career && (
                <Link
                  href={`/career/${career.index}`}
                  className="group mb-12 flex items-end justify-between gap-6 border-b border-slate-800 pb-6"
                >
                  <span className="wall-label min-w-0">
                    <span className="mb-2 block text-[11px] tracking-[0.08em] text-slate-500">이 프로젝트를 맡았던 곳</span>
                    <span className="block text-[17px] font-semibold tracking-[-0.025em] text-slate-100 transition-colors group-hover:text-ice-500">
                      {career.career.company}
                      {career.career.team ? ` · ${career.career.team}` : ""}
                    </span>
                    <span className="mt-1 block font-serif text-[15px] italic tracking-normal text-slate-500">
                      <Latin text={career.career.period} />
                    </span>
                  </span>
                  <span aria-hidden className="mb-3 h-px w-6 shrink-0 bg-slate-500 transition-all duration-500 group-hover:w-10 group-hover:bg-ice-500" />
                </Link>
              )}

              {related.length > 0 && (
                <>
                  <p className="mb-4 text-[12px] tracking-[0.04em] text-slate-500">
                    {project.company ?? project.org}에서 한 다른 프로젝트
                  </p>
                  <ul className="grid gap-x-10 sm:grid-cols-2">
                    {related.map((r) => (
                      <li key={r.slug} className="border-t border-slate-800">
                        <Link href={`/projects/${r.slug}`} className="group block py-5">
                          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <span className="text-[15px] font-semibold tracking-[-0.02em] text-slate-100 transition-colors group-hover:text-ice-500">
                              {r.title}
                            </span>
                            {r.group === project.group && r.group && (
                              <span className="text-[11px] tracking-[0.06em] text-slate-500">같은 제품군</span>
                            )}
                          </span>
                          <span className="mt-1.5 block text-[13px] leading-relaxed text-slate-400">{r.subtitle}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Row>
          </div>
        </section>
      )}

      <section className="border-t border-slate-800 px-6 py-14">
        <div className="mx-auto flex max-w-[69rem] items-start justify-between gap-8">
          {prevProject ? (
            <Link href={`/projects/${prevProject.slug}`} className="group min-w-0">
              <p className="mb-2 flex items-center gap-3 text-[11px] tracking-[0.12em] text-slate-500">
                <span aria-hidden className="h-px w-5 bg-current transition-all duration-500 group-hover:w-8" />
                이전
              </p>
              <p className="text-[15px] font-medium tracking-[-0.02em] text-slate-300 transition-colors group-hover:text-ice-500">
                {prevProject.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link href={`/projects/${nextProject.slug}`} className="group min-w-0 text-right">
              <p className="mb-2 flex items-center justify-end gap-3 text-[11px] tracking-[0.12em] text-slate-500">
                다음
                <span aria-hidden className="h-px w-5 bg-current transition-all duration-500 group-hover:w-8" />
              </p>
              <p className="text-[15px] font-medium tracking-[-0.02em] text-slate-300 transition-colors group-hover:text-ice-500">
                {nextProject.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      <footer className="border-t border-slate-800 py-10 text-center">
        <p className="font-serif text-[15px] italic tracking-normal text-slate-500">
          &copy; {new Date().getFullYear()} {SITE.name}
        </p>
      </footer>

      {zoom !== null && (
        <Lightbox shots={shots} index={zoom} onIndex={setZoom} onClose={() => setZoom(null)} />
      )}
    </main>
  );
}

/** 액자 아래 설명판 — "Pl. 1" 과 캡션 */
function PlateCaption({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <figcaption className="mt-6 grid max-w-2xl grid-cols-[3rem_minmax(0,1fr)] gap-x-4 text-[13px] leading-[1.8] text-slate-400">
      <span className="font-serif text-[15px] italic leading-[1.6] tracking-normal text-slate-500">
        Pl.&thinsp;{n}
      </span>
      <span>{children}</span>
    </figcaption>
  );
}

/** 세리프 번호를 단 목록 한 줄 */
function Numbered({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-3">
      <span className="font-serif text-[17px] italic leading-[1.4] tabular-nums tracking-normal text-slate-500">
        {String(n).padStart(2, "0")}
      </span>
      <div className="min-w-0">{children}</div>
    </li>
  );
}

/**
 * "제목 — 설명" 형태의 한 줄.
 * lead 는 상단 요약용(조금 더 진하게), 그 외는 상세 항목용.
 */
function Bullet({ text, lead = false }: { text: string; lead?: boolean }) {
  const [title, ...rest] = text.split(" — ");
  const desc = rest.join(" — ");
  return desc ? (
    <div>
      <p
        className={`mb-1.5 tracking-[-0.02em] text-slate-100 ${
          lead ? "text-[16px] font-semibold" : "text-[15px] font-medium"
        }`}
      >
        {title}
      </p>
      <p className="text-[14.5px] leading-[1.85] text-slate-400">
        <Marked text={desc} />
      </p>
    </div>
  ) : (
    <p className="text-[14.5px] leading-[1.85] text-slate-300">
      <Marked text={title} />
    </p>
  );
}

/**
 * 문장에서 "재어 본 값"만 집는다.
 * 단위가 붙은 수치만 고른다 — 아무 숫자나 칠하면 강조가 배경이 된다.
 */
const MEASURE =
  /(\d[\d,.]*\s?(?:커밋|개월|개|건|명|줄|종|파일|편|배|ms|초|분|시간|일|주|년|Mbps|KB|MB|GB|LOC|%|px))/g;

function Marked({ text, subtle = false }: { text: string; subtle?: boolean }) {
  const parts = text.split(MEASURE);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          // 긴 문단은 굵게만, 짧은 항목에서만 가는 밑줄을 더한다 — 형광 면은 벽을 얼룩지게 한다
          subtle ? (
            <strong key={i} className="font-semibold text-slate-100">
              {part}
            </strong>
          ) : (
            <mark
              key={i}
              className="bg-transparent font-semibold text-slate-100 underline decoration-slate-500/60 decoration-1 underline-offset-[5px]"
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

/**
 * 세리프는 라틴·숫자 전용이다. "2026.09 — 현재" 처럼 한글이 섞이면
 * 한글 조각만 본문 글꼴(바로 세운 산세리프)로 되돌린다.
 */
function Latin({ text }: { text: string }) {
  return (
    <>
      {text.split(/([가-힣]+)/).map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-sans text-[0.72em] not-italic tracking-[-0.01em]">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}
