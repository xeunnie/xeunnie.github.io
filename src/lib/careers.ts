import { BadgeKey } from "./badges";

export interface Career {
  company: string;
  team?: string;
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
    team: "클라우드팀",
    role: "Frontend Developer",
    period: "2025.11 — 현재",
    type: "full-time",
    chapter: "운영 — 프로덕션 서비스와 마감 품질",
    summary:
      "골프장에서 매일 실사용되는 Vgolf 프로덕션 서비스를 개발하고 있습니다. GPS 좌표를 코스맵 픽셀로 변환하고, 움직이는 카트 위에서도 정확히 동작하는 터치 UX를 설계하는 등 골프장 특수 환경의 기술적 난제를 해결하고 있습니다.",
    details: [
      "Vgolf 경기관제 태블릿 앱 — 500ms GPS 폴링 데이터를 Proj4로 코스맵 픽셀 좌표에 매핑, 홀 폴리곤 지오펜싱으로 진행 홀 자동 전환",
      "움직이는 카트 환경의 터치 UX — 진동·속도 변수를 고려해 useTap(30px 허용 임계값), Ghost Click 방지, 더블클릭 가드를 설계",
      "F&B 주문 시스템 단독 개발 — Web Worker로 탭 비활성화 시에도 3초 간격 주문 동기화, Canvas Pan/Zoom + AABB 충돌 감지 테이블 배치",
      "네트워크 불안정 환경 대응 — ConsecutiveErrorGuard로 연속 에러 시 폴링 자동 중단, Recoil Persist로 앱 재시작 시 서버 왕복 없이 복원",
      "프로덕션 마감 품질 — 중복 주문 방지, Pub/Sub 에러 큐잉, 엣지 케이스 처리를 통해 실사용 환경 안정성 확보",
    ],
    projects: ["Vgolf App 경기관제", "Vgolf F&B 주문 시스템"],
    techs: ["react", "typescript", "nextjs", "vite", "recoil", "reactquery", "pwa", "i18n", "indexeddb"],
  },
  {
    company: "플럭시티",
    team: "DX 기술팀",
    role: "개발자 (프론트엔드, 백엔드)",
    period: "2025.04 — 2025.11",
    type: "full-time",
    chapter: "심화 — 3D·실시간·폐쇄망·현장 대응",
    summary:
      "3D 관제 시스템 SI를 주도하며, 코드 작성을 넘어 서비스가 실제로 동작하는 순간까지 책임지는 경험을 쌓았습니다. 폐쇄망에서 TURN/STUN 없이 WebRTC CCTV를 스트리밍하고, 지하철 현장에서 즉시 배포·수정을 반복했습니다.",
    details: [
      "부산교통공사 1호선 3D 관제 — 프론트 단독 개발, Three.js 시설물 시각화 + GPS 차량 추적 + WebSocket 센서 데이터를 하나의 실시간 관제 화면에 통합",
      "폐쇄망 WebRTC CCTV — TURN/STUN 서버 없는 환경에서 시그널링 구조를 분석하고, 다중 CCTV 동시 스트리밍 + 자동 재연결 로직을 구현",
      "부산 사상하단선 현장 대응 — 지하철 현장에서 배포 후 즉시 발생하는 실시간 버그·데이터 오류를 현장에서 직접 디버깅·수정·재배포",
      "모노레포 디자인 시스템 — 다수 SI 프로젝트의 공통 컴포넌트를 추출하여 모노레포 구조로 재설계",
      "다수 관제 SI (탄천·성남 AIOT·GS 인증) — 프로젝트별 폐쇄망·내부망 환경에 맞는 배포 전략 수립 및 서버 프록시 보안 설정",
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
      "디자인 시안부터 퍼블리싱, Vue·React 개발까지 전 과정을 혼자 소화하며 UI/UX 엔지니어링의 폭을 넓혔습니다. 리픽 프로젝트에서는 컴포넌트 설계만으로 개발 속도 40%, 렌더링 최적화로 로딩 30%를 개선했습니다.",
    details: [
      "리픽 — Vue.js + TypeScript 컴포넌트 설계로 개발 속도 40% 향상, 불필요한 렌더링 제거로 페이지 로딩 30% 개선",
      "리픽 — Pinia 상태 관리 + Storybook UI 문서화로 디자이너·백엔드와의 협업 접점을 체계화",
      "인천교육청 교육이음 — XD 기반 교육 플랫폼 UI/UX 디자인 + 반응형 퍼블리싱을 기여도 90%로 단독 수행",
      "공공기관 5개 사이트 유지보수 — 레거시 코드의 웹 접근성(A11Y) 개선 및 크로스 브라우징 대응",
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
      "블록체인 생태계에서 React·Svelte를 실무에 적용하며, 코드 리뷰를 통해 '동작하는 코드'와 '좋은 코드'의 차이를 체감했습니다. 상태 흐름 정리만으로 렌더링 40% 감소, 번들 30% 축소를 달성했습니다.",
    details: [
      "Cosmostation 크롬 익스텐션 — 상태 관리 흐름 정리만으로 특정 자산 조회 시 렌더링 횟수 40% 감소, 반응 속도 1.5s → 0.8s 단축",
      "번들링 최적화 — 의존성 트리 분석 후 불필요 패키지 제거, 최종 번들 사이즈 30% 감소로 크롬 스토어 배포 대응 속도 향상",
      "Mintscan 블록체인 대시보드 — 아토믹 설계로 코드량 25% 감소, SWR 캐싱으로 페이지 전환 로딩 2s → 0.7s 개선",
      "Confluence 기반 기술 문서화 문화 주도 — 퇴근 후 동료들과 자발적 스터디 운영, 일일 학습 기록 공유",
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
      "비개발 조직에서 유일한 개발 담당으로 일하며 자립적인 문제 해결 능력을 키웠습니다. 직접 디자인한 팝업 UI로 클릭률 2배 이상 증가를 만들어내며, 코드가 사용자 행동을 바꿀 수 있다는 것을 처음 체감했습니다.",
    details: [
      "교내 공식 웹사이트 유지보수 — 중복된 HTML 구조를 통합하고, CSS 네이밍 체계를 정리해 유지보수성 확보",
      "팝업 UI 직접 디자인·구현 — Google Analytics 기준 클릭률 2배 이상 증가, 코드가 사용자 행동에 미치는 영향을 체감",
      "레거시 리팩토링 — 불필요한 JS 로직 제거로 페이지 로딩 속도 개선 및 런타임 오류 감소",
      "계약 종료 후에도 외주 형태로 지속 유지보수 담당 — 신뢰 기반의 장기 협업 관계 유지",
    ],
    techs: ["html", "css", "javascript", "jquery"],
  },
];
