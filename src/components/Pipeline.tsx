"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PIPELINE } from "@/lib/constants";

/**
 * 디자인 → 프론트엔드 → 백엔드 → 인프라.
 * "각각을 한 번씩은 끝까지 해 봤다" 는 문장은 글로만 두면 잘 안 읽힌다.
 * 네 칸을 나란히 놓아 한눈에 보이게 하고, 지금 서 있는 자리만 표시한다.
 */
export default function Pipeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="my-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {PIPELINE.map((step, i) => (
        <motion.div
          key={step.area}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: i * 0.08 }}
          className={`relative rounded-xl border p-4 ${
            step.current
              ? "border-ice-500/40 bg-ice-100"
              : "border-slate-800/60 bg-slate-900/25"
          }`}
        >
          {/* 칸 사이를 잇는 선 — 지나온 순서가 보이게 */}
          {i < PIPELINE.length - 1 && (
            <span
              aria-hidden
              className="absolute right-[-13px] top-1/2 hidden h-px w-3 bg-slate-800 lg:block"
            />
          )}
          <p
            className={`text-sm font-bold tracking-tight ${
              step.current ? "text-ice-500" : "text-slate-200"
            }`}
          >
            {step.area}
          </p>
          <p className="mt-1 text-xs text-slate-500">{step.where}</p>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">{step.detail}</p>
        </motion.div>
      ))}
    </div>
  );
}
