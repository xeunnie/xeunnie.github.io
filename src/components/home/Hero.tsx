"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { HERO_PROOF, DEV_SINCE } from "@/lib/constants";

const ROMAN = ["i", "ii", "iii", "iv", "v"];

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
  // 마우스를 따라 벽에 옅은 빛이 머문다 — 조명 아래 서 있는 느낌만
  const ref = useRef<HTMLElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <section
      ref={ref}
      id="top"
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28 pb-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(700px circle at var(--x, 70%) var(--y, 30%), color-mix(in srgb, var(--acc) 6%, transparent), transparent 60%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="flex items-baseline gap-4 text-slate-500"
        >
          <span className="font-serif text-[22px] italic text-slate-200">Frontend Developer</span>
          <span aria-hidden className="rule self-center" />
          <span className="font-serif text-[18px] italic">{DEV_SINCE} —</span>
        </motion.p>

        <h1 className="mt-10 text-[clamp(2.6rem,8vw,6.9rem)] font-bold leading-[1.06] tracking-[-0.05em] text-slate-50">
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
          className="mt-12 h-px w-24 origin-left bg-ice-500"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-slate-400"
        >
          프론트엔드를 중심에 두고, 필요하면 API·DB·배포까지 직접 만듭니다.{" "}
          <br className="hidden sm:block" />
          그래서 문제가 화면 밖에서 생겨도 어디서 생겼는지부터 살펴봅니다.
        </motion.p>
      </div>

      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.85 }}
        className="relative mx-auto mt-16 grid w-[calc(100%-3rem)] max-w-[calc(72rem-3rem)] gap-8 border-t border-slate-700/80 pt-7 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4"
      >
        {HERO_PROOF.map((p, i) => (
          <li key={p.href}>
            <a href={`#work-${p.href.split("/").pop()}`} className="group block">
              <p className="flex items-baseline gap-3">
                <span className="font-serif text-[16px] italic text-slate-500">{ROMAN[i]}.</span>
                <span className="text-[15px] font-semibold tracking-tight text-slate-100 transition-colors group-hover:text-ice-500">
                  {p.lead}
                </span>
              </p>
              <p className="mt-2 pl-7 text-[13px] leading-relaxed text-slate-500">{p.text}</p>
            </a>
          </li>
        ))}
      </motion.ul>
    </section>
  );
}
