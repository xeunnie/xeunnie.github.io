"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BADGES } from "@/lib/constants";
import type { Project } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * 프로젝트 대표 화면.
 * 세로로 긴 휴대기기 캡처를 16:10 틀에 object-cover 로 넣으면 윗부분만 잘린다.
 * 그런 프로젝트는 석 장을 나란히 세워 기기 모양 그대로 보여 준다.
 */
export function Cover({ project, phoneCount = 3 }: { project: Project; phoneCount?: number }) {
  const shots = project.shots ?? [];

  // 캡처가 없으면 무엇을 만들었는지를 크게 앉힌 카드로 — 빈 회색 상자보다 의도가 보인다.
  // 제목은 카드 아래에 따로 붙으므로 여기서는 되풀이하지 않는다.
  if (shots.length === 0) {
    return (
      <div className="flex aspect-[16/10] w-full flex-col justify-between bg-slate-900 p-5 sm:p-7">
        <span className="text-[11px] tabular-nums text-slate-500">{project.period}</span>
        <span>
          <span className="block text-[clamp(1.25rem,2.4vw,1.75rem)] font-extrabold leading-[1.2] tracking-[-0.035em] text-slate-50">
            {project.subtitle}
          </span>
          <span className="mt-2 block text-[12px] text-slate-500">{project.org ?? project.company}</span>
        </span>
      </div>
    );
  }

  if (project.shotsLayout === "phone") {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center gap-3 overflow-hidden bg-slate-900 px-4 py-5 sm:gap-5 sm:px-8 sm:py-8">
        {shots.slice(0, phoneCount).map((s) => (
          <span key={s.src} className="flex h-full min-w-0 flex-1 items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.src}
              alt={s.caption}
              loading="lazy"
              decoding="async"
              className="max-h-full max-w-full rounded-lg border border-slate-800 object-contain"
            />
          </span>
        ))}
      </div>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={shots[0].src}
      alt={shots[0].caption}
      loading="lazy"
      decoding="async"
      className="aspect-[16/10] w-full object-cover object-left-top"
    />
  );
}

interface Props {
  project: Project;
  highlight: boolean;
  /** 화면을 오른쪽에 둘지 — 좌우를 번갈아 두면 길게 내려가도 단조롭지 않다 */
  flip: boolean;
}

/** 크게 보여 주는 프로젝트 한 건 — 큰 화면 한 장과 옆의 짧은 설명 */
export default function Work({ project, highlight, flip }: Props) {
  const where = [project.company, project.team].filter(Boolean).join(" · ") || project.org;
  const stack = project.techs
    .slice(0, 5)
    .map((t) => BADGES[t]?.label)
    .filter(Boolean)
    .join(", ");

  return (
    <motion.article
      id={`work-${project.slug}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: EASE }}
      className="grid scroll-mt-24 items-center gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16"
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`${project.title} 자세히 보기`}
        className={`group block overflow-hidden border border-slate-800 ${flip ? "lg:order-2" : ""}`}
      >
        <div className="transition-transform duration-700 ease-out group-hover:scale-[1.02]">
          <Cover project={project} />
        </div>
      </Link>

      <div className={`min-w-0 ${flip ? "lg:order-1 lg:ml-auto lg:w-full lg:max-w-md" : ""}`}>
        {highlight && (
          <p className="mb-3 text-[11px] font-semibold tracking-[0.14em] text-ice-500">대표 프로젝트</p>
        )}
        <h3 className="text-[clamp(1.6rem,3vw,2.1rem)] font-bold leading-tight tracking-tight text-slate-50">
          {project.title}
        </h3>
        <p className="mt-2 text-[15px] text-slate-400">{project.subtitle}</p>

        <p className="mt-6 text-[15px] leading-[1.85] text-slate-300">{project.description}</p>

        <dl className="mt-6 grid grid-cols-[3.5rem_1fr] gap-y-1.5 border-t border-slate-800 pt-5 text-[13px] leading-relaxed">
          <dt className="text-slate-500">기간</dt>
          <dd className="tabular-nums text-slate-300">{project.period}</dd>
          {where && (
            <>
              <dt className="text-slate-500">소속</dt>
              <dd className="text-slate-300">{where}</dd>
            </>
          )}
          <dt className="text-slate-500">기술</dt>
          <dd className="text-slate-300">{stack}</dd>
          {project.award && (
            <>
              <dt className="text-slate-500">수상</dt>
              <dd className="text-amber-400">{project.award}</dd>
            </>
          )}
        </dl>

        <Link
          href={`/projects/${project.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ice-500 transition-all hover:gap-3"
        >
          자세히 보기
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}
