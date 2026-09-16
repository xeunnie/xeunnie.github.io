import { BADGES } from "@/lib/constants";
import { dotColors } from "@/lib/badgeColor";

interface Props {
  name: keyof typeof BADGES;
  size?: "sm" | "md";
}

/**
 * 기술 배지.
 * 예전에는 shields.io 이미지를 썼는데, 목록 한 페이지에만 78개가 외부에서 오느라
 * 느렸고 그쪽이 죽으면 한꺼번에 깨졌다. 지금은 브랜드 색 점 + 글자로 직접 그린다.
 * 점 색은 테마별로 보정한다 (badgeColor.ts).
 */
export default function TechBadge({ name, size = "md" }: Props) {
  const badge = BADGES[name];
  if (!badge) return null;

  const { light, dark } = dotColors(badge.logoColor);
  const small = size === "sm";

  return (
    <span
      className={`tech-chip inline-flex items-center rounded-md border border-slate-800/60 bg-slate-900/30 font-medium text-slate-300 ${
        small ? "gap-1.5 px-2 py-0.5 text-[11px]" : "gap-2 px-2.5 py-1 text-xs"
      }`}
      style={{ "--dot": light, "--dot-dark": dark } as React.CSSProperties}
    >
      <span
        aria-hidden
        className={`tech-dot shrink-0 rounded-full ${small ? "h-1.5 w-1.5" : "h-2 w-2"}`}
      />
      {badge.label}
    </span>
  );
}
