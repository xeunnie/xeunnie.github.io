export interface NavItem {
  /** 상단 내비게이션 라벨 */
  label: string;
  /** 홈 허브 카드에 쓰는 한글 이름 */
  ko: string;
  href: string;
  /** 이 영역이 무엇을 보여주는지 — 홈 허브 카드 설명 */
  desc: string;
}

/**
 * 사이트는 네 영역으로 나뉜다.
 * 홈(/)은 "개발자로서의 나"를 보여주는 얼굴이고,
 * 나머지 셋은 목적이 다른 독자를 위한 별도 페이지다.
 */
export const NAV_ITEMS: NavItem[] = [
  {
    label: "Projects",
    ko: "프로젝트",
    href: "/projects",
    desc: "무엇을 만들었고, 그 안에서 무엇을 판단했는지. 프로젝트마다 문제·대응·근거를 뜯어볼 수 있습니다.",
  },
  {
    label: "Growth",
    ko: "일대기",
    href: "/growth",
    desc: "2021년 첫 인턴십부터 지금까지. 해마다 무엇이 있었고 무엇을 할 수 있게 됐는지, 블로그 기록과 함께.",
  },
  {
    label: "About",
    ko: "사람",
    href: "/about",
    desc: "어떤 동료로 일하는지. 일하는 방식과 실제 협업 기록, 함께 일한 사람들의 평가를 모았습니다.",
  },
  {
    label: "Resume",
    ko: "이력서",
    href: "/resume",
    desc: "한 장으로 정리한 경력과 프로젝트. 그대로 PDF로 저장할 수 있습니다.",
  },
];
