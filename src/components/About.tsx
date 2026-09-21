"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ABOUT_TRAITS, ABOUT_INTRO, MOTTO, ABOUT_STANCE } from "@/lib/constants";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* 좌우명이 먼저 읽히고, 아래 두 문단이 그 말을 받는다 */}
          <figure className="mb-10 max-w-3xl">
            <blockquote className="text-[clamp(1.6rem,4.2vw,2.6rem)] font-bold leading-[1.28] tracking-tight text-slate-50">
              <span className="text-ice-500">“</span>
              {MOTTO.line}
              <span className="text-ice-500">”</span>
            </blockquote>
            <figcaption className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-400">
              <span>{MOTTO.ko}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-500">{MOTTO.by}</span>
            </figcaption>
          </figure>

          <div className="max-w-2xl space-y-4 mb-14">
            {ABOUT_INTRO.map((p) => (
              <p key={p} className="text-base text-slate-300 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </motion.div>

        {/* 기준을 늘어놓기 전에, 스스로를 어떻게 보는지부터 */}
        <div className="mb-14 grid gap-10 md:grid-cols-2">
          {ABOUT_STANCE.map((block, i) => (
            <motion.div
              key={block.heading}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <h3 className="mb-4 text-xl font-bold tracking-tight text-slate-50">
                {block.heading}
              </h3>
              <div className="space-y-3">
                {block.paragraphs.map((t) => (
                  <p key={t} className="text-sm leading-relaxed text-slate-300">
                    {t}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <h3 className="mb-6 text-sm font-semibold tracking-tight text-ice-500">중요하게 보는 것</h3>
        <div className="grid md:grid-cols-2 gap-5">
          {ABOUT_TRAITS.map((trait, i) => (
            <motion.div
              key={trait.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
              className="group flex flex-col p-6 rounded-2xl border border-slate-800/60 bg-slate-900/30 hover:border-ice-500/20 hover:bg-slate-900/50 card-hover transition-all duration-300"
            >
              <h3 className="text-base font-semibold text-slate-100 mb-2 group-hover:text-ice-400 transition-colors">
                {trait.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">{trait.desc}</p>
              {trait.evidence && (
                <p className="mt-4 pt-4 border-t border-slate-800/60 text-sm text-slate-400 leading-relaxed">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-ice-500 mr-2">
                    사례
                  </span>
                  {trait.evidence}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
