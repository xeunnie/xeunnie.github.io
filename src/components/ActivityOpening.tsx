"use client";

import { motion } from "framer-motion";
import { ACTIVITIES } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

function rise(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  };
}

export default function ActivityOpening() {
  const dev = ACTIVITIES.filter((a) => a.category === "dev");
  const lead = ACTIVITIES.filter((a) => a.category === "leadership");
  const running = dev.filter((a) => a.active).length;

  const stats = [
    { value: running, label: "지금 하고 있는 것" },
    { value: dev.length, label: "스터디 · 해커톤" },
    { value: lead.length, label: "팀을 이끈 기록" },
  ];

  return (
    <section className="flex min-h-screen items-center pt-28 pb-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.h1 {...rise(0.05)} className="text-[10px] font-semibold tracking-[0.16em] text-ice-500">
          활동
        </motion.h1>

        <motion.p
          {...rise(0.12)}
          className="mt-7 max-w-4xl text-[clamp(1.8rem,5vw,3.4rem)] font-bold leading-[1.22] tracking-tight text-slate-50"
        >
          읽고 끝내지 않으려고
          <br />
          모였습니다
        </motion.p>

        <motion.p {...rise(0.22)} className="mt-8 max-w-2xl text-lg leading-[1.8] text-slate-400">
          스터디는 주차마다 발표하고 기록을 남깁니다. 개발을 시작하기 전에는 학보사와 동아리에서
          팀을 이끌었고, 그때 배운 것들이 지금 사람들과 일하는 방식에 남아 있습니다.
        </motion.p>

        <motion.dl {...rise(0.3)} className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
          {stats.map((s) => (
            <div key={s.label}>
              <dd className="font-mono text-3xl font-bold tabular-nums text-slate-50 sm:text-4xl">
                {s.value}
              </dd>
              <dt className="mt-1.5 text-xs text-slate-500">{s.label}</dt>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
