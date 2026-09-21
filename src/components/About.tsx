"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ABOUT_TRAITS, ABOUT_INTRO, MOTTO, ABOUT_STANCE } from "@/lib/constants";
import Pipeline from "./Pipeline";
import Hexagon from "./Hexagon";

/** 구간마다 따로 들어오게 — 한 번에 다 나타나면 랜딩처럼 읽히지 않는다 */
function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <>
      {/* ── 좌우명 ── 한 화면에 이 문장만 둔다 */}
      <section id="about" className="flex min-h-screen items-center pt-32 pb-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Reveal>
            <h1 className="mb-8 text-[11px] font-semibold tracking-[0.1em] text-ice-500">
              일하는 방식
            </h1>
            <figure className="max-w-4xl">
              <blockquote className="text-[clamp(1.8rem,5vw,3.4rem)] font-bold leading-[1.22] tracking-tight text-slate-50">
                <span className="text-ice-500">“</span>
                {MOTTO.line}
                <span className="text-ice-500">”</span>
              </blockquote>
              <figcaption className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-400">
                <span>{MOTTO.ko}</span>
                <span className="text-slate-700">·</span>
                <span className="text-slate-500">{MOTTO.by}</span>
              </figcaption>
            </figure>

            {/* 좌우명을 받는 한 문단 — 어중간한 데서 줄이 끊기지 않게 균형을 잡는다 */}
            <p className="mt-10 max-w-3xl text-lg leading-[1.8] text-slate-300">
              {ABOUT_INTRO.map((line) => (
                /* 넓은 화면에서는 적어 둔 대로 한 줄씩, 좁아지면 알아서 접히게 */
                <span key={line} className="block sm:whitespace-nowrap">
                  {line}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 어떤 사람인가 / 어떤 개발자인가 ── 두 덩어리를 위아래로 세운다 */}
      {ABOUT_STANCE.map((block, i) => (
        <section key={block.heading} className="flex min-h-screen items-center py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <Reveal>
              <div className="grid gap-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-16">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <p className="mb-3 font-mono text-xs font-semibold tabular-nums text-ice-500">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
                    {block.heading}
                  </h2>
                  <div
                    aria-hidden
                    className="mt-6 hidden h-0.5 w-16 rounded-full bg-ice-500 lg:block"
                  />
                </div>

                {/*
                  문단 다섯 개를 쌓아 두면 벽이 된다.
                  줄마다 짧은 이름을 앞세우고 가로줄로 칸을 나눠, 이름만 훑다가
                  궁금한 데서 멈춰 읽을 수 있게 했다 — 해 본 범위 목록과 같은 방식.
                */}
                <div className="divide-y divide-slate-800/60 border-y border-slate-800/60">
                  {block.paragraphs.map((t, j) => {
                    const [head, ...body] = t.split(" — ");
                    const text = body.join(" — ");
                    return (
                      <div key={t} className="py-5">
                        {text && (
                          <p className="mb-2 text-sm font-bold tracking-tight text-ice-500">
                            {head}
                          </p>
                        )}
                        <p className="max-w-[42rem] text-[17px] leading-[1.9] text-slate-300">
                          {text || head}
                        </p>
                        {/* "한 과정씩 밟았다" 바로 뒤에 그 과정을 펼쳐 둔다 */}
                        {block.heading === "어떤 개발자인가" && j === 1 && <Pipeline />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* ── 해 본 범위 ── 글로만 두면 안 읽히는 것을 그림으로 */}
      <section className="flex min-h-screen items-center py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Reveal className="mb-12">
            <p className="mb-3 font-mono text-xs font-semibold tabular-nums text-ice-500">03</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
              해 본 범위
            </h2>
          </Reveal>
          <Hexagon />
        </div>
      </section>

      {/* ── 중요하게 보는 것 ── */}
      <section className="py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Reveal className="mb-10">
            <p className="mb-3 font-mono text-xs font-semibold tabular-nums text-ice-500">04</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
              중요하게 보는 것
            </h2>
          </Reveal>

          {/*
            카드 여섯 장으로 두니 이 구간만 페이지에서 튀었다.
            다른 구간이 전부 가로줄로 칸을 나누는데 여기만 상자였기 때문이다.
            같은 문법으로 맞춘다 — 번호와 제목은 왼쪽, 내용은 오른쪽, 사이는 가로줄.
          */}
          <div className="divide-y divide-slate-800/60 border-y border-slate-800/60">
            {ABOUT_TRAITS.map((trait, i) => (
              <Reveal key={trait.title}>
                <article className="grid gap-x-10 gap-y-3 py-8 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
                  <h3 className="flex items-baseline gap-3 lg:sticky lg:top-28 lg:self-start">
                    <span className="font-mono text-xs font-semibold tabular-nums text-ice-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg font-bold tracking-tight text-slate-50">
                      {trait.title}
                    </span>
                  </h3>

                  <div className="min-w-0">
                    <p className="max-w-[42rem] text-[17px] leading-[1.9] text-slate-300">
                      {trait.desc}
                    </p>
                    {trait.evidence && (
                      <p className="mt-5 max-w-[42rem] border-l-2 border-ice-500/50 bg-ice-50 py-3 pl-5 pr-4 text-[15px] leading-[1.8] text-slate-400">
                        <span className="mb-1 block text-[11px] font-semibold tracking-[0.06em] text-ice-500">
                          그래서 이렇게 했습니다
                        </span>
                        {trait.evidence}
                      </p>
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
