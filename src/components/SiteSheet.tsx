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

/** 본문 어디서든 서랍을 연다 — 상단 버튼 말고도 열 수 있어야 하는 자리가 있다 */
export const SHEET_EVENT = "site-sheet:open";
export function openSiteSheet() {
  window.dispatchEvent(new Event(SHEET_EVENT));
}

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
    const onOpen = () => setOpen(true);
    window.addEventListener(SHEET_EVENT, onOpen);
    return () => window.removeEventListener(SHEET_EVENT, onOpen);
  }, []);

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
        className="group inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition-colors hover:text-ice-500"
      >
        <span aria-hidden className="flex flex-col gap-[3px]">
          <span className="block h-px w-4 bg-current transition-all group-hover:w-5" />
          <span className="block h-px w-4 bg-current transition-all group-hover:w-3" />
        </span>
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
              className="fixed inset-0 z-[90] bg-slate-950/40 backdrop-blur-[3px]"
            />

            <motion.aside
              key="sheet"
              role="dialog"
              aria-modal="true"
              aria-label="전체 페이지"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 36 }}
              className="fixed inset-y-0 right-0 z-[95] flex w-full max-w-[26rem] flex-col bg-slate-950 shadow-[0_0_80px_rgb(0_0_0_/_0.2)]"
            >
              {/* 왼쪽 가장자리의 한 줄 — 도록의 책등처럼 */}
              <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-slate-800" />

              <div className="flex items-start justify-between px-9 pb-2 pt-9">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-slate-500">
                  INDEX
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="닫기"
                  className="-mr-2 -mt-2 rounded-full p-2 text-slate-500 transition-colors hover:text-slate-100"
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <nav className="min-h-0 flex-1 overflow-y-auto px-9 py-6">
                <ul>
                  {PAGES.map((item, i) => {
                    const here = isHere(item.href);
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.08 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
                        className="border-b border-slate-800/60 last:border-0"
                      >
                        <Link
                          href={item.href}
                          aria-current={here ? "page" : undefined}
                          className="group flex items-baseline gap-5 py-5"
                        >
                          <span
                            className={`font-mono text-[11px] tabular-nums transition-colors ${
                              here ? "text-ice-500" : "text-slate-600"
                            }`}
                          >
                            {String(i).padStart(2, "0")}
                          </span>
                          <span
                            className={`text-[26px] font-bold leading-none tracking-tight transition-all duration-300 group-hover:translate-x-1 ${
                              here ? "text-ice-500" : "text-slate-100 group-hover:text-ice-500"
                            }`}
                          >
                            {item.ko}
                          </span>
                          {here && (
                            <span
                              aria-hidden
                              className="ml-auto h-1.5 w-1.5 shrink-0 self-center rounded-full bg-ice-500"
                            />
                          )}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="px-9 pb-9"
              >
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-[13px] text-slate-500 transition-colors hover:text-ice-500"
                >
                  {SITE.email}
                </a>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
