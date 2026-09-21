"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FUTURE } from "@/lib/constants";

/**
 * 앞으로 되고 싶은 모습.
 * 지나온 것(타임라인)이 뒤를 보여 준다면, 이 구간은 앞을 본다.
 * 연차를 크게 세워 한눈에 3 · 5 · 10 이 읽히게 한다.
 */
export default function Future() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl">
            앞으로 이런 개발자이고 싶습니다
          </h2>
        </motion.div>

        <ol className="divide-y divide-slate-800/60 border-y border-slate-800/60">
          {FUTURE.map((step, i) => (
            <motion.li
              key={step.when}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="flex flex-col gap-2 py-7 sm:flex-row sm:gap-10"
            >
              <div className="sm:w-28 sm:shrink-0">
                <p className="font-mono text-sm font-semibold text-ice-500">{step.when}</p>
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold tracking-tight text-slate-100">{step.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">{step.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
