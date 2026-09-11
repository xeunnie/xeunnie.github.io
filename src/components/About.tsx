"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ABOUT_TRAITS, ABOUT_INTRO } from "@/lib/constants";

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
          <h2 className="text-3xl font-bold tracking-tight text-slate-50 mb-4">중요하게 보는 것</h2>
          <div className="h-px w-16 bg-ice-500 mb-8" />
          <div className="max-w-2xl space-y-4 mb-14">
            {ABOUT_INTRO.map((p) => (
              <p key={p} className="text-base text-slate-300 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </motion.div>

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
