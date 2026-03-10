/* eslint-disable @next/next/no-img-element */
import { BADGES } from "@/lib/constants";

interface Props {
  name: keyof typeof BADGES;
  size?: "sm" | "md";
}

export default function TechBadge({ name, size = "md" }: Props) {
  const badge = BADGES[name];
  if (!badge) return null;

  const height = size === "sm" ? 22 : 26;
  const src = `https://img.shields.io/badge/${encodeURIComponent(badge.label)}-white?style=flat&logo=${badge.logo}&logoColor=${badge.logoColor ?? "000000"}`;

  return (
    <img
      src={src}
      alt={badge.label}
      height={height}
      className="inline-block"
      loading="lazy"
    />
  );
}
