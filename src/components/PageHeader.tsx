"use client";

import { motion } from "framer-motion";

interface Props {
  title: string;
  lede?: string;
  /** 우측에 놓을 보조 요소 (카운트, 액션 버튼 등) */
  aside?: React.ReactNode;
}

export default function PageHeader({ title, lede, aside }: Props) {
  return (
    <section className="flex min-h-[72vh] items-center pt-32 pb-16">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex w-full flex-col gap-10 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {lede && (
              <p className="mt-6 max-w-2xl text-pretty text-lg leading-[1.8] text-slate-400">{lede}</p>
            )}
          </div>
          {aside && <div className="shrink-0">{aside}</div>}
        </motion.div>
      </div>
    </section>
  );
}
