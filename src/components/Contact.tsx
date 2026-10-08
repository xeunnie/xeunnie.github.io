"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 1, ease: EASE, delay },
});

/** 마지막 벽 — 한 문장과 연락처 두 줄만 */
export default function Contact() {
  return (
    <section id="contact" className="relative flex min-h-screen items-center py-32 sm:py-44">
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.p {...fade()} className="mb-8 flex items-center gap-4 text-slate-500">
          <span className="font-serif text-[20px] italic text-slate-400">Write to me</span>
          <span aria-hidden className="rule" />
        </motion.p>
        <motion.h2
          {...fade(0.05)}
          className="text-[clamp(2rem,4.4vw,3.4rem)] font-semibold tracking-[-0.045em] text-slate-50"
        >
          연락
        </motion.h2>
        <motion.p {...fade(0.15)} className="mt-6 max-w-md text-[17px] leading-[1.9] text-slate-400">
          새로운 기회나 함께 일할 제안을 기다리고 있습니다.
        </motion.p>

        <motion.dl {...fade(0.3)} className="wall-label mt-20 grid max-w-3xl gap-10 border-t border-slate-700 pt-8 sm:grid-cols-2">
          <div>
            <dt className="mb-3">이메일</dt>
            <dd>
              <a
                href={`mailto:${SITE.email}`}
                aria-label="이메일 보내기"
                className="break-all border-b border-slate-700 pb-1 font-serif text-[clamp(1.35rem,2.4vw,1.75rem)] italic text-slate-100 transition-colors duration-500 hover:border-ice-500 hover:text-ice-500"
              >
                {SITE.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="mb-3">코드</dt>
            <dd>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub 프로필"
                className="border-b border-slate-700 pb-1 font-serif text-[clamp(1.35rem,2.4vw,1.75rem)] italic text-slate-100 transition-colors duration-500 hover:border-ice-500 hover:text-ice-500"
              >
                GitHub
                <span aria-hidden className="ml-2 font-sans text-[14px] not-italic">
                  ↗
                </span>
              </a>
            </dd>
          </div>
        </motion.dl>
      </div>
    </section>
  );
}
