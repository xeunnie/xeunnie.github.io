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
    desc: "만든 것과 그 안에서 내린 판단. 프로젝트마다 문제, 대응, 근거를 정리했습니다.",
  },
  {
    label: "About",
    ko: "일하는 방식",
    href: "/about",
    desc: "협업 기록과 커리어, 함께 일한 동료들의 평가.",
  },
  {
    label: "Growth",
    ko: "타임라인",
    href: "/growth",
    desc: "2021년부터 지금까지 해마다 한 일과 할 수 있게 된 것. 블로그 글과 함께 봅니다.",
  },
  {
    label: "Resume",
    ko: "이력서",
    href: "/resume",
    desc: "경력과 프로젝트를 한 장으로. PDF로 저장할 수 있습니다.",
  },
];
