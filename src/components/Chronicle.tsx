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

/** 구간 이름 — 한 해 안에서 무엇을 보고 있는지 알려주는 작은 머리글 */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[11px] font-semibold tracking-[0.06em] text-slate-500">{children}</p>
  );
}

function PostList({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  return (
    /* 글 목록은 접어 둔다 — 연차 이야기를 읽는 흐름을 끊지 않도록 */
    <details className="group mt-10 rounded-xl border border-slate-800/60 bg-slate-900/25 p-5">
      <summary className="flex cursor-pointer select-none items-center justify-between gap-3 text-[11px] font-semibold tracking-[0.06em] text-slate-500 [&::-webkit-details-marker]:hidden">
        <span>그 해에 쓴 글 {posts.length}편</span>
        <span className="text-ice-500">
          <span className="group-open:hidden">펼치기</span>
          <span className="hidden group-open:inline">접기</span>
        </span>
      </summary>
      <ul className="mt-4 flex flex-col gap-2.5">
        {posts.map((p) => (
          <li key={p.link}>
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/post flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-slate-300 transition-colors hover:text-ice-500"
            >
              <span className="font-mono text-[11px] tabular-nums text-slate-600">{p.date}</span>
              <span
                className={`shrink-0 rounded border px-1.5 py-px font-mono text-[9px] uppercase tracking-wider ${SOURCE_STYLE[p.source]}`}
              >
                {p.source}
              </span>
              <span className="flex-1 leading-relaxed underline-offset-4 group-hover/post:underline">
                {p.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

/**
 * 한 해.
 * 연도를 왼쪽에 크게 세우고 이야기는 오른쪽에서 읽게 한다.
 * 점과 세로선으로 시간을 그리던 것을 걷어냈다 — 연도가 이미 시간을 말한다.
 * 한 해 안의 순서: 무슨 해였나 → 있었던 일 → 할 수 있게 된 것 → 만든 것 → 쓴 글.
 */
function YearBlock({
  year,
  posts,
  index,
}: {
  year: ChronicleYear;
  posts: BlogPost[];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const projects = year.projects
    .map((slug) => PROJECTS.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: Math.min(index * 0.05, 0.2) }}
      className="grid gap-6 border-t border-slate-800/60 py-14 first:border-t-0 first:pt-0 lg:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] lg:gap-16"
    >
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="font-mono text-4xl font-bold tabular-nums text-ice-500 sm:text-5xl">
          {year.year}
        </p>
        <div aria-hidden className="mt-5 hidden h-0.5 w-12 rounded-full bg-ice-500 lg:block" />
      </div>

      <div className="min-w-0">
        <h2 className="max-w-2xl text-2xl font-bold leading-snug tracking-tight text-slate-50 sm:text-3xl">
          {year.headline}
        </h2>

        <div className="mt-6 space-y-4">
          {year.story.map((s) => (
            <p key={s} className="max-w-[42rem] text-[17px] leading-[1.9] text-slate-300">
              {s}
            </p>
          ))}
        </div>

        <div className="mt-10">
          <Label>있었던 일</Label>
          <ol className="divide-y divide-slate-800/60 border-y border-slate-800/60">
            {year.moments.map((m) => (
              <li
                key={m.when + m.what}
                className="grid gap-x-6 gap-y-1 py-3.5 sm:grid-cols-[7rem_minmax(0,1fr)]"
              >
                <span className="font-mono text-[13px] tabular-nums text-ice-500">{m.when}</span>
                <span className="text-[15px] leading-[1.8] text-slate-300">{m.what}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10">
          <Label>할 수 있게 된 것</Label>
          <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {year.gained.map((g) => (
              <li key={g} className="flex min-w-0 items-start gap-2.5">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-1.5 shrink-0 text-ice-500"
                  aria-hidden
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-[15px] leading-[1.75] text-slate-300">{g}</span>
              </li>
            ))}
          </ul>
        </div>

        {projects.length > 0 && (
          <div className="mt-10">
            <Label>그 해에 만든 것</Label>
            <ul className="divide-y divide-slate-800/60 border-y border-slate-800/60">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group flex flex-wrap items-baseline gap-x-3 gap-y-1 py-3"
                  >
                    <span className="text-[15px] font-semibold text-slate-100 transition-colors group-hover:text-ice-500">
                      {p.title}
                    </span>
                    {p.award && (
                      <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[11px] font-medium text-amber-400">
                        수상
                      </span>
                    )}
                    <span className="min-w-0 flex-1 truncate text-[13px] text-slate-500">
                      {p.subtitle}
                    </span>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="shrink-0 text-slate-600 transition-colors group-hover:text-ice-500"
                      aria-hidden
                    >
                      <path d="M5 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-1.5">
          {year.techs.map((t) => (
            <TechBadge key={t} name={t} size="sm" />
          ))}
        </div>

        <PostList posts={posts} />
      </div>
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
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* 정렬은 프로젝트 목록과 같은 밑줄 탭으로 — 사이트 안에서 같은 동작은 같은 모양이어야 한다 */}
        <div className="mb-14 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-slate-800 py-3">
          <span className="font-mono text-xs tabular-nums text-slate-500">
            {CHRONICLE[0].year}
            <span className="mx-1 text-slate-700">—</span>
            {CHRONICLE[CHRONICLE.length - 1].year}
          </span>
          <div className="ml-auto flex items-center gap-4">
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
                className={`relative py-1 text-xs transition-colors ${
                  newestFirst === o.key
                    ? "font-semibold text-slate-100"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {o.label}
                {newestFirst === o.key && (
                  <motion.span
                    layoutId="chronicle-underline"
                    className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-ice-500"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <ol>
          {years.map((year, i) => (
            <YearBlock key={year.year} year={year} posts={byYear(year.year)} index={i} />
          ))}
        </ol>

        <div className="mt-20 border-t border-slate-800/60 pt-12">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-slate-50">블로그</h2>
          <p className="mb-8 text-[15px] leading-relaxed text-slate-400">
            {linked > 0
              ? `두 블로그의 글 ${linked}편을 위 타임라인의 해당 연도에 연결해 두었습니다.`
              : "글 목록을 불러오지 못했습니다. 아래에서 직접 확인하실 수 있습니다."}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {BLOG_SOURCES.map((s) => (
              <a
                key={s.key}
                href={s.home}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-slate-800/60 bg-slate-900/20 p-6 transition-colors hover:border-ice-500/30"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-sm font-semibold text-slate-100 transition-colors group-hover:text-ice-500">
                    {s.name}
                  </span>
                  <span className="font-mono text-xs text-slate-500">
                    {posts.filter((p) => p.source === s.key).length}편
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed text-slate-400">{s.note}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
