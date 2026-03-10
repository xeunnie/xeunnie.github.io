"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { CORE_SKILLS, MORE_SKILLS } from "@/lib/constants";
import TechBadge from "./TechBadge";

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="skills" className="relative py-32" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold tracking-tight text-slate-100 mb-4"
        >
          Skills
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-px w-16 bg-ice-500 origin-left mb-16"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CORE_SKILLS.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
              className="group p-5 rounded-2xl border border-slate-800/60 bg-slate-900/30 hover:border-ice-500/20 hover:bg-slate-900/50 transition-all duration-300"
            >
              <h3 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-4">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.badges.map((key) => (
                  <TechBadge key={key} name={key} size="sm" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setShowMore(!showMore)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-800/60 bg-slate-900/30 text-sm text-slate-400 hover:border-ice-500/20 hover:text-ice-400 transition-all"
          >
            {showMore ? "접기" : "더 보기"}
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform duration-300 ${showMore ? "rotate-180" : ""}`}
            >
              <path d="M3 5l4 4 4-4" />
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {showMore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-5">
                {MORE_SKILLS.map((group, i) => (
                  <motion.div
                    key={group.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="group p-5 rounded-2xl border border-slate-800/60 bg-slate-900/30 hover:border-ice-500/20 hover:bg-slate-900/50 transition-all duration-300"
                  >
                    <h3 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-4">
                      {group.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {group.badges.map((key) => (
                        <TechBadge key={key} name={key} size="sm" />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
