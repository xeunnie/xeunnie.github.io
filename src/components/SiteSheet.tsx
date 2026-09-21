"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, MORE_ITEMS, SITE } from "@/lib/constants";

const HOME = {
  ko: "처음으로",
  href: "/",
  question: "어떤 개발자인지 30초 안에",
} as const;

/**
 * 읽는 순서대로 세운다.
 * NAV_ITEMS 를 그대로 펼치면 이력서가 협업 기록 앞에 끼어든다 —
 * 이력서는 다 보고 마지막에 한 장으로 확인하는 자리다.
 */
const ORDER = ["/", "/projects", "/about", "/collaboration", "/growth", "/resume"];
const PAGES = [HOME, ...NAV_ITEMS, ...MORE_ITEMS].sort(
  (a, b) => ORDER.indexOf(a.href) - ORDER.indexOf(b.href)
);

/**
 * 사이트 전체를 한 장에 담은 서랍.
 * 상단 메뉴를 셋으로 줄이면서 타임라인·협업 기록이 푸터까지 내려가 버렸다.
 * 늘 보이게 두면 처음 온 사람이 또 고르게 되니, 필요할 때만 열리는 자리에 둔다.
 */
export default function SiteSheet() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeRef = useRef<HTMLButtonElement>(null);

  const isHere = useCallback(
    (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href)),
    [pathname]
  );

  // 페이지를 옮기면 닫는다
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-label="전체 페이지 열기"
        className="inline-flex items-center gap-2 rounded-full border border-slate-800 px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:border-ice-500/40 hover:text-ice-500"
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M2 4h12M2 8h12M2 12h8" strokeLinecap="round" />
        </svg>
        전체
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[90] bg-slate-950/50 backdrop-blur-[2px]"
            />

            <motion.aside
              key="sheet"
              role="dialog"
              aria-modal="true"
              aria-label="전체 페이지"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 38 }}
              className="fixed inset-y-0 right-0 z-[95] flex w-full max-w-[24rem] flex-col border-l border-slate-800 bg-slate-950 shadow-[0_0_60px_rgb(0_0_0_/_0.25)]"
            >
              <div className="flex items-center justify-between border-b border-slate-800/60 px-6 py-4">
                <p className="text-[11px] font-semibold tracking-[0.06em] text-slate-500">
                  전체 페이지
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="닫기"
                  className="rounded-full p-1.5 text-slate-500 transition-colors hover:bg-slate-900 hover:text-slate-100"
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <nav className="min-h-0 flex-1 overflow-y-auto px-6 py-2">
                <ul className="divide-y divide-slate-800/60">
                  {PAGES.map((item, i) => {
                    const here = isHere(item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={here ? "page" : undefined}
                          className="group flex items-start gap-4 py-4"
                        >
                          <span
                            className={`mt-0.5 font-mono text-xs font-semibold tabular-nums ${
                              here ? "text-ice-500" : "text-slate-600"
                            }`}
                          >
                            {String(i).padStart(2, "0")}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span
                              className={`flex items-center gap-2 text-[15px] font-bold tracking-tight transition-colors ${
                                here ? "text-ice-500" : "text-slate-100 group-hover:text-ice-500"
                              }`}
                            >
                              {item.ko}
                              {here && (
                                <span className="rounded-full bg-ice-100 px-2 py-0.5 text-[10px] font-semibold text-ice-500">
                                  지금 여기
                                </span>
                              )}
                            </span>
                            <span className="mt-1 block text-[13px] leading-relaxed text-slate-500">
                              {item.question}
                            </span>
                          </span>
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="mt-1.5 shrink-0 text-slate-700 transition-colors group-hover:text-ice-500"
                            aria-hidden
                          >
                            <path d="M5 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="border-t border-slate-800/60 px-6 py-5">
                <a
                  href={`mailto:${SITE.email}`}
                  className="block text-sm text-slate-400 transition-colors hover:text-ice-500"
                >
                  {SITE.email}
                </a>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 block text-sm text-slate-400 transition-colors hover:text-ice-500"
                >
                  {SITE.github.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
