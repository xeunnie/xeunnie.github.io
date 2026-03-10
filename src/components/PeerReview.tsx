"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PEER_REVIEWS } from "@/lib/constants";

export default function PeerReview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="reviews" className="relative py-32 mesh-bg" ref={ref}>
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold tracking-tight text-slate-100 mb-4"
        >
          Peer Review
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-px w-16 bg-ice-500 origin-left mb-6"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-sm text-slate-500 mb-14"
        >
          함께 일했던 동료들의 이야기
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6">
          {PEER_REVIEWS.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
              className="relative p-6 rounded-2xl border border-slate-800/60 bg-slate-900/30 hover:border-ice-500/20 transition-all duration-300"
            >
              <span className="absolute -top-3 left-6 text-4xl text-ice-500/20 font-serif leading-none select-none">
                &ldquo;
              </span>
              <p className="text-sm text-slate-300 leading-relaxed mb-6 mt-2">{review.content}</p>
              <div className="border-t border-slate-800/60 pt-4">
                <p className="text-sm font-medium text-slate-200">{review.name}</p>
                <p className="text-xs text-slate-500">{review.role} &middot; {review.relation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
