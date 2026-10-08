"use client";

import { motion } from "framer-motion";
import { PIPELINE } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * 디자인 → 프론트엔드 → 백엔드 → 인프라.
 * "각각을 한 번씩은 끝까지 해 봤다" 는 문장은 글로만 두면 잘 안 읽힌다.
 * 네 칸을 가는 선 위에 나란히 놓고, 지금 서 있는 자리만 표시한다.
 */
export default function Pipeline() {
  return (
    <ol className="mt-10 mb-2 grid gap-x-8 gap-y-8 sm:grid-cols-2 sm:pl-9 lg:grid-cols-4">
      {PIPELINE.map((step, i) => (
        <motion.li
          key={step.area}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
          className={`relative border-t pt-4 ${step.current ? "border-ice-500" : "border-slate-700"}`}
        >
          <p className="flex items-baseline justify-between gap-2">
            <span
              className={`text-[14px] font-semibold tracking-[-0.03em] ${
                step.current ? "text-ice-500" : "text-slate-100"
              }`}
            >
              {step.area}
            </span>
            <span className="font-serif text-[13px] italic text-slate-500">
              {step.current ? "now" : `0${i + 1}`}
            </span>
          </p>
          <p className="mt-1.5 text-[11px] tracking-[0.08em] text-slate-500">{step.where}</p>
          <p className="mt-2 text-[12.5px] leading-[1.75] text-slate-400">{step.detail}</p>
        </motion.li>
      ))}
    </ol>
  );
}
