"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ABOUT_TRAITS, ABOUT_KEYWORDS, EDUCATION } from "@/lib/constants";
import TechBadge from "./TechBadge";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold tracking-tight text-slate-100 mb-4"
        >
          About
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-px w-16 bg-ice-500 origin-left mb-16"
        />

        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {ABOUT_TRAITS.map((trait, i) => (
            <motion.div
              key={trait.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              className="group p-6 rounded-2xl border border-slate-800/60 bg-slate-900/30 hover:border-ice-500/20 hover:bg-slate-900/50 transition-all duration-300"
            >
              <h3 className="text-base font-semibold text-slate-100 mb-2 group-hover:text-ice-400 transition-colors">
                {trait.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">{trait.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap gap-3 mb-16"
        >
          {ABOUT_KEYWORDS.map((kw) => (
            <span
              key={kw}
              className="px-4 py-1.5 rounded-full text-xs font-medium bg-ice-500/10 text-ice-400 border border-ice-500/20"
            >
              {kw}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-6">
            Education
          </h3>
          <div className="space-y-5">
            {EDUCATION.map((edu) => (
              <div key={edu.school} className="p-4 rounded-xl border border-slate-800/40 bg-slate-900/20">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm mb-1">
                  <span className="font-medium text-slate-200">{edu.school}</span>
                  <span className="text-slate-500">{edu.major}</span>
                  <span className="text-slate-600 font-mono text-xs sm:ml-auto">{edu.period}</span>
                </div>
                {edu.highlights && (
                  <ul className="mt-2 space-y-1">
                    {edu.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-xs text-slate-400">
                        <span className="mt-1 w-1 h-1 rounded-full bg-ice-500 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                {edu.techs && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {edu.techs.map((t) => (
                      <TechBadge key={t} name={t} size="sm" />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
