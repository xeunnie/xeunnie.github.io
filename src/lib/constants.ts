export const SITE = {
  name: "Seungeun Choi",
  title: "Frontend Developer",
  description: "코드로 공간을 설계하는 사람",
  url: "https://xeunnie.github.io",
  email: "plumxeun@gmail.com",
  github: "https://github.com/xeunnie",
  ga_id: "",
} as const;

export interface Badge {
  label: string;
  logo: string;
  logoColor?: string;
}

export const BADGES = {
  react: { label: "React", logo: "react", logoColor: "61DAFB" },
  nextjs: { label: "Next.js", logo: "nextdotjs", logoColor: "000000" },
  vue: { label: "Vue.js", logo: "vuedotjs", logoColor: "4FC08D" },
  svelte: { label: "Svelte", logo: "svelte", logoColor: "FF3E00" },
  typescript: { label: "TypeScript", logo: "typescript", logoColor: "3178C6" },
  javascript: { label: "JavaScript", logo: "javascript", logoColor: "F7DF1E" },
  java: { label: "Java", logo: "openjdk", logoColor: "ED8B00" },
  redux: { label: "Redux", logo: "redux", logoColor: "764ABC" },
  pinia: { label: "Pinia", logo: "vuedotjs", logoColor: "4FC08D" },
  storybook: { label: "Storybook", logo: "storybook", logoColor: "FF4785" },
  chromatic: { label: "Chromatic", logo: "chromatic", logoColor: "F25C7E" },
  jest: { label: "Jest", logo: "jest", logoColor: "C21325" },
  rtl: { label: "Testing Library", logo: "testinglibrary", logoColor: "E33332" },
  cypress: { label: "Cypress", logo: "cypress", logoColor: "17202C" },
  playwright: { label: "Playwright", logo: "playwright", logoColor: "2EAD33" },
  threejs: { label: "Three.js", logo: "threedotjs", logoColor: "000000" },
  webrtc: { label: "WebRTC", logo: "webrtc", logoColor: "333333" },
  websocket: { label: "WebSocket", logo: "socketdotio", logoColor: "010101" },
  livekit: { label: "LiveKit", logo: "livekit", logoColor: "000000" },
  springboot: { label: "Spring Boot", logo: "springboot", logoColor: "6DB33F" },
  nodejs: { label: "Node.js", logo: "nodedotjs", logoColor: "339933" },
  docker: { label: "Docker", logo: "docker", logoColor: "2496ED" },
  kubernetes: { label: "Kubernetes", logo: "kubernetes", logoColor: "326CE5" },
  jenkins: { label: "Jenkins", logo: "jenkins", logoColor: "D24939" },
  haproxy: { label: "HAProxy", logo: "haproxy", logoColor: "000000" },
  prometheus: { label: "Prometheus", logo: "prometheus", logoColor: "E6522C" },
  grafana: { label: "Grafana", logo: "grafana", logoColor: "F46800" },
  jmeter: { label: "JMeter", logo: "apachejmeter", logoColor: "D22128" },
  kafka: { label: "Kafka", logo: "apachekafka", logoColor: "231F20" },
  redis: { label: "Redis", logo: "redis", logoColor: "DC382D" },
  mongodb: { label: "MongoDB", logo: "mongodb", logoColor: "47A248" },
  mariadb: { label: "MariaDB", logo: "mariadb", logoColor: "003545" },
  s3: { label: "Amazon S3", logo: "amazons3", logoColor: "569A31" },
  indexeddb: { label: "IndexedDB", logo: "databricks", logoColor: "FF3621" },
  pwa: { label: "PWA", logo: "pwa", logoColor: "5A0FC8" },
  webview: { label: "WebView", logo: "googlechrome", logoColor: "4285F4" },
  figma: { label: "Figma", logo: "figma", logoColor: "F24E1E" },
  git: { label: "Git", logo: "git", logoColor: "F05032" },
  github: { label: "GitHub", logo: "github", logoColor: "181717" },
  notion: { label: "Notion", logo: "notion", logoColor: "000000" },
  sentry: { label: "Sentry", logo: "sentry", logoColor: "362D59" },
  jquery: { label: "jQuery", logo: "jquery", logoColor: "0769AD" },
  html: { label: "HTML5", logo: "html5", logoColor: "E34F26" },
  css: { label: "CSS3", logo: "css3", logoColor: "1572B6" },
  swr: { label: "SWR", logo: "vercel", logoColor: "000000" },
  i18n: { label: "i18n", logo: "i18next", logoColor: "26A69A" },
  argocd: { label: "ArgoCD", logo: "argo", logoColor: "EF7B4D" },
  linux: { label: "Linux", logo: "linux", logoColor: "FCC624" },
  webgl: { label: "WebGL", logo: "webgl", logoColor: "990000" },
  confluence: { label: "Confluence", logo: "confluence", logoColor: "172B4D" },
} satisfies Record<string, Badge>;

export type BadgeKey = keyof typeof BADGES;

export const SKILL_GROUPS = [
  { title: "Frameworks", badges: ["react", "nextjs", "vue", "svelte"] as BadgeKey[] },
  { title: "Language", badges: ["typescript", "javascript", "java"] as BadgeKey[] },
  { title: "State Management", badges: ["redux", "pinia"] as BadgeKey[] },
  { title: "Testing & QA", badges: ["storybook", "chromatic", "jest", "rtl", "cypress", "playwright"] as BadgeKey[] },
  { title: "Realtime & 3D", badges: ["webrtc", "websocket", "livekit", "threejs"] as BadgeKey[] },
  { title: "Backend & DevOps", badges: ["springboot", "docker", "kubernetes", "jenkins", "haproxy"] as BadgeKey[] },
  { title: "Monitoring", badges: ["prometheus", "grafana", "jmeter", "sentry"] as BadgeKey[] },
  { title: "Database", badges: ["kafka", "redis", "mongodb", "mariadb", "s3"] as BadgeKey[] },
] as const;

export const ABOUT_TRAITS = [
  {
    title: "설계를 즐깁니다",
    desc: "DB 스키마부터 API 설계, 아키텍처 의사결정까지 전체 흐름을 그리며 개발합니다.",
  },
  {
    title: "안정적인 코드 구현을 즐깁니다",
    desc: "동작하는 코드를 넘어, 견고하고 유지보수 가능한 코드를 만드는 과정에서 성장을 느낍니다.",
  },
  {
    title: "기술 의사결정에 진지합니다",
    desc: "왜 이 방법인가를 항상 먼저 따집니다. 근거 있는 선택이 좋은 코드의 시작이라 믿습니다.",
  },
  {
    title: "함께 성장하는 환경을 만듭니다",
    desc: "코드 리뷰와 기술 공유를 통해 팀 전체의 역량이 올라가는 경험을 소중히 여깁니다.",
  },
] as const;

export const ABOUT_KEYWORDS = [
  "조용한 전문성",
  "깊이 있는",
  "차분하고 단단한",
  "설계하는 사람",
  "함께 일하고 싶은",
] as const;

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: "company" | "personal";
  company?: string;
  period: string;
  role: string;
  description: string;
  overview: string;
  techs: BadgeKey[];
  highlights: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "busan-metro",
    title: "부산교통공사 1호선 시설 관제 시스템",
    subtitle: "3D 시설 모니터링 & 제어 UI",
    category: "company",
    company: "플럭시티",
    period: "2022 — 2023",
    role: "Frontend Developer",
    description:
      "부산 지하철 1호선의 실시간 시설 관제 시스템. GPS 기반 차량 위치 추적과 현장 영상 스트리밍을 구현했습니다.",
    overview:
      "부산교통공사 1호선 전체 노선의 시설물을 실시간으로 모니터링하고 제어하는 관제 시스템입니다. Three.js 기반 3D 시각화로 시설물 상태를 직관적으로 파악하고, GPS 데이터를 활용한 실시간 차량 위치 추적, WebRTC 기반 현장 영상 스트리밍, WebSocket을 통한 실시간 데이터 수신 등 다양한 실시간 기술을 통합 구현했습니다.",
    techs: ["react", "typescript", "threejs", "websocket", "webrtc", "webview"],
    highlights: [
      "Three.js 기반 3D 시설물 모니터링 뷰 구현",
      "GPS 기반 실시간 차량 위치 추적 UI",
      "WebSocket을 통한 실시간 센서 데이터 수신 및 시각화",
      "WebRTC 기반 현장 CCTV 영상 스트리밍",
      "WebView 컴포넌트 통합으로 레거시 시스템 연동",
    ],
  },
  {
    slug: "golf-platform",
    title: "골프장 운영 플랫폼",
    subtitle: "F&B 주문 및 운영 관리 시스템",
    category: "company",
    company: "플럭시티",
    period: "2023 — 2024",
    role: "Frontend Developer",
    description:
      "골프 코스 현장 주문부터 운영 관리까지 통합한 PWA 기반 플랫폼.",
    overview:
      "골프장 현장에서 F&B 주문, 코스 관리, 운영 현황 모니터링까지 통합한 운영 플랫폼입니다. PWA로 구축하여 네이티브 앱 수준의 사용 경험을 제공하고, IndexedDB를 활용한 오프라인 대응으로 네트워크 불안정 환경에서도 안정적으로 동작합니다. Markdown 기반 개발 태스크 문서화 템플릿을 설계하여 팀 전체의 개발 프로세스를 체계화했습니다.",
    techs: ["react", "typescript", "pwa", "indexeddb", "redux"],
    highlights: [
      "PWA 기반 현장 주문 시스템 구축 및 안정화",
      "IndexedDB를 활용한 오프라인 퍼스트 아키텍처",
      "Service Worker 기반 백그라운드 동기화",
      "Markdown 기반 개발 태스크 문서화 템플릿 설계",
      "팀 내 코드 리뷰 프로세스 도입 및 정착",
    ],
  },
  {
    slug: "onmeet",
    title: "OnMeet",
    subtitle: "LiveKit 기반 영상회의 플랫폼",
    category: "personal",
    period: "2024",
    role: "Full-stack (Frontend + WebRTC Backend)",
    description:
      "LiveKit 기반 영상회의 서비스. Spring Boot MSA 아키텍처에서 WebRTC 백엔드를 구축하고 프론트엔드 전체를 개발했습니다.",
    overview:
      "Spring Boot MSA 6개 서비스(Auth / Video / Chat / AI / Notification / Image) 아키텍처 기반의 실시간 영상회의 플랫폼입니다. LiveKit을 활용한 WebRTC 미디어 서버를 구축하고, Kafka를 통한 서비스 간 통신, Redis 기반 실시간 상태 관리, S3 미디어 저장소를 연동했습니다. 화자 분리 오디오 녹음과 AI 트랜스크립션 파이프라인까지 구현한 포트폴리오 핵심 프로젝트입니다.",
    techs: ["react", "typescript", "springboot", "livekit", "webrtc", "kafka", "redis", "s3", "docker", "websocket"],
    highlights: [
      "LiveKit Egress 이중 녹화 전략 (혼합 영상 + 개별 오디오 트랙)",
      "TrackEgress + 후처리 VAD 방식으로 MVP 범위 최적화 설계",
      "LiveKit Data Channel 기반 실시간 채팅",
      "화자 분리 오디오 녹음 → AI 트랜스크립션 파이프라인",
      "Spring Boot MSA 6개 서비스 아키텍처 설계 및 구현",
      "Kafka 기반 서비스 간 비동기 통신",
      "녹화 재생 및 타임라인 UI",
    ],
  },
];

export interface Career {
  company: string;
  role: string;
  period: string;
  type: "full-time" | "intern" | "education";
  chapter: string;
  summary: string;
  details: string[];
  projects?: string[];
  techs: BadgeKey[];
}

export const CAREERS: Career[] = [
  {
    company: "플럭시티",
    role: "Frontend Developer",
    period: "2022 — 2024",
    type: "full-time",
    chapter: "심화 — 3D·실시간·폐쇄망, 기술의 깊이",
    summary:
      "WebGL 기반 3D 엔진 개발사에서 관제 시스템 SI 프로젝트를 주도했습니다. 폐쇄망·내부망 환경의 배포, 서버 프록시 보안 설정까지 담당하며 프론트엔드를 넘어선 인프라 감각을 키웠습니다.",
    details: [
      "WebGL 기반 3D 엔진 개발 보조 — 디지털 트윈 플랫폼 에셋·데이터 연동",
      "부산교통공사 3D 관제 시스템 (프론트 100%, 백엔드 30%)",
      "탄천 오염도 모니터링 시스템 (프론트 50%, 백엔드 20%)",
      "GS 인증용 사내 플랫폼 개발 (프론트 70%, 백엔드 20%)",
      "성남 AIOT 공원 관제 시스템 (프론트 60%, 백엔드 30%)",
      "골프장 운영 플랫폼: PWA 기반 현장 주문 시스템 및 오프라인 대응",
      "현장 폐쇄망·내부망 환경별 배포 전략 수립 및 서버 프록시 보안 설정",
    ],
    projects: [
      "부산교통공사 3D 관제", "탄천 오염도 모니터링",
      "GS 인증 플랫폼", "성남 AIOT 관제", "골프장 운영 플랫폼",
    ],
    techs: ["react", "typescript", "threejs", "webgl", "webrtc", "websocket", "pwa", "indexeddb", "webview"],
  },
  {
    company: "웹비즈 크리에이티브",
    role: "Frontend Developer",
    period: "2022",
    type: "full-time",
    chapter: "성장 — 다양한 프레임워크, 설계의 눈",
    summary:
      "공공기관 웹사이트와 백오피스를 React·Vue로 병행 개발하며, 프레임워크에 구애받지 않는 개발 역량을 갖추었습니다. API 명세 기반 협업과 재사용 가능한 시스템 설계를 경험하며 '설계하는 프론트엔드'로 성장했습니다.",
    details: [
      "React, Vue.js를 프로젝트에 따라 병행 사용 — 프레임워크 독립적 설계 역량 확보",
      "Figma 기반 디자인 시안 검토부터 모바일 반응형 UI 리디자인까지 직접 수행",
      "모노레포 구조 구축, 백엔드와 A-Z로 스키마·API 정리 후 재사용 가능한 백오피스 시스템 설계",
      "리픽 프로젝트: TDD 방식으로 테스트 코드 우선 작성, 도메인 완성",
      "웹 표준·웹 접근성 지침 준수 개발",
    ],
    projects: [
      "양구 수목원", "국립중앙박물관", "인천교육청 교육이음",
      "쿠팡 세이프티 가이드", "리픽",
    ],
    techs: ["react", "typescript", "vue", "javascript", "figma", "jest"],
  },
  {
    company: "스탬퍼 (Cosmostation)",
    role: "Frontend Intern",
    period: "2021",
    type: "intern",
    chapter: "확장 — 프레임워크와 실무 코드 리뷰",
    summary:
      "블록체인 생태계에서 React와 Svelte를 실무에 적용하며, 코드 리뷰 문화와 테스트 기반 개발을 체화했습니다. 퇴근 후 동료들과 자발적으로 스터디를 운영하며 기술 문서화 문화를 주도했습니다.",
    details: [
      "Cosmostation 크롬 익스텐션: React + Redux + SWR 기반 멀티체인 암호화폐 지갑 기능 개발",
      "개인 토큰 설정, 자산 관리 대시보드, 토큰 검색·필터링 페이지 구현",
      "Mintscan: Svelte 기반 블록체인 대시보드 — 실시간 데이터 시각화 및 성능 최적화",
      "Storybook + Cypress 기반 컴포넌트 테스트 및 디자인 시스템 구현 보조",
      "Confluence 기반 기술 문서화 문화 주도, 일일 학습 기록 공유",
    ],
    projects: ["Cosmostation Chrome Extension", "Mintscan Dashboard"],
    techs: ["react", "typescript", "svelte", "redux", "swr", "storybook", "cypress", "i18n"],
  },
  {
    company: "아주대학교 커뮤니케이션팀",
    role: "웹 개발 장학인턴",
    period: "재학 중",
    type: "intern",
    chapter: "시작 — 코드의 첫 현장",
    summary:
      "교내 공식 웹사이트 유지보수를 담당하며 실무 개발의 기초를 다졌습니다. 비개발 조직에서 유일한 개발 담당으로 일하며 자립적인 문제 해결 능력과 커뮤니케이션 역량을 키웠습니다.",
    details: [
      "바닐라 JS + jQuery 기반 사이트 유지보수 및 리뉴얼",
      "스크린 리더 테스트 기반 웹 접근성 개선",
      "정기 팝업·알림·사이트 개편 기획부터 배포까지 전담",
      "계약 종료 후에도 외주 형태로 지속 유지보수 담당",
    ],
    techs: ["html", "css", "javascript", "jquery"],
  },
];

export interface Activity {
  name: string;
  category: "dev" | "leadership";
  org: string;
  period: string;
  role: string;
  active: boolean;
  highlights: string[];
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
      "프론트엔드 성능 최적화·고도화 주제로 스터디 기획 및 리드",
      "React 렌더링 최적화, TDD, 테스트 자동화, 번들링 개선 등 실무 중심 주제 매주 선정",
      "발표 기반 Wiki 정리 시스템 도입 — 지식 공유 및 트러블슈팅 문서화 체계 확립",
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

export interface PeerReview {
  name: string;
  role: string;
  relation: string;
  content: string;
}

export const PEER_REVIEWS: PeerReview[] = [
  {
    name: "팀원 A",
    role: "Frontend Developer",
    relation: "코드잇 심화 팀 프로젝트",
    content:
      "승은님은 팀장으로서 팀의 중심이 되어주셨고, 항상 밝고 유쾌한 에너지를 전해주었습니다. 질문이 있을 때마다 단순히 답만 주는 것이 아니라 더 좋은 방향을 제시해주며 함께 고민해주었고, 덕분에 더 나은 코드를 작성할 수 있었습니다. 백엔드 지식도 풍부하셔서 협업하는 데 큰 도움이 되었고, 전반적으로 팀의 운영과 기술적 성장에 크게 기여하신 팀장이었습니다.",
  },
  {
    name: "팀원 B",
    role: "Frontend Developer",
    relation: "코드잇 심화 팀 프로젝트",
    content:
      "처음부터 끝까지 프로젝트를 완성시키는 것에 집중했을 뿐만 아니라, 포트폴리오와 이력서에 담을 수 있는 가치를 고민하는 모습이 인상적이었습니다. 모르는 것에 대해 질문하면 항상 친절하게 대답해주었고, 두 달간 함께할 수 있어 정말 즐거웠습니다. 언젠가 다시 동료로 만나고 싶습니다.",
  },
  {
    name: "팀원 C",
    role: "Frontend Developer",
    relation: "코드잇 심화 팀 프로젝트",
    content:
      "승은님 덕분에 도움이 너무 많이 됐습니다. 지식이 풍부해지는 느낌이란 게 이런 거일까 싶었습니다. 좋은 아티클과 최신 기술을 공유해 주어서 코드의 퀄리티를 높일 수 있었고, 승은님이 아니었다면 대충 했을 거란 생각이 듭니다.",
  },
];

export interface Education {
  school: string;
  major: string;
  period: string;
  highlights?: string[];
  techs?: BadgeKey[];
}

export const EDUCATION: Education[] = [
  {
    school: "코드잇 프론트엔드 단기 심화 7기",
    major: "Frontend Track · 우수 수료",
    period: "2025.01 — 2025.03",
    highlights: [
      "Next.js, Framer Motion, Jest, Sentry, GA 등 프론트엔드 심화",
      "딥다이브 스터디 팀장, 프로젝트 투표 1위, 피어리뷰 1위",
    ],
    techs: ["nextjs", "react", "typescript", "jest", "sentry", "playwright"],
  },
  {
    school: "한화시스템 Beyond SW Camp 6기",
    major: "Backend Track · 수료",
    period: "2024.04 — 2024.10",
    highlights: [
      "Spring, Docker, K8s, Jenkins, ArgoCD 등 백엔드 풀스택",
      "프리코스 학생 대상 프론트·백엔드 크로스 강의 진행",
    ],
    techs: ["java", "springboot", "docker", "kubernetes", "jenkins"],
  },
  {
    school: "아주대학교",
    major: "정보통신대 디지털미디어 전공 / 영어영문학 부전공",
    period: "졸업",
  },
];

export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Career", href: "#career" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Activities", href: "#activities" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;
