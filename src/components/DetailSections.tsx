"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProjectSection } from "@/lib/constants";

interface Props {
  sections: ProjectSection[];
  /** 항목 한 줄을 그리는 방법은 상세 페이지가 알고 있다 */
  renderItem: (item: string) => React.ReactNode;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * 프로젝트 상세의 "자세히".
 * 다 펼쳐 두면 벽이 되고, 다 접어 두면 무엇이 들었는지 알 수 없다.
 * 앞의 둘만 펼쳐 두고, 접힌 것에는 첫 줄을 미리 보여 준다.
 * 상자 대신 가는 선으로만 나누고, 왼쪽 좁은 열에 이름표, 오른쪽에 항목들.
 */
export default function DetailSections({ sections, renderItem }: Props) {
  const [open, setOpen] = useState<Set<number>>(new Set([0, 1]));
  const allOpen = open.size === sections.length;

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div className="grid gap-x-16 gap-y-10 border-t border-slate-800 pt-12 lg:grid-cols-[12rem_minmax(0,1fr)]">
      <div className="flex flex-col gap-3">
        <span aria-hidden className="rule text-slate-500" />
        <h2 className="text-[12px] font-medium tracking-[0.16em] text-slate-400">자세히</h2>
        <p className="text-[12px] leading-relaxed text-slate-500">
          궁금한 항목을 펼치면 그때 무엇이 문제였고 어떻게 판단했는지 나옵니다.
        </p>
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(sections.map((_, i) => i)))}
          className="mt-2 inline-flex items-center gap-3 self-start text-[12px] text-slate-400 transition-colors hover:text-slate-50"
        >
          <span aria-hidden className="h-px w-5 bg-current" />
          {allOpen ? "모두 접기" : `모두 펼치기 (${sections.length})`}
        </button>
      </div>

      <div className="min-w-0 border-b border-slate-800">
        {sections.map((section, i) => {
          const isOpen = open.has(i);
          // 접혀 있을 때 제목만 보이면 무엇이 들었는지 알 수 없다. 첫 항목의 앞머리를 보여 준다.
          const peek = section.items[0].split(" — ")[0];

          return (
            <section key={section.title} className="border-t border-slate-800 first:border-t-0">
              <h3>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-start gap-5 py-6 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-slate-500"
                >
                  <span className="w-9 shrink-0 font-serif text-[17px] italic leading-[1.4] tabular-nums tracking-normal text-slate-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-[17px] font-semibold tracking-[-0.025em] transition-colors duration-500 ${
                        isOpen ? "text-slate-50" : "text-slate-300 group-hover:text-slate-50"
                      }`}
                    >
                      {section.title}
                    </span>
                    {!isOpen && <span className="mt-1.5 block truncate text-[13px] text-slate-500">{peek}</span>}
                  </span>

                  <span className="mt-1 flex shrink-0 items-center gap-4 text-slate-500">
                    <span className="font-serif text-[14px] italic tabular-nums tracking-normal">
                      {section.items.length}
                    </span>
                    {/* 더하기가 빼기로 — 가로선만 남는다 */}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
                      <path d="M1 6h10" />
                      <path
                        d="M6 1v10"
                        className={`origin-center [transform-box:fill-box] transition-transform duration-500 ${isOpen ? "scale-y-0" : ""}`}
                      />
                    </svg>
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="max-w-[46rem] space-y-6 pb-10 sm:pl-14">
                      {section.items.map((item) => (
                        <div key={item}>{renderItem(item)}</div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          );
        })}
      </div>
    </div>
  );
}
