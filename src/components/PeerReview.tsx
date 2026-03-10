"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PEER_REVIEWS } from "@/lib/constants";

function HighlightedContent({ content, highlight }: { content: string; highlight: string }) {
  const idx = content.indexOf(highlight);
  if (idx === -1) return <>{content}</>;
  return (
    <>
      {content.slice(0, idx)}
      <span className="text-ice-300 font-medium">{highlight}</span>
      {content.slice(idx + highlight.length)}
    </>
  );
}

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
          className="text-3xl font-bold tracking-tight text-slate-50 mb-4"
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
          className="text-sm text-slate-400 mb-14"
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
              <p className="text-sm text-slate-300 leading-relaxed mb-4 mt-2">
                <HighlightedContent content={review.content} highlight={review.highlight} />
              </p>
              <div className="px-3 py-2 rounded-lg bg-ice-500/5 border border-ice-500/10 mb-4">
                <p className="text-xs text-ice-300 font-medium">&ldquo;{review.highlight}&rdquo;</p>
              </div>
              <div className="border-t border-slate-800/60 pt-4">
                <p className="text-sm font-medium text-slate-100">{review.name}</p>
                <p className="text-xs text-slate-500">{review.role} &middot; {review.relation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
