"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CHRONICLE, DEV_SINCE } from "@/lib/constants";
import { openSiteSheet } from "./SiteSheet";

/** 사이트를 관통하는 네 질문. 순서대로 읽으면 한 사람의 이야기가 된다. */
const ARC = [
  { q: "무엇을 만들었나", a: "지하철 역사와 골프장에서 매일 도는 화면들" },
  { q: "같이 일하면 어떤 사람인가", a: "좌우명과 일할 때 중요하게 보는 여섯 가지" },
  { q: "같이 일한 분들은 뭐라고 하나", a: "디자이너·백엔드·현장 담당자가 해 주신 이야기" },
  { q: "어쩌다 여기까지 왔나", a: `${DEV_SINCE}년부터 해마다 무엇을 했고 무엇을 할 수 있게 됐는지` },
];

/**
 * 대표 작업을 본 다음 자리.
 * 여기서 갈래를 늘어놓으면 또 고르게 되니, 이야기의 뼈대만 보여 주고
 * 문은 하나만 둔다 — 누르면 전체 목차가 열린다.
 */
export default function Explore() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const years = [...CHRONICLE.map((c) => c.year)].sort();

  return (
    <section className="flex min-h-screen items-center py-24" ref={ref}>
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-semibold tracking-[0.14em] text-ice-500"
        >
          이 사이트를 보는 법
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-6 max-w-5xl text-[clamp(1.6rem,4vw,2.6rem)] font-bold leading-[1.3] tracking-tight text-slate-50"
        >
          {/* 한 줄씩 끊어 둔다 — 강제 줄바꿈을 섞으면 좁은 화면에서 한 어절만 남는다 */}
          <span className="block">{years[0]}년 교내 웹사이트를 혼자 맡으며 시작해,</span>
          <span className="block">지금은 현장에서 매일 도는 화면을 만듭니다</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mt-6 max-w-2xl text-lg leading-[1.8] text-slate-400"
        >
          그 사이에 무슨 일이 있었는지 네 갈래로 나눠 적어 두었습니다. 순서대로 읽으셔도 되고,
          궁금한 것부터 펼치셔도 됩니다.
        </motion.p>

        <ol className="mt-14 divide-y divide-slate-800/60 border-y border-slate-800/60">
          {ARC.map((item, i) => (
            <motion.li
              key={item.q}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.24 + i * 0.08 }}
              className="flex flex-col gap-1.5 py-5 sm:flex-row sm:items-baseline sm:gap-8"
            >
              <span className="font-mono text-[11px] tabular-nums text-ice-500 sm:w-8">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-lg font-bold tracking-tight text-slate-100 sm:w-72">
                {item.q}
              </span>
              <span className="min-w-0 flex-1 text-[15px] leading-relaxed text-slate-400">
                {item.a}
              </span>
            </motion.li>
          ))}
        </ol>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12"
        >
          <button
            type="button"
            onClick={openSiteSheet}
            className="group inline-flex items-center gap-3 rounded-full bg-ice-500 px-8 py-4 text-[15px] font-semibold text-slate-950 transition-colors hover:bg-ice-600"
          >
            페이지 자세히 살펴보기
            <span aria-hidden className="flex flex-col gap-[3px]">
              <span className="block h-px w-4 bg-current transition-all group-hover:w-5" />
              <span className="block h-px w-4 bg-current transition-all group-hover:w-3" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
