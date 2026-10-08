"use client";

import { motion } from "framer-motion";

interface Props {
  title: string;
  lede?: string;
  /** 제목 위에 놓는 라틴 한 단어 — 세리프 이탤릭. 예: "Growth" */
  mark?: string;
  /** 우측에 놓을 보조 요소 (카운트, 액션 버튼 등) */
  aside?: React.ReactNode;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * 페이지 첫머리.
 * 벽에 붙은 글처럼 — 위에 작은 이름표, 큰 제목 하나, 짧은 소개, 아래에 가는 선.
 */
export default function PageHeader({ title, lede, mark, aside }: Props) {
  return (
    <section className="flex min-h-[72vh] items-end pt-36 pb-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="flex w-full flex-col gap-10 border-b border-slate-700/80 pb-12 md:flex-row md:items-end md:justify-between"
        >
          <div>
            {mark && (
              <p className="mb-8 flex items-center gap-4 text-slate-500">
                <span className="font-serif text-[22px] italic text-slate-300">{mark}</span>
                <span aria-hidden className="rule" />
              </p>
            )}
            <h1 className="text-[clamp(2.4rem,6vw,4.6rem)] font-semibold leading-[1.1] tracking-[-0.045em] text-slate-50">
              {title}
            </h1>
            {lede && (
              <p className="mt-7 max-w-2xl text-pretty text-[17px] leading-[1.9] text-slate-400">{lede}</p>
            )}
          </div>
          {aside && <div className="shrink-0">{aside}</div>}
        </motion.div>
      </div>
    </section>
  );
}
