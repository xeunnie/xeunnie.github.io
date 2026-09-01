export interface ActivityLink {
  label: string;
  url: string;
}

export interface Activity {
  name: string;
  category: "dev" | "leadership";
  org: string;
  period: string;
  role: string;
  active: boolean;
  highlights: string[];
  links?: ActivityLink[];
  /** 이 활동에서 나온 프로젝트 slug — 상세로 이어준다 */
  projects?: string[];
}

export const ACTIVITIES: Activity[] = [
  {
    name: "Gunbamz Study",
    category: "dev",
    org: "Gunbamz Study",
    period: "2025.01 — 현재",
    role: "스터디 팀장",
    active: true,
    highlights: [
      "프론트엔드 딥다이브 스터디를 기획하고 리드 — 주차마다 주제 하나를 실습까지 끌고 감",
      "31주차까지 누적, 주차별 레포로 기록 — CSR/SSR·SSG 렌더링, 테스트, CI/CD, React Query, SWR, useTransition, 번들링, 코드 스플리팅, 메모이제이션, WebP, PWA, 웹 접근성, 마이크로 프론트엔드, 브라우저 렌더링, 웹 아키텍처, CDN",
      "매주 발표 후 정리를 남기는 방식 — 읽고 끝내지 않고 실습과 문서가 함께 남게 함",
    ],
    links: [
      { label: "스터디 조직", url: "https://github.com/FESIStudy" },
      { label: "주차별 레포", url: "https://github.com/orgs/FESIStudy/repositories" },
    ],
  },
  {
    name: "Front Ninjas Study",
    category: "dev",
    org: "Front Ninjas",
    period: "2024.09 — 현재",
    role: "스터디 팀장",
    active: true,
    highlights: [
      "모던 자바스크립트 딥다이브, 우아한 타입스크립트 등 기술 서적 기반 이론→구현→발표 스터디",
      "코드 리뷰 및 기술 토론 운영으로 실무에 가까운 협업 경험 축적",
      "코드 품질, 타입 안정성, 아키텍처 설계 관점의 깊이 있는 논의 주도",
    ],
    links: [
      { label: "스터디 조직", url: "https://github.com/Front-Ninjas" },
      { label: "모던 JS 딥다이브", url: "https://github.com/Front-Ninjas/modern-javascript-deep-dive" },
      { label: "우아한 타입스크립트", url: "https://github.com/Front-Ninjas/woowahan-typescript-with-react" },
    ],
  },
  {
    name: "Devlog Challengers",
    category: "dev",
    org: "Devlog Challengers",
    period: "2024.06 — 현재",
    role: "스터디 참여자",
    active: true,
    highlights: [
      "프론트·백엔드 개발자 간 지식 교류 목적의 블로그 기반 기술 스터디",
      "REST API 설계, DB 모델링, 서버 구조 등 백엔드 주제를 프론트 입장에서 학습",
      "매주 1개 이상 기술 블로그 작성 및 발표",
    ],
    links: [
      { label: "velog", url: "https://velog.io/@xeunnie" },
      { label: "Tistory", url: "https://xeunnie.tistory.com" },
    ],
  },
  {
    name: "삐약톤 (Google Developers 해커톤)",
    category: "dev",
    org: "Google Developers",
    period: "2024.06",
    role: "Frontend Developer",
    active: false,
    highlights: [
      "20시간 제한 해커톤에서 Figma → React + TypeScript로 MVP 완성",
      "WebSocket 및 브라우저 저장소를 활용한 실시간 서비스 구현",
      "디자이너·백엔드와 애자일 방식의 빠른 기획-개발-피드백 루프 수행",
    ],
    links: [{ label: "팀 조직", url: "https://github.com/chickHackathon" }],
    projects: ["ppiyo"],
  },
  {
    name: "Kubernetes & Docker Study",
    category: "dev",
    org: "Kubernetes DevOps Study",
    period: "2025.01 — 2025.03",
    role: "스터디 팀장",
    active: false,
    highlights: [
      "Kubernetes 기반 마이크로서비스 아키텍처 학습 및 실습",
      "카나리 무중단 배포 전략 설계 및 적용",
      "최종 프로젝트: 디스코드 클론 플랫폼 (ChatFlow) 구축",
    ],
    links: [{ label: "팀 조직", url: "https://github.com/ChatFlowProject" }],
    projects: ["chatflow"],
  },
  {
    name: "아주대학교 학보사",
    category: "leadership",
    org: "Ajou Press",
    period: "2021.01 — 2022.12",
    role: "정기자 → 미디어 편집장",
    active: false,
    highlights: [
      "10명 이상 팀 관리, 주간 보도 기획 및 콘텐츠 퀄리티 총괄",
      "500명+ 응답 설문 기반 데이터 기획 보도 진행",
      "콘텐츠 기획력, 글쓰기 전달력, 일정 관리 역량 강화",
    ],
  },
  {
    name: "Shalla 영어회화 동아리",
    category: "leadership",
    org: "서울경인 연합",
    period: "2019.03 — 2021.08",
    role: "부회장 · 기획총무",
    active: false,
    highlights: [
      "연 450명 이상 참여 행사 기획 및 운영 총괄",
      "예산·운영안·프로그램 구성·홍보 콘텐츠 제작 전담",
      "다양한 문화권 참여자와의 소통으로 유저 중심 커뮤니케이션 감각 향상",
    ],
  },
  {
    name: "Nubi Ajou 글로벌 교류단",
    category: "leadership",
    org: "아주대학교",
    period: "2021.02 — 2022.12",
    role: "대외홍보팀장",
    active: false,
    highlights: [
      "국제 학생 대상 문화 교류 프로그램 대외 홍보 총괄",
      "카드뉴스·영상 기획부터 촬영·편집·업로드까지 직접 수행",
      "300명+ 대형 행사 운영, 다국적 유저 대상 UX 감각 강화",
    ],
  },
  {
    name: "링크 산학협력 서포터즈",
    category: "leadership",
    org: "링크사업단",
    period: "2021.08 — 2023.02",
    role: "서포터즈 팀장",
    active: false,
    highlights: [
      "창업 아이디어 공모전 홍보 기획 및 콘텐츠 운영 주도",
      "1,500명 대상 설문 조사·피드백 분석으로 데이터 기반 콘텐츠 개선",
    ],
  },
  {
    name: "일자리 서포터즈",
    category: "leadership",
    org: "경기도",
    period: "2021.08 — 2022.03",
    role: "기획팀장",
    active: false,
    highlights: [
      "50개 이상 기업 연계 채용 박람회 기획·운영 총괄",
      "실시간 현장 피드백 수집·개선안 도출, 팀 단위 일정 조율",
    ],
  },
];
