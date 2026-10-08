import { BADGES } from "@/lib/constants";

interface Props {
  name: keyof typeof BADGES;
  size?: "sm" | "md";
}

/**
 * 기술 이름표.
 * 예전에는 shields.io 이미지를 썼는데, 목록 한 페이지에만 78개가 외부에서 오느라
 * 느렸고 그쪽이 죽으면 한꺼번에 깨졌다. 지금은 글자로 직접 그린다.
 * 벽에 붙은 작은 이름표처럼 — 가는 테두리와 보조색 글자만 둔다. 색 덩어리는 쓰지 않는다.
 */
export default function TechBadge({ name, size = "md" }: Props) {
  const badge = BADGES[name];
  if (!badge) return null;

  const small = size === "sm";

  return (
    <span
      className={`tech-chip inline-flex items-center rounded-[3px] border border-slate-800 leading-none text-slate-400 ${
        small ? "px-2 py-[5px] text-[11px]" : "px-2.5 py-1.5 text-[12px]"
      }`}
    >
      {badge.label}
    </span>
  );
}
