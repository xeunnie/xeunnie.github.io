"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { HEX_AXES, HEX_NOTE } from "@/lib/constants";

const SIZE = 300;
const C = SIZE / 2;
const R = 108;
const MAX = 5;
const RINGS = [0.25, 0.5, 0.75, 1];
/** 꼭짓점 바깥에 축 이름이 앉을 자리 */
const PAD = 52;

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
 * 숫자를 크게 띄우면 등급표처럼 보이므로, 그림은 조용하게 두고
 * 옆의 목록이 "그래서 무엇을 해 봤는지" 를 말하게 한다.
 * 목록에 손을 올리면 그 축만 밝아진다 — 그림과 글이 서로를 가리키게.
 */
export default function Hexagon() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [at, setAt] = useState<number | null>(null);

  const shape = polygon(HEX_AXES.map((a) => a.value / MAX));

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-16">
      <motion.svg
        viewBox={`${-PAD} ${-PAD} ${SIZE + PAD * 2} ${SIZE + PAD * 2}`}
        role="img"
        aria-label={`해 본 범위: ${HEX_AXES.map((a) => `${a.label} ${a.value}/5`).join(", ")}`}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto w-full max-w-[360px]"
      >
        {/* 바탕 격자 */}
        {RINGS.map((r) => (
          <polygon
            key={r}
            points={polygon(Array(6).fill(r))}
            fill="none"
            stroke="var(--g-border)"
            strokeWidth="1"
          />
        ))}
        {HEX_AXES.map((a, i) => {
          const [x, y] = point(i, 1);
          return (
            <line
              key={a.label}
              x1={C}
              y1={C}
              x2={x}
              y2={y}
              stroke="var(--g-border)"
              strokeWidth="1"
            />
          );
        })}

        {/* 실제 범위 — 가운데에서 펼쳐진다 */}
        <motion.polygon
          points={shape}
          fill="var(--acc)"
          fillOpacity="0.14"
          stroke="var(--acc)"
          strokeWidth="2"
          strokeLinejoin="round"
          initial={{ scale: 0.2, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${C}px ${C}px` }}
        />

        {/* 가리킨 축만 선을 굵게 — 어느 방향을 보고 있는지 */}
        {at !== null && (
          <line
            x1={C}
            y1={C}
            x2={point(at, 1)[0]}
            y2={point(at, 1)[1]}
            stroke="var(--acc)"
            strokeWidth="1.5"
            strokeOpacity="0.5"
          />
        )}

        {/* 꼭짓점 — 가리키는 축만 커진다 */}
        {HEX_AXES.map((a, i) => {
          const [x, y] = point(i, a.value / MAX);
          const on = at === i;
          return (
            <motion.circle
              key={a.label}
              cx={x}
              cy={y}
              fill="var(--acc)"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1, r: on ? 7 : 3.5 } : { opacity: 0 }}
              transition={{
                opacity: { duration: 0.3, delay: 0.5 + i * 0.05 },
                r: { type: "spring", stiffness: 420, damping: 24 },
              }}
            />
          );
        })}

        {/* 가운데 — 아무것도 안 가리키면 축 개수, 가리키면 그 축의 값 */}
        <text
          x={C}
          y={C - 6}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-[9px]"
          fill="var(--g-faint)"
        >
          {at === null ? "여섯 축" : HEX_AXES[at].label}
        </text>
        <text
          x={C}
          y={C + 12}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-[15px]"
          fontWeight="700"
          fill={at === null ? "var(--g-faint)" : "var(--acc)"}
        >
          {at === null ? `1 — ${MAX}` : `${HEX_AXES[at].value} / ${MAX}`}
        </text>

        {/* 축 이름 — 원 바깥으로 살짝 밀어 겹치지 않게 */}
        {HEX_AXES.map((a, i) => {
          const [x, y] = point(i, 1.3);
          return (
            <text
              key={a.label}
              x={x}
              y={y}
              textAnchor={x > C + 4 ? "start" : x < C - 4 ? "end" : "middle"}
              dominantBaseline="middle"
              className="text-[11px]"
              fill={at === i ? "var(--acc)" : "var(--g-muted)"}
              fontWeight={at === i ? 700 : 500}
            >
              {a.label}
            </text>
          );
        })}

        {/*
          손댈 자리. 점은 3.5px 라 마우스로 맞추기 어렵고 손가락으로는 불가능하다.
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
        <ul className="-mx-3 divide-y divide-slate-800/60 border-y border-slate-800/60">
          {HEX_AXES.map((a, i) => (
            <motion.li
              key={a.label}
              initial={{ opacity: 0, x: 8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
              onMouseEnter={() => setAt(i)}
              onMouseLeave={() => setAt(null)}
              onFocus={() => setAt(i)}
              onBlur={() => setAt(null)}
              tabIndex={0}
              className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg px-3 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ice-500/40 ${
                at === i ? "bg-ice-50" : ""
              }`}
            >
              <span
                className={`w-32 shrink-0 text-sm font-semibold transition-colors ${
                  at === i ? "text-ice-500" : "text-slate-100"
                }`}
              >
                {a.label}
              </span>
              <span className="min-w-0 flex-1 text-[13px] leading-relaxed text-slate-400">
                {a.note}
              </span>
              {/* 값은 가리킬 때만 — 평소엔 등급표처럼 보이지 않게 */}
              <span
                className={`ml-auto font-mono text-xs tabular-nums transition-opacity ${
                  at === i ? "text-ice-500 opacity-100" : "opacity-0"
                }`}
                aria-hidden
              >
                {a.value}/{MAX}
              </span>
            </motion.li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-slate-500">{HEX_NOTE}</p>
      </div>
    </div>
  );
}
