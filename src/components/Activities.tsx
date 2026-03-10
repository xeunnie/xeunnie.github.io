"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ACTIVITIES } from "@/lib/constants";
import type { Activity } from "@/lib/constants";

function ActivityCard({ activity, index }: { activity: Activity; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group p-5 rounded-2xl border border-slate-800/60 bg-slate-900/30 hover:border-ice-500/20 hover:bg-slate-900/50 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-base font-semibold text-slate-100 group-hover:text-ice-300 transition-colors">
              {activity.name}
            </h4>
            {activity.active && (
              <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                진행중
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">
            {activity.org} &middot; {activity.role}
          </p>
        </div>
        <span className="text-xs font-mono text-slate-600 shrink-0">{activity.period}</span>
      </div>
      <ul className="space-y-1.5">
        {activity.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-sm text-slate-400">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-ice-500 shrink-0" />
            {h}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Activities() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const devActivities = ACTIVITIES.filter((a) => a.category === "dev");
  const leadershipActivities = ACTIVITIES.filter((a) => a.category === "leadership");

  return (
    <section id="activities" className="relative py-32 mesh-bg" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold tracking-tight text-slate-100 mb-4"
        >
          Activities
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-px w-16 bg-ice-500 origin-left mb-16"
        />

        <div className="mb-14">
          <h3 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-6">
            Development & Study
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {devActivities.map((a, i) => (
              <ActivityCard key={a.name} activity={a} index={i} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-mono tracking-widest text-ice-400 uppercase mb-6">
            Leadership & Community
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {leadershipActivities.map((a, i) => (
              <ActivityCard key={a.name} activity={a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
