import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Cover } from "@/components/home/Work";
import { ACTIVITIES, PROJECTS, SITE } from "@/lib/constants";
import type { Project } from "@/lib/constants";

const CATEGORY_LABEL = { dev: "개발 스터디 · 해커톤", leadership: "팀 활동" } as const;

/** 왼쪽에 구간 이름, 오른쪽에 내용 — 상세 페이지의 모든 구간이 같은 틀을 쓴다 */
function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-16 grid gap-6 lg:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] lg:gap-14">
      <h2 className="text-[13px] font-semibold text-slate-500">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((h) => (
        <li key={h} className="flex items-start gap-3">
          <span aria-hidden className="mt-[0.7rem] h-1 w-1 shrink-0 rounded-full bg-ice-500" />
          <span className="text-[16px] leading-[1.85] text-slate-300">{h}</span>
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

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-32 pb-24 sm:pt-40">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/activity"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-ice-500"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            활동 전체
          </Link>

          <header className="mt-10">
            <p className="flex flex-wrap items-center gap-3 text-[13px] font-medium text-slate-500">
              {CATEGORY_LABEL[activity.category]}
              {activity.active && (
                <span className="rounded-full bg-ice-100 px-2 py-0.5 text-[11px] font-semibold text-ice-500">진행 중</span>
              )}
            </p>
            <h1 className="mt-4 text-[clamp(2.25rem,6vw,4rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-slate-50">
              {activity.name}
            </h1>
          </header>

          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-slate-800 py-8 sm:grid-cols-3">
            <div>
              <dt className="text-[12px] text-slate-500">역할</dt>
              <dd className="mt-1.5 font-semibold text-slate-100">{activity.role}</dd>
            </div>
            <div>
              <dt className="text-[12px] text-slate-500">기간</dt>
              <dd className="mt-1.5 tabular-nums text-slate-100">{activity.period}</dd>
            </div>
            <div>
              <dt className="text-[12px] text-slate-500">소속</dt>
              <dd className="mt-1.5 text-slate-100">{activity.org}</dd>
            </div>
          </dl>

          {activity.overview && (
            <p className="mt-14 max-w-3xl text-[17px] leading-[1.95] text-slate-300">{activity.overview}</p>
          )}

          <Block title="한 일">
            <Bullets items={activity.highlights} />
          </Block>

          {activity.shots && activity.shots.length > 0 && (
            <section className="mt-20">
              <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
                {activity.shots.map((shot) => (
                  <li key={shot.src}>
                    <figure>
                      <div className="overflow-hidden border border-slate-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={shot.src} alt={shot.caption} loading="lazy" decoding="async" className="w-full" />
                      </div>
                      <figcaption className="mt-3 text-[13px] leading-relaxed text-slate-400">{shot.caption}</figcaption>
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
              <div className="space-y-5">
                {activity.learned.map((l) => (
                  <p key={l} className="text-[16px] leading-[1.9] text-slate-300">{l}</p>
                ))}
              </div>
            </Block>
          )}

          {activity.links && activity.links.length > 0 && (
            <Block title="기록">
              <ul className="flex flex-wrap gap-2.5">
                {activity.links.map((l) => (
                  <li key={l.url}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-ice-500/40 hover:text-ice-500"
                    >
                      {l.label}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {projects.length > 0 && (
            <section className="mt-20">
              <h2 className="text-[13px] font-semibold text-slate-500">여기서 나온 프로젝트</h2>
              <ul className="mt-6 grid gap-8 sm:grid-cols-2">
                {projects.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/projects/${p.slug}`} className="group block">
                      <div className="overflow-hidden border border-slate-800">
                        <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                          <Cover project={p} phoneCount={2} />
                        </div>
                      </div>
                      <p className="mt-4 font-bold tracking-tight text-slate-100 transition-colors group-hover:text-ice-500">{p.title}</p>
                      <p className="mt-1 text-[13px] text-slate-400">{p.role}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <nav aria-label="다른 활동" className="mt-24 grid gap-4 border-t border-slate-800 pt-8 sm:grid-cols-2">
            {prev ? (
              <Link href={`/activity/${prev.slug}`} className="group block">
                <span className="text-[12px] text-slate-500">이전</span>
                <span className="mt-1 block font-semibold text-slate-200 transition-colors group-hover:text-ice-500">{prev.name}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/activity/${next.slug}`} className="group block sm:text-right">
                <span className="text-[12px] text-slate-500">다음</span>
                <span className="mt-1 block font-semibold text-slate-200 transition-colors group-hover:text-ice-500">{next.name}</span>
              </Link>
            )}
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
