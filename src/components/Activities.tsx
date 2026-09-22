"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import { ACTIVITIES, PROJECTS } from "@/lib/constants";
import type { Activity } from "@/lib/constants";

function Row({ a, i, inView }: { a: Activity; i: number; inView: boolean }) {
  const projects = (a.projects ?? [])
    .map((slug) => PROJECTS.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: Math.min(i * 0.06, 0.4) }}
      className="grid gap-x-10 gap-y-3 py-7 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]"
    >
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="flex flex-wrap items-center gap-2">
          <span className="text-base font-bold tracking-tight text-slate-100">{a.name}</span>
          {a.active && (
            <span className="rounded-full bg-ice-100 px-2 py-0.5 text-[10px] font-semibold text-ice-500">
              진행 중
            </span>
          )}
        </p>
        <p className="mt-1.5 text-[13px] text-slate-500">{a.role}</p>
        <p className="mt-0.5 font-mono text-[12px] text-slate-500">{a.period}</p>
      </div>

      <div className="min-w-0">
        <ul className="space-y-2.5">
          {a.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5">
              <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ice-500" />
              <span className="max-w-[42rem] text-[15px] leading-[1.8] text-slate-300">{h}</span>
            </li>
          ))}
        </ul>

        {(a.links || projects.length > 0) && (
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            {a.links?.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] text-slate-400 underline-offset-4 transition-colors hover:text-ice-500 hover:underline"
              >
                {l.label}
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            ))}
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="text-[13px] font-medium text-ice-500 underline-offset-4 hover:underline"
              >
                {p.title} →
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
    <section className="py-24" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="mb-3 text-[10px] font-semibold tracking-[0.16em] text-ice-500">
            스터디 · 활동
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
            퇴근하고 나서도 계속 배웁니다
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-400">
            지금 {running}개를 운영하거나 참여하고 있습니다. 읽고 끝내지 않으려고 주차마다 발표하고
            기록을 남깁니다.
          </p>
        </motion.div>

        <ul className="divide-y divide-slate-800/60 border-y border-slate-800/60">
          {dev.map((a, i) => (
            <Row key={a.name} a={a} i={i} inView={inView} />
          ))}
        </ul>

        {/* 개발 밖의 팀 활동 — 궁금한 사람만 펴 보게 */}
        <div className="mt-8">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-ice-500"
          >
            {open ? "접기" : `개발 전에 팀을 이끌던 기록 ${lead.length}건`}
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform ${open ? "rotate-180" : ""}`}
              aria-hidden
            >
              <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <ul className="mt-6 divide-y divide-slate-800/60 border-y border-slate-800/60">
                  {lead.map((a, i) => (
                    <Row key={a.name} a={a} i={i} inView />
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
