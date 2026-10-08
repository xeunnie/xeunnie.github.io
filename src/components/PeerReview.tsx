"use client";

import { motion } from "framer-motion";
import { PEER_REVIEWS } from "@/lib/constants";
import { SectionHead } from "./About";

const EASE = [0.16, 1, 0.3, 1] as const;

function HighlightedContent({ content, highlight }: { content: string; highlight: string }) {
  const idx = content.indexOf(highlight);
  if (idx === -1) return <>{content}</>;
  return (
    <>
      {content.slice(0, idx)}
      <span className="font-medium text-slate-100">{highlight}</span>
      {content.slice(idx + highlight.length)}
    </>
  );
}

/**
 * 동료 평가 — 벽에 적힌 인용처럼.
 * 한 줄 요약을 크게, 원문은 그 아래 조용하게, 누가 했는지는 작품 설명판처럼.
 * 인용한 말은 고치지 않는다.
 */
export default function PeerReview() {
  return (
    <section id="reviews" className="relative py-32 sm:py-44">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-20 grid gap-6 sm:mb-28 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end"
        >
          <SectionHead mark="In their words" title="동료 평가" />
          <p className="text-[13px] text-slate-500">
            함께 일했던 동료들의 이야기 · {PEER_REVIEWS.length}건
          </p>
        </motion.div>

        <div className="grid gap-x-20 gap-y-24 md:grid-cols-2 md:gap-y-32">
          {PEER_REVIEWS.map((review, i) => (
            <motion.figure
              key={review.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: EASE, delay: (i % 2) * 0.12 }}
              className={`relative ${i % 2 === 1 ? "md:mt-24" : ""}`}
            >
              <span
                aria-hidden
                className="block h-[30px] select-none font-serif text-[64px] leading-none text-ice-500/40"
              >
                &ldquo;
              </span>
              <p className="mt-3 text-[clamp(1.2rem,2vw,1.5rem)] font-semibold leading-[1.55] tracking-[-0.035em] text-slate-50">
                {review.highlight}
              </p>
              <blockquote className="mt-6 max-w-[34rem] text-[15px] leading-[1.95] text-slate-400">
                <HighlightedContent content={review.content} highlight={review.highlight} />
              </blockquote>

              <figcaption className="mt-8 flex items-start gap-4">
                <span aria-hidden className="rule mt-[0.7em] text-slate-500" />
                <span className="text-[12px] leading-[1.8]">
                  {review.github ? (
                    <a
                      href={`https://github.com/${review.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-baseline gap-1.5 font-medium text-slate-200 transition-colors duration-500 hover:text-ice-500"
                    >
                      {review.name}
                      <span className="font-mono text-[11px] text-slate-500">@{review.github}</span>
                    </a>
                  ) : (
                    <span className="block font-medium text-slate-200">{review.name}</span>
                  )}
                  <span className="block tracking-[0.04em] text-slate-500">
                    {review.role} &middot; {review.relation}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
