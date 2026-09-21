"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SITE,
  BADGES,
  CORE_SKILLS,
  MORE_SKILLS,
  CAREERS,
  PROJECTS,
  EDUCATION,
  ACTIVITIES,
} from "@/lib/constants";
import type { BadgeKey, Project } from "@/lib/constants";
import { RESUME_HEADLINE, RESUME_STATS, RESUME_SUMMARY } from "@/lib/resume";
import "./resume.css";

const TYPE_LABEL = {
  "full-time": "정규직",
  intern: "인턴",
  education: "교육",
} as const;

/**
 * 한 문서를 세 가지 분량으로 본다.
 *   이력서  — 경력·기술·학력이 중심. 프로젝트는 이름과 한 줄만. 넘겨받은 사람이 1~2분에 판단할 분량.
 *   간결히  — 위에 대표 프로젝트 셋의 핵심을 얹는다. 보통 이걸 보낸다.
 *   자세히  — 전체 프로젝트와 그 안의 판단까지. 면접 전에 훑어보실 분을 위한 것.
 */
type View = "resume" | "brief" | "full";

const VIEWS: { key: View; label: string; note: string }[] = [
  { key: "resume", label: "이력서", note: "경력 중심 · 가장 짧게" },
  { key: "brief", label: "포트폴리오 · 간결히", note: "대표 작업 셋의 핵심" },
  { key: "full", label: "포트폴리오 · 자세히", note: "전체 작업과 판단 근거" },
];

function Techs({ items }: { items: readonly BadgeKey[] }) {
  if (items.length === 0) return null;
  return (
    <div className="rz-techs">
      {items.map((k) => (
        <span key={k} className="rz-tech">
          {BADGES[k].label}
        </span>
      ))}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rz-section">
      <h2 className="rz-h2">{title}</h2>
      {children}
    </section>
  );
}

/**
 * 프로젝트 이름은 언제나 링크다.
 * 종이로 뽑아도 PDF 안에서 눌리면 사이트의 그 프로젝트로 열린다 —
 * 문서와 사이트가 따로 놀지 않게 하는 가장 단순한 방법.
 */
function ProjectTitle({ project, withSubtitle = true }: { project: Project; withSubtitle?: boolean }) {
  return (
    <a
      className="rz-proj-link"
      href={`${SITE.url}/projects/${project.slug}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {project.title}
      {withSubtitle && ` — ${project.subtitle}`}
    </a>
  );
}

export default function ResumeDoc() {
  const [view, setView] = useState<View>("brief");
  const detail = view === "full";

  const featured = PROJECTS.filter((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured && !p.minor);
  const minor = PROJECTS.filter((p) => p.minor);
  const devActivities = ACTIVITIES.filter((a) => a.category === "dev");
  const leadActivities = ACTIVITIES.filter((a) => a.category === "leadership");
  const site = SITE.url.replace(/^https?:\/\//, "");

  return (
    <div className="rz-root" data-view={view}>
      <div className="rz-bar rz-no-print">
        <Link href="/" className="rz-bar-back">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          포트폴리오로
        </Link>

        <div className="rz-bar-spacer" />

        <div className="rz-seg" role="group" aria-label="문서 분량">
          {VIEWS.map((v) => (
            <button
              key={v.key}
              type="button"
              data-on={view === v.key}
              onClick={() => setView(v.key)}
              title={v.note}
            >
              {v.label}
            </button>
          ))}
        </div>

        <button type="button" className="rz-print-btn" onClick={() => window.print()}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          PDF로 저장
        </button>

        {SITE.resumePdf && (
          <a className="rz-print-btn" href={SITE.resumePdf} target="_blank" rel="noopener noreferrer">
            내려받기
          </a>
        )}

        <p className="rz-hint">
          지금 보시는 분량: <b>{VIEWS.find((v) => v.key === view)!.note}</b>. 인쇄 창이 열리면
          대상을 <b>PDF로 저장</b>으로 바꾸세요. 크롬의 인쇄 미리보기에서 저장하면 문서 안의
          주소와 프로젝트 이름이 눌리는 링크로 남습니다.
        </p>
      </div>

      <article className="rz-sheet">
        {/* ── 머리말 ── */}
        <header className="rz-head">
          <h1 className="rz-name">
            최승은<span>{SITE.name}</span>
          </h1>
          <p className="rz-headline">{RESUME_HEADLINE}</p>
          <p className="rz-contact">
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer">
              {SITE.github.replace(/^https?:\/\//, "")}
            </a>
            <a href={SITE.url} target="_blank" rel="noopener noreferrer">
              {site}
            </a>
          </p>
        </header>

        {/* ── 요약 ── */}
        <Section title="요약">
          <ul className="rz-summary">
            {RESUME_SUMMARY.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <dl className="rz-stats">
            {RESUME_STATS.map((s) => (
              <div key={s.label} className="rz-stat">
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* ── 기술 ── */}
        <Section title="기술">
          <div className="rz-skills">
            {[...CORE_SKILLS, ...MORE_SKILLS].map((group) => (
              <div key={group.title} className="rz-skill-row">
                <span className="rz-skill-label">{group.title}</span>
                <Techs items={group.badges} />
              </div>
            ))}
          </div>
        </Section>

        {/* ── 경력 ── */}
        <Section title="경력">
          {CAREERS.filter((c) => c.type !== "education").map((c) => (
            <div key={`${c.company}-${c.period}`} className="rz-entry">
              <div className="rz-entry-head">
                <h3 className="rz-entry-title">
                  {c.company}
                  {c.team ? ` · ${c.team}` : ""}
                </h3>
                <span className="rz-entry-period">
                  {c.period} · {TYPE_LABEL[c.type]}
                </span>
              </div>
              <p className="rz-entry-meta">{c.role}</p>
              <p className="rz-entry-summary">{c.summary}</p>
              <ul className="rz-bullets">
                {(detail ? c.details : c.details.slice(0, view === "resume" ? 3 : 4)).map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              {detail && <Techs items={c.techs} />}
            </div>
          ))}
        </Section>

        {/* ── 대표 프로젝트 ── 분량에 따라 이름만, 핵심만, 전부 */}
        <Section title="대표 프로젝트">
          {view === "resume" ? (
            <ul className="rz-oneline">
              {featured.map((p) => (
                <li key={p.slug}>
                  <b>
                    <ProjectTitle project={p} withSubtitle={false} />
                  </b>
                  <span className="rz-entry-period">
                    {p.company ?? p.org} · {p.period}
                  </span>
                  <br />
                  {p.description}
                </li>
              ))}
            </ul>
          ) : (
            featured.map((p) => (
              <div key={p.slug} className="rz-entry">
                <div className="rz-entry-head">
                  <h3 className="rz-entry-title">
                    <ProjectTitle project={p} />
                  </h3>
                  <span className="rz-entry-period">
                    {p.company ?? p.org} · {p.period}
                  </span>
                </div>
                <p className="rz-entry-meta">{p.role}</p>
                <p className="rz-entry-summary">{detail ? p.overview : p.description}</p>
                <ul className="rz-bullets">
                  {(detail ? p.highlights : p.highlights.slice(0, 5)).map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                {detail &&
                  p.sections?.map((s) => (
                    <div key={s.title} className="rz-sub">
                      <h4 className="rz-sub-title">{s.title}</h4>
                      <ul className="rz-bullets">
                        {s.items.map((i) => (
                          <li key={i}>{i}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                {detail && p.learned && p.learned.length > 0 && (
                  <div className="rz-sub">
                    <h4 className="rz-sub-title">이 프로젝트에서 배운 것</h4>
                    <ul className="rz-bullets">
                      {p.learned.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <Techs items={p.techs} />
              </div>
            ))
          )}
        </Section>

        {/* ── 그 외 프로젝트 ── */}
        <Section title="그 외 프로젝트">
          {detail ? (
            others.map((p) => (
              <div key={p.slug} className="rz-entry">
                <div className="rz-entry-head">
                  <h3 className="rz-entry-title">
                    <ProjectTitle project={p} />
                  </h3>
                  <span className="rz-entry-period">{p.period}</span>
                </div>
                <p className="rz-entry-meta">{p.role}</p>
                <ul className="rz-bullets">
                  {p.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <Techs items={p.techs} />
              </div>
            ))
          ) : view === "resume" ? (
            <ul className="rz-namelist">
              {others.map((p) => (
                <li key={p.slug}>
                  <ProjectTitle project={p} withSubtitle={false} />
                  <span className="rz-entry-period">{p.period}</span>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="rz-oneline">
              {others.map((p) => (
                <li key={p.slug}>
                  <b>
                    <ProjectTitle project={p} withSubtitle={false} />
                  </b>
                  <span className="rz-entry-period">{p.period}</span>
                  <br />
                  {p.description}
                </li>
              ))}
            </ul>
          )}
        </Section>

        {/* 부트캠프·스터디 작업은 자세히에서만 이름을 늘어놓는다 */}
        {detail && minor.length > 0 && (
          <Section title="부트캠프 · 스터디 작업">
            <ul className="rz-oneline rz-oneline-tight">
              {minor.map((p) => (
                <li key={p.slug}>
                  <b>
                    <ProjectTitle project={p} withSubtitle={false} />
                  </b>
                  <span className="rz-entry-period">
                    {p.org ?? p.company} · {p.period}
                  </span>
                  <br />
                  {p.description}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ── 학력 ── */}
        <Section title="학력">
          {EDUCATION.map((e) => (
            <div key={e.school} className="rz-entry">
              <div className="rz-entry-head">
                <h3 className="rz-entry-title">{e.school}</h3>
                <span className="rz-entry-period">{e.period}</span>
              </div>
              <p className="rz-entry-meta">{e.major}</p>
              {e.highlights && (
                <ul className="rz-bullets">
                  {e.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>

        {/* ── 활동 ── */}
        <Section title="활동">
          <ul className="rz-oneline">
            {devActivities.map((a) => (
              <li key={a.name}>
                <b>{a.name}</b>
                <span className="rz-entry-period">
                  {a.role} · {a.period}
                </span>
                <br />
                {(detail ? a.highlights : a.highlights.slice(0, 1)).join(" / ")}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="팀 · 커뮤니티">
          <ul className="rz-oneline">
            {leadActivities.map((a) => (
              <li key={a.name}>
                <b>
                  {a.name} · {a.org}
                </b>
                <span className="rz-entry-period">
                  {a.role} · {a.period}
                </span>
                <br />
                {(detail ? a.highlights : a.highlights.slice(0, 1)).join(" / ")}
              </li>
            ))}
          </ul>
        </Section>

        {/* 문서를 덮기 전에 사이트로 돌아갈 길을 한 번 더 */}
        <p className="rz-tail">
          프로젝트 이름을 누르면 무엇이 문제였고 그때 어떻게 판단했는지가 사이트에 적혀 있습니다.{" "}
          <a href={SITE.url} target="_blank" rel="noopener noreferrer">
            {site}
          </a>
        </p>

        <div className="rz-foot">
          <span>
            {SITE.name} · {SITE.title}
          </span>
          <span>{site}/resume</span>
        </div>
      </article>
    </div>
  );
}
