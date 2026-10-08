"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import { ACTIVITIES, PROJECTS } from "@/lib/constants";
import type { Activity } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

/** 목록 한 줄 — 왼쪽에 번호와 이름, 오른쪽에 한 일. 가는 선으로만 나눈다 */
export function ActivityRow({ a, i, n, inView }: { a: Activity; i: number; n: number; inView: boolean }) {
  const projects = (a.projects ?? [])
    .map((slug) => PROJECTS.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: Math.min(i * 0.08, 0.4), ease: EASE }}
      className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 gap-y-6 py-12 sm:py-14 lg:grid-cols-[4rem_minmax(0,15rem)_minmax(0,1fr)] lg:gap-x-10"
    >
      <span aria-hidden className="font-serif text-[clamp(1.6rem,2.6vw,2.1rem)] italic leading-none tabular-nums text-slate-500">
        {String(n).padStart(2, "0")}
      </span>

      <div>
        <Link
          href={`/activity/${a.slug}`}
          className="text-[clamp(1.15rem,1.8vw,1.3rem)] font-semibold leading-snug tracking-[-0.03em] text-slate-100 transition-colors hover:text-ice-500"
        >
          {a.name}
        </Link>
        <dl className="wall-label mt-4 grid grid-cols-[2.75rem_1fr] gap-x-2 gap-y-1 text-[12px] leading-relaxed">
          <dt className="pt-px">역할</dt>
          <dd className="text-slate-400">{a.role}</dd>
          <dt className="pt-px">기간</dt>
          <dd className="tabular-nums text-slate-400">{a.period}</dd>
        </dl>
        {a.active && (
          <span className="mt-4 inline-block border border-ice-500/40 px-1.5 py-px text-[10px] tracking-[0.08em] text-ice-500">
            진행 중
          </span>
        )}
      </div>

      <div className="col-span-2 min-w-0 lg:col-span-1">
        <ul className="space-y-3">
          {a.highlights.map((h) => (
            <li key={h} className="flex items-start gap-3">
              <span aria-hidden className="mt-[14px] h-px w-3 shrink-0 bg-slate-600" />
              <span className="max-w-[42rem] text-[15px] leading-[1.85] text-slate-300">{h}</span>
            </li>
          ))}
        </ul>

        {(a.links || projects.length > 0) && (
          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
            {a.links?.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[13px] text-slate-400 transition-colors hover:text-slate-100"
              >
                <span className="underline decoration-slate-700 underline-offset-[5px] transition-colors group-hover:decoration-current">
                  {l.label}
                </span>
                <span aria-hidden className="text-[11px] text-slate-500">↗</span>
              </a>
            ))}
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group inline-flex items-center gap-2.5 text-[13px] font-medium text-slate-100"
              >
                <span aria-hidden className="h-px w-5 bg-current transition-all duration-500 group-hover:w-8 group-hover:bg-ice-500" />
                <span className="transition-colors group-hover:text-ice-500">{p.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.li>
  );
}

/**
 * 스터디와 활동.
 * 여태 이력서에만 있고 사이트에는 없었다 — 몇 해째 이어 온 일인데 보이지 않으면 없는 것과 같다.
 * 개발 쪽을 먼저, 그 전의 팀 활동은 눌러서 펴 본다.
 */
export default function Activities() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState(false);

  const dev = ACTIVITIES.filter((a) => a.category === "dev");
  const lead = ACTIVITIES.filter((a) => a.category === "leadership");
  const running = dev.filter((a) => a.active).length;

  return (
    <section className="py-32 sm:py-44" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE }}
          className="mb-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-20"
        >
          <div>
            <p className="mb-6 flex items-center gap-4 text-[11px] tracking-[0.16em] text-slate-500">
              <span aria-hidden className="rule" />
              스터디 · 활동
            </p>
            <h2 className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold leading-[1.3] tracking-[-0.04em] text-slate-50">
              퇴근하고 나서도 계속 배웁니다
            </h2>
          </div>
          <p className="max-w-xl text-[15px] leading-[1.9] text-slate-400">
            지금 {running}개를 운영하거나 참여하고 있습니다. 읽고 끝내지 않으려고 주차마다 발표하고
            기록을 남깁니다.
          </p>
        </motion.div>

        <ul className="divide-y divide-slate-800/70 border-y border-slate-800">
          {dev.map((a, i) => (
            <ActivityRow key={a.name} a={a} i={i} n={i + 1} inView={inView} />
          ))}
        </ul>

        {/* 개발 밖의 팀 활동 — 궁금한 사람만 펴 보게 */}
        <div className="mt-12">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="group inline-flex items-center gap-3 text-[13px] font-medium text-slate-400 transition-colors hover:text-slate-100"
          >
            <span aria-hidden className={`h-px bg-current transition-all duration-500 ${open ? "w-10" : "w-6 group-hover:w-10"}`} />
            {open ? "접기" : `개발 전에 팀을 맡았던 기록 ${lead.length}건`}
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="overflow-hidden"
              >
                <ul className="mt-10 divide-y divide-slate-800/70 border-y border-slate-800">
                  {lead.map((a, i) => (
                    <ActivityRow key={a.name} a={a} i={i} n={dev.length + i + 1} inView />
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
