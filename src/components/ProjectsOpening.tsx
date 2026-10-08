"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

function rise(delay: number) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease: EASE },
  };
}

const ROMAN = ["i", "ii", "iii"];

/**
 * 목록으로 바로 떨어뜨리지 않고 한 화면을 먼저 둔다.
 * 입구 벽에 붙은 글처럼 — 위에 라틴 한 단어, 큰 문장 하나, 아래에 가는 선과 숫자 셋.
 */
export default function ProjectsOpening() {
  const company = PROJECTS.filter((p) => p.category === "company").length;
  const shipped = PROJECTS.filter((p) => p.shots && p.shots.length > 0).length;

  const stats = [
    { value: PROJECTS.length, label: "전체" },
    { value: company, label: "회사에서" },
    { value: shipped, label: "화면이 남아 있는 것" },
  ];

  return (
    <section className="flex min-h-[92svh] items-end pt-36 pb-24 sm:pb-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div {...rise(0.05)} className="flex items-center gap-4 text-slate-500">
          <span className="font-serif text-[22px] italic text-slate-300">Index</span>
          <span aria-hidden className="rule" />
          <h1 className="text-[12px] font-normal tracking-[0.16em]">프로젝트</h1>
        </motion.div>

        <motion.p
          {...rise(0.14)}
          className="mt-12 max-w-4xl text-[clamp(2.3rem,6.4vw,5rem)] font-semibold leading-[1.12] tracking-[-0.045em] text-slate-50"
        >
          한 땀 한 땀
          <br />
          짠 것들입니다
        </motion.p>

        <motion.div
          {...rise(0.28)}
          className="mt-16 grid gap-12 border-t border-slate-700/80 pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20"
        >
          <div className="max-w-xl">
            <p className="text-pretty text-[17px] leading-[1.9] text-slate-400">
              누군가 오늘도 쓰고 있는 화면들이라 넘긴 뒤에도 계속 살핍니다. 고칠 게 보이면
              지금도 고칩니다.
            </p>
            <p className="mt-6 text-pretty text-[13px] leading-[1.9] text-slate-500">
              회사·학업·팀·제품군으로 걸러 볼 수 있습니다. 상세 페이지에는 무엇이 문제였고 그때
              어떻게 판단했는지를 적어 두었습니다. 궁금한 것부터 골라 보셔도 됩니다.
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-6 self-end sm:gap-10">
            {stats.map((s, i) => (
              <div key={s.label} className="flex flex-col">
                <dd className="font-serif text-[clamp(2.6rem,6vw,4.25rem)] leading-none tabular-nums text-slate-50">
                  {s.value}
                </dd>
                <dt className="mt-4 flex items-baseline gap-2 text-[12px] leading-snug text-slate-500">
                  <span className="shrink-0 font-serif text-[14px] italic">{ROMAN[i]}.</span>
                  <span>{s.label}</span>
                </dt>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
