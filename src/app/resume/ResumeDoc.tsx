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
import type { BadgeKey } from "@/lib/constants";
import { RESUME_HEADLINE, RESUME_STATS, RESUME_SUMMARY } from "@/lib/resume";
import "./resume.css";

const TYPE_LABEL = {
  "full-time": "정규직",
  intern: "인턴",
  education: "교육",
} as const;

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

export default function ResumeDoc() {
  const [detail, setDetail] = useState(false);

  const featured = PROJECTS.filter((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);
  const devActivities = ACTIVITIES.filter((a) => a.category === "dev");
  const leadActivities = ACTIVITIES.filter((a) => a.category === "leadership");
  const site = SITE.url.replace(/^https?:\/\//, "");

  return (
    <div className="rz-root" data-detail={detail}>
      <div className="rz-bar rz-no-print">
        <Link href="/" className="rz-bar-back">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M10 3L5 8l5 5" />
          </svg>
          포트폴리오로
        </Link>

        <div className="rz-bar-spacer" />

        <div className="rz-seg" role="group" aria-label="문서 분량">
          <button type="button" data-on={!detail} onClick={() => setDetail(false)}>
            요약본
          </button>
          <button type="button" data-on={detail} onClick={() => setDetail(true)}>
            상세본
          </button>
        </div>

        <button type="button" className="rz-print-btn" onClick={() => window.print()}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          PDF로 저장
        </button>

        <p className="rz-hint">
          인쇄 창이 열리면 대상(프린터)을 <b>PDF로 저장</b>으로 바꾸고 저장하세요. 배경 그래픽은 켜지 않아도 됩니다.
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
            <a href={SITE.github}>{SITE.github.replace(/^https?:\/\//, "")}</a>
            <a href={SITE.url}>{site}</a>
          </p>
        </header>

        {/* ── 요약 ── */}
        <Section title="Summary">
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
        <Section title="Skills">
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
        <Section title="Experience">
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
                {(detail ? c.details : c.details.slice(0, 4)).map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              {detail && <Techs items={c.techs} />}
            </div>
          ))}
        </Section>

        {/* ── 주요 프로젝트 ── */}
        <Section title="Selected Projects">
          {featured.map((p) => (
            <div key={p.slug} className="rz-entry">
              <div className="rz-entry-head">
                <h3 className="rz-entry-title">
                  {p.title} — {p.subtitle}
                </h3>
                <span className="rz-entry-period">
                  {p.company ? `${p.company} · ` : "Personal · "}
                  {p.period}
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
              <Techs items={p.techs} />
            </div>
          ))}
        </Section>

        {/* ── 그 외 프로젝트 ── */}
        <Section title="Other Projects">
          {detail ? (
            others.map((p) => (
              <div key={p.slug} className="rz-entry">
                <div className="rz-entry-head">
                  <h3 className="rz-entry-title">
                    {p.title} — {p.subtitle}
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
          ) : (
            <ul className="rz-oneline">
              {others.map((p) => (
                <li key={p.slug}>
                  <b>{p.title}</b>
                  <span className="rz-entry-period">{p.period}</span>
                  <br />
                  {p.description}
                </li>
              ))}
            </ul>
          )}
        </Section>

        {/* ── 교육 ── */}
        <Section title="Education">
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
        <Section title="Activities">
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

        <Section title="Leadership & Community">
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
