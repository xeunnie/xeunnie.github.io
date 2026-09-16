"use client";

import { useRef, useState, useMemo } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { CHRONICLE, PROJECTS, BLOG_SOURCES } from "@/lib/constants";
import type { ChronicleYear, BlogPost } from "@/lib/constants";
import TechBadge from "./TechBadge";

const SOURCE_STYLE: Record<string, string> = {
  tistory: "border-amber-400/30 bg-amber-400/[0.09] text-amber-400",
  velog: "border-emerald-400/30 bg-emerald-400/[0.09] text-emerald-400",
};

function PostList({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  return (
    /* 글 목록은 접어 둔다 — 연차 이야기를 읽는 흐름을 끊지 않도록 */
    <details className="group mt-7 rounded-xl border border-slate-800/70 bg-slate-900/60 p-5">
      <summary className="flex cursor-pointer select-none items-center justify-between gap-3 font-mono text-[10px] tracking-[0.16em] uppercase text-slate-500 [&::-webkit-details-marker]:hidden">
        <span>그 해에 쓴 글 · {posts.length}편</span>
        <span className="text-ice-500 normal-case tracking-normal">
          <span className="group-open:hidden">펼치기</span>
          <span className="hidden group-open:inline">접기</span>
        </span>
      </summary>
      <ul className="mt-3 flex flex-col gap-2">
        {posts.map((p) => (
          <li key={p.link}>
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-slate-300 hover:text-ice-300 transition-colors"
            >
              <span className="font-mono text-[11px] text-slate-600 tabular-nums">{p.date}</span>
              <span
                className={`shrink-0 rounded border px-1.5 py-px font-mono text-[9px] uppercase tracking-wider ${SOURCE_STYLE[p.source]}`}
              >
                {p.source}
              </span>
              <span className="flex-1 leading-relaxed group-hover:underline underline-offset-4">
                {p.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

function YearBlock({
  year,
  posts,
  index,
  last,
}: {
  year: ChronicleYear;
  posts: BlogPost[];
  index: number;
  last: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const projects = year.projects
    .map((slug) => PROJECTS.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: Math.min(index * 0.05, 0.2) }}
      className="relative pl-8 sm:pl-16 pb-16 last:pb-0"
    >
      {!last && (
        <span
          aria-hidden
          className="absolute left-[7px] sm:left-[11px] top-12 bottom-0 w-px bg-gradient-to-b from-ice-500/40 via-slate-800/60 to-slate-800/20"
        />
      )}
      <span
        aria-hidden
        className="absolute left-0 top-3 h-4 w-4 sm:h-6 sm:w-6 rounded-full border-2 border-ice-500/50 bg-slate-950"
      />

      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
        <span className="font-mono text-2xl sm:text-3xl font-bold text-ice-400 tabular-nums">
          {year.year}
        </span>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-slate-50 leading-snug mb-5 max-w-2xl">
        {year.headline}
      </h2>

      <div className="space-y-4 max-w-2xl mb-7">
        {year.story.map((s) => (
          <p key={s} className="text-sm sm:text-[15px] text-slate-300 leading-relaxed">
            {s}
          </p>
        ))}
      </div>

      <ol className="border-l border-slate-800/70 pl-5 space-y-2.5 mb-7">
        {year.moments.map((m) => (
          <li key={m.when + m.what} className="grid sm:grid-cols-[110px_1fr] gap-x-4 gap-y-0.5">
            <span className="font-mono text-[11px] text-ice-500 tabular-nums pt-0.5">
              {m.when}
            </span>
            <span className="text-sm text-slate-300 leading-relaxed">{m.what}</span>
          </li>
        ))}
      </ol>

      <div className="mb-6 max-w-2xl">
        <p className="text-xs font-semibold text-slate-400 mb-2.5">할 수 있게 된 것</p>
        <ul className="flex flex-wrap gap-2">
          {year.gained.map((g) => (
            <li
              key={g}
              className="inline-flex items-start gap-1.5 rounded-lg border border-slate-800/70 bg-slate-900/40 px-3 py-1.5 text-xs text-slate-300 leading-relaxed"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 shrink-0 text-ice-500"
                aria-hidden
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {g}
            </li>
          ))}
        </ul>
      </div>

      {projects.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800/70 bg-slate-900/40 px-3 py-1.5 text-xs text-slate-300 hover:border-ice-500/30 hover:text-ice-300 transition-all"
            >
              {p.title}
              {p.award && <span aria-hidden>🏆</span>}
              <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M4 2l5 5-5 5" />
              </svg>
            </Link>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {year.techs.map((t) => (
          <TechBadge key={t} name={t} size="sm" />
        ))}
      </div>

      <PostList posts={posts} />
    </motion.li>
  );
}

export default function Chronicle({ posts }: { posts: BlogPost[] }) {
  const [newestFirst, setNewestFirst] = useState(false);
  const byYear = (year: string) => posts.filter((p) => p.year === year);
  const linked = posts.length;

  const years = useMemo(
    () => (newestFirst ? [...CHRONICLE].reverse() : CHRONICLE),
    [newestFirst]
  );

  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-400">
            {CHRONICLE[0].year}년부터 {CHRONICLE[CHRONICLE.length - 1].year}년까지
          </p>
          <div className="inline-flex rounded-lg border border-slate-800 bg-slate-900/60 p-0.5">
            {(
              [
                { key: false, label: "오래된 순" },
                { key: true, label: "최신 순" },
              ] as const
            ).map((o) => (
              <button
                key={String(o.key)}
                onClick={() => setNewestFirst(o.key)}
                aria-pressed={newestFirst === o.key}
                className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  newestFirst === o.key
                    ? "bg-ice-100 text-ice-400"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <ol>
          {years.map((year, i) => (
            <YearBlock
              key={year.year}
              year={year}
              posts={byYear(year.year)}
              index={i}
              last={i === years.length - 1}
            />
          ))}
        </ol>

        {/* 블로그 안내 */}
        <div className="mt-16 pt-10 border-t border-slate-800/60">
          <h2 className="text-lg font-bold text-slate-100 mb-2">블로그</h2>
          <p className="text-sm text-slate-400 mb-6">
            {linked > 0
              ? `두 블로그의 글 ${linked}편을 위 타임라인의 해당 연도에 연결해 두었습니다.`
              : "글 목록을 불러오지 못했습니다. 아래에서 직접 확인하실 수 있습니다."}
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {BLOG_SOURCES.map((s) => (
              <a
                key={s.key}
                href={s.home}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-slate-800/60 bg-slate-900/30 p-5 hover:border-ice-500/25 hover:bg-slate-900/50 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm font-semibold text-slate-100 group-hover:text-ice-400 transition-colors">
                    {s.name}
                  </span>
                  <span className="font-mono text-xs text-slate-500">
                    {posts.filter((p) => p.source === s.key).length}편
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{s.note}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
