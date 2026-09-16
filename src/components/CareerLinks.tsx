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
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-6">Career</h2>

        <ul className="divide-y divide-slate-800/60 border-y border-slate-800/60">
          {rows.map((c) => (
            <li key={c.id}>
              <Link
                href={`/career/${c.id}`}
                className="group flex flex-wrap items-baseline gap-x-3 gap-y-1 py-4 transition-colors hover:bg-slate-900/30"
              >
                <span className="text-sm font-semibold text-slate-200 group-hover:text-ice-400 transition-colors">
                  {c.company}
                </span>
                {c.team && <span className="text-xs text-slate-500">{c.team}</span>}
                <span className="text-sm text-slate-400">{c.role}</span>
                <span className="ml-auto font-mono text-xs text-slate-500">{c.period}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-sm text-slate-500">
          회사별로 무엇을 했는지는 위를 눌러서, 교육·활동을 포함한 전체 이력은{" "}
          <Link href="/resume" className="text-ice-400 underline underline-offset-4">
            이력서
          </Link>
          에 정리돼 있습니다.
        </p>
      </div>
    </section>
  );
}
