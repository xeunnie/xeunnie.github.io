"use client";

import { motion } from "framer-motion";
import { ACTIVITIES } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

function rise(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: EASE },
  };
}

/**
 * 첫 장면 — 큰 문장 하나, 짧은 소개, 아래에 숫자 셋.
 * 벽에 붙은 글처럼 아래쪽에 앉히고 가는 선으로 마무리한다.
 */
export default function ActivityOpening() {
  const dev = ACTIVITIES.filter((a) => a.category === "dev");
  const lead = ACTIVITIES.filter((a) => a.category === "leadership");
  const running = dev.filter((a) => a.active).length;

  const stats = [
    { value: running, label: "지금 하고 있는 것" },
    { value: dev.length, label: "스터디 · 해커톤" },
    { value: lead.length, label: "팀을 맡았던 기록" },
  ];

  return (
    <section className="flex min-h-screen items-end pt-36 pb-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="border-b border-slate-700/80 pb-12">
          <motion.div {...rise(0.05)} className="mb-10 flex items-center gap-4">
            <span aria-hidden className="font-serif text-[22px] italic text-slate-300">Activity</span>
            <span aria-hidden className="rule text-slate-500" />
            <h1 className="text-[11px] tracking-[0.16em] text-slate-500">활동</h1>
          </motion.div>

          <motion.p
            {...rise(0.15)}
            className="max-w-4xl text-[clamp(2.2rem,6vw,4.4rem)] font-semibold leading-[1.15] tracking-[-0.045em] text-slate-50"
          >
            읽고 끝내지 않으려고
            <br />
            모였습니다
          </motion.p>

          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-20">
            <motion.p {...rise(0.25)} className="max-w-2xl text-pretty text-[17px] leading-[1.9] text-slate-400">
              스터디는 주차마다 발표하고 기록을 남깁니다. 개발을 시작하기 전에는 학보사와 동아리에서
              팀을 맡아 일을 나누고 함께 꾸렸고, 그때 배운 것들이 지금 사람들과 일하는 방식에 남아 있습니다.
            </motion.p>

            <motion.dl {...rise(0.35)} className="flex flex-wrap gap-x-12 gap-y-8 lg:justify-end">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="mt-3 text-[11px] tracking-[0.12em] text-slate-500">{s.label}</dt>
                  <dd className="font-serif text-[3.25rem] leading-none tabular-nums text-slate-50">{s.value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>
      </div>
    </section>
  );
}
