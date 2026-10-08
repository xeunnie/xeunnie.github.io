"use client";

import Link from "next/link";
import { CAREERS } from "@/lib/constants";

/**
 * 경력 한 줄 목록.
 * 상세한 경력·교육·활동은 이력서 페이지에 있으므로 여기서는 입구만 둔다.
 * (같은 내용을 두 페이지에 늘어놓으면 어느 쪽을 읽어야 할지 알 수 없게 된다)
 */
export default function CareerLinks() {
  const rows = CAREERS.map((c, i) => ({ ...c, id: i })).filter((c) => c.type !== "education");

  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-8 flex items-center gap-4 text-[11px] font-medium tracking-[0.16em] text-slate-500">
          <span aria-hidden className="rule" />
          경력
        </h2>

        <ul className="border-t border-slate-700">
          {rows.map((c) => (
            <li key={c.id} className="border-b border-slate-800">
              <Link
                href={`/career/${c.id}`}
                className="group grid gap-x-8 gap-y-1 py-6 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto] sm:items-baseline"
              >
                <span className="font-semibold tracking-[-0.03em] text-slate-100 transition-colors duration-500 group-hover:text-ice-500">
                  {c.company}
                </span>
                <span className="text-[14px] text-slate-400">
                  {c.role}
                  {c.team && <span className="ml-2 text-[12px] text-slate-500">{c.team}</span>}
                </span>
                <span className="text-[12px] tabular-nums text-slate-500">{c.period}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-[13px] leading-relaxed text-slate-500">
          회사별로 무엇을 했는지는 위를 눌러서, 교육·활동을 포함한 전체 이력은{" "}
          <Link
            href="/resume"
            className="text-slate-300 underline decoration-slate-700 underline-offset-4 transition-colors duration-500 hover:text-ice-500 hover:decoration-ice-500"
          >
            이력서
          </Link>
          에 정리돼 있습니다.
        </p>
      </div>
    </section>
  );
}
