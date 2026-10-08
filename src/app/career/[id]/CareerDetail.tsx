"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PROJECTS, BADGES } from "@/lib/constants";
import type { Career } from "@/lib/constants";
import SiteSheet from "@/components/SiteSheet";
import { PlateNo } from "@/components/gallery/Plate";

const EASE = [0.16, 1, 0.3, 1] as const;

const TYPE_LABEL = {
  "full-time": { ko: "정규직", mark: "Full-time" },
  intern: { ko: "인턴", mark: "Internship" },
  education: { ko: "교육", mark: "Education" },
} as const;

const fade = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 1, ease: EASE },
};

/** 왼쪽에 구간 이름, 오른쪽에 내용 — 가는 선과 여백으로만 나눈다 */
function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section
      {...fade}
      className="grid gap-8 border-t border-slate-800 py-16 first:border-t-0 sm:py-24 lg:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] lg:gap-16"
    >
      <h2 className="flex items-center gap-4 self-start text-[12px] tracking-[0.12em] text-slate-500 lg:pt-1">
        <span aria-hidden className="rule" />
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </motion.section>
  );
}

interface Props {
  career: Career;
  /** 경력 순서 — 오래된 것부터 1 */
  no: number;
  prev: { id: number; name: string } | null;
  next: { id: number; name: string } | null;
}

export default function CareerDetail({ career, no, prev, next }: Props) {
  const type = TYPE_LABEL[career.type];
  const stack = career.techs.map((t) => BADGES[t]?.label).filter(Boolean);

  return (
    <main className="min-h-screen">
      <nav className="glass fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href="/collaboration"
            className="group inline-flex items-center gap-3 text-[13px] text-slate-400 transition-colors hover:text-slate-100"
          >
            <span aria-hidden className="h-px w-5 bg-current transition-all duration-500 group-hover:w-8" />
            협업 기록
          </Link>
          <SiteSheet />
        </div>
      </nav>

      {/* 첫머리 — 큰 이름 하나와 옆의 설명판 */}
      <header className="flex min-h-[72vh] items-end pt-36 pb-20">
        <div className="mx-auto w-full max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className="grid gap-12 border-b border-slate-700/80 pb-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end lg:gap-20"
          >
            <div className="min-w-0">
              <p className="mb-8 flex items-center gap-4">
                <span className="font-serif text-[22px] italic text-slate-300">{type.mark}</span>
                <span aria-hidden className="rule text-slate-500" />
                <PlateNo n={no} />
              </p>
              <h1 className="text-[clamp(2.6rem,7vw,5.2rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-slate-50">
                {career.company}
              </h1>
              <p className="mt-6 text-[clamp(1.05rem,1.8vw,1.25rem)] leading-snug tracking-[-0.02em] text-slate-400">
                {career.role}
              </p>
            </div>

            <dl className="wall-label grid grid-cols-[3.5rem_1fr] gap-x-3 gap-y-2.5 text-[13px] leading-relaxed lg:pb-2">
              <dt className="pt-px">기간</dt>
              <dd className="tabular-nums text-slate-300">{career.period}</dd>
              <dt className="pt-px">구분</dt>
              <dd className="text-slate-300">{type.ko}</dd>
              {career.team && (
                <>
                  <dt className="pt-px">소속</dt>
                  <dd className="text-slate-300">{career.team}</dd>
                </>
              )}
              <dt className="pt-px">시기</dt>
              <dd className="text-slate-300">{career.chapter}</dd>
            </dl>
          </motion.div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <Block title="무엇을 만들었나">
          <p className="max-w-[44rem] text-[clamp(1.05rem,1.6vw,1.2rem)] leading-[1.95] text-slate-200">
            {career.summary}
          </p>
        </Block>

        <Block title="한 일">
          <ol className="divide-y divide-slate-800/70 border-y border-slate-800">
            {career.details.map((d, i) => {
              const [title, ...rest] = d.split(" — ");
              const desc = rest.join(" — ");
              return (
                <li key={d} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 py-6 sm:grid-cols-[3.5rem_minmax(0,1fr)]">
                  <span aria-hidden className="font-serif text-[17px] italic tabular-nums leading-[1.6] text-slate-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {desc ? (
                    <div className="min-w-0">
                      <p className="text-[15px] font-semibold leading-[1.6] tracking-[-0.02em] text-slate-100">{title}</p>
                      <p className="mt-2 max-w-[42rem] text-[15px] leading-[1.85] text-slate-400">{desc}</p>
                    </div>
                  ) : (
                    <p className="max-w-[42rem] text-[15px] leading-[1.85] text-slate-300">{title}</p>
                  )}
                </li>
              );
            })}
          </ol>
        </Block>

        {career.projects && career.projects.length > 0 && (
          <Block title="맡은 프로젝트">
            <ul className="divide-y divide-slate-800/70 border-y border-slate-800">
              {career.projects.map((name) => {
                // 상세 페이지가 있는 프로젝트면 링크로, 아니면 이름만
                const hit = PROJECTS.find((x) => name.includes(x.title) || x.title.includes(name));
                return (
                  <li key={name}>
                    {hit ? (
                      <Link
                        href={`/projects/${hit.slug}`}
                        className="group flex items-center justify-between gap-6 py-4"
                      >
                        <span className="text-[15px] font-semibold tracking-[-0.02em] text-slate-100 transition-colors group-hover:text-ice-500">
                          {name}
                        </span>
                        <span
                          aria-hidden
                          className="h-px w-5 shrink-0 bg-slate-600 transition-all duration-500 group-hover:w-9 group-hover:bg-ice-500"
                        />
                      </Link>
                    ) : (
                      <span className="block py-4 text-[15px] text-slate-400">{name}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </Block>
        )}

        <Block title="쓴 기술">
          <p className="max-w-[42rem] text-[15px] leading-[2] text-slate-300">
            {stack.map((label, i) => (
              <span key={label}>
                {label}
                {i < stack.length - 1 && <span className="mx-2.5 text-slate-600">/</span>}
              </span>
            ))}
          </p>
        </Block>
      </div>

      <nav aria-label="다른 경력" className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-8 border-t border-slate-700/80 pt-10 sm:grid-cols-2">
          {prev ? (
            <Link href={`/career/${prev.id}`} className="group block">
              <span className="flex items-center gap-3 text-[11px] tracking-[0.16em] text-slate-500">
                <span aria-hidden className="h-px w-5 bg-current transition-all duration-500 group-hover:w-8" />
                이전
              </span>
              <span className="mt-3 block text-[clamp(1.2rem,2vw,1.5rem)] font-semibold tracking-[-0.03em] text-slate-200 transition-colors group-hover:text-ice-500">
                {prev.name}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/career/${next.id}`} className="group block sm:text-right">
              <span className="flex items-center gap-3 text-[11px] tracking-[0.16em] text-slate-500 sm:justify-end">
                다음
                <span aria-hidden className="h-px w-5 bg-current transition-all duration-500 group-hover:w-8" />
              </span>
              <span className="mt-3 block text-[clamp(1.2rem,2vw,1.5rem)] font-semibold tracking-[-0.03em] text-slate-200 transition-colors group-hover:text-ice-500">
                {next.name}
              </span>
            </Link>
          )}
        </div>
      </nav>

      <footer className="border-t border-slate-800 py-10">
        <p className="mx-auto max-w-6xl px-6 text-[13px] text-slate-500">
          &copy; {new Date().getFullYear()} Seungeun Choi
        </p>
      </footer>
    </main>
  );
}
