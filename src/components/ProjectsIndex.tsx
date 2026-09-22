"use client";

import { useMemo, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { PROJECTS } from "@/lib/constants";
import type { Project } from "@/lib/constants";
import TechBadge from "./TechBadge";

const CATEGORY_STYLE = {
  company: { label: "회사", color: "border-slate-800 bg-slate-950 text-slate-300", dot: "bg-ice-500" },
  personal: { label: "개인", color: "border-emerald-500/20 bg-slate-950 text-slate-300", dot: "bg-emerald-400" },
} as const;

type Axis = "kind" | "company" | "school" | "team" | "group";
type Sort = "pick" | "time" | "scope";

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

/**
 * 목록의 한 줄.
 * 두 칸으로 좁게 쌓아 두니 카드 하나에 열 가지가 들어가 빽빽했다.
 * 한 줄에 하나씩, 캡처를 왼쪽에 크게 두고 글은 오른쪽에서 읽게 바꿨다.
 * 카드에서 걷어낸 것: 상세 섹션 개수, 수상 문구 중복, 작은 글씨의 역할 줄.
 */
/**
 * 맡은 범위를 role 문구에서 읽는다.
 * 기여도를 따로 적어 두면 18개를 손으로 매겨야 하고, 매길 때마다 후해진다.
 * 이미 적어 둔 역할 문구가 가장 정직한 근거다.
 */
function scopeKey(role: string): number {
  if (/단독|전담|전체 구축/.test(role)) return 0;
  if (/팀장|리드|주도/.test(role)) return 1;
  if (/참여|팀원/.test(role)) return 3;
  // 나머지는 한 파트를 맡은 것으로 본다. 키워드가 없다고 "참여" 로 내리면
  // 혼자 디자인까지 한 작업이 거들기만 한 것처럼 보인다.
  return 2;
}

const SCOPE_LABEL = ["단독·전담", "팀장·주도", "파트 담당", "참여"] as const;

/** 소속 — 타임라인순에서 덩어리를 나누는 기준 */
function belongsTo(p: Project): string {
  return p.company ?? p.org ?? "개인 프로젝트";
}

function ProjectCard({
  project,
  index,
  no,
  scopeTag,
}: {
  project: Project;
  index: number;
  /** 목록에서 몇 번째인지 — 팜플렛처럼 번호를 크게 세운다 */
  no: number;
  /** 맡은 범위순으로 볼 때만 — 왜 이 순서인지 카드에서 보이게 */
  scopeTag?: string;
}) {
  const style = CATEGORY_STYLE[project.category];
  const shot = project.shots?.[0];
  // 캡처가 한쪽에만 쭉 붙어 있으면 열세 줄이 같은 리듬으로 흐른다. 한 줄씩 번갈아 놓는다.
  const flip = no % 2 === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className={`group grid gap-5 rounded-2xl border border-slate-800/60 bg-slate-900/20 p-5 transition-colors duration-300 hover:border-ice-500/30 sm:gap-8 sm:p-7 ${
          shot
            ? flip
              ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]"
              : "lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]"
            : ""
        }`}
      >
        <div className={flip ? "lg:order-2" : ""}>
        {shot &&
          (project.shotsLayout === "phone" ? (
            // 세로 캡처는 16:9 로 자르면 윗부분만 남으므로 세 장을 나란히 둔다
            <div className="flex aspect-[16/10] w-full items-start justify-center gap-2 overflow-hidden rounded-xl border border-slate-800 bg-slate-900 px-5 pt-5">
              {project.shots!.slice(0, 3).map((s) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={s.src}
                  src={s.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="w-[28%] rounded-md border border-slate-800"
                />
              ))}
            </div>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={shot.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="aspect-[16/10] w-full rounded-xl border border-slate-800 object-cover object-left-top"
            />
          ))}
        </div>

        <div className="flex min-w-0 flex-col">
          {/* 번호와 가는 줄 — 도록의 도판 번호처럼 */}
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-sm font-bold tabular-nums text-ice-500">
              {String(no).padStart(2, "0")}
            </span>
            <span aria-hidden className="h-px w-8 bg-slate-800" />
            {project.featured && (
              <span className="text-[11px] font-semibold tracking-[0.06em] text-amber-400">
                대표 작업
              </span>
            )}
            {project.group && (
              <span className="ml-auto text-[11px] font-medium text-slate-500">{project.group}</span>
            )}
          </div>

          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${style.color}`}
            >
              <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
              {style.label}
            </span>
            {project.award && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[11px] font-medium text-amber-400">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                  <circle cx="12" cy="8" r="6" />
                  <path d="M8.2 13.9 7 22l5-3 5 3-1.2-8.1" />
                </svg>
                수상
              </span>
            )}
            {scopeTag && (
              <span className="rounded-full border border-ice-500/40 bg-ice-100 px-2 py-0.5 text-[11px] font-semibold text-ice-500">
                {scopeTag}
              </span>
            )}
            <span className="text-xs text-slate-500">
              {project.company ?? project.org}
              <span className="mx-1.5 text-slate-700">·</span>
              <span className="font-mono">{project.period}</span>
            </span>
          </div>

          <h2 className="text-[22px] font-bold tracking-tight text-slate-50 transition-colors group-hover:text-ice-500">
            {project.title}
          </h2>
          <p className="mt-1.5 text-[15px] font-medium text-ice-500">{project.subtitle}</p>

          <p className="mt-4 text-[15px] leading-[1.8] text-slate-300">{project.description}</p>

          <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-6">
            <div className="flex min-w-0 flex-wrap gap-1.5">
              {project.techs.slice(0, 5).map((tech) => (
                <TechBadge key={tech} name={tech} size="sm" />
              ))}
              {project.techs.length > 5 && (
                <span className="self-center text-xs text-slate-500">
                  +{project.techs.length - 5}
                </span>
              )}
            </div>
            <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-ice-500 transition-all group-hover:gap-2.5">
              자세히
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M5 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function ProjectsIndex() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [selected, setSelected] = useState<Partial<Record<Axis, string>>>({});
  const [sort, setSort] = useState<Sort>("pick");

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
    if (sort === "scope")
      return [...filtered].sort((a, b) => {
        const d = scopeKey(a.role) - scopeKey(b.role);
        return d !== 0 ? d : (a.rank ?? 999) - (b.rank ?? 999);
      });
    // 큐레이션 순서 우선 — rank 가 없으면 featured, 그다음 최신순
    return [...filtered].sort((a, b) => {
      const ra = a.rank ?? 999;
      const rb = b.rank ?? 999;
      if (ra !== rb) return ra - rb;
      if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
      return byTime(a, b);
    });
  }, [filtered, sort]);

  const major = useMemo(() => visible.filter((p) => !p.minor), [visible]);
  const minor = useMemo(() => visible.filter((p) => p.minor), [visible]);

  /**
   * 보기마다 묶는 기준이 다르다.
   *   추천순   — 묶지 않는다. 홈의 대표 작업과 같은 순서로 1번부터 쭉.
   *   타임라인순 — 소속끼리. "플럭시티에서 이걸 했고, 그 전엔 여기서 이걸 했다" 가 읽히게.
   *   맡은 범위순 — 묶지 않고 단독부터 쭉. 묶으면 범위 순서가 끊긴다.
   */
  const blocks = useMemo<
    { key: string; group?: string; note?: string; items: Project[] }[]
  >(() => {
    // 추천순은 큐레이션한 순서 그대로 보여 준다 — 제품군으로 묶으면 그 순서가 흐트러진다
    if (sort !== "time") return major.map((p) => ({ key: p.slug, items: [p] }));

    const keyOf = (p: Project) => belongsTo(p);

    const counts = new Map<string, number>();
    major.forEach((p) => {
      const k = keyOf(p);
      if (k) counts.set(k, (counts.get(k) ?? 0) + 1);
    });

    const out: { key: string; group?: string; note?: string; items: Project[] }[] = [];
    const placed = new Set<string>();
    major.forEach((p) => {
      const k = keyOf(p);
      if (k && counts.get(k)! > 1) {
        if (placed.has(k)) return;
        placed.add(k);
        const items = major.filter((q) => keyOf(q) === k);
        // 소속 덩어리에는 언제부터 언제까지였는지를 같이 적는다
        const span =
          sort === "time"
            ? (() => {
                const ends = items.map((q) => endKey(q.period));
                const from = String(Math.min(...ends)).slice(0, 4);
                const to = String(Math.max(...ends)).slice(0, 4);
                return from === to ? from : `${from} — ${to}`;
              })()
            : "같은 제품군";
        out.push({ key: `g:${k}`, group: k, note: `${span} · ${items.length}개`, items });
      } else {
        out.push({ key: p.slug, items: [p] });
      }
    });
    return out;
  }, [major, sort]);

  /**
   * 번호는 화면에 보이는 순서를 따라야 한다.
   * rank 순으로 매기면 제품군으로 묶인 뒤 01 다음에 07 이 오는 일이 생긴다.
   */
  const numberOf = useMemo(() => {
    const m = new Map<string, number>();
    let n = 0;
    blocks.forEach((b) => b.items.forEach((p) => m.set(p.slug, ++n)));
    return m;
  }, [blocks]);

  // 자주 쓰는 두 축만 펼쳐 두고 나머지는 눌러서 연다
  const [moreFilters, setMoreFilters] = useState(false);
  const extraAxes = axes.slice(2);
  const hasExtraActive = extraAxes.some((a) => selected[a.axis]);
  const shownAxes = moreFilters || hasExtraActive ? axes : axes.slice(0, 2);

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
        {/*
          필터는 목록보다 조용해야 한다. 상자로 감싸는 대신 가로줄로만 칸을 나누고,
          누르는 것(칩)만 동그랗게 남겨 어디를 누르는지 한눈에 보이게 했다.
        */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 border-y border-slate-800"
        >
          <div className="divide-y divide-slate-800/60">
            {shownAxes.map((a) => (
              <div
                key={a.axis}
                className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:gap-5"
              >
                <span className="shrink-0 text-[11px] font-semibold tracking-[0.06em] text-slate-500 sm:w-16">
                  {a.label}
                </span>
                <div className="flex min-w-0 flex-wrap gap-1.5">
                  {a.options.map((o) => {
                    const on = selected[a.axis] === o.value;
                    return (
                      <button
                        key={o.value}
                        onClick={() => toggle(a.axis, o.value)}
                        aria-pressed={on}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all ${
                          on
                            ? "border-ice-500/60 bg-ice-100 font-semibold text-ice-500"
                            : "border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-100"
                        }`}
                      >
                        {o.value}
                        <span
                          className={`font-mono text-[10px] tabular-nums ${
                            on ? "text-ice-500/70" : "text-slate-500"
                          }`}
                        >
                          {o.count}
                        </span>
                        {/* 켜진 칩에는 끄는 자리를 보여 준다 */}
                        {on && (
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                            <path d="M3 3l6 6M9 3l-6 6" strokeLinecap="round" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* 축 다섯 줄을 한 번에 펼쳐 두면 목록보다 필터가 더 커 보인다 */}
            {extraAxes.length > 0 && (
              <div className="py-2.5">
                <button
                  onClick={() => setMoreFilters((v) => !v)}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-ice-500"
                >
                  {moreFilters ? "조건 접기" : `${extraAxes.map((a) => a.label).join(" · ")}으로도 고르기`}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`transition-transform ${moreFilters ? "rotate-180" : ""}`}
                  >
                    <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-3">
              <span className="font-mono text-xs tabular-nums text-slate-500">
                <span className="font-semibold text-slate-100">{visible.length}</span>
                <span className="mx-1 text-slate-700">/</span>
                {PROJECTS.length}
              </span>
              {activeCount > 0 && (
                <button
                  onClick={() => setSelected({})}
                  className="text-xs text-ice-500 underline-offset-4 transition-colors hover:underline"
                >
                  전체 보기
                </button>
              )}
              {/* 정렬은 누르는 칩이 아니라 고르는 탭 — 밑줄로 직선을 맞춘다 */}
              <div className="ml-auto flex items-center gap-4">
                {(
                  [
                    { key: "pick" as const, label: "추천순" },
                    { key: "time" as const, label: "타임라인순" },
                    { key: "scope" as const, label: "맡은 범위순" },
                  ]
                ).map((o) => (
                  <button
                    key={o.key}
                    onClick={() => setSort(o.key)}
                    aria-pressed={sort === o.key}
                    className={`relative py-1 text-xs transition-colors ${
                      sort === o.key
                        ? "font-semibold text-slate-100"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {o.label}
                    {sort === o.key && (
                      <motion.span
                        layoutId="sort-underline"
                        className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-ice-500"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/*
          한 줄에 하나씩.
          같은 제품군을 머리글과 왼쪽 선으로 묶어 봤더니 목록 위에 또 한 겹이 얹혀 어수선했다.
          정렬이 이미 같은 것끼리 붙여 주므로, 카드에 이름표 하나만 조용히 단다.
        */}
        {/*
          정렬을 바꾸면 묶는 기준 자체가 달라져 카드의 key 가 통째로 바뀐다.
          이럴 때 항목마다 따로 빠져나가게 두면(popLayout) 나간 카드가 남아 쌓였다.
          목록 전체를 한 덩어리로 보고 교체한다 — 먼저 사라지고, 그다음 들어온다.
        */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${sort}|${Object.entries(selected).sort().join()}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="space-y-6"
          >
            {blocks.map((b, i) =>
              b.group ? (
                <section key={b.key} className="space-y-6">
                  {b.items.map((p, j) => (
                    <ProjectCard
                      key={p.slug}
                      project={p}
                      index={j}
                      no={numberOf.get(p.slug) ?? j + 1}
                      scopeTag={sort === "scope" ? SCOPE_LABEL[scopeKey(p.role)] : undefined}
                    />
                  ))}
                </section>
              ) : (
                <ProjectCard
                  key={b.key}
                  project={b.items[0]}
                  index={i}
                  no={numberOf.get(b.items[0].slug) ?? i + 1}
                  scopeTag={sort === "scope" ? SCOPE_LABEL[scopeKey(b.items[0].role)] : undefined}
                />
              )
            )}
          </motion.div>
        </AnimatePresence>

        {minor.length > 0 && (
          <section className="mt-14 rounded-2xl border border-slate-800/60 bg-slate-900/40 p-6 sm:p-7">
            <h2 className="text-base font-bold text-slate-100 mb-2">
              부트캠프·스터디 프로젝트 {minor.length}개
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-2xl">
              20시간 해커톤부터 두 달짜리 팀 프로젝트까지 기간과 팀 구성, 스택이 제각각입니다.
              한 서비스의 백엔드·프론트·DevOps를 모두 맡아 본 것도 있습니다.
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
              {minor.map((p) => (
                // 그리드 항목은 기본 min-width:auto 라, 내용이 길면 칸을 밀어낸다
                <li key={p.slug} className="min-w-0">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5 border-b border-slate-800/50 py-2 text-sm"
                  >
                    <span className="font-medium text-slate-200 transition-colors group-hover:text-ice-400">
                      {p.title}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-xs text-slate-500">{p.subtitle}</span>
                    <span className="font-mono text-[11px] text-slate-500">{p.org ?? p.period}</span>
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
