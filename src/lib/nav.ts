export interface NavItem {
  /** 상단 내비게이션 라벨 */
  label: string;
  /** 홈 허브 카드에 쓰는 한글 이름 */
  ko: string;
  href: string;
  /** 이 영역이 무엇을 보여주는지 — 홈 허브 카드 설명 */
  desc: string;
  /** 읽는 사람이 그 시점에 품는 질문 — 홈에서 번호 대신 이걸로 안내한다 */
  question: string;
}

/**
 * 상단에 거는 건 셋뿐이다.
 * 처음 온 사람에게 다섯 갈래를 한 번에 보여 주면 어디부터 볼지 고르다 지친다.
 * 협업 기록·타임라인은 없애지 않고 MORE_ITEMS 로 내려, 푸터에서만 들어가게 한다.
 */
export const NAV_ITEMS: NavItem[] = [
  {
    label: "Projects",
    ko: "프로젝트",
    href: "/projects",
    question: "무엇을 만들었나",
    desc: "만든 것과 그 안에서 내린 판단. 프로젝트마다 문제, 대응, 근거를 정리했습니다.",
  },
  {
    label: "About",
    ko: "일하는 방식",
    href: "/about",
    question: "같이 일하면 어떤 사람이냐면요",
    desc: "좌우명과 일할 때 중요하게 보는 것, 그리고 해 본 범위를 적었습니다.",
  },
  {
    label: "Resume",
    ko: "이력서",
    href: "/resume",
    question: "한 장으로 보고 싶으시다면",
    desc: "경력과 프로젝트를 한 장에 담았습니다. 그대로 PDF로 저장하실 수 있습니다.",
  },
];

/** 상단에는 걸지 않는다. 푸터와 본문 링크로만 닿는 곳. */
export const MORE_ITEMS: NavItem[] = [
  {
    label: "Collab",
    ko: "협업 기록",
    href: "/collaboration",
    question: "같이 일한 분들은 뭐라고 하냐면요",
    desc: "디자이너·백엔드·현장 담당자와 어떻게 맞춰 갔는지, 그분들이 해 주신 이야기와 함께 두었습니다.",
  },
  {
    label: "Growth",
    ko: "타임라인",
    href: "/growth",
    question: "어쩌다 여기까지 왔냐면요",
    desc: "2021년부터 해마다 무엇을 했고 무엇을 할 수 있게 됐는지 적었습니다. 그때 쓴 블로그 글도 함께 두었습니다.",
  },
];
