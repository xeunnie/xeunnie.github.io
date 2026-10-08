"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BADGES } from "@/lib/constants";
import type { Project } from "@/lib/constants";
import Plate, { PlateNo } from "@/components/gallery/Plate";

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
      <div className="flex aspect-[16/10] w-full flex-col justify-between bg-slate-900 p-6 sm:p-9">
        <span className="font-serif text-[15px] italic text-slate-500">{project.period}</span>
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
  /** 홈에 걸린 순서 */
  no?: number;
}

/**
 * 크게 보여 주는 작업 한 건.
 * 한쪽에는 액자에 넣은 대표 화면, 다른 쪽에는 작품 옆 설명판처럼 짧은 정보.
 */
export default function Work({ project, highlight, flip, no }: Props) {
  const where = [project.company, project.team].filter(Boolean).join(" · ") || project.org;
  const stack = project.techs
    .slice(0, 5)
    .map((t) => BADGES[t]?.label)
    .filter(Boolean)
    .join(", ");

  return (
    <motion.article
      id={`work-${project.slug}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease: EASE }}
      className={`grid scroll-mt-24 items-end gap-10 lg:gap-20 ${flip ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]" : "lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]"}`}
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`${project.title} 자세히 보기`}
        className={`block ${flip ? "lg:order-2" : ""}`}
      >
        <Plate>
          <Cover project={project} />
        </Plate>
      </Link>

      <div className={`wall-label min-w-0 lg:pb-2 ${flip ? "lg:order-1" : ""}`}>
        <p className="flex items-baseline gap-3">
          {no && <PlateNo n={no} />}
          {highlight && <span className="text-[11px] tracking-[0.12em] text-ice-500">대표 작업</span>}
        </p>
        <h3 className="mt-4 text-[clamp(1.6rem,2.8vw,2.15rem)] font-semibold leading-[1.2] tracking-[-0.035em] text-slate-50">
          {project.title}
        </h3>
        <p className="mt-2 text-[15px] text-slate-400">{project.subtitle}</p>

        <span aria-hidden className="rule mt-7 text-slate-500" />

        <p className="mt-7 text-[15px] leading-[1.9] text-slate-300">{project.description}</p>

        <dl className="mt-7 grid grid-cols-[3.5rem_1fr] gap-x-3 gap-y-2 text-[13px] leading-relaxed">
          <dt className="pt-px">기간</dt>
          <dd className="tabular-nums text-slate-300">{project.period}</dd>
          {where && (
            <>
              <dt className="pt-px">소속</dt>
              <dd className="text-slate-300">{where}</dd>
            </>
          )}
          <dt className="pt-px">기술</dt>
          <dd className="text-slate-300">{stack}</dd>
          {project.award && (
            <>
              <dt className="pt-px">수상</dt>
              <dd className="text-amber-400">{project.award}</dd>
            </>
          )}
        </dl>

        <Link
          href={`/projects/${project.slug}`}
          className="group mt-8 inline-flex items-center gap-3 text-[13px] font-medium text-slate-100"
        >
          <span className="h-px w-6 bg-current transition-all duration-500 group-hover:w-10 group-hover:bg-ice-500" />
          <span className="transition-colors group-hover:text-ice-500">자세히 보기</span>
        </Link>
      </div>
    </motion.article>
  );
}
