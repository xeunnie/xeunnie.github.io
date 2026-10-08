import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Cover } from "@/components/home/Work";
import Plate, { PlateNo } from "@/components/gallery/Plate";
import { ACTIVITIES, PROJECTS, SITE } from "@/lib/constants";
import type { Project } from "@/lib/constants";

const CATEGORY_LABEL = { dev: "개발 스터디 · 해커톤", leadership: "팀 활동" } as const;
const CATEGORY_MARK = { dev: "Study", leadership: "Team" } as const;

/** 왼쪽에 구간 이름, 오른쪽에 내용 — 상세 페이지의 모든 구간이 같은 틀을 쓴다 */
function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-8 border-t border-slate-800 py-16 sm:py-24 lg:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] lg:gap-16">
      <h2 className="flex items-center gap-4 self-start text-[12px] tracking-[0.12em] text-slate-500 lg:pt-1">
        <span aria-hidden className="rule" />
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((h) => (
        <li key={h} className="flex items-start gap-3.5">
          <span aria-hidden className="mt-[15px] h-px w-3 shrink-0 bg-slate-600" />
          <span className="max-w-[42rem] text-[16px] leading-[1.9] text-slate-300">{h}</span>
        </li>
      ))}
    </ul>
  );
}

export function generateStaticParams() {
  return ACTIVITIES.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const activity = ACTIVITIES.find((a) => a.slug === slug);
  if (!activity) return {};
  const description = `${activity.role} · ${activity.period} — ${activity.highlights[0]}`;
  return {
    title: activity.name,
    description,
    openGraph: { title: `${activity.name} — ${SITE.name}`, description },
  };
}

/**
 * 스터디·활동 한 건의 상세.
 * 프로젝트처럼 화면이 있는 게 아니라서, 무엇을 맡았고 무엇을 했는지와
 * 거기서 나온 프로젝트로 이어지는 길을 중심에 둔다.
 */
export default async function ActivityDetailPage({ params }: Props) {
  const { slug } = await params;
  const index = ACTIVITIES.findIndex((a) => a.slug === slug);
  if (index < 0) notFound();

  const activity = ACTIVITIES[index];
  const prev = ACTIVITIES[index - 1] ?? null;
  const next = ACTIVITIES[index + 1] ?? null;
  const projects = (activity.projects ?? [])
    .map((s) => PROJECTS.find((p) => p.slug === s))
    .filter((p): p is Project => Boolean(p));
  const shots = activity.shots ?? [];

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-32 pb-24 sm:pt-36">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/activity"
            className="group inline-flex items-center gap-3 text-[13px] text-slate-500 transition-colors hover:text-slate-100"
          >
            <span aria-hidden className="h-px w-5 bg-current transition-all duration-500 group-hover:w-8" />
            활동 전체
          </Link>

          {/* 첫머리 — 큰 이름과 옆의 설명판 */}
          <header className="mt-24 grid gap-12 border-b border-slate-700/80 pb-12 sm:mt-32 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end lg:gap-20">
            <div className="min-w-0">
              <p className="mb-8 flex flex-wrap items-center gap-4">
                <span className="font-serif text-[22px] italic text-slate-300">{CATEGORY_MARK[activity.category]}</span>
                <span aria-hidden className="rule text-slate-500" />
                <PlateNo n={index + 1} />
              </p>
              <h1 className="text-[clamp(2.4rem,6.5vw,4.8rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-slate-50">
                {activity.name}
              </h1>
              <p className="mt-6 flex flex-wrap items-center gap-3 text-[13px] tracking-[0.04em] text-slate-500">
                {CATEGORY_LABEL[activity.category]}
                {activity.active && (
                  <span className="border border-ice-500/40 px-1.5 py-px text-[10px] tracking-[0.08em] text-ice-500">
                    진행 중
                  </span>
                )}
              </p>
            </div>

            <dl className="wall-label grid grid-cols-[3.5rem_1fr] gap-x-3 gap-y-2.5 text-[13px] leading-relaxed lg:pb-2">
              <dt className="pt-px">역할</dt>
              <dd className="text-slate-200">{activity.role}</dd>
              <dt className="pt-px">기간</dt>
              <dd className="tabular-nums text-slate-300">{activity.period}</dd>
              <dt className="pt-px">소속</dt>
              <dd className="text-slate-300">{activity.org}</dd>
            </dl>
          </header>

          {/* 첫 구간은 머리의 선과 겹치지 않게 윗선을 뺀다 */}
          <div className="[&>section:first-child]:border-t-0">
            {activity.overview && (
              <div className="grid py-16 sm:py-24 lg:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] lg:gap-16">
                <span aria-hidden />
                <p className="max-w-[44rem] text-[clamp(1.05rem,1.6vw,1.2rem)] leading-[1.95] text-slate-200">
                  {activity.overview}
                </p>
              </div>
            )}

            <Block title="한 일">
              <Bullets items={activity.highlights} />
            </Block>

            {shots.length > 0 && (
              <section className="border-t border-slate-800 py-16 sm:py-24">
                {/* 한 장뿐이면 2열 그리드의 반쪽에 갇히지 않게 전체 폭으로 */}
                <ul className={`grid gap-x-12 gap-y-20 ${shots.length > 1 ? "sm:grid-cols-2" : ""}`}>
                  {shots.map((shot, i) => (
                    <li key={shot.src}>
                      <figure>
                        <Plate>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={shot.src} alt={shot.caption} loading="lazy" decoding="async" className="block w-full" />
                        </Plate>
                        <figcaption className="mt-6 grid grid-cols-[3rem_minmax(0,1fr)] gap-x-3 text-[13px] leading-relaxed text-slate-400">
                          <span className="font-serif text-[15px] italic text-slate-500">Pl.&thinsp;{i + 1}</span>
                          <span>{shot.caption}</span>
                        </figcaption>
                      </figure>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {activity.sections?.map((section) => (
              <Block key={section.title} title={section.title}>
                <Bullets items={section.items} />
              </Block>
            ))}

            {activity.learned && activity.learned.length > 0 && (
              <Block title="배운 것">
                <div className="space-y-6">
                  {activity.learned.map((l) => (
                    <p key={l} className="max-w-[42rem] text-[16px] leading-[1.95] text-slate-300">{l}</p>
                  ))}
                </div>
              </Block>
            )}

            {activity.links && activity.links.length > 0 && (
              <Block title="기록">
                <ul className="divide-y divide-slate-800/70 border-y border-slate-800">
                  {activity.links.map((l) => (
                    <li key={l.url}>
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-baseline justify-between gap-6 py-4"
                      >
                        <span className="text-[15px] text-slate-200 transition-colors group-hover:text-ice-500">{l.label}</span>
                        <span aria-hidden className="text-[12px] text-slate-500 transition-colors group-hover:text-ice-500">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {projects.length > 0 && (
              <Block title="여기서 나온 프로젝트">
                <ul className={`grid gap-x-12 gap-y-16 ${projects.length > 1 ? "sm:grid-cols-2" : "max-w-3xl"}`}>
                  {projects.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/projects/${p.slug}`} className="group block">
                        <Plate>
                          <Cover project={p} phoneCount={2} />
                        </Plate>
                        <p className="mt-6 font-semibold tracking-[-0.02em] text-slate-100 transition-colors group-hover:text-ice-500">
                          {p.title}
                        </p>
                        <p className="mt-1 text-[13px] text-slate-400">{p.role}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Block>
            )}

          </div>

          <nav aria-label="다른 활동" className="mt-8 grid gap-8 border-t border-slate-700/80 pt-10 sm:grid-cols-2">
            {prev ? (
              <Link href={`/activity/${prev.slug}`} className="group block">
                <span className="flex items-center gap-3 text-[11px] tracking-[0.16em] text-slate-500">
                  <span aria-hidden className="h-px w-5 bg-current transition-all duration-500 group-hover:w-8" />
                  이전
                </span>
                <span className="mt-3 block text-[clamp(1.2rem,2vw,1.5rem)] font-semibold tracking-[-0.03em] text-slate-200 transition-colors group-hover:text-ice-500">
                  {prev.name}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/activity/${next.slug}`} className="group block sm:text-right">
                <span className="flex items-center gap-3 text-[11px] tracking-[0.16em] text-slate-500 sm:justify-end">
                  다음
                  <span aria-hidden className="h-px w-5 bg-current transition-all duration-500 group-hover:w-8" />
                </span>
                <span className="mt-3 block text-[clamp(1.2rem,2vw,1.5rem)] font-semibold tracking-[-0.03em] text-slate-200 transition-colors group-hover:text-ice-500">
                  {next.name}
                </span>
              </Link>
            )}
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
