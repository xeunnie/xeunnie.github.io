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
    <section className="pt-32 pb-12 mesh-bg border-b border-slate-800/40">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-50">
              {title}
            </h1>
            {lede && (
              <p className="mt-4 text-base text-slate-400 leading-relaxed max-w-2xl">{lede}</p>
            )}
          </div>
          {aside && <div className="shrink-0">{aside}</div>}
        </motion.div>
      </div>
    </section>
  );
}
