"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BADGES, CORE_SKILLS, MORE_SKILLS } from "@/lib/constants";
import { SectionHead } from "./About";

const EASE = [0.16, 1, 0.3, 1] as const;

type Group = { title: string; badges: readonly (keyof typeof BADGES)[] };

/** 한 줄 — 왼쪽에 묶음 이름, 오른쪽에 기술 이름을 가운뎃점으로 잇는다. 칩 대신 글자로 */
function Row({ group, index, muted }: { group: Group; index: number; muted?: boolean }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, ease: EASE, delay: Math.min(index * 0.06, 0.3) }}
      className="grid gap-x-10 gap-y-2 border-b border-slate-800 py-6 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:items-baseline"
    >
      <h4
        className={`text-[13px] font-medium tracking-[0.02em] ${muted ? "text-slate-500" : "text-slate-400"}`}
      >
        {group.title}
      </h4>
      <p className={`text-[16px] leading-[1.9] ${muted ? "text-slate-400" : "text-slate-200"}`}>
        {group.badges.map((key, i) => (
          <span key={key}>
            {i > 0 && (
              <span aria-hidden className="mx-2.5 text-slate-700">
                ·
              </span>
            )}
            {BADGES[key]?.label}
          </span>
        ))}
      </p>
    </motion.li>
  );
}

export default function Skills() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="skills" className="relative flex min-h-screen items-center py-32 sm:py-44">
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-16 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end"
        >
          <SectionHead mark="Tools" title="쓰는 기술" />
          <p className="text-[13px] leading-relaxed text-slate-500">
            주로 쓰는 기술과, 프로젝트에서 필요할 때 써 온 기술
          </p>
        </motion.div>

        <h3 className="mb-2 text-[11px] tracking-[0.16em] text-slate-500">자주 쓰는 것</h3>
        <ul className="border-t border-slate-700">
          {CORE_SKILLS.map((group, i) => (
            <Row key={group.title} group={group} index={i} />
          ))}
        </ul>

        <AnimatePresence initial={false}>
          {showMore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="overflow-hidden"
            >
              <h3 className="mt-16 mb-2 text-[11px] tracking-[0.16em] text-slate-500">그 밖에 다뤄 본 것</h3>
              <ul className="border-t border-slate-800">
                {MORE_SKILLS.map((group, i) => (
                  <Row key={group.title} group={group} index={i} muted />
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10">
          <button
            onClick={() => setShowMore(!showMore)}
            aria-expanded={showMore}
            className="inline-flex items-center gap-2 border-b border-slate-700 pb-1 text-[13px] text-slate-400 transition-colors duration-500 hover:border-ice-500 hover:text-ice-500"
          >
            {showMore ? "접기" : "더 보기"}
            <svg
              width="11"
              height="11"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className={`transition-transform duration-500 ${showMore ? "rotate-180" : ""}`}
              aria-hidden
            >
              <path d="M3 5l4 4 4-4" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
