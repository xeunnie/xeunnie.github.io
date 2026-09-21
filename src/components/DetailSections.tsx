"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ProjectSection } from "@/lib/constants";

interface Props {
  sections: ProjectSection[];
  /** 항목 한 줄을 그리는 방법은 상세 페이지가 알고 있다 */
  renderItem: (item: string) => React.ReactNode;
}

/**
 * 프로젝트 상세의 "자세히".
 * 다 펼쳐 두면 벽이 되고, 다 접어 두면 무엇이 들었는지 알 수 없다.
 * 앞의 둘만 펼쳐 두고, 접힌 것에는 첫 줄을 미리 보여 준다.
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
    <div>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-bold tracking-tight text-slate-50 sm:text-2xl">자세히</h2>
        <button
          type="button"
          onClick={() => setOpen(allOpen ? new Set() : new Set(sections.map((_, i) => i)))}
          className="text-xs text-slate-500 transition-colors hover:text-ice-500"
        >
          {allOpen ? "모두 접기" : `모두 펼치기 (${sections.length})`}
        </button>
      </div>

      <p className="mb-7 text-sm leading-relaxed text-slate-400">
        궁금한 항목을 펼치면 그때 무엇이 문제였고 어떻게 판단했는지 나옵니다.
      </p>

      <div className="space-y-2.5">
        {sections.map((section, i) => {
          const isOpen = open.has(i);
          // 접혀 있을 때 제목만 보이면 무엇이 들었는지 알 수 없다. 첫 항목의 앞머리를 보여 준다.
          const peek = section.items[0].split(" — ")[0];

          return (
            <section
              key={section.title}
              className={`overflow-hidden rounded-xl border transition-colors ${
                isOpen ? "border-ice-500/25 bg-ice-50" : "border-slate-800/60 bg-slate-900/25"
              }`}
            >
              <h3>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-900/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ice-500/30"
                >
                  <span
                    className={`mt-0.5 font-mono text-xs font-semibold tabular-nums transition-colors ${
                      isOpen ? "text-ice-500" : "text-slate-600"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-base font-semibold transition-colors ${
                        isOpen ? "text-ice-500" : "text-slate-200"
                      }`}
                    >
                      {section.title}
                    </span>
                    {!isOpen && (
                      <span className="mt-1 block truncate text-xs text-slate-500">{peek}</span>
                    )}
                  </span>

                  <span className="mt-0.5 flex shrink-0 items-center gap-2">
                    <span className="rounded-full bg-slate-900 px-2 py-0.5 font-mono text-[11px] text-slate-500">
                      {section.items.length}
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-ice-500" : "text-slate-500"
                      }`}
                    >
                      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
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
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 border-t border-ice-500/15 px-5 pb-5 pt-5">
                      {section.items.map((item, j) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: 0.05 + j * 0.03 }}
                        >
                          {renderItem(item)}
                        </motion.div>
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
