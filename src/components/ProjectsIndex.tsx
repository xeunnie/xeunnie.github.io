"use client";

import { useMemo, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { BADGES, PROJECTS } from "@/lib/constants";
import type { Project } from "@/lib/constants";
import Plate, { PlateNo } from "@/components/gallery/Plate";
import { Cover } from "@/components/home/Work";

const EASE = [0.16, 1, 0.3, 1] as const;

const CATEGORY_LABEL = { company: "회사", personal: "개인" } as const;

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

const SCOPE_LABEL = ["단독·전담", "팀장·리드", "파트 담당", "참여"] as const;

/** 소속 — 타임라인순에서 덩어리를 나누는 기준 */
function belongsTo(p: Project): string {
  return p.company ?? p.org ?? "개인 프로젝트";
}

/** 작은 목록의 번호 — i. ii. iii. */
function roman(n: number): string {
  const table: [number, string][] = [
    [10, "x"],
    [9, "ix"],
    [5, "v"],
    [4, "iv"],
    [1, "i"],
  ];
  let out = "";
  for (const [v, s] of table) {
    while (n >= v) {
      out += s;
      n -= v;
    }
  }
  return out;
}

/**
 * 목록의 한 점.
 * 상자 카드 대신 액자 하나와 그 아래 설명판. 두 줄로 걸되 오른쪽 줄을 반 칸 내려
 * 벽에 엇갈려 걸린 것처럼 둔다 — 같은 높이로 줄 세우면 표처럼 읽힌다.
 */
function ProjectPlate({
  project,
  no,
  scopeTag,
}: {
  project: Project;
  /** 화면에 보이는 순서 */
  no: number;
  /** 맡은 범위순으로 볼 때만 — 왜 이 순서인지 설명판에서 보이게 */
  scopeTag?: string;
}) {
  const where = [project.company ?? project.org, project.team].filter(Boolean).join(" · ");
  const stack = project.techs
    .slice(0, 5)
    .map((t) => BADGES[t]?.label ?? t)
    .join(", ");
  const more = project.techs.length - 5;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, ease: EASE }}
      className="min-w-0"
    >
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`${project.title} 자세히 보기`}
        className="block"
      >
        <Plate>
          <Cover project={project} />
        </Plate>
      </Link>

      <div className="wall-label mt-10 min-w-0 sm:mt-12">
        <p className="flex items-baseline gap-3">
          <PlateNo n={no} />
          {project.featured && (
            <span className="text-[11px] tracking-[0.12em] text-ice-500">대표 작업</span>
          )}
          {project.group && (
            <span className="ml-auto truncate text-[11px] tracking-[0.08em] text-slate-500">
              {project.group}
            </span>
          )}
        </p>

        <h2 className="mt-4 text-[clamp(1.45rem,2.2vw,1.8rem)] font-semibold leading-[1.25] tracking-[-0.035em] text-slate-50">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors duration-500 hover:text-ice-500"
          >
            {project.title}
          </Link>
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-slate-400">{project.subtitle}</p>

        <span aria-hidden className="rule mt-7 text-slate-500" />

        <p className="mt-7 text-pretty text-[15px] leading-[1.9] text-slate-300">
          {project.description}
        </p>

        <dl className="mt-7 grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-3 gap-y-2 text-[13px] leading-relaxed">
          <dt className="pt-px">유형</dt>
          <dd className="text-slate-300">{CATEGORY_LABEL[project.category]}</dd>
          <dt className="pt-px">기간</dt>
          <dd className="tabular-nums text-slate-300">{project.period}</dd>
          {where && (
            <>
              <dt className="pt-px">소속</dt>
              <dd className="text-slate-300">{where}</dd>
            </>
          )}
          <dt className="pt-px">기술</dt>
          <dd className="text-slate-300">
            {stack}
            {more > 0 && <span className="text-slate-500"> 외 {more}</span>}
          </dd>
          {scopeTag && (
            <>
              <dt className="pt-px">범위</dt>
              <dd className="text-slate-100">{scopeTag}</dd>
            </>
          )}
          {project.award && (
            <>
              <dt className="pt-px">수상</dt>
              <dd className="text-amber-400">{project.award}</dd>
            </>
          )}
        </dl>

        <Link
          href={`/projects/${project.slug}`}
          tabIndex={-1}
          className="group mt-8 inline-flex items-center gap-3 text-[13px] font-medium text-slate-100"
        >
          <span className="h-px w-6 bg-current transition-all duration-500 group-hover:w-10 group-hover:bg-ice-500" />
          <span className="transition-colors group-hover:text-ice-500">자세히 보기</span>
        </Link>
      </div>
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

  /** 벽에 거는 순서 — 묶음을 풀어 한 줄로. 번호와 같은 순서다. */
  const hung = useMemo(() => blocks.flatMap((b) => b.items), [blocks]);

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
    <section className="relative pt-8 pb-40" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        {/*
          고르는 자리는 목록보다 조용해야 한다. 칩도 상자도 없이 글자만 두고,
          고른 것에만 가는 밑줄을 긋는다.
        */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE }}
          className="mb-28 sm:mb-36"
        >
          <div className="space-y-5">
            {shownAxes.map((a) => (
              <div
                key={a.axis}
                className="grid gap-3 sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-baseline sm:gap-6"
              >
                <span className="text-[11px] tracking-[0.16em] text-slate-500">{a.label}</span>
                <div className="flex min-w-0 flex-wrap gap-x-6 gap-y-3">
                  {a.options.map((o) => {
                    const on = selected[a.axis] === o.value;
                    return (
                      <button
                        key={o.value}
                        onClick={() => toggle(a.axis, o.value)}
                        aria-pressed={on}
                        className={`group inline-flex items-baseline gap-1 border-b pb-1 text-[13px] transition-colors duration-500 ${
                          on
                            ? "border-slate-100 text-slate-50"
                            : "border-transparent text-slate-500 hover:border-slate-700 hover:text-slate-200"
                        }`}
                      >
                        {o.value}
                        <sup
                          className={`font-serif text-[12px] italic tabular-nums ${
                            on ? "text-ice-500" : "text-slate-500"
                          }`}
                        >
                          {o.count}
                        </sup>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* 축 다섯 줄을 한 번에 펼쳐 두면 목록보다 고르는 자리가 더 커 보인다 */}
            {extraAxes.length > 0 && (
              <div className="sm:pl-[calc(7rem+1.5rem)]">
                <button
                  onClick={() => setMoreFilters((v) => !v)}
                  aria-expanded={moreFilters}
                  className="inline-flex items-center gap-2 text-[12px] text-slate-500 transition-colors hover:text-slate-200"
                >
                  <span aria-hidden className="font-serif text-[15px] leading-none">
                    {moreFilters ? "−" : "+"}
                  </span>
                  {moreFilters ? "조건 접기" : `${extraAxes.map((a) => a.label).join(" · ")}으로도 고르기`}
                </button>
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-end gap-x-8 gap-y-5 border-t border-slate-800 pt-6">
            <p className="flex items-baseline gap-4">
              <span className="font-serif text-[28px] leading-none tabular-nums text-slate-50">
                {visible.length}
                <span className="mx-1.5 text-[18px] italic text-slate-500">of</span>
                <span className="text-slate-500">{PROJECTS.length}</span>
              </span>
              {activeCount > 0 && (
                <button
                  onClick={() => setSelected({})}
                  className="border-b border-slate-700 pb-0.5 text-[12px] text-slate-400 transition-colors hover:border-slate-100 hover:text-slate-100"
                >
                  전체 보기
                </button>
              )}
            </p>
            {/* 정렬은 고르는 탭 — 가는 밑줄 하나가 옮겨 다닌다 */}
            <div className="ml-auto flex items-center gap-6">
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
                  className={`relative pb-1.5 text-[13px] transition-colors duration-500 ${
                    sort === o.key ? "text-slate-50" : "text-slate-500 hover:text-slate-200"
                  }`}
                >
                  {o.label}
                  {sort === o.key && (
                    <motion.span
                      layoutId="sort-underline"
                      transition={{ duration: 0.6, ease: EASE }}
                      className="absolute inset-x-0 bottom-0 h-px bg-slate-100"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/*
          두 줄로 엇갈려 건다. 오른쪽 줄은 반 칸 내려 걸어 리듬을 만든다.
          정렬을 바꾸면 번호·순서가 통째로 바뀌므로 목록 전체를 한 덩어리로 교체한다.
        */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${sort}|${Object.entries(selected).sort().join()}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="grid gap-y-28 sm:gap-y-36 lg:grid-cols-2 lg:gap-x-24 lg:gap-y-32"
          >
            {hung.map((p, i) => (
              <div key={p.slug} className={`min-w-0 ${i % 2 === 1 ? "lg:pt-40" : ""}`}>
                <ProjectPlate
                  project={p}
                  no={numberOf.get(p.slug) ?? i + 1}
                  scopeTag={sort === "scope" ? SCOPE_LABEL[scopeKey(p.role)] : undefined}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {visible.length === 0 && (
          <p className="py-24 text-center text-[13px] text-slate-500">
            조건에 맞는 프로젝트가 없습니다.
          </p>
        )}

        {minor.length > 0 && (
          <section className="mt-44 grid gap-10 border-t border-slate-800 pt-12 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-20">
            <div>
              <p className="flex items-center gap-4 text-slate-500">
                <span className="font-serif text-[20px] italic text-slate-300">Addenda</span>
                <span aria-hidden className="rule" />
              </p>
              <h2 className="mt-6 text-[19px] font-semibold tracking-[-0.03em] text-slate-100">
                부트캠프·스터디 프로젝트 {minor.length}개
              </h2>
              <p className="mt-4 text-pretty text-[13px] leading-[1.9] text-slate-500">
                20시간 해커톤부터 두 달짜리 팀 프로젝트까지 기간과 팀 구성, 스택이 제각각입니다.
                한 서비스의 백엔드·프론트·DevOps를 모두 맡아 본 것도 있습니다.
              </p>
            </div>
            <ul className="border-t border-slate-800 lg:border-t-0">
              {minor.map((p, i) => (
                // 그리드 항목은 기본 min-width:auto 라, 내용이 길면 칸을 밀어낸다
                <li key={p.slug} className="min-w-0 border-b border-slate-800">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="group grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-3 py-5 sm:grid-cols-[2.5rem_minmax(0,1fr)_auto]"
                  >
                    <span className="font-serif text-[15px] italic text-slate-500">
                      {roman(i + 1)}.
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[15px] font-medium tracking-[-0.02em] text-slate-100 transition-colors duration-500 group-hover:text-ice-500">
                        {p.title}
                      </span>
                      <span className="mt-1 block text-[13px] leading-relaxed text-slate-500">
                        {p.subtitle}
                      </span>
                    </span>
                    <span className="col-start-2 mt-2 text-[12px] tabular-nums text-slate-500 sm:col-start-3 sm:mt-0">
                      {p.org ?? p.period}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </section>
  );
}
