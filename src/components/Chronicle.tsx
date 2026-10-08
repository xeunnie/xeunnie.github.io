"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CHRONICLE, PROJECTS, BLOG_SOURCES, BADGES } from "@/lib/constants";
import type { ChronicleYear, BlogPost } from "@/lib/constants";

const EASE = [0.16, 1, 0.3, 1] as const;
const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii"];

const fade = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 1, ease: EASE },
};

/** 구간 머리 — 짧은 선과 작은 이름표 */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-6 flex items-center gap-4 text-[11px] tracking-[0.16em] text-slate-500">
      <span aria-hidden className="rule" />
      {children}
    </p>
  );
}

function PostList({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  return (
    /* 글 목록은 접어 둔다 — 연차 이야기를 읽는 흐름을 끊지 않도록 */
    <details className="group mt-14 border-t border-slate-800 pt-6">
      <summary className="inline-flex cursor-pointer select-none items-center gap-3 text-[13px] font-medium text-slate-400 transition-colors hover:text-slate-100 [&::-webkit-details-marker]:hidden">
        <span aria-hidden className="h-px w-6 bg-current transition-all duration-500 group-open:w-10" />
        <span>그 해에 쓴 글 {posts.length}편</span>
        <span className="text-slate-500">
          <span className="group-open:hidden">펼치기</span>
          <span className="hidden group-open:inline">접기</span>
        </span>
      </summary>
      <ul className="mt-6 divide-y divide-slate-800/70">
        {posts.map((p) => (
          <li key={p.link}>
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/post grid gap-x-6 gap-y-1 py-3 sm:grid-cols-[6.5rem_minmax(0,1fr)_auto] sm:items-baseline"
            >
              <span className="text-[12px] tabular-nums text-slate-500">{p.date}</span>
              <span className="text-[14px] leading-relaxed text-slate-300 transition-colors group-hover/post:text-slate-50">
                {p.title}
              </span>
              <span className="font-serif text-[14px] italic text-slate-500">{p.source}</span>
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
 * 연도가 이미 시간을 말하므로 점과 세로선은 두지 않고, 해 사이는 가는 선과 여백으로만 나눈다.
 * 한 해 안의 순서: 무슨 해였나 → 있었던 일 → 할 수 있게 된 것 → 만든 것 → 쓴 글.
 */
function YearBlock({ year, posts, n }: { year: ChronicleYear; posts: BlogPost[]; n: number }) {
  const projects = year.projects
    .map((slug) => PROJECTS.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const stack = year.techs
    .map((t) => BADGES[t]?.label)
    .filter(Boolean)
    .join(", ");

  return (
    <motion.li
      {...fade}
      className="grid gap-10 border-t border-slate-800 py-28 sm:py-36 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-20"
    >
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="font-serif text-[15px] italic text-slate-500">{ROMAN[n] ?? n + 1}.</p>
        <p
          aria-hidden
          className="mt-3 font-serif text-[clamp(4.75rem,11vw,8.5rem)] leading-[0.82] tracking-[-0.02em] text-slate-50"
        >
          {year.year}
        </p>
        <span aria-hidden className="rule mt-8 text-slate-500" />
        <p className="mt-5 text-[12px] leading-relaxed tracking-[0.06em] text-slate-500">{year.chapter}</p>
      </div>

      <div className="min-w-0">
        <h2 className="max-w-2xl text-[clamp(1.4rem,2.6vw,1.9rem)] font-semibold leading-[1.45] tracking-[-0.035em] text-slate-50">
          <span className="sr-only">{year.year}년 — </span>
          {year.headline}
        </h2>

        <div className="mt-8 space-y-5">
          {year.story.map((s) => (
            <p key={s} className="max-w-[42rem] text-[16px] leading-[1.95] text-slate-300">
              {s}
            </p>
          ))}
        </div>

        <div className="mt-16">
          <Label>있었던 일</Label>
          <ol className="divide-y divide-slate-800/70 border-y border-slate-800">
            {year.moments.map((m) => (
              <li
                key={m.when + m.what}
                className="grid gap-x-8 gap-y-1 py-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-baseline"
              >
                <span className="text-[12px] tabular-nums tracking-[0.04em] text-slate-500">{m.when}</span>
                <span className="text-[15px] leading-[1.8] text-slate-300">{m.what}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-16">
          <Label>할 수 있게 된 것</Label>
          <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {year.gained.map((g) => (
              <li key={g} className="flex min-w-0 items-start gap-3">
                <span aria-hidden className="mt-[13.5px] h-px w-3 shrink-0 bg-slate-500" />
                <span className="text-[15px] leading-[1.8] text-slate-300">{g}</span>
              </li>
            ))}
          </ul>
        </div>

        {projects.length > 0 && (
          <div className="mt-16">
            <Label>그 해에 만든 것</Label>
            <ul className="divide-y divide-slate-800/70 border-y border-slate-800">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto] sm:items-baseline"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="text-[15px] font-semibold tracking-[-0.02em] text-slate-100 transition-colors group-hover:text-ice-500">
                        {p.title}
                      </span>
                      {p.award && (
                        <span className="shrink-0 border border-slate-700 px-1.5 py-px text-[10px] tracking-[0.08em] text-amber-400">
                          수상
                        </span>
                      )}
                    </span>
                    <span className="min-w-0 text-[13px] leading-relaxed text-slate-500">{p.subtitle}</span>
                    <span
                      aria-hidden
                      className="hidden h-px w-5 bg-slate-600 transition-all duration-500 group-hover:w-9 group-hover:bg-ice-500 sm:block sm:self-center"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {stack && (
          <dl className="wall-label mt-12 grid grid-cols-[3.5rem_1fr] gap-x-3 text-[13px] leading-[1.8]">
            <dt className="pt-px">기술</dt>
            <dd className="text-slate-400">{stack}</dd>
          </dl>
        )}

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
    <section className="pb-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* 정렬은 프로젝트 목록과 같은 밑줄 탭으로 — 사이트 안에서 같은 동작은 같은 모양이어야 한다 */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-6">
          <span className="font-serif text-[17px] italic tabular-nums text-slate-400">
            {CHRONICLE[0].year}
            <span className="mx-2 text-slate-600">—</span>
            {CHRONICLE[CHRONICLE.length - 1].year}
          </span>
          <div className="ml-auto flex items-center gap-6">
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
                className={`relative py-1.5 text-[12px] tracking-[0.04em] transition-colors ${
                  newestFirst === o.key ? "text-slate-100" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {o.label}
                {newestFirst === o.key && (
                  <motion.span
                    layoutId="chronicle-underline"
                    transition={{ duration: 0.6, ease: EASE }}
                    className="absolute inset-x-0 -bottom-px h-px bg-current"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <ol>
          {years.map((year) => (
            <YearBlock
              key={year.year}
              year={year}
              posts={byYear(year.year)}
              n={CHRONICLE.indexOf(year)}
            />
          ))}
        </ol>

        <motion.div
          {...fade}
          className="grid gap-10 border-t border-slate-700/80 py-28 sm:py-36 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-20"
        >
          <div>
            <p className="font-serif text-[clamp(2.6rem,5vw,3.6rem)] italic leading-none text-slate-50">Notes</p>
            <span aria-hidden className="rule mt-8 text-slate-500" />
          </div>
          <div className="min-w-0">
            <h2 className="text-[clamp(1.4rem,2.6vw,1.9rem)] font-semibold tracking-[-0.035em] text-slate-50">
              블로그
            </h2>
            <p className="mt-5 max-w-[42rem] text-[16px] leading-[1.9] text-slate-400">
              {linked > 0
                ? `두 블로그의 글 ${linked}편을 위 타임라인의 해당 연도에 연결해 두었습니다.`
                : "글 목록을 불러오지 못했습니다. 아래에서 직접 확인하실 수 있습니다."}
            </p>
            <ul className="mt-12 divide-y divide-slate-800/70 border-y border-slate-800">
              {BLOG_SOURCES.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.home}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid gap-x-8 gap-y-1 py-6 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)_auto] sm:items-baseline"
                  >
                    <span className="font-semibold tracking-[-0.02em] text-slate-100 transition-colors group-hover:text-ice-500">
                      {s.name}
                    </span>
                    <span className="text-[14px] leading-relaxed text-slate-400">{s.note}</span>
                    <span className="text-[12px] text-slate-500">
                      <span className="font-serif text-[17px] italic tabular-nums">
                        {posts.filter((p) => p.source === s.key).length}
                      </span>
                      편
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
