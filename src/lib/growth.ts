import { BadgeKey } from "./badges";

export interface GrowthStage {
  period: string;
  /** 단계 이름 — 짧게 */
  phase: string;
  where: string;
  title: string;
  /** 그때 실제로 한 일 */
  did: string[];
  /** 그 직전 단계와 비교해 무엇이 달라졌는가 — 이 축이 성장의 증거다 */
  shift: string;
  /** 이 단계에서 새로 갖게 된 능력. 이전 단계에는 없던 것만 적는다. */
  gained: string[];
  techs: BadgeKey[];
}

/**
 * 커리어를 "무엇을 했는가"가 아니라 "무엇을 할 수 있게 됐는가"로 정렬한 것.
 * 각 단계의 shift 가 그 전 단계에는 없던 능력이다.
 */
export const GROWTH: GrowthStage[] = [
  {
    period: "2021.08 — 2022.03",
    phase: "01 · 시작",
    where: "아주대학교 커뮤니케이션팀",
    title: "코드가 사람의 행동을 바꾼다는 걸 처음 봤다",
    did: [
      "비개발 조직의 유일한 개발 담당으로 교내 공식 웹사이트를 혼자 유지보수",
      "중복된 HTML 구조를 통합하고 CSS 네이밍 체계를 정리",
      "팝업 UI를 직접 디자인하고 구현해 Google Analytics로 반응을 확인",
    ],
    shift:
      "프레임워크도 구조도 없이 HTML·CSS·jQuery만 있던 시기입니다. 대신 '내가 고친 코드가 실제 사용자에게 닿는다'는 감각을 처음 얻었고, 그게 이후 계속 개발을 하게 만든 이유가 됐습니다.",
    gained: [
      "HTML 구조 정리와 CSS 네이밍 체계 세우기",
      "레거시 코드에서 불필요한 로직을 걷어내기",
      "Google Analytics로 내 변경의 효과를 확인하기",
    ],
    techs: ["html", "css", "javascript", "jquery"],
  },
  {
    period: "2022.09 — 2022.12",
    phase: "02 · 기준",
    where: "스탬퍼 (Cosmostation)",
    title: "동작하는 코드와 리뷰를 통과하는 코드는 다르다",
    did: [
      "React·TypeScript 실무 코드베이스에 티켓 단위로 기여",
      "Kujira 체인 추가 — 체인 상수·에셋·목록 등록까지 신규 체인 온보딩 전 과정",
      "ERC20·CW20 토큰 검색 페이지 제작, 특정 체인 전용을 전 체인 지원으로 확장",
      "검색 입력 디바운스를 직접 만들고 이후 공통 훅으로 정리",
    ],
    shift:
      "혼자 쓰던 코드에서 남이 읽는 코드로 넘어온 지점입니다. 같은 기능을 리뷰 코멘트에 따라 여러 번 다시 올리면서, 조건 판단을 단순하게 만들고 불필요한 것을 걷어내는 기준이 생겼습니다.",
    gained: [
      "실무 React·TypeScript 코드베이스 읽고 규칙에 맞춰 기여하기",
      "티켓 단위로 작업 범위를 끊고 PR로 올리기",
      "리뷰를 전제로 커밋을 쪼개고 코멘트를 반영하기",
      "입력 이벤트 디바운스 — 불필요한 조회를 줄이는 성능 기초",
      "다국어(i18n) 리소스 구조 다루기",
    ],
    techs: ["react", "typescript", "redux", "emotion", "webpack"],
  },
  {
    period: "2023.11 — 2024.02",
    phase: "03 · 폭",
    where: "웹비즈 크리에이티브",
    title: "화면 전체를 혼자 책임져 보다",
    did: [
      "공공기관 6개 사이트 약 200페이지를 디자인 시안부터 반응형 마크업·PHP 연동까지 단독 수행",
      "Vue·TypeScript 컴포넌트 설계와 Pinia 상태 관리 적용",
      "Storybook으로 UI를 문서화해 디자이너·백엔드와의 접점을 체계화",
      "웹 접근성(A11Y)과 크로스 브라우징을 상시 요건으로 처리",
    ],
    shift:
      "반복이 극단적으로 많은 작업이었습니다. 200페이지를 손으로 겪으면서 '무엇을 공통으로 묶어야 하고 무엇은 묶으면 안 되는지'를 몸으로 익혔고, 이게 이후 디자인 시스템을 설계할 때 그대로 쓰였습니다.",
    gained: [
      "디자인 시안을 반응형 마크업으로 정확히 옮기고 PHP 템플릿에 연결하기",
      "웹 접근성(A11Y)과 크로스 브라우징을 마크업 단계에서 처리하기",
      "무엇을 공통 컴포넌트로 묶고 무엇은 두어야 하는지 판단하기",
      "Vue 컴포넌트 설계와 Pinia 전역 상태 분리",
      "Storybook으로 UI를 문서화해 협업 접점 만들기",
    ],
    techs: ["vue", "typescript", "pinia", "storybook", "html", "css", "php", "figma"],
  },
  {
    period: "2024.04 — 2025.03",
    phase: "04 · 확장",
    where: "부트캠프 · 개인 프로젝트",
    title: "만드는 사람에서 팀을 굴리는 사람으로",
    did: [
      "한화시스템 Beyond SW Camp(백엔드 트랙) 수료 후 코드잇 프론트엔드 심화 우수 수료",
      "BOOT_UP — 같은 서비스를 Spring 백엔드 → Vue 프론트 → Docker·GitHub Actions 배포로 세 번에 나눠 구현",
      "CalIT — 팀장으로 프론트 단독 개발, 100개 이상 API 연동, Jenkins·Kafka·Prometheus까지 백엔드 협업",
      "번개팅 — 팀장으로 Jest·Cypress·CircleCI 기반 CI/CD를 처음부터 끝까지 구축",
      "ChatFlow — Kubernetes 카나리 무중단 배포와 WebRTC 화상·음성 구현",
      "PPIYO — 20시간 해커톤에서 MVP를 완성해 기간 내 배포",
    ],
    shift:
      "같은 서비스를 서버·화면·배포 세 시점에서 만들어 보면서, 프론트가 백엔드에게 무엇을 요구해야 하는지 감이 생겼습니다. 주어진 화면을 잘 만드는 일에서 무엇을 만들지 정하고 사람을 움직이는 쪽으로 넘어온 것도, 테스트·CI/CD를 기본으로 붙이기 시작한 것도 이 시기입니다.",
    gained: [
      "Spring·JPA·QueryDSL로 서버 API와 동적 쿼리 설계하기",
      "전역 예외처리와 응답 코드 체계를 세워 계약을 팀에 공유하기",
      "Docker 이미지 빌드와 GitHub Actions·Jenkins CI/CD 파이프라인 구축",
      "Kubernetes 카나리 무중단 배포 전략 적용",
      "Jest·RTL·Cypress로 단위·E2E 테스트 자동화",
      "Sentry·Prometheus·Grafana로 배포 후를 관측하기",
      "팀장으로 스프린트를 운영하고 이슈 우선순위를 조정하기",
    ],
    techs: ["nextjs", "vue", "typescript", "java", "springboot", "zustand", "jest", "cypress", "circleci", "docker", "kubernetes"],
  },
  {
    period: "2025.04 — 2025.11",
    phase: "05 · 심화",
    where: "플럭시티 · DX 기술팀",
    title: "화면을 만드는 사람에서 기반을 만드는 사람으로",
    did: [
      "부산 도시철도 관제 — WebRTC 게이트웨이와 SDP를 직접 교환해 RTSP CCTV를 브라우저에서 재생, 현장 운영까지 도달",
      "협업처 플랫폼 API 스펙에 맞춰 시설물 9종과 제어 인터페이스를 타입으로 고정",
      "Plug Platform — 프로젝트마다 복사되던 컴포넌트·API 호출을 모노레포 패키지로 걷어냄 (머지 PR 17건)",
      "Plug Atlas — Cesium 지도 위 IoT 관제에서 이벤트 조건·조회·알람·조치까지 도메인 전반 구현",
      "현장 폐쇄망에 배포하고 그 자리에서 디버깅·수정·재배포",
    ],
    shift:
      "내가 쓸 코드가 아니라 다른 프로젝트가 가져다 쓸 코드를 만들기 시작했습니다. 남이 준 스펙에 맞추는 데 그치지 않고 계약을 타입으로 고정해 화면이 응답 형태를 추측하지 않게 만든 것도 이때부터입니다.",
    gained: [
      "Three.js·Cesium으로 3D 모델과 지도 위 객체를 다루기",
      "WebRTC SDP 교환과 ICE 상태 기반 연결·재연결 제어",
      "SSE 다채널 구독과 실시간 스트림을 화면 상태로 옮기기",
      "pnpm 워크스페이스 모노레포와 패키지 경계 설계",
      "여러 프로젝트가 함께 쓰는 디자인 시스템·공통 API 계층 만들기",
      "외부 협업처의 스펙을 타입 계약으로 고정해 추측을 없애기",
      "정보를 안 주는 상대와도 진도 내기 — 경우의 수를 미리 준비해 가서 맞는 것을 찾아내기",
      "현장에 배포하고 그 자리에서 고쳐 다시 올리기",
    ],
    techs: ["react", "typescript", "threejs", "cesium", "webrtc", "sse", "zustand", "storybook", "pnpm"],
  },
  {
    period: "2025.11 — 현재",
    phase: "06 · 책임",
    where: "플럭시티 · 클라우드팀",
    title: "코드 밖까지가 개발이라는 걸 배웠다",
    did: [
      "VGOLF F&B — 클라우드 정적배포 앱과 매장 사설망 프린터를 로컬 에이전트 브릿지로 연결, ESC/POS 바이트열 직접 생성",
      "망분리 미니 PC가 네트워크 없이 부팅해도 뜨는 사이니지를 서비스워커 프리캐시로 설계",
      "VGOLF 앱 — React Native를 Expo 없이 네이티브부터 릴리스 서명·Play Console 제출까지 단독 수행",
      "zod 2층 계약 테스트로 서버가 par: null을 주며 모든 홀이 더블보기로 표시되던 무증상 오류를 화면 반영 전에 검출",
      "API 응답 불일치 12건을 영향·우선순위 표로 문서화해 백엔드에 전달",
      "Argos — AI 실시간 수업 분석 플랫폼의 프론트엔드를 전담해 제1회 코리아IT아카데미 바이브코딩 공모전(KIT 해커톤) 500팀 중 3위(장려상)",
    ],
    shift:
      "이제 문제가 브라우저 안에서 끝나지 않습니다. 하드웨어·네트워크·스토어 심사처럼 코드 바깥의 제약을 설계에 포함시키게 됐고, 되돌린 결정까지 이유와 함께 남기는 습관이 붙었습니다.",
    gained: [
      "React Native 네이티브 프로젝트를 Expo 없이 직접 소유하기",
      "릴리스 서명·환경 분리·스토어 심사 대응까지 배포 마지막 구간 처리",
      "서비스워커 프리캐시로 오프라인 우선 동작 설계",
      "브라우저에서 닿지 않는 하드웨어를 로컬 에이전트 브릿지로 연결",
      "zod 2층 스키마 계약 테스트로 백엔드 응답을 검증하기",
      "백엔드에 영향·우선순위를 붙인 계약 요청서를 쓰기",
      "Supabase RLS와 AI SDK를 붙여 역할별 데이터 격리 구현",
    ],
    techs: ["reactnative", "nextjs", "typescript", "zod", "reactquery", "recoil", "workbox", "escpos", "ios", "android"],
  },
];
