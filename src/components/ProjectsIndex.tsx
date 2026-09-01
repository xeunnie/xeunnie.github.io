"use client";

import { useMemo, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/constants";
import type { Project } from "@/lib/constants";
import TechBadge from "./TechBadge";

const CATEGORY_STYLE = {
  company: { label: "Company", color: "bg-ice-100 text-ice-400 border-ice-500/20" },
  personal: { label: "Personal", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
} as const;

type Axis = "kind" | "company" | "school" | "team" | "group";
type Sort = "family" | "time";

/** 프로젝트에서 축별 값을 뽑는다. 값이 없으면 그 축의 필터 대상이 아니다. */
const AXIS_VALUE: Record<Axis, (p: Project) => string | undefined> = {
  kind: (p) => (p.category === "company" ? "회사" : "개인"),
  company: (p) => p.company,
  school: (p) => (p.company ? undefined : p.org ?? "개인 프로젝트"),
  team: (p) => p.team,
  group: (p) => p.group,
};

const AXIS_LABEL: Record<Axis, string> = {
  kind: "유형",
  company: "회사",
  school: "학업·활동",
  team: "팀",
  group: "제품군",
};

/**
 * period 문자열에서 정렬용 키를 뽑는다.
 * "2025.02 — 2025.03", "2024 — 2026", "2026.06 — 2026.08", "2025.01.11 — 2025.01.12",
 * "2026.09 — 현재" 처럼 형태가 제각각이라 마지막 날짜 토큰만 본다.
 * 새 프로젝트가 어떤 표기로 추가돼도 최소한 연도 단위로는 정렬된다.
 */
function endKey(period: string): number {
  const tokens = period.match(/\d{4}(?:\.\d{1,2})?(?:\.\d{1,2})?/g);
  if (!tokens || tokens.length === 0) return 0;
  const [y, m = "12", d = "31"] = tokens[tokens.length - 1].split(".");
  return Number(y) * 10000 + Number(m) * 100 + Number(d);
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const style = CATEGORY_STYLE[project.category];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group flex h-full flex-col p-6 rounded-2xl border border-slate-800/60 bg-slate-900/25 hover:border-ice-500/25 hover:bg-slate-900/50 card-hover transition-all duration-300"
      >
        {project.shots?.[0] && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.shots[0].src}
            alt=""
            loading="lazy"
            decoding="async"
            className="mb-5 aspect-[16/9] w-full rounded-lg border border-slate-800 object-cover object-left-top"
          />
        )}

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full border ${style.color}`}>
            {style.label}
          </span>
          {project.featured && (
            <span className="text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full border border-amber-500/25 bg-amber-500/10 text-amber-400">
              Featured
            </span>
          )}
          {project.award && (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                <circle cx="12" cy="8" r="6" />
                <path d="M8.2 13.9 7 22l5-3 5 3-1.2-8.1" />
              </svg>
              수상
            </span>
          )}
          {project.company && <span className="text-xs text-slate-400">@ {project.company}</span>}
          <span className="ml-auto text-xs font-mono text-slate-500">{project.period}</span>
        </div>

        <h2 className="text-xl font-bold text-slate-50 group-hover:text-ice-300 transition-colors">
          {project.title}
        </h2>
        <p className="text-sm text-ice-400 font-medium mt-1">{project.subtitle}</p>
        <p className="text-xs font-mono text-slate-500 mt-2.5">{project.role}</p>

        <p className="text-sm text-slate-300 leading-relaxed mt-4 flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mt-5">
          {project.techs.slice(0, 6).map((tech) => (
            <TechBadge key={tech} name={tech} size="sm" />
          ))}
          {project.techs.length > 6 && (
            <span className="text-xs text-slate-500 self-center ml-1">
              +{project.techs.length - 6}
            </span>
          )}
        </div>

        {project.award && (
          <p className="mt-4 text-xs text-amber-400 leading-relaxed">{project.award}</p>
        )}

        <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {project.sections?.length
              ? `상세 ${project.sections.length}개 섹션`
              : `핵심 ${project.highlights.length}개`}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ice-400 group-hover:gap-2.5 transition-all">
            뜯어보기
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 3l6 6-6 6" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default function ProjectsIndex() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [selected, setSelected] = useState<Partial<Record<Axis, string>>>({});
  const [sort, setSort] = useState<Sort>("family");

  /** 축마다 실제로 존재하는 값과 개수를 데이터에서 뽑는다. 프로젝트가 늘면 옵션도 저절로 늘어난다. */
  const axes = useMemo(
    () =>
      (Object.keys(AXIS_LABEL) as Axis[])
        .map((axis) => {
          const counts = new Map<string, number>();
          PROJECTS.forEach((p) => {
            const v = AXIS_VALUE[axis](p);
            if (v) counts.set(v, (counts.get(v) ?? 0) + 1);
          });
          return {
            axis,
            label: AXIS_LABEL[axis],
            options: [...counts.entries()]
              .sort((a, b) => b[1] - a[1])
              .map(([value, count]) => ({ value, count })),
          };
        })
        .filter((a) => a.options.length > 1),
    []
  );

  const filtered = useMemo(
    () =>
      PROJECTS.filter((p) =>
        (Object.entries(selected) as [Axis, string][]).every(
          ([axis, value]) => AXIS_VALUE[axis](p) === value
        )
      ),
    [selected]
  );

  const visible = useMemo(() => {
    const byTime = (a: Project, b: Project) => endKey(b.period) - endKey(a.period);
    if (sort === "time") return [...filtered].sort(byTime);
    // 큐레이션 순서 우선 — rank 가 없으면 featured, 그다음 최신순
    return [...filtered].sort((a, b) => {
      const ra = a.rank ?? 999;
      const rb = b.rank ?? 999;
      if (ra !== rb) return ra - rb;
      if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
      return byTime(a, b);
    });
  }, [filtered, sort]);

  /**
   * 같은 group 을 가진 프로젝트끼리 묶는다. 한 제품이 여러 앱으로 쪼개져도
   * 목록에서 한 덩어리로 보이게 하기 위한 것. 시간순 보기에서는 묶지 않는다.
   */
  const major = useMemo(() => visible.filter((p) => !p.minor), [visible]);
  const minor = useMemo(() => visible.filter((p) => p.minor), [visible]);

  const blocks = useMemo<{ key: string; group?: string; items: Project[] }[]>(() => {
    if (sort === "time") return major.map((p) => ({ key: p.slug, items: [p] }));

    const counts = new Map<string, number>();
    major.forEach((p) => {
      if (p.group) counts.set(p.group, (counts.get(p.group) ?? 0) + 1);
    });

    const out: { key: string; group?: string; items: Project[] }[] = [];
    const placed = new Set<string>();
    major.forEach((p) => {
      if (p.group && counts.get(p.group)! > 1) {
        if (placed.has(p.group)) return;
        placed.add(p.group);
        out.push({
          key: `g:${p.group}`,
          group: p.group,
          items: major.filter((q) => q.group === p.group),
        });
      } else {
        out.push({ key: p.slug, items: [p] });
      }
    });
    return out;
  }, [major, sort]);

  const toggle = (axis: Axis, value: string) =>
    setSelected((prev) => {
      const next = { ...prev };
      if (next[axis] === value) delete next[axis];
      else next[axis] = value;
      return next;
    });

  const activeCount = Object.keys(selected).length;

  return (
    <section className="relative py-16" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 rounded-2xl border border-slate-800/60 bg-slate-900/20 p-5"
        >
          <div className="flex flex-col gap-3">
            {axes.map((a) => (
              <div key={a.axis} className="flex flex-wrap items-center gap-2">
                <span className="w-20 shrink-0 font-mono text-[10px] tracking-wider uppercase text-slate-500">
                  {a.label}
                </span>
                {a.options.map((o) => {
                  const on = selected[a.axis] === o.value;
                  return (
                    <button
                      key={o.value}
                      onClick={() => toggle(a.axis, o.value)}
                      aria-pressed={on}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        on
                          ? "border-ice-500/40 bg-ice-100 text-ice-300"
                          : "border-slate-800/60 bg-slate-900/40 text-slate-400 hover:border-ice-500/20 hover:text-ice-400"
                      }`}
                    >
                      {o.value}
                      <span className="ml-1.5 opacity-60">{o.count}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/60 flex flex-wrap items-center gap-3">
            <span className="text-xs text-slate-400">
              {visible.length}개 표시
              {activeCount > 0 && <span className="text-slate-600"> / 전체 {PROJECTS.length}</span>}
            </span>
            {activeCount > 0 && (
              <button
                onClick={() => setSelected({})}
                className="text-xs text-ice-400 hover:text-ice-300 transition-colors"
              >
                필터 해제
              </button>
            )}
            <div className="ml-auto inline-flex rounded-lg border border-slate-800/60 bg-slate-900/40 p-0.5">
              {(
                [
                  { key: "family" as const, label: "제품군순" },
                  { key: "time" as const, label: "시간순" },
                ]
              ).map((o) => (
                <button
                  key={o.key}
                  onClick={() => setSort(o.key)}
                  aria-pressed={sort === o.key}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    sort === o.key ? "bg-ice-100 text-ice-300" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {blocks.map((b, i) =>
              b.group ? (
                <motion.section
                  key={b.key}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
                  className="md:col-span-2 rounded-2xl border border-ice-500/15 bg-ice-100/45 p-5"
                >
                  <div className="flex items-baseline gap-3 mb-4 px-1">
                    <h2 className="text-sm font-mono tracking-[0.18em] uppercase text-ice-400">
                      {b.group}
                    </h2>
                    <span className="text-xs text-slate-400">{b.items.length}개 프로젝트</span>
                    <span className="ml-auto text-xs text-slate-400">같은 제품군</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {b.items.map((p, j) => (
                      <ProjectCard key={p.slug} project={p} index={j} />
                    ))}
                  </div>
                </motion.section>
              ) : (
                <ProjectCard key={b.key} project={b.items[0]} index={i} />
              )
            )}
          </AnimatePresence>
        </motion.div>

        {minor.length > 0 && (
          <section className="mt-14 rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6 sm:p-7">
            <h2 className="text-base font-bold text-slate-100 mb-2">
              그 밖에 {minor.length}개를 더 만들었습니다
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-2xl">
              부트캠프와 스터디에서 쉬지 않고 이어 붙인 것들입니다. 하나하나를 자랑하려는
              게 아니라, 짧은 기간에 다른 팀 구성·다른 스택·다른 도메인·다른 규모를 일부러
              번갈아 겪으려고 만든 결과입니다. 백엔드·프론트·DevOps를 한 서비스에서 모두
              해 보기도 했고, 20시간짜리 해커톤부터 두 달짜리 팀 프로젝트까지 폭을 넓혔습니다.
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
              {minor.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group flex items-baseline gap-2.5 py-2 border-b border-slate-800/50 text-sm"
                  >
                    <span className="font-medium text-slate-200 group-hover:text-ice-400 transition-colors">
                      {p.title}
                    </span>
                    <span className="flex-1 truncate text-xs text-slate-500">{p.subtitle}</span>
                    <span className="shrink-0 font-mono text-[11px] text-slate-500">
                      {p.org ?? p.period}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {visible.length === 0 && (
          <p className="text-sm text-slate-500 py-12 text-center">
            조건에 맞는 프로젝트가 없습니다.
          </p>
        )}
      </div>
    </section>
  );
}
