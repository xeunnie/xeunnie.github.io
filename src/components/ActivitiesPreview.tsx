"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ACTIVITIES } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * 타임라인 아래에 놓는 요약.
 * 자세한 것은 /activity 가 맡고, 여기서는 "지금도 하고 있다" 만 보이면 된다.
 */
export default function ActivitiesPreview() {
  const dev = ACTIVITIES.filter((a) => a.category === "dev");
  const running = dev.filter((a) => a.active);

  return (
    <section className="pt-16 pb-32 sm:pb-44">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="grid gap-10 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-20"
        >
          <div>
            <p className="font-serif text-[clamp(2.6rem,5vw,3.6rem)] italic leading-none text-slate-50">Now</p>
            <span aria-hidden className="rule mt-8 text-slate-500" />
            <p className="mt-5 text-[12px] tracking-[0.06em] text-slate-500">스터디 · 활동</p>
          </div>

          <div className="min-w-0">
            <h2 className="text-[clamp(1.4rem,2.6vw,1.9rem)] font-semibold tracking-[-0.035em] text-slate-50">
              퇴근하고 나서도 계속 배웁니다
            </h2>

            <ul className="mt-12 divide-y divide-slate-800/70 border-y border-slate-800">
              {running.map((a, i) => (
                <li key={a.name}>
                  <Link
                    href={`/activity/${a.slug}`}
                    className="group grid gap-x-8 gap-y-1 py-6 sm:grid-cols-[2.5rem_minmax(0,11rem)_minmax(0,1fr)] sm:items-baseline"
                  >
                    <span className="font-serif text-[17px] italic tabular-nums text-slate-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex flex-col">
                      <span className="font-semibold tracking-[-0.02em] text-slate-100 transition-colors group-hover:text-ice-500">
                        {a.name}
                      </span>
                      <span className="mt-1 text-[12px] tabular-nums text-slate-500">{a.period}</span>
                    </span>
                    <span className="min-w-0 text-[14px] leading-[1.8] text-slate-400">{a.highlights[0]}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/activity"
              className="group mt-10 inline-flex items-center gap-3 text-[13px] font-medium text-slate-100"
            >
              <span className="h-px w-6 bg-current transition-all duration-500 group-hover:w-10 group-hover:bg-ice-500" />
              <span className="transition-colors group-hover:text-ice-500">활동 전체 보기</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
