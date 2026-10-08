"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { YEARS } from "@/lib/home";

/**
 * 오른쪽 가장자리의 연도 목록 — 지금 몇 년도를 읽고 있는지.
 * 첫 화면과 맨 아래 연락 구간에서는 숨긴다. 좁은 화면에서는 아예 두지 않는다 —
 * 본문을 가리는 것보다 스크롤만으로 읽히는 편이 낫다.
 */
export default function YearIndex() {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const ids = [...YEARS.map((y) => y.id), "contact"];
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    // 화면 위에서 40% 지점을 지나는 구간을 "지금 읽는 해" 로 본다
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
      },
      { rootMargin: "-40% 0px -59% 0px" }
    );
    els.forEach((el) => io.observe(el));
    // 첫 화면으로 돌아오면 숨긴다
    const hero = document.getElementById("top");
    const heroIo = new IntersectionObserver(([e]) => e.isIntersecting && setCurrent(null), {
      rootMargin: "-40% 0px -59% 0px",
    });
    if (hero) heroIo.observe(hero);
    return () => {
      io.disconnect();
      heroIo.disconnect();
    };
  }, []);

  const visible = current !== null && current !== "contact";

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="연도"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 xl:block"
        >
          <ol className="flex flex-col items-end gap-2.5">
            {YEARS.map((y) => {
              const on = y.id === current;
              return (
                <li key={y.id}>
                  <a
                    href={`#${y.id}`}
                    aria-current={on ? "location" : undefined}
                    className={`flex items-center gap-2.5 font-serif italic transition-all ${
                      on ? "text-[17px] text-slate-50" : "text-[14px] text-slate-600 hover:text-slate-300"
                    }`}
                  >
                    {y.chronicle.year}
                    <span
                      aria-hidden
                      className={`h-px transition-all duration-300 ${on ? "w-6 bg-ice-500" : "w-3 bg-slate-700"}`}
                    />
                  </a>
                </li>
              );
            })}
          </ol>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
