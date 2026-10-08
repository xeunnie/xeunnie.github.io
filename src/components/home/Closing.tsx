"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay, ease: EASE },
});

/** 홈에서 다 못 보여 준 것들 */
const MORE = [
  { href: "/projects", title: "프로젝트 전체", text: "프로젝트마다 문제, 대응, 근거를 정리했습니다" },
  { href: "/about", title: "일하는 방식", text: "좌우명과 일할 때 중요하게 보는 것" },
  { href: "/collaboration", title: "협업 기록", text: "디자이너·백엔드·현장 담당자와 맞춰 간 과정" },
  { href: "/growth", title: "타임라인", text: "해마다의 이야기와 그때 쓴 블로그 글" },
];

function Chevron() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M5 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 마지막 구간 — 연락처, 이력서, 그리고 더 볼 곳 */
export default function Closing() {
  return (
    <section id="contact" className="scroll-mt-16 border-t border-slate-800/70 py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <motion.div {...fade()}>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.1] tracking-[-0.04em] text-slate-50">
            연락
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-400">
            새로운 기회나 협업에 열려 있습니다.
          </p>

          <dl className="mt-10 grid grid-cols-[4.5rem_1fr] gap-y-3 text-[15px]">
            <dt className="text-slate-500">메일</dt>
            <dd>
              <a href={`mailto:${SITE.email}`} className="text-slate-100 underline-offset-4 transition-colors hover:text-ice-500 hover:underline">
                {SITE.email}
              </a>
            </dd>
            <dt className="text-slate-500">GitHub</dt>
            <dd>
              <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="text-slate-100 underline-offset-4 transition-colors hover:text-ice-500 hover:underline">
                {SITE.github.replace("https://", "")}
              </a>
            </dd>
          </dl>

          <Link
            href="/resume"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-ice-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-ice-600"
          >
            이력서 보기
            <Chevron />
          </Link>
        </motion.div>

        <motion.nav {...fade(0.1)} aria-label="더 보기">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-slate-500">더 보기</p>
          <ul className="mt-5 divide-y divide-slate-800/70 border-y border-slate-800/70">
            {MORE.map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="group flex items-baseline gap-4 py-5">
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-slate-100 transition-colors group-hover:text-ice-500">{m.title}</span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-slate-400">{m.text}</span>
                  </span>
                  <span className="text-ice-500 transition-transform group-hover:translate-x-1">
                    <Chevron />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      </div>
    </section>
  );
}
