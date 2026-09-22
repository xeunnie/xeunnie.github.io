"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ACTIVITIES } from "@/lib/constants";

/**
 * 타임라인 아래에 놓는 요약.
 * 자세한 것은 /activity 가 맡고, 여기서는 "지금도 하고 있다" 만 보이면 된다.
 */
export default function ActivitiesPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const dev = ACTIVITIES.filter((a) => a.category === "dev");
  const running = dev.filter((a) => a.active);

  return (
    <section className="py-24" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="mb-3 text-[10px] font-semibold tracking-[0.16em] text-ice-500">
              스터디 · 활동
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
              퇴근하고 나서도 계속 배웁니다
            </h2>
          </div>
          <Link
            href="/activity"
            className="text-sm font-medium text-slate-400 underline-offset-4 transition-colors hover:text-ice-500 hover:underline"
          >
            활동 전체 보기
          </Link>
        </motion.div>

        <ul className="divide-y divide-slate-800/60 border-y border-slate-800/60">
          {running.map((a, i) => (
            <motion.li
              key={a.name}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
              className="flex flex-col gap-1.5 py-5 sm:flex-row sm:items-baseline sm:gap-8"
            >
              <span className="font-mono text-[12px] tabular-nums text-ice-500 sm:w-32">
                {a.period}
              </span>
              <span className="text-base font-bold tracking-tight text-slate-100 sm:w-52">
                {a.name}
              </span>
              <span className="min-w-0 flex-1 text-[15px] leading-relaxed text-slate-400">
                {a.highlights[0]}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
