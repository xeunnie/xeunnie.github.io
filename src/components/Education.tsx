"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EDUCATION } from "@/lib/constants";
import TechBadge from "./TechBadge";

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="relative py-32" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold tracking-tight text-slate-100 mb-4"
        >
          Education
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-px w-16 bg-ice-500 origin-left mb-16"
        />

        <div className="space-y-5">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="p-5 rounded-2xl border border-slate-800/60 bg-slate-900/30 hover:border-ice-500/20 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm mb-1">
                <span className="font-semibold text-slate-100">{edu.school}</span>
                <span className="text-slate-400">{edu.major}</span>
                <span className="text-slate-600 font-mono text-xs sm:ml-auto">{edu.period}</span>
              </div>
              {edu.highlights && (
                <ul className="mt-3 space-y-1.5">
                  {edu.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-slate-400">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-ice-500 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
              {edu.techs && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {edu.techs.map((t) => (
                    <TechBadge key={t} name={t} size="sm" />
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
