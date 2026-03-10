"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ABOUT_TRAITS, ABOUT_KEYWORDS } from "@/lib/constants";

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
          className="text-3xl font-bold tracking-tight text-slate-50 mb-4"
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
              <p className="text-sm text-slate-300 leading-relaxed">{trait.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap gap-3"
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
      </div>
    </section>
  );
}
