"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { CHRONICLE, DEV_SINCE } from "@/lib/constants";
import { openSiteSheet } from "./SiteSheet";

/** 사이트를 관통하는 네 질문. 한 바퀴 읽은 사람이 여기서 원하는 쪽으로 들어간다. */
const ARC = [
  {
    q: "무엇을 만들었나",
    a: "열여덟 개를 문제·대응·근거로 정리했습니다",
    href: "/projects",
    go: "프로젝트",
  },
  {
    q: "같이 일하면 어떤 사람인가",
    a: "좌우명과 일할 때 중요하게 보는 여섯 가지",
    href: "/about",
    go: "일하는 방식",
  },
  {
    q: "같이 일한 분들은 뭐라고 하나",
    a: "디자이너·백엔드·현장 담당자가 해 주신 이야기",
    href: "/collaboration",
    go: "협업 기록",
  },
  {
    q: "어쩌다 여기까지 왔나",
    a: `${DEV_SINCE}년부터 해마다 무엇을 했고 무엇을 할 수 있게 됐는지`,
    href: "/growth",
    go: "타임라인",
  },
];

/**
 * 홈을 한 바퀴 읽은 다음 자리.
 * 앞에서는 갈림길을 두지 않았으니, 여기서 한꺼번에 연다.
 * 네 질문이 곧 네 페이지다 — 궁금한 줄을 누르면 그 페이지로 간다.
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
          className="text-[10px] font-semibold tracking-[0.16em] text-ice-500"
        >
          더 뜯어보기
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
          그 사이에 무슨 일이 있었는지 네 갈래로 나눠 적어 두었습니다. 궁금한 줄부터 열어
          보셔도 됩니다.
        </motion.p>

        <ol className="mt-14 divide-y divide-slate-800/60 border-y border-slate-800/60">
          {ARC.map((item, i) => (
            <motion.li
              key={item.href}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.24 + i * 0.08 }}
            >
              <Link
                href={item.href}
                className="group flex flex-col gap-1.5 py-6 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <span className="font-mono text-[11px] tabular-nums text-ice-500 sm:w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-bold tracking-tight text-slate-100 transition-colors group-hover:text-ice-500 sm:w-72">
                  {item.q}
                </span>
                <span className="min-w-0 flex-1 text-[15px] leading-relaxed text-slate-400">
                  {item.a}
                </span>
                <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-ice-500 transition-all group-hover:gap-2.5">
                  {item.go}
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M5 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </motion.li>
          ))}
        </ol>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10"
        >
          <button
            type="button"
            onClick={openSiteSheet}
            className="group inline-flex items-center gap-3 text-sm font-medium text-slate-400 transition-colors hover:text-ice-500"
          >
            전체 목차 열기
            <span aria-hidden className="flex flex-col gap-[3px]">
              <span className="block h-px w-5 bg-current transition-all group-hover:w-6" />
              <span className="block h-px w-5 bg-current transition-all group-hover:w-4" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
