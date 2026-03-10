import { BadgeKey } from "./badges";

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
    company: "플럭시티 — 클라우드팀",
    role: "Frontend Developer",
    period: "2025.11 — 현재",
    type: "full-time",
    chapter: "운영 — 프로덕션 서비스와 마감 품질",
    summary:
      "클라우드팀에서 Vgolf 프로덕션 서비스의 경기관제 태블릿 앱과 F&B 주문 시스템을 개발하고 있습니다. GPS 카트 추적, 좌표 변환, 지오펜싱, 움직이는 환경에서의 터치 UX 등 골프장 특수 환경에 최적화된 기술을 구현하며, 실사용 운영 서비스의 안정성과 마감 품질에 주력하고 있습니다.",
    details: [
      "Vgolf App 경기관제 태블릿 앱 개발 — GPS 카트 추적, Proj4 좌표 변환, 지오펜싱 자동 홀 전환",
      "Vgolf F&B 주문 시스템 단독 개발 — Web Worker 폴링, Canvas 테이블 배치, Web Audio 알림",
      "듀얼 디바이스 아키텍처 — 태블릿 140+ / 모바일 45+ 컴포넌트",
      "92+ Recoil 아톰 + recoil-persist + React Query 캐싱으로 네트워크 탄력성 확보",
      "프로덕션 운영 환경에서의 엣지 케이스 처리 및 마감 품질 관리",
    ],
    projects: ["Vgolf App 경기관제", "Vgolf F&B 주문 시스템"],
    techs: ["react", "typescript", "nextjs", "vite", "recoil", "reactquery", "pwa", "i18n", "indexeddb"],
  },
  {
    company: "플럭시티 — DX 기술팀",
    role: "개발자 (프론트엔드, 백엔드)",
    period: "2025.04 — 2025.11",
    type: "full-time",
    chapter: "심화 — 3D·실시간·폐쇄망·현장 대응",
    summary:
      "DX 기술팀에서 3D 관제 시스템 SI 프로젝트를 주도했습니다. 부산교통공사 1호선 관제 시스템을 프론트엔드 단독 개발하고, 부산 사상하단선, 모노레포 디자인 시스템 등을 담당했습니다. 폐쇄망 WebRTC CCTV 스트리밍, 현장 즉시 배포·수정 등 서비스가 실제로 동작하는 순간까지 책임지는 경험을 쌓았습니다.",
    details: [
      "부산교통공사 1호선 3D 관제 시스템 단독 개발 (프론트 100%, 백엔드 30%)",
      "부산 사상하단선 — 현장 배포 및 실시간 버그 현장 대응",
      "폐쇄망 WebRTC CCTV 스트리밍 구조 분석·구현",
      "모노레포 기반 디자인 시스템 구축",
      "탄천 오염도 모니터링, GS 인증 플랫폼, 성남 AIOT 공원 관제 등 다수 SI",
      "현장 폐쇄망·내부망 환경별 배포 전략 수립 및 서버 프록시 보안 설정",
    ],
    projects: [
      "부산교통공사 1호선 3D 관제", "부산 사상하단선",
      "모노레포 디자인 시스템", "탄천 오염도 모니터링", "GS 인증 플랫폼", "성남 AIOT 관제",
    ],
    techs: ["react", "typescript", "threejs", "webgl", "webrtc", "websocket", "webview"],
  },
  {
    company: "웹비즈 크리에이티브",
    role: "프론트엔드 개발자 · 웹디자이너 · 퍼블리셔",
    period: "2023.11 — 2024.02",
    type: "full-time",
    chapter: "성장 — 디자인부터 프론트엔드까지 전 과정",
    summary:
      "공공기관 웹사이트 구축·유지보수와 서비스 프론트엔드 개발을 담당했습니다. XD·Figma 디자인부터 퍼블리싱, Vue·React 개발까지 전 과정을 경험하며 UI/UX 엔지니어링의 폭을 넓혔습니다.",
    details: [
      "리픽: Vue.js + TypeScript 기반 UI 개발 — 컴포넌트 설계로 개발 속도 40% 향상, 렌더링 최적화로 로딩 속도 30% 개선",
      "리픽: Pinia 상태 관리 및 API 연동, Storybook UI 문서화",
      "인천 교육청 교육이음: XD 기반 UI/UX 디자인 및 프로토타입 제작, 반응형 퍼블리싱",
      "웹 접근성(A11Y) 및 크로스 브라우징 대응",
      "양구 수목원, 환경책임투자 플랫폼, 한국이민재단, 사회보장정보원, 코네틱 — 레거시 코드 개선 및 유지보수",
    ],
    projects: [
      "리픽", "인천교육청 교육이음",
      "양구 수목원", "환경책임투자 플랫폼", "한국이민재단", "사회보장정보원", "코네틱",
    ],
    techs: ["vue", "typescript", "pinia", "storybook", "html", "css", "javascript", "figma"],
  },
  {
    company: "스탬퍼 (Cosmostation)",
    role: "프론트엔드 개발 인턴",
    period: "2022.09 — 2022.12",
    type: "intern",
    chapter: "확장 — 실무 코드 리뷰와 성능 최적화",
    summary:
      "블록체인 생태계에서 React와 Svelte를 실무에 적용하며, 코드 리뷰를 통한 학습과 성능 최적화 경험을 쌓았습니다. 상태 관리 흐름 개선과 번들링 최적화를 통해 확장성 있는 코드 작성 역량을 키웠습니다.",
    details: [
      "Cosmostation 크롬 익스텐션: React + TypeScript 기반 멀티체인 암호화폐 지갑 개발 보조",
      "상태 관리 흐름 개선 및 불필요한 리렌더링 제거 → 렌더링 횟수 40% 감소",
      "컴포넌트 구조 정리 → 렌더링 반응 속도 1.5초 → 0.8초 단축",
      "번들링 및 의존성 최적화 → 최종 번들 사이즈 약 30% 감소",
      "Mintscan: Svelte 기반 블록체인 대시보드 — 아토믹 설계로 코드량 25% 감소",
      "SWR 데이터 캐싱 → 페이지 전환 로딩 2초 → 0.7초 개선",
      "Confluence 기반 기술 문서화 문화 주도, 일일 학습 기록 공유",
    ],
    projects: ["Cosmostation Chrome Extension", "Mintscan Dashboard"],
    techs: ["react", "typescript", "svelte", "redux", "swr", "storybook", "cypress", "i18n", "confluence"],
  },
  {
    company: "아주대학교 커뮤니케이션팀",
    role: "웹 개발 장학인턴",
    period: "2021.08 — 2022.03",
    type: "intern",
    chapter: "시작 — 코드의 첫 현장",
    summary:
      "교내 공식 웹사이트 유지보수를 담당하며 실무 개발의 기초를 다졌습니다. 비개발 조직에서 유일한 개발 담당으로 일하며 자립적인 문제 해결 능력과 커뮤니케이션 역량을 키웠습니다.",
    details: [
      "HTML, CSS, JavaScript, jQuery를 활용해 중복 구조 통합 및 UI 구성 개선",
      "팝업 UI 직접 디자인·구현 → 클릭률 2배 이상 증가 (GA 기준)",
      "레거시 코드 리팩토링 — CSS 네이밍 정리, 불필요한 JS 로직 제거 → 로딩 속도 개선 및 오류 감소",
      "정기 팝업·알림·사이트 개편 기획부터 배포까지 전담",
      "계약 종료 후에도 외주 형태로 지속 유지보수 담당",
    ],
    techs: ["html", "css", "javascript", "jquery"],
  },
];
