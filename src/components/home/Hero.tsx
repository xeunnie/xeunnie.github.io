"use client";

import { motion } from "framer-motion";
import { HERO_PROOF, DEV_SINCE } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

const LINES = [
  <>
    화면에서 <span className="text-ice-500">서버까지,</span>
  </>,
  <>끝까지 만드는</>,
  <>프론트엔드 개발자</>,
];

/**
 * 첫 화면은 문장 하나로 끝낸다.
 * 큰 글자 세 줄과 한 줄 설명, 그리고 아래쪽에 근거 셋. 버튼은 두지 않는다 —
 * 스크롤하면 바로 첫 해가 시작된다.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between pt-28 pb-10"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-sm font-medium text-slate-500"
        >
          Frontend Developer · {DEV_SINCE} —
        </motion.p>

        <h1 className="mt-6 text-[clamp(2.75rem,8.4vw,7.25rem)] font-extrabold leading-[1.04] tracking-[-0.045em] text-slate-50">
          {LINES.map((line, i) => (
            // 줄마다 아래에서 밀려 올라온다 — 넘치는 부분은 잘라 깔끔하게
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.09, ease: EASE }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.55, ease: EASE }}
          className="mt-10 h-px w-24 origin-left bg-ice-500"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-slate-400"
        >
          프론트엔드를 중심에 두고, 필요하면 API·DB·배포까지 직접 만듭니다.{" "}
          <br className="hidden sm:block" />
          그래서 문제가 화면 밖에서 나도 어디서 났는지 먼저 짚습니다.
        </motion.p>
      </div>

      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.85 }}
        className="mx-auto mt-16 grid w-[calc(100%-3rem)] max-w-[calc(72rem-3rem)] gap-6 border-t border-slate-800 pt-6 sm:grid-cols-3 sm:gap-10"
      >
        {HERO_PROOF.map((p) => (
          <li key={p.href}>
            <a href={`#work-${p.href.split("/").pop()}`} className="group block">
              <p className="text-[15px] font-bold tracking-tight text-slate-100 transition-colors group-hover:text-ice-500">
                {p.lead}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{p.text}</p>
            </a>
          </li>
        ))}
      </motion.ul>
    </section>
  );
}
