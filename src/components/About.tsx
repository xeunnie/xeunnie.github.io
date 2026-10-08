"use client";

import { motion } from "framer-motion";
import { ABOUT_TRAITS, ABOUT_INTRO, MOTTO, ABOUT_STANCE } from "@/lib/constants";
import Pipeline from "./Pipeline";
import Hexagon from "./Hexagon";

const EASE = [0.16, 1, 0.3, 1] as const;
const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];

/** 구간마다 따로 들어오게 — 느리고 작게 */
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** 구간 머리 — 라틴 한 단어(세리프 이탤릭)와 짧은 선, 그 아래 한글 제목 */
export function SectionHead({
  mark,
  title,
  as: Tag = "h2",
}: {
  mark: string;
  title: string;
  as?: "h2" | "h3";
}) {
  return (
    <div>
      <p className="mb-6 flex items-center gap-4 text-slate-500">
        <span className="font-serif text-[20px] italic text-slate-400">{mark}</span>
        <span aria-hidden className="rule" />
      </p>
      <Tag className="text-[clamp(1.7rem,3.2vw,2.4rem)] font-semibold leading-[1.25] tracking-[-0.04em] text-slate-50">
        {title}
      </Tag>
    </div>
  );
}

const STANCE_MARK: Record<string, string> = {
  "어떤 사람인가": "Character",
  "어떤 개발자인가": "Practice",
};

export default function About() {
  return (
    <>
      {/* ── 좌우명 ── 빈 벽에 이 문장 하나만 */}
      <section id="about" className="flex min-h-screen items-center pt-36 pb-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Reveal>
            <h1 className="mb-14 flex items-center gap-4 text-[11px] font-medium tracking-[0.16em] text-slate-500 sm:mb-20">
              <span aria-hidden className="rule" />
              일하는 방식
            </h1>
            <figure className="relative max-w-5xl">
              <span
                aria-hidden
                className="pointer-events-none absolute -top-[0.42em] -left-[0.08em] select-none font-serif text-[clamp(6rem,16vw,12rem)] leading-none text-ice-500/25 sm:-left-[0.5em]"
              >
                &ldquo;
              </span>
              <blockquote className="relative font-serif text-[clamp(2.2rem,5.6vw,4.6rem)] italic leading-[1.12] tracking-[-0.012em] text-balance text-slate-50">
                {MOTTO.line}
              </blockquote>
              <figcaption className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] leading-relaxed text-slate-500">
                <span aria-hidden className="rule" />
                <span className="text-slate-300">{MOTTO.by}</span>
                <span className="hidden text-slate-700 sm:inline">·</span>
                <span>{MOTTO.ko}</span>
              </figcaption>
            </figure>
          </Reveal>

          {/* 좌우명을 받는 한 문단 — 오른쪽으로 비켜 세워 문장과 숨을 띄운다 */}
          <Reveal delay={0.2} className="mt-24 lg:mt-32 lg:pl-[38%]">
            <p className="max-w-3xl text-[17px] leading-[1.95] text-slate-400">
              {ABOUT_INTRO.map((line) => (
                /* 넓은 화면에서는 적어 둔 대로 한 줄씩, 좁아지면 알아서 접히게 */
                <span key={line} className="block xl:whitespace-nowrap">
                  {line}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 어떤 사람인가 / 어떤 개발자인가 ── */}
      {ABOUT_STANCE.map((block) => (
        <section key={block.heading} className="flex min-h-screen items-center py-32 sm:py-40">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="grid gap-14 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-20">
              <Reveal className="lg:sticky lg:top-32 lg:self-start">
                <SectionHead mark={STANCE_MARK[block.heading] ?? "Note"} title={block.heading} />
              </Reveal>

              {/*
                문단 다섯 개를 쌓아 두면 벽이 된다.
                줄마다 짧은 이름을 앞세우고 가는 선으로 칸을 나눠, 이름만 훑다가
                궁금한 데서 멈춰 읽을 수 있게 했다.
              */}
              <div className="border-t border-slate-800">
                {block.paragraphs.map((t, j) => {
                  const [head, ...body] = t.split(" — ");
                  const text = body.join(" — ");
                  return (
                    <Reveal key={t} className="border-b border-slate-800 py-9">
                      {text && (
                        <p className="mb-3 grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline">
                          <span className="font-serif text-[15px] italic text-slate-500">
                            {ROMAN[j]}.
                          </span>
                          <span className="text-[15px] font-semibold tracking-[-0.03em] text-slate-100">
                            {head}
                          </span>
                        </p>
                      )}
                      <p className="max-w-[40rem] text-[16px] leading-[1.95] text-slate-300 sm:pl-9">
                        {text || head}
                      </p>
                      {/* "한 과정씩 밟았다" 바로 뒤에 그 과정을 펼쳐 둔다 */}
                      {block.heading === "어떤 개발자인가" && j === 1 && <Pipeline />}
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── 해 본 범위 ── */}
      <section className="flex min-h-screen items-center py-32 sm:py-40">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Reveal className="mb-16 sm:mb-20">
            <SectionHead mark="Range" title="해 본 범위" />
          </Reveal>
          <Hexagon />
        </div>
      </section>

      {/* ── 중요하게 보는 것 ── 번호 붙은 벽글, 근거는 그 아래 작은 설명판으로 */}
      <section className="py-32 sm:py-44">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Reveal className="mb-20 sm:mb-28">
            <SectionHead mark="Principles" title="중요하게 보는 것" />
          </Reveal>

          <div className="flex flex-col gap-24 sm:gap-32">
            {ABOUT_TRAITS.map((trait, i) => (
              <Reveal key={trait.title}>
                <article className="grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
                  <h3 className="lg:sticky lg:top-32 lg:self-start">
                    <span
                      aria-hidden
                      className="block font-serif text-[clamp(2.6rem,5vw,3.6rem)] italic leading-none text-slate-700"
                    >
                      {ROMAN[i]}.
                    </span>
                    <span className="mt-5 block text-[22px] font-semibold tracking-[-0.04em] text-slate-50">
                      {trait.title}
                    </span>
                  </h3>

                  <div className="min-w-0 lg:pt-3">
                    <p className="max-w-[40rem] text-[17px] leading-[1.95] text-slate-300">
                      {trait.desc}
                    </p>
                    {trait.evidence && (
                      <dl className="wall-label mt-10 max-w-[36rem] border-t border-slate-800 pt-5">
                        <dt className="mb-2">그래서 이렇게 했습니다</dt>
                        <dd className="text-[13.5px] leading-[1.9] text-slate-400">{trait.evidence}</dd>
                      </dl>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
