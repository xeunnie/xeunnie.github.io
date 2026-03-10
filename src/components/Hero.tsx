"use client";

import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";

function Orb({ className, delay }: { className: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 1.5, ease: "easeOut" }}
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    />
  );
}

function OrbitDot({ size, duration, offset }: { size: number; duration: number; offset: number }) {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ animation: `orbit ${duration}s linear infinite`, animationDelay: `${offset}s` }}
    >
      <div
        className="rounded-full bg-ice-400"
        style={{ width: size, height: size, opacity: 0.4 + size * 0.05 }}
      />
    </div>
  );
}

function IsometricGrid() {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 1.5 }}
      className="absolute inset-0 w-full h-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="iso-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M60 0L30 17.3 0 0" fill="none" stroke="oklch(0.82 0.08 224 / 0.04)" strokeWidth="0.5" />
          <path d="M60 60L30 42.7 0 60" fill="none" stroke="oklch(0.82 0.08 224 / 0.04)" strokeWidth="0.5" />
          <path d="M0 0v60M60 0v60M30 17.3v25.4" fill="none" stroke="oklch(0.82 0.08 224 / 0.03)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#iso-grid)" />
    </motion.svg>
  );
}

function FloatingCube({ className, delay, size }: { className: string; delay: number; size: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1 }}
      className={`absolute pointer-events-none ${className}`}
      style={{ animation: `float ${6 + delay}s ease-in-out infinite`, animationDelay: `${delay}s` }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4L36 13v14L20 36 4 27V13z" stroke="oklch(0.82 0.08 224 / 0.12)" strokeWidth="0.8" />
        <path d="M20 4L36 13 20 22 4 13z" fill="oklch(0.82 0.08 224 / 0.03)" />
        <path d="M20 22v14L4 27V13z" fill="oklch(0.74 0.10 226 / 0.04)" />
        <path d="M20 22v14l16-9V13z" fill="oklch(0.64 0.12 228 / 0.03)" />
      </svg>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 mesh-bg" />
      <IsometricGrid />

      <Orb className="w-96 h-96 top-[10%] left-[5%] bg-ice-500/10" delay={0} />
      <Orb className="w-72 h-72 bottom-[15%] right-[10%] bg-ice-400/8" delay={0.3} />
      <Orb className="w-48 h-48 top-[60%] left-[55%] bg-ice-600/6" delay={0.6} />

      <FloatingCube className="top-[15%] right-[18%] hidden md:block" delay={0.5} size={48} />
      <FloatingCube className="bottom-[25%] left-[12%] hidden md:block" delay={1.2} size={36} />
      <FloatingCube className="top-[55%] right-[8%] hidden md:block" delay={2} size={28} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[360px] md:h-[360px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 rounded-full border border-ice-500/20" />
        <div className="absolute inset-[-30px] rounded-full border border-ice-400/10" />
        <div className="absolute inset-[-60px] rounded-full border border-ice-300/5" />
        <OrbitDot size={4} duration={12} offset={0} />
        <OrbitDot size={3} duration={18} offset={3} />
        <OrbitDot size={2} duration={25} offset={7} />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-56 md:h-56 pointer-events-none">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-ice-400/15 to-ice-600/5 animate-glow" />
        <div className="absolute inset-0 rounded-full" style={{ animation: "pulse-ring 3s ease-out infinite" }}>
          <div className="w-full h-full rounded-full border border-ice-400/20" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-sm tracking-[0.2em] text-ice-300/90 mb-6 uppercase">
            {SITE.title}
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6"
        >
          <span className="gradient-text">{SITE.name.split(" ")[0]}</span>
          <br className="sm:hidden" />
          <span className="sm:ml-4">{SITE.name.split(" ")[1]}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl md:text-2xl text-slate-200 font-light mb-4 max-w-lg mx-auto"
        >
          {SITE.description}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-sm md:text-base text-ice-400/70 font-mono mb-12 max-w-md mx-auto"
        >
          3D · WebRTC · Real-time Systems
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3.5 rounded-xl bg-ice-500 text-slate-950 font-semibold text-sm overflow-hidden transition-all hover:shadow-[0_0_32px_oklch(0.58_0.15_230/0.3)]"
          >
            <span className="relative z-10">Projects</span>
            <div className="absolute inset-0 shimmer" />
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-xl border border-slate-700 text-slate-200 font-medium text-sm hover:border-ice-500/50 hover:text-ice-300 transition-all"
          >
            Contact
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-9 rounded-full border-2 border-slate-600 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-ice-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
