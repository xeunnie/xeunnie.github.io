"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

function rise(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
  };
}

/**
 * 목록으로 바로 떨어뜨리지 않고 한 화면을 먼저 둔다.
 * 여기 있는 것들이 나한테 어떤 것인지부터 말하고 목록을 편다 —
 * About 이 좌우명으로 열리는 것과 같은 자리.
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
    <section className="flex min-h-screen items-center pt-28 pb-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.h1 {...rise(0.05)} className="text-[11px] font-semibold tracking-[0.1em] text-ice-500">
          프로젝트
        </motion.h1>

        <motion.p
          {...rise(0.12)}
          className="mt-7 max-w-4xl text-[clamp(1.8rem,5vw,3.4rem)] font-bold leading-[1.22] tracking-tight text-slate-50"
        >
          만들어 놓고도
          <br />
          자꾸 들여다보게 됩니다
        </motion.p>

        <motion.p {...rise(0.22)} className="mt-8 max-w-2xl text-lg leading-[1.8] text-slate-400">
          하나하나 이름을 붙여 키운 것들이라, 제 손을 떠난 뒤에도 잘 돌아가는지 마음이 쓰입니다.
          고칠 게 보이면 지금도 고칩니다.
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

        <motion.p
          {...rise(0.4)}
          className="mt-12 max-w-2xl text-sm leading-relaxed text-slate-500"
        >
          회사·학업·팀·제품군으로 걸러 볼 수 있습니다. 상세 페이지에는 무엇이 문제였고 그때 어떻게
          판단했는지를 적어 두었습니다. 궁금한 것부터 골라 보셔도 됩니다.
        </motion.p>
      </div>
    </section>
  );
}
