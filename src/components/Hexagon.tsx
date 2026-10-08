"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { HEX_AXES, HEX_NOTE } from "@/lib/constants";

const SIZE = 300;
const C = SIZE / 2;
const R = 108;
const MAX = 5;
const RINGS = [0.2, 0.4, 0.6, 0.8, 1];
/** 꼭짓점 바깥에 축 이름이 앉을 자리 */
const PAD = 66;
const EASE = [0.16, 1, 0.3, 1] as const;
const ROMAN = ["i", "ii", "iii", "iv", "v", "vi"];

/** 꼭짓점 좌표 — 12시에서 시작해 시계 방향으로 여섯 칸 */
function point(i: number, ratio: number) {
  const angle = (Math.PI / 3) * i - Math.PI / 2;
  return [C + R * ratio * Math.cos(angle), C + R * ratio * Math.sin(angle)] as const;
}

function polygon(ratios: number[]) {
  return ratios.map((r, i) => point(i, r).join(",")).join(" ");
}

/**
 * 해 본 범위를 여섯 축으로 그린 육각형.
 * 도면처럼 가는 선만 쓰고, 옆의 목록이 "그래서 무엇을 해 봤는지" 를 말하게 한다.
 * 목록에 손을 올리면 그 축만 밝아진다 — 그림과 글이 서로를 가리키게.
 */
export default function Hexagon() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [at, setAt] = useState<number | null>(null);

  const shape = polygon(HEX_AXES.map((a) => a.value / MAX));

  return (
    <div ref={ref} className="grid items-center gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24">
      <motion.svg
        viewBox={`${-PAD} ${-PAD} ${SIZE + PAD * 2} ${SIZE + PAD * 2}`}
        role="img"
        aria-label={`해 본 범위: ${HEX_AXES.map((a) => `${a.label} ${a.value}/5`).join(", ")}`}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, ease: EASE }}
        className="mx-auto w-full max-w-[420px]"
      >
        {/* 바탕 격자 — 머리카락 굵기 */}
        {RINGS.map((r) => (
          <polygon
            key={r}
            points={polygon(Array(6).fill(r))}
            fill="none"
            stroke={r === 1 ? "var(--g-line)" : "var(--g-border)"}
            strokeWidth="0.6"
          />
        ))}
        {HEX_AXES.map((a, i) => {
          const [x, y] = point(i, 1);
          return (
            <line key={a.label} x1={C} y1={C} x2={x} y2={y} stroke="var(--g-border)" strokeWidth="0.6" />
          );
        })}

        {/* 실제 범위 — 가운데에서 천천히 펼쳐진다 */}
        <motion.polygon
          points={shape}
          fill="var(--acc)"
          fillOpacity="0.06"
          stroke="var(--acc)"
          strokeWidth="1"
          strokeLinejoin="round"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
          style={{ transformOrigin: `${C}px ${C}px` }}
        />

        {/* 가리킨 축만 선을 짙게 */}
        {at !== null && (
          <line
            x1={C}
            y1={C}
            x2={point(at, 1)[0]}
            y2={point(at, 1)[1]}
            stroke="var(--acc)"
            strokeWidth="0.8"
          />
        )}

        {/* 꼭짓점 */}
        {HEX_AXES.map((a, i) => {
          const [x, y] = point(i, a.value / MAX);
          const on = at === i;
          return (
            <motion.circle
              key={a.label}
              cx={x}
              cy={y}
              fill={on ? "var(--acc)" : "var(--g-page)"}
              stroke="var(--acc)"
              strokeWidth="1"
              initial={{ opacity: 0, r: 2.5 }}
              animate={inView ? { opacity: 1, r: on ? 4.5 : 2.5 } : { opacity: 0 }}
              transition={{
                opacity: { duration: 0.8, delay: 0.6 + i * 0.06 },
                r: { duration: 0.6, ease: EASE },
              }}
            />
          );
        })}

        {/* 가운데 — 아무것도 안 가리키면 눈금, 가리키면 그 축의 값 */}
        <text
          x={C}
          y={C + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="var(--font-instrument), serif"
          fontStyle="italic"
          fontSize="15"
          fill={at === null ? "var(--g-faint)" : "var(--acc)"}
        >
          {at === null ? `1 – ${MAX}` : `${HEX_AXES[at].value} / ${MAX}`}
        </text>

        {/* 축 번호와 이름 — 바깥으로 밀어 겹치지 않게 */}
        {HEX_AXES.map((a, i) => {
          const [x, y] = point(i, 1.28);
          const anchor = x > C + 4 ? "start" : x < C - 4 ? "end" : "middle";
          return (
            <text
              key={a.label}
              x={x}
              y={y}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize="12"
              fill={at === i ? "var(--acc)" : "var(--g-muted)"}
              fontWeight={at === i ? 600 : 400}
              letterSpacing="0.02em"
            >
              {a.label}
            </text>
          );
        })}

        {/*
          손댈 자리. 점이 작아 마우스로 맞추기 어렵고 손가락으로는 불가능하다.
          꼭짓점 둘레에 보이지 않는 넓은 원을 깔아 그 위에서 반응하게 한다.
        */}
        {HEX_AXES.map((a, i) => {
          const [x, y] = point(i, 1.05);
          return (
            <circle
              key={`hit-${a.label}`}
              cx={x}
              cy={y}
              r={34}
              fill="transparent"
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setAt(i)}
              onMouseLeave={() => setAt(null)}
              onFocus={() => setAt(i)}
              onBlur={() => setAt(null)}
            >
              <title>{`${a.label} ${a.value}/${MAX} — ${a.note}`}</title>
            </circle>
          );
        })}
      </motion.svg>

      <div>
        <ul className="border-t border-slate-800">
          {HEX_AXES.map((a, i) => (
            <motion.li
              key={a.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.3 + i * 0.06 }}
              onMouseEnter={() => setAt(i)}
              onMouseLeave={() => setAt(null)}
              onFocus={() => setAt(i)}
              onBlur={() => setAt(null)}
              tabIndex={0}
              className="grid cursor-default grid-cols-[2rem_minmax(0,1fr)_auto] items-baseline gap-x-3 border-b border-slate-800 py-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ice-500/50 sm:grid-cols-[2.25rem_8.5rem_minmax(0,1fr)_auto]"
            >
              <span aria-hidden className="font-serif text-[14px] italic text-slate-500">
                {ROMAN[i]}.
              </span>
              <span
                className={`text-[14px] font-semibold tracking-[-0.03em] transition-colors duration-500 ${
                  at === i ? "text-ice-500" : "text-slate-100"
                }`}
              >
                {a.label}
              </span>
              <span className="col-start-2 text-[13px] leading-[1.75] text-slate-400 sm:col-start-3">
                {a.note}
              </span>
              {/* 값은 가리킬 때만 — 평소엔 등급표처럼 보이지 않게 */}
              <span
                className={`col-start-3 row-start-1 font-serif text-[14px] italic tabular-nums transition-opacity duration-500 sm:col-start-4 ${
                  at === i ? "text-ice-500 opacity-100" : "opacity-0"
                }`}
                aria-hidden
              >
                {a.value}/{MAX}
              </span>
            </motion.li>
          ))}
        </ul>
        <p className="mt-6 max-w-md text-[12px] leading-[1.85] text-slate-500">{HEX_NOTE}</p>
      </div>
    </div>
  );
}
