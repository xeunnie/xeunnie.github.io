import { BadgeKey } from "./badges";

/**
 * 연도별 타임라인 — 2021년 첫 인턴십부터 지금까지.
 * 한 해마다 무슨 일이 있었는지(story·moments)와 그 결과 할 수 있게 된 것(gained)을 함께 둔다.
 */

export interface ChronicleMoment {
  when: string;
  what: string;
}

export interface ChronicleYear {
  year: string;
  /** 그 해에 한 일을 한 문장으로 — 꾸미지 않고 사실만 */
  headline: string;
  story: string[];
  moments: ChronicleMoment[];
  /** 그 해에 한 프로젝트 slug */
  projects: string[];
  /** 이 시기에 새로 할 수 있게 된 것. 이전 해에 이미 있던 건 적지 않는다. */
  gained: string[];
  techs: BadgeKey[];
}

export const CHRONICLE: ChronicleYear[] = [
  {
    year: "2021",
    headline: "교내 웹사이트를 혼자 맡으며 개발을 시작했습니다",
    story: [
      "아주대학교 커뮤니케이션팀에서 웹 개발 장학인턴으로 일했습니다. 비개발 조직이라 개발 담당은 저 하나였고, 교내 공식 웹사이트 유지보수를 맡았습니다.",
      "HTML·CSS·jQuery만 쓰던 때라 구조랄 게 없었습니다. 직접 디자인해 올린 팝업의 반응을 Google Analytics로 확인해 본 것이, 만든 결과를 데이터로 확인한 첫 경험이었습니다.",
    ],
    moments: [
      { when: "2021.08", what: "아주대학교 커뮤니케이션팀 웹 개발 장학인턴 시작" },
      { when: "2021.09 —", what: "교내 공식 웹사이트 유지보수 — 중복 HTML 구조 통합, CSS 네이밍 체계 정리" },
      { when: "2021.11", what: "팝업 UI 직접 디자인·구현 후 Google Analytics로 반응 확인" },
      { when: "2022.03", what: "계약 종료 후에도 외주 형태로 유지보수 지속" },
    ],
    projects: [],
    gained: [
      "HTML 구조 정리와 CSS 네이밍 체계 세우기",
      "레거시 코드에서 불필요한 로직 걷어내기",
      "Google Analytics로 변경 효과 확인하기",
    ],
    techs: ["html", "css", "javascript", "jquery"],
  },
  {
    year: "2022",
    headline: "코드 리뷰를 받는 실무 코드베이스에서 처음 일했습니다",
    story: [
      "블록체인 지갑 회사에서 인턴으로 일했습니다. React·TypeScript로 된 오픈소스 크롬 익스텐션이었고, 티켓 단위로 기능을 받아 작업했습니다.",
      "동작하는 코드를 올려도 바로 머지되지는 않았습니다. 리뷰 코멘트에 맞춰 같은 기능을 여러 번 다시 올리면서, 조건문을 단순하게 쓰고 필요 없는 코드를 지우는 습관이 생겼습니다.",
    ],
    moments: [
      { when: "2022.08", what: "스탬퍼(Cosmostation) 프론트엔드 개발 인턴 시작" },
      { when: "2022.10", what: "Kujira 체인 추가 — 체인 상수·에셋·목록 등록까지 신규 체인 온보딩 전 과정" },
      { when: "2022.11", what: "이더리움 ERC20 토큰 리스트·검색 페이지 제작" },
      { when: "2022.12", what: "CW20 검색을 전 체인 지원으로 확장, 검색 입력 디바운스 도입" },
    ],
    projects: ["cosmostation-extension"],
    gained: [
      "실무 React·TypeScript 코드베이스를 읽고 규칙에 맞춰 기여하기",
      "작업을 티켓 단위로 끊고, 리뷰받기 좋게 커밋을 나눠 PR로 올리기",
      "입력 디바운스로 불필요한 조회 줄이기",
      "다국어(i18n) 리소스 구조 다루기",
    ],
    techs: ["react", "typescript", "redux", "emotion", "webpack"],
  },
  {
    year: "2023",
    headline: "공공기관 사이트 약 200페이지를 디자인부터 마크업까지 맡았습니다",
    story: [
      "공공기관 웹사이트를 만드는 회사로 옮겼습니다. 시안을 받아 옮기는 게 아니라 직접 디자인하고, 반응형 마크업과 PHP 연동까지 혼자 진행하는 일이었습니다.",
      "6개 기관, 약 200페이지였습니다. 비슷한 화면을 반복해서 만들다 보니 어떤 부분을 공통 컴포넌트로 묶고 어떤 부분은 따로 두는 게 나은지 판단이 서기 시작했고, 나중에 디자인 시스템을 만들 때 그 기준을 그대로 썼습니다.",
    ],
    moments: [
      { when: "2023.11", what: "웹비즈 크리에이티브 입사 — 공공기관 SI 디자인 · 퍼블리싱 · PHP 연동" },
      { when: "2023.11 —", what: "이민재단·싸템·양구수목원·사회보장정보원 등 6개 기관 약 200페이지 단독 퍼블리싱" },
      { when: "2023.12", what: "리픽 — Vue·TypeScript 컴포넌트 설계와 Pinia 상태 관리, Storybook 문서화" },
    ],
    projects: ["public-sector-publishing"],
    gained: [
      "시안을 반응형 마크업으로 옮기고 PHP 템플릿에 연결하기",
      "웹 접근성(A11Y)과 크로스 브라우징을 마크업 단계에서 처리하기",
      "무엇을 공통 컴포넌트로 묶을지 판단하기",
      "Vue 컴포넌트 설계와 Pinia 상태 분리, Storybook 문서화",
    ],
    techs: ["vue", "typescript", "pinia", "storybook", "html", "css", "php", "figma"],
  },
  {
    year: "2024",
    headline: "백엔드 부트캠프에서 서버와 배포를 직접 해 봤습니다",
    story: [
      "프론트만으로는 부족하다고 느껴 백엔드 부트캠프에 들어갔습니다. 같은 서비스를 세 번 만들었습니다 — BOOT_UP을 Spring 백엔드로, 다음엔 Vue 프론트로, 마지막엔 Docker와 GitHub Actions로 배포까지.",
      "한 서비스를 서버·화면·배포 순서로 모두 만들어 보니, 프론트에서 백엔드에 무엇을 구체적으로 요청해야 하는지 알게 됐습니다. 2026년에 API 응답 불일치를 표로 정리해 백엔드에 넘긴 것도 이때 경험이 바탕입니다.",
      "매주 회고를 velog에 남겼습니다.",
    ],
    moments: [
      { when: "2024.04", what: "한화시스템 BEYOND SW Camp 6기(백엔드 트랙) 입과" },
      { when: "2024.07", what: "BOOT_UP 2차 — Spring·QueryDSL 백엔드, 전역 예외처리와 응답 코드 체계 구현" },
      { when: "2024.07", what: "99클럽 코테 스터디 참여, 주차 회고를 velog에 연재" },
      { when: "2024.08", what: "BOOT_UP 3차 — Vue 프론트엔드 커밋 54건, DevOps 단계 담당" },
      { when: "2024.08", what: "CalIT — 팀장으로 프론트 단독 개발, 100개 이상 API 연동" },
      { when: "2024.10", what: "BEYOND SW Camp 수료, 프리코스 학생 대상 크로스 강의 진행" },
    ],
    projects: ["boot-up", "calit"],
    gained: [
      "Spring·JPA·QueryDSL로 API와 동적 쿼리 만들기",
      "전역 예외처리와 응답 코드 체계를 세워 팀에 공유하기",
      "Docker 이미지 빌드, GitHub Actions·Jenkins로 CI/CD 구성하기",
      "Sentry·Prometheus·Grafana로 배포 후 상태 보기",
      "팀장으로 스프린트를 운영하고 이슈 우선순위 정하기",
    ],
    techs: ["java", "springboot", "querydsl", "vue", "docker", "github", "jenkins", "kafka"],
  },
  {
    year: "2025",
    headline: "관제 현장에 CCTV를 붙이고, 공통 패키지를 만들었습니다",
    story: [
      "연초에는 프론트엔드 심화 과정과 스터디에서 개인 프로젝트를 연달아 했습니다. 번개팅에서 CI/CD를 처음부터 세우고, ChatFlow에서 Kubernetes 카나리 배포와 WebRTC를 붙이고, 해커톤에서 20시간 만에 MVP를 배포했습니다.",
      "4월에 플럭시티 DX 기술팀에 합류했습니다. 부산 도시철도 관제에서 협업처가 CCTV 연동 코드도 문서도 주지 않아, WebRTC를 먼저 조사해 가능한 연결 방식을 미리 준비해 간 뒤 현장에서 하나씩 붙여 보며 맞는 것을 찾았습니다. CCTV는 실제 운영까지 올라갔고, 사무실에서 재현되지 않는 버그는 현장에서 고쳐 다시 배포했습니다.",
      "같은 시기에 프로젝트마다 복사되던 컴포넌트와 API 호출을 모노레포 패키지로 옮겼습니다. 다른 프로젝트에서 가져다 쓰는 코드를 만든 건 이때가 처음입니다.",
    ],
    moments: [
      { when: "2025.01 — 03", what: "코드잇 프론트엔드 심화 우수 수료 · 번개팅, ChatFlow, PPIYO 완주" },
      { when: "2025.04", what: "플럭시티 DX 기술팀 입사" },
      { when: "2025.05 — 09", what: "부산 도시철도 통합 관제 — WebRTC CCTV 현장 운영, 시설물 9종 API 연동" },
      { when: "2025.04 — 09", what: "Plug Platform — 디자인 시스템·공통 API 계층 모노레포화 (머지 PR 17건)" },
      { when: "2025.10 — 11", what: "Plug Atlas — Cesium 지도 IoT 관제의 이벤트·알람 도메인 전반 구현" },
      { when: "2025.11", what: "클라우드팀으로 이동 — VGOLF 프로덕션 서비스 합류" },
    ],
    projects: ["busan-metro", "plug-platform", "plug-atlas", "thunderting", "chatflow", "ppiyo"],
    gained: [
      "Jest·RTL·Cypress로 단위·E2E 테스트 자동화, Kubernetes 카나리 배포",
      "Three.js·Cesium으로 3D 모델과 지도 위 객체 다루기",
      "WebRTC SDP 교환과 ICE 상태 기반 연결·재연결 제어",
      "SSE 다채널 구독을 화면 상태로 옮기기",
      "pnpm 모노레포로 여러 프로젝트가 함께 쓰는 디자인 시스템·공통 API 계층 만들기",
      "외부 협업처의 API 스펙을 타입으로 고정해 화면이 응답 형태를 추측하지 않게 하기",
      "정보를 주지 않는 상대와 일할 때, 가능한 경우를 미리 준비해 가서 맞는 방식 찾기",
      "폐쇄망 현장에 배포하고 그 자리에서 고쳐 다시 올리기",
    ],
    techs: ["react", "typescript", "threejs", "cesium", "webrtc", "sse", "zustand", "storybook", "pnpm"],
  },
  {
    year: "2026",
    headline: "매장 하드웨어와 앱 스토어까지 다뤄야 하는 서비스를 맡았습니다",
    story: [
      "골프장에서 매일 쓰는 서비스를 맡았습니다. 클라우드에 정적 배포된 웹앱이 매장 사설망 프린터에 닿지 못하는 문제는 로컬 에이전트 브릿지로 풀었고, 망분리된 미니 PC가 네트워크 없이 부팅해도 화면이 뜨도록 서비스워커를 설계했습니다.",
      "React Native 앱은 Expo 없이 네이티브 프로젝트를 직접 관리하며 릴리스 서명과 스토어 제출까지 혼자 진행했습니다. 서버가 par에 null을 내려주는 바람에 모든 홀이 더블보기로 표시되던 오류는 zod 2층 계약 테스트로 화면에 반영되기 전에 잡았고, API 응답 불일치 12건은 영향·우선순위 표로 정리해 백엔드에 넘겼습니다.",
      "9월에는 경기관제 앱을 소형 단말(PM30)로 옮기는 일을 맡았습니다. 기능을 옮기기 전에 모바일만 떼어낸 저장소를 만들고, 상태 저장 방식과 번들, 테스트부터 다시 세웠습니다.",
      "이때부터 막혔던 문제를 Tistory에 정리하기 시작했습니다. 무인 단말에서 CDN을 쓸 수 없는 문제, 인앱브라우저에서 blob URL 다운로드가 안 되는 문제처럼 검색해도 답이 잘 안 나오던 것들입니다.",
    ],
    moments: [
      { when: "2025.12 — 2026.08", what: "VGOLF F&B — ESC/POS 주방 프린팅, 오프라인 부팅 사이니지, WYSIWYG 편집기까지 단독 개발 (460+커밋)" },
      { when: "2026.04", what: "제1회 코리아IT아카데미 바이브코딩 공모전 500팀 중 3위(장려상) — Argos 프론트엔드 전담" },
      { when: "2026.06 — 08", what: "VGOLF 앱 — React Native 개발부터 Play Console 제출까지 (2개월 487커밋)" },
      { when: "2026.04 —", what: "Tistory에 기술 정리와 실무 트러블슈팅 연재 시작" },
      { when: "2026.09 —", what: "VGOLF 경기관제 PM30 — 모바일 저장소 분리, Recoil → zustand, 테스트 0 → 162개, 태블릿 기능 이관" },
    ],
    projects: ["vgolf-fnb", "vgolf-app", "vgolf-pm30", "argos", "vgolf"],
    gained: [
      "React Native 네이티브 프로젝트를 Expo 없이 직접 관리하기",
      "릴리스 서명·환경 분리·스토어 심사 대응까지 배포 마지막 단계 처리하기",
      "서비스워커 프리캐시로 오프라인에서도 동작하게 만들기",
      "브라우저가 닿지 못하는 하드웨어를 로컬 에이전트로 연결하기",
      "zod 2층 스키마로 백엔드 응답을 계약 테스트하기",
      "영향·우선순위를 붙인 API 수정 요청서 쓰기",
      "Supabase RLS와 AI SDK로 역할별 데이터 격리 구현하기",
      "기준을 세워 레거시 코드를 안전하게 걷어내고, 측정한 뒤에 구조 바꾸기",
      "코드를 일부러 깨 보는 변형 검증으로 테스트가 실제로 버그를 잡는지 확인하기",
    ],
    techs: ["reactnative", "nextjs", "typescript", "zod", "supabase", "workbox", "escpos", "ios", "android"],
  },
];
