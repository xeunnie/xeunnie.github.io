"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { COLLABORATIONS, PARTNER_ORDER, PROJECTS } from "@/lib/constants";
import type { Collaboration, Partner } from "@/lib/constants";
import { SectionHead } from "./About";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  { key: "situation", label: "상황" },
  { key: "action", label: "내가 한 일" },
  { key: "result", label: "결과" },
] as const;

/** 한 건 — 왼쪽은 설명판(번호·상대·프로젝트), 오른쪽은 제목과 상황·한 일·결과 */
function Case({ item, index, no }: { item: Collaboration; index: number; no: number }) {
  // 프로젝트명이 실제 항목과 맞으면 상세로 이어준다
  const hit = item.project ? PROJECTS.find((p) => item.project?.includes(p.title)) : undefined;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.9, ease: EASE, delay: Math.min(index * 0.06, 0.3) }}
      className="grid gap-x-16 gap-y-6 border-b border-slate-800 py-14 sm:py-16 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]"
    >
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3 lg:flex-col lg:gap-y-4">
        <span aria-hidden className="font-serif text-[30px] italic leading-none text-slate-700 lg:text-[40px]">
          {String(no).padStart(2, "0")}
        </span>
        <div>
          <p className="text-[12px] tracking-[0.08em] text-slate-400">
            <span className="font-serif text-[14px] italic tracking-normal text-slate-500">with</span>{" "}
            {item.partner}
          </p>
        </div>
        {item.project && (
          <div>
            <p className="text-[12px] leading-relaxed">
              {hit ? (
                <Link
                  href={`/projects/${hit.slug}`}
                  className="text-slate-500 underline decoration-slate-700 underline-offset-4 transition-colors duration-500 hover:text-ice-500 hover:decoration-ice-500"
                >
                  {item.project}
                </Link>
              ) : (
                <span className="text-slate-500">{item.project}</span>
              )}
            </p>
          </div>
        )}
      </div>

      <div className="min-w-0">
        <h3 className="max-w-[40rem] text-[clamp(1.2rem,2vw,1.45rem)] font-semibold leading-[1.5] tracking-[-0.035em] text-slate-50">
          {item.title}
        </h3>

        <dl className="mt-8 max-w-[44rem] border-t border-slate-800">
          {STEPS.map((step) => (
            <div
              key={step.key}
              className="grid gap-x-6 gap-y-1 border-b border-slate-800/70 py-4 sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:items-baseline"
            >
              <dt className="text-[11px] tracking-[0.12em] text-slate-500">{step.label}</dt>
              <dd className="text-[15px] leading-[1.85] text-slate-300">{item[step.key]}</dd>
            </div>
          ))}
        </dl>

        {item.evidence && (
          <p className="mt-5 max-w-[44rem] break-all font-mono text-[11.5px] leading-relaxed text-slate-500">
            {item.evidence}
          </p>
        )}
      </div>
    </motion.article>
  );
}

export default function CollaborationSection() {
  const [filter, setFilter] = useState<Partner | "all">("all");

  const filters = useMemo(() => {
    const counts = PARTNER_ORDER.map((p) => ({
      key: p,
      label: p,
      count: COLLABORATIONS.filter((c) => c.partner === p).length,
    })).filter((f) => f.count > 0);
    return [{ key: "all" as const, label: "전체", count: COLLABORATIONS.length }, ...counts];
  }, []);

  const visible =
    filter === "all" ? COLLABORATIONS : COLLABORATIONS.filter((c) => c.partner === filter);

  return (
    <section id="collaboration" className="relative py-32 sm:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end"
        >
          <SectionHead mark="Records" title="협업 기록" />
          <p className="max-w-xl text-[15px] leading-[1.9] text-slate-400">
            함께 일한 분들과 있었던 일을 적었습니다. 기억에 기대지 않으려고, 문서나 기록이
            남아 있는 것만 골랐습니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="flex flex-wrap gap-x-7 gap-y-3 border-b border-slate-700 pb-4"
        >
          {filters.map((f) => {
            const on = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                aria-pressed={on}
                className={`relative pb-1 text-[13px] transition-colors duration-500 ${
                  on ? "text-slate-50" : "text-slate-500 hover:text-slate-200"
                }`}
              >
                {f.label}
                <span className="ml-1.5 font-serif text-[13px] italic text-slate-500">{f.count}</span>
                {on && (
                  <motion.span
                    layoutId="collab-filter"
                    aria-hidden
                    transition={{ duration: 0.7, ease: EASE }}
                    className="absolute inset-x-0 -bottom-px h-px bg-ice-500 sm:-bottom-[17px]"
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        <motion.div layout>
          <AnimatePresence mode="popLayout">
            {visible.map((item, i) => (
              <Case
                key={item.title}
                item={item}
                index={i}
                no={COLLABORATIONS.indexOf(item) + 1}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
