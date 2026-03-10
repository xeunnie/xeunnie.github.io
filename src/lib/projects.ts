import { BadgeKey } from "./badges";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectSection {
  title: string;
  items: string[];
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: "company" | "personal";
  featured?: boolean;
  company?: string;
  period: string;
  role: string;
  description: string;
  overview: string;
  techs: BadgeKey[];
  highlights: string[];
  imageCount?: number;
  links?: ProjectLink[];
  sections?: ProjectSection[];
}

export const PROJECTS: Project[] = [
  {
    slug: "onmeet",
    title: "OnMeet",
    subtitle: "AI 회의록 자동 생성 B2B 화상회의 SaaS 플랫폼",
    category: "personal",
    featured: true,
    period: "2024 — 2026",
    role: "프로젝트 팀장 · Frontend 단독 개발 + Backend MSA 설계·구현",
    description:
      "프론트 단독 + Polyglot MSA 7개 서비스 설계 — Go 전환으로 메모리 96% 감소, LiveKit SFU로 대역폭 O(N²)→O(N)",
    overview:
      "AI 회의록 자동 생성 기능을 갖춘 B2B 화상회의 SaaS 플랫폼입니다. 프론트엔드를 단독 개발(React + Vite + Zustand + TanStack Query)하고, 백엔드 Polyglot MSA 7개 서비스(Gateway/Auth/Video/AI/Notification/File/Email)를 설계·구현했습니다. 화상회의·채팅 영역을 중심으로 주도하며, LiveKit SFU 기반 WebRTC, Kafka 이벤트 드리븐 비동기 통신, Zod 런타임 스키마 검증, SSE 실시간 STT 스트리밍, Defense-in-Depth 보안까지 프론트-백 전 영역을 아우르는 풀스택 프로젝트입니다.",
    techs: ["react", "typescript", "zustand", "reactquery", "vite", "tailwind", "radix", "framer", "zod", "sentry", "firebase", "kotlin", "java", "go", "springboot", "livekit", "webrtc", "kafka", "redis", "s3", "docker", "mysql", "postgresql", "nginx", "gcp", "openai"],
    highlights: [
      "프론트엔드 단독 개발 — Feature-Based 아키텍처, Zustand + TanStack Query 하이브리드 상태 관리",
      "Zod 런타임 스키마 검증 fetcher 패턴 — 타입 안전한 API 계층 설계",
      "SSE 기반 실시간 STT 스트리밍 — Ref 버퍼링 + 쓰로틀링 + 자동 재연결 커스텀 훅",
      "Polyglot MSA 7개 서비스 — 서비스 특성별 최적 언어 선택 (Kotlin/Java/Go)",
      "Go File Service 전환 → 메모리 96% 감소, API 응답 ~100x 향상",
      "LiveKit SFU — N:N 대역폭 O(N²) → O(N), DataChannel 채팅으로 추가 인프라 제거",
      "참가자별 개별 트랙 Egress → Whisper STT → Claude 요약 AI 파이프라인",
    ],
    sections: [
      {
        title: "Frontend — 아키텍처 & 상태 관리",
        items: [
          "Feature-Based 도메인 모듈 구조 — auth/meeting/dashboard/schedule/notification/team 각 모듈이 자체 api/hooks/store/components 보유",
          "하이브리드 상태 관리: Zustand(UI 상태) + TanStack Query(서버 상태) + Context(인증/테마) 역할 분리",
          "Zustand Slice 패턴 + useShallow()로 모달 컴포넌트가 자신의 slice만 구독 → 레이아웃 리렌더 차단",
          "Zod 런타임 스키마 검증 + 제네릭 createFetcher 팩토리 — 스키마와 타입이 하나의 소스에서 파생 (Single Source of Truth)",
          "Query Key Factory 패턴으로 캐시 키 일관성 관리",
        ],
      },
      {
        title: "Frontend — 실시간 화상회의 & STT",
        items: [
          "LiveKit WebRTC 통합 — 갤러리/스피커 뷰 전환, PIP 모드, 디바이스 선택 미리보기",
          "회의실 상태 머신: preparing → joining → waiting → connected → disconnected, Phase별 UI 자동 전환",
          "SSE 기반 실시간 STT — useSSEStream 커스텀 훅으로 Ref 버퍼링 → 250ms 쓰로틀 → 문장 경계 flush",
          "스트림 종료 시 TanStack Query 캐시 자동 무효화로 데이터 동기화",
          "AI 녹음 요청/승인 큐 시스템 — 회의 종료 후 요약 자동 생성",
        ],
      },
      {
        title: "Frontend — 빌드 & 모니터링",
        items: [
          "Vite 매뉴얼 청크 분리 (vendor/query/livekit/editor/firebase/charts/motion) — 초기 로딩 최적화",
          "React.lazy() 라우트 기반 코드 스플리팅",
          "Sentry — Session Replay + 환경별 샘플링 차등 적용, React Router 연동 트레이싱",
          "FCM 푸시 알림 + 실시간 알림 목록, 알림 유형별 세부 설정",
        ],
      },
      {
        title: "Backend — 시스템 아키텍처",
        items: [
          "Polyglot MSA 7개 서비스: Gateway(Kotlin/WebFlux) · Auth(Kotlin) · Video(Java) · AI(Java) · Notification(Java) · File(Go) · Email(Java)",
          "Kafka 이벤트 드리븐 — meeting.ended → AI 회의록 트리거, audio.segment → 실시간 음성 스트림",
          "Database-per-Service 패턴 — 서비스별 독립 DB, 스키마 변경 시 타 서비스 무영향",
        ],
      },
      {
        title: "Backend — Video Service 핵심 설계",
        items: [
          "LiveKit SFU 통합 — 미디어 전송은 LiveKit, 비즈니스 로직은 Video Service가 담당하는 책임 분리",
          "Token 기반 권한 제어 (canPublish/canSubscribe/canPublishData/roomAdmin) — 역할별 세분화된 미디어 접근",
          "SSE 대기실 — 호스트/참가자 별도 스트림으로 관심사 분리, 승인 시 LiveKit 토큰 즉시 발급",
          "참가자별 개별 오디오 트랙 Egress — Late-join 자동 녹화, S3 직접 저장",
          "LiveKit Webhook — 참가자 입퇴장, 트랙 발행, Egress 완료 서버사이드 동기화",
        ],
      },
      {
        title: "기술적 의사결정",
        items: [
          "LiveKit SFU 채택 — P2P 대비 N:N 대역폭 O(N) 절감, gRPC 서버사이드 트랙 제어",
          "DataChannel 채팅 — WebSocket 대신 LiveKit 중계 활용, 추가 인프라 불필요",
          "Go File Service 전환 — 빌드 73% 단축, 메모리 96% 감소, Docker 이미지 94% 축소",
          "TrackEgress — 전체 믹스 대신 개별 트랙으로 화자 분리 정확도 확보",
          "Zustand + TanStack Query 분리 — UI 상태와 서버 상태 경계 명확화로 리렌더링 최소화",
          "Zod fetcher 패턴 — 런타임 타입 검증으로 백엔드 스키마 변경에도 프론트 안정성 유지",
        ],
      },
      {
        title: "보안 & 인프라",
        items: [
          "RSA-256 비대칭 JWT + AES-256-GCM 키 암호화 + Gateway Secret 상수 시간 비교",
          "Cookie-based Auth (HttpOnly/Secure), 게스트 토큰 4시간 만료, GDPR 탈퇴 처리",
          "GitHub Actions 선택적 빌드/배포 — git diff 변경 감지, 멀티 아키텍처 빌드",
          "AI 파이프라인: Kafka → Redis 버퍼 → VAD → Whisper STT → Claude 요약 → S3",
        ],
      },
    ],
  },
  {
    slug: "busan-metro",
    title: "부산교통공사 1호선 시설 관제 시스템",
    subtitle: "3D 시설 모니터링 & WebRTC CCTV 스트리밍",
    category: "company",
    featured: true,
    company: "플럭시티",
    period: "2025",
    role: "Frontend 단독 개발 (프론트 100%, 백엔드 30%)",
    description:
      "폐쇄망에서 TURN/STUN 없이 WebRTC CCTV를 스트리밍하고, Three.js 3D 관제 + GPS 차량 추적을 단독 개발",
    overview:
      "부산교통공사 1호선 전체 노선의 시설물을 실시간으로 모니터링하고 제어하는 3D 관제 시스템입니다. Three.js 기반 3D 시각화, GPS 실시간 차량 위치 추적, WebRTC 기반 현장 CCTV 영상 스트리밍, WebSocket 센서 데이터 수신을 프론트엔드 단독으로 개발했습니다. 특히 폐쇄망 환경에서의 WebRTC CCTV 스트리밍 구조를 분석·구현하며 실시간 미디어 처리 역량을 심화했고, 현장에서 바로 배포하고 오류 발생 시 즉시 수정·재배포하는 현장 대응 경험을 쌓았습니다.",
    techs: ["react", "typescript", "threejs", "webrtc", "websocket", "webview"],
    imageCount: 4,
    highlights: [
      "프론트엔드 단독 개발 — Three.js 3D 관제 + WebRTC + WebSocket + GPS 통합",
      "폐쇄망 환경 WebRTC CCTV 스트리밍 — 구조 분석부터 샘플 코드 작성까지",
      "3D 맵 POI·조명·장치 관리 UI/UX — 시설물 상태 직관적 시각화",
      "GPS 기반 실시간 차량 위치 추적 — 노선 위 차량 위치 렌더링",
      "SSE 기반 실시간 이벤트 알림 시스템",
      "현장 배포·즉시 수정·재배포 — 실시간 버그 현장 대응",
    ],
    sections: [
      {
        title: "WebRTC CCTV 스트리밍",
        items: [
          "폐쇄망 환경에서 동작하는 WebRTC CCTV 스트리밍 구조 분석 및 구현",
          "TURN/STUN 서버 없이 폐쇄망 내부 시그널링 처리",
          "다중 CCTV 동시 스트리밍 — 관제 화면에서 복수 영상 동시 모니터링",
          "스트림 연결 끊김 자동 감지 및 재연결 로직",
        ],
      },
      {
        title: "3D 시설물 관제",
        items: [
          "Three.js 기반 전체 노선 3D 시설물 모니터링 뷰",
          "3D 맵 위 POI·조명·장치 관리 UI — 실시간 상태 반영",
          "WebSocket 센서 데이터 수신 — 시설물 상태 실시간 시각화",
          "카메라 제어 및 시점 전환 — 역사별·구간별 빠른 탐색",
        ],
      },
      {
        title: "실시간 차량 추적 & 현장 대응",
        items: [
          "GPS 데이터 기반 실시간 차량 위치 추적 — 노선 위 차량 렌더링",
          "SSE 기반 실시간 이벤트 알림 — 관리자 즉시 인지",
          "WebView 컴포넌트 통합으로 레거시 시스템 연동",
          "현장 폐쇄망 환경 배포 — 오류 발생 시 즉시 수정·재배포 반복",
        ],
      },
    ],
  },
  {
    slug: "vgolf",
    title: "Vgolf",
    subtitle: "골프장 실시간 라운드 관리 & F&B 주문 플랫폼",
    category: "company",
    featured: true,
    company: "플럭시티",
    period: "2025 — 2026",
    role: "Frontend Developer (경기관제 태블릿 + F&B 단독 개발)",
    description:
      "매일 운영되는 프로덕션 서비스 — GPS→Proj4 좌표 변환, 움직이는 카트 위 터치 UX, F&B PWA 단독 개발",
    overview:
      "골프장 실시간 라운드 관리 플랫폼입니다. 태블릿/모바일 듀얼 디바이스 경기관제 앱(Vgolf App, v1.1.24, 26K+ LOC)과 F&B 주문·관리 PWA(Next.js 14)를 개발했습니다. GPS 기반 카트 추적, Proj4 좌표 변환, 지오펜싱 자동 홀 전환, 움직이는 카트 환경에서의 터치 UX 최적화 등 골프장 특수 환경에 최적화된 기술을 구현했습니다. 현재 운영 중인 프로덕션 서비스로, 실사용 환경에서의 안정성과 마감 품질에 특히 주력했습니다.",
    techs: ["react", "typescript", "nextjs", "vite", "recoil", "reactquery", "pwa", "scss", "mui", "i18n", "proj4", "indexeddb", "webview", "docker", "nginx"],
    imageCount: 5,
    highlights: [
      "프로덕션 운영 서비스 — 실사용 환경에서의 안정성·마감 품질에 주력",
      "GPS 카트 추적 — 500ms 주기 GPS 읽기, Proj4 좌표 변환(위경도→코스맵 픽셀), 지오펜싱 자동 홀 전환",
      "움직이는 카트 환경 터치 UX — Ghost Click 방지, useTap(30px 흔들림 허용), 더블클릭 가드",
      "태블릿 140+ / 모바일 45+ 컴포넌트 — 듀얼 디바이스 공통 모듈 분리",
      "F&B 단독 개발 — Web Worker 백그라운드 폴링, Canvas 테이블 배치(Pan/Zoom + AABB 충돌), Web Audio 알림",
      "네트워크 탄력성 — ConsecutiveErrorGuard, Recoil Persist, React Query 캐싱, Teams Webhook 텔레메트리",
    ],
    sections: [
      {
        title: "경기관제 앱 — GPS & 실시간 시스템",
        items: [
          "GPS 카트 추적 — 500ms 주기 디바이스 GPS, 3초 주기 서버 전송 (대역폭 최적화)",
          "Proj4 좌표 변환 — 위경도 → 코스맵 이미지 픽셀 좌표 매핑, 고도 기반 그린 슬로프 계산",
          "지오펜싱 — 홀 폴리곤 영역 진입/이탈 감지로 자동 홀 전환, 해저드/이벤트 존 TTS 경고",
          "라운드 상태 머신: START → OUT RUN → TURN → IN RUN → END, 9홀 추가·코스 변경 동적 대응",
          "SSE 기반 다채널 실시간 동기화 — 예약, F&B 주문, 장비, 메시지",
          "Android WebView + PlugGolf 브릿지 — 네이티브 GPS, 카메라, 알림 통합",
        ],
      },
      {
        title: "경기관제 앱 — UX & 안정성",
        items: [
          "움직이는 카트 환경 터치 최적화 — Ghost Click 방지(preventGhostClick), useTap 훅(스와이프 vs 탭 구분, 30px 임계값)",
          "더블클릭 가드 — 스코어 저장 등 중요 액션 보호",
          "듀얼 디바이스 아키텍처 — 태블릿 140+ / 모바일 45+ 컴포넌트, 공통 모듈 분리로 재사용 극대화",
          "92+ Recoil 아톰 + recoil-persist — 앱 재시작 시 서버 왕복 없이 상태 복원",
          "ConsecutiveErrorGuard — 연속 에러 시 폴링 자동 일시정지/재개",
          "Teams Webhook 텔레메트리 — 에러 실시간 모니터링",
          "4개 언어 동적 로딩 (한/영/일/태국어) — i18next",
        ],
      },
      {
        title: "F&B 주문 시스템 — 단독 개발",
        items: [
          "Web Worker 기반 백그라운드 폴링(useBackgroundPolling) — 탭 비활성화 시에도 3초 간격 주문 업데이트",
          "Canvas 테이블 배치 UI — Pan & Zoom(마우스/터치), AABB 충돌 감지, 드래그&드롭(@dnd-kit), 90° 회전",
          "Web Audio API + HTML5 Audio 폴백 — Web Worker 타이머로 백그라운드 쓰로틀링 우회, Browser Notification 연동",
          "주문 상태 플로우: 접수요청 → 수락 → 완료 → 취소, 부분 취소, 테이블 재배정, ERP 연동",
          "IndexedDB + 메모리 캐시 하이브리드 토큰 저장 — localStorage 자동 마이그레이션 포함",
          "통합 모달 관리(useUnifiedModal) — 9개+ 모달 타입 단일 훅으로 관리",
        ],
      },
      {
        title: "프로덕션 운영 & 마감 품질",
        items: [
          "현재 운영 중인 프로덕션 서비스 — 실사용 골프장에서 매일 사용",
          "엣지 케이스 꼼꼼한 처리 — 중복 주문 방지, 에러 큐잉, Pub/Sub 에러 핸들링",
          "PWA 오프라인 폴백 + Cache-Control 무효화 전략",
          "Docker + Nginx Alpine 정적 배포, 빌드 ID 자동 생성 (YYMMDDHHMI)",
          "엑셀 매출 리포트 자동 생성 (ExcelJS 스타일 적용)",
          "usePullToRefresh, useDragScroll 등 모바일 UX 커스텀 훅",
        ],
      },
    ],
  },
  {
    slug: "calit",
    title: "CalIT",
    subtitle: "개발자를 위한 대시보드 기반 스크럼 관리 시스템",
    category: "personal",
    period: "2024.08 — 2024.10",
    role: "프로젝트 팀장 · Frontend 단독 개발 (FE 1 / BE 4)",
    description:
      "프론트 단독으로 100+ API 연동, Kafka 채팅·Jenkins CI/CD·Prometheus 모니터링까지 풀스택 기여",
    overview:
      "한화시스템 Beyond SW 풀스택 부트캠프 최종 프로젝트입니다. Vue 기반의 대시보드로 스크럼 관리, 실시간 알림, 채팅 기능을 통합했습니다. 프론트엔드를 단독으로 개발하며 100개 이상의 API를 연동하고, 렌더링 최소화 전략과 Pinia 상태 관리를 적용해 대규모 코드베이스를 안정적으로 유지했습니다. Jenkins CI/CD 파이프라인 구축, Kafka 기반 채팅 시스템 구현, Prometheus + Grafana 모니터링 등 백엔드 협업에도 적극 기여했습니다.",
    techs: ["vue", "javascript", "pinia", "springboot", "kafka", "redis", "mariadb", "jenkins", "kubernetes", "prometheus", "grafana"],
    highlights: [
      "프론트엔드 단독 개발 — 100개 이상 API 연동 및 비동기 처리 최적화",
      "Pinia 상태 관리로 전역 상태 효율화, 불필요한 리렌더링 방지",
      "Kafka 기반 실시간 채팅 시스템 구현 지원",
      "Jenkins CI/CD 파이프라인 구축 지원",
      "Prometheus + Grafana 모니터링 시스템 구축 지원",
      "n8n 기반 AI 챗봇 시나리오 작성 — 자동화 업무 알림",
    ],
    links: [
      { label: "배포", url: "https://calit.netlify.app/" },
      { label: "GitHub", url: "https://github.com/beyond-sw-camp/be06-fin-MINIONZ-CalIT" },
      { label: "시연 영상", url: "https://drive.google.com/file/d/1X2cc5Vd348nsnsZcGp6ZbHRO0TeA-mc5/view?usp=drive_link" },
      { label: "발표 자료", url: "https://drive.google.com/file/d/1PhEqi3-RpG1aBW3tOVNXraTka1QhvWfE/view?usp=drive_link" },
    ],
    sections: [
      {
        title: "프론트엔드 개발 & 최적화",
        items: [
          "emit을 활용한 컴포넌트 간 데이터 전달 — Vue 컴포넌트 설계 최적화",
          "Pinia 상태 관리 적용 — 전역 상태 효율적 관리",
          "100개 이상의 API 연동 — 효율적인 비동기 처리 및 네트워크 부하 최소화",
        ],
      },
      {
        title: "DevOps & 백엔드 협업",
        items: [
          "Jenkins 파이프라인 구축 지원 — CI/CD 자동화",
          "Kafka 기반 채팅 시스템 구현 지원 — 실시간 데이터 처리",
          "Prometheus + Grafana 백엔드 모니터링 시스템 구축 지원",
        ],
      },
      {
        title: "AI 기능 적용",
        items: [
          "n8n을 이용한 AI 챗봇 시나리오 작성 — 자동화된 업무 알림 및 보조 기능",
        ],
      },
    ],
  },
  {
    slug: "thunderting",
    title: "번개팅",
    subtitle: "실시간 모임 매칭 플랫폼",
    category: "personal",
    period: "2025.02 — 2025.03",
    role: "프로젝트 팀장 (FE 4 / BE 1 / DE 1)",
    description:
      "PWA로 FCP 3.2s→1.2s, Zustand+RQ로 리렌더 50%↓ — Jest·Cypress·CircleCI 완전 자동화 CI/CD",
    overview:
      "코드잇 프론트엔드 단기심화 최종 프로젝트입니다. Next.js 기반의 실시간 모임 매칭 플랫폼으로, 기획부터 배포까지 팀장으로서 전방위 리딩했습니다. SSR + ISR 최적화로 초기 로딩 속도를 개선하고, PWA 적용으로 FCP를 3.2s에서 1.2s로 단축했습니다. Zustand + React-Query 병행으로 불필요한 리렌더링 50% 감소, API 호출량 40% 감소를 달성했습니다. Jest + RTL 단위 테스트, Cypress E2E 테스트 20개 이상 작성, CircleCI + Codecov 기반 완전 자동화 CI/CD 파이프라인을 구축했습니다.",
    techs: ["nextjs", "typescript", "reactquery", "zustand", "tailwind", "framer", "webpack", "pwa", "jest", "cypress", "circleci", "sentry", "codecov", "jira", "indexeddb"],
    highlights: [
      "PWA 적용 — FCP 3.2s → 1.2s 단축",
      "Zustand + React-Query 병행 — 리렌더링 50% 감소, API 호출 40% 감소",
      "SSR + ISR 최적화 — 초기 로딩 및 SEO 대응",
      "Jest + RTL 단위 테스트, Cypress E2E 20개+ 작성 (주요 플로우 100% 커버)",
      "CircleCI + Codecov + Netlify 완전 자동화 CI/CD",
      "Sentry 실시간 에러 모니터링 체계 구축",
    ],
    links: [
      { label: "배포", url: "https://thunderting.site/" },
      { label: "GitHub", url: "https://github.com/DoITFronts" },
      { label: "시연 영상", url: "https://drive.google.com/file/d/1d2EmOpNjbYYjr91hOSKF-g38vRaHODrf/view?usp=sharing" },
      { label: "Wiki", url: "https://github.com/DoITFronts/Frontend/wiki" },
    ],
    sections: [
      {
        title: "프로젝트 관리 & 구조 설계",
        items: [
          "Jira 기반 스프린트 운영 — 이슈 트래킹 및 태스크 우선순위 조정",
          "파일 구조 및 타입 시스템 전면 개편 — 단일 책임 원칙 적용",
          "컴포넌트/스토어 구조 리팩토링 — 관심사 분리로 재사용성 강화",
        ],
      },
      {
        title: "성능 최적화 & UX 강화",
        items: [
          "PWA 적용 — FCP 3.2s → 1.2s 단축, 오프라인 대응",
          "Framer Motion 도입 — 인터랙티브 UI 전환 설계",
          "SSR + ISR 최적화 — 초기 로딩 속도 + 정적 자원 자동 재생성",
          "Webpack Lazy Load, 코드 스플리팅 — 번들 사이즈 최적화",
        ],
      },
      {
        title: "상태 관리 및 데이터 전략",
        items: [
          "Zustand + React-Query 병행 — 클라이언트/서버 상태 분리, 리렌더링 50% 감소",
          "React-Query stale-time & cache-time 세분화 — API 호출량 40% 감소",
        ],
      },
      {
        title: "테스트 및 안정성 확보",
        items: [
          "Jest + RTL 기반 단위 테스트 — 주요 기능 자동화 테스트",
          "Cypress E2E 20개+ 작성 — 주요 플로우 100% 커버",
          "MSW + JSON Server(Railway) — API Mocking으로 개발 선행 및 병렬 진행",
        ],
      },
      {
        title: "CI/CD 및 운영",
        items: [
          "CircleCI + Codecov + Netlify — PR 시 테스트 → 커버리지 → 자동 배포",
          "Sentry 실시간 에러 모니터링",
          "GA / robots.txt / sitemap — SEO 및 유입 경로 분석",
          "IndexedDB(idb) 기반 로컬 캐싱 — 오프라인 환경 대응",
        ],
      },
    ],
  },
  {
    slug: "ppiyo",
    title: "PPIYO",
    subtitle: "위치 기반 스터디 모집 플랫폼",
    category: "personal",
    period: "2025.01.11 — 2025.01.12",
    role: "프로젝트 팀장",
    description:
      "20시간 해커톤 집중 개발 — 카카오 맵 API 기반 중간 거리 계산 + 1km 반경 추천 장소 시스템",
    overview:
      "구글 삐약톤 해커톤에서 20시간 집중 개발로 완성한 위치 기반 스터디 모집 플랫폼입니다. 카카오 맵 API를 연동하여 스터디원들의 중간 거리를 계산하고 1km 반경 내 추천 장소를 리스트업하는 기능을 구현했습니다. PWA 적용으로 모바일 환경에서도 최적화된 사용성을 제공하며, Storybook을 도입해 디자이너와의 협업 효율을 높였습니다.",
    techs: ["react", "typescript", "emotion", "framer", "pwa", "storybook"],
    highlights: [
      "20시간 집중 개발을 통해 MVP를 완성하여 해커톤 기간 내 배포",
      "카카오 맵 API 연동 — 스터디원 위치 기반 중간 거리 계산 시스템 구현",
      "1km 반경 내 추천 장소 리스트업 기능",
      "Context API를 활용한 유저 위치 상태 관리 최적화",
      "PWA 적용으로 모바일 환경 최적화",
      "Storybook 도입 — UI 컴포넌트 문서화 및 재사용성 강화",
    ],
    links: [
      { label: "배포", url: "https://bbiyagiez.netlify.app/" },
      { label: "GitHub", url: "https://github.com/chickHackathon" },
    ],
    sections: [
      {
        title: "프로젝트 기획 & 개발 주도",
        items: [
          "20시간 집중 개발을 통해 MVP를 완성하여 해커톤 기간 내 배포",
          "스프링 백엔드 구조 기반으로 API 설계 & 팀원 간 협업 주도",
          "디자이너와 원활한 협업을 위해 Storybook 도입 → UI 컴포넌트 문서화 및 재사용성 강화",
        ],
      },
      {
        title: "상세페이지 구현",
        items: [
          "카카오 맵 API 연동 — 스터디원 위치 기반 중간 거리 계산 시스템 구현",
          "1km 반경 내 추천 장소 리스트업 기능 추가",
          "Context API를 활용하여 유저 위치 상태 관리 최적화",
          "PWA 적용으로 모바일 환경에서도 최적화된 사용성 제공",
        ],
      },
    ],
  },
  {
    slug: "chatflow",
    title: "ChatFlow",
    subtitle: "쿠버네티스 기반 실시간 커뮤니케이션 플랫폼",
    category: "personal",
    period: "2025.01 — 2025.03",
    role: "프로젝트 팀장 (FE 2 / BE 2)",
    description:
      "WebRTC 화상·음성·화면공유 + WebSocket 채팅 — Kubernetes 카나리 무중단 배포까지 풀스택 구현",
    overview:
      "Kubernetes 기반 마이크로서비스 환경에서 구축한 실시간 커뮤니케이션 플랫폼(디스코드 클론)입니다. WebRTC를 활용한 화면 공유·음성·화상 통화, WebSocket(SockJS + STOMP) 기반 실시간 채팅, SWR + Redux를 조합한 네트워크 성능 최적화, PWA 크로스 플랫폼 대응, 카나리 무중단 배포까지 풀스택 커뮤니케이션 시스템을 설계·구현했습니다.",
    techs: ["react", "typescript", "redux", "swr", "reactquery", "tailwind", "framer", "websocket", "webrtc", "firebase", "webpack", "pwa", "jest", "rtl", "cypress", "jira", "kubernetes", "docker"],
    highlights: [
      "WebRTC 기반 화면 공유·음성·화상 통화 구현 — 다중 사용자 네트워크 최적화",
      "WebSocket(SockJS + STOMP) + SWR 캐싱 전략으로 채팅 네트워크 성능 최적화",
      "Redux + SWR 조합으로 유저 상태 실시간 동기화",
      "PWA 적용 — 크로스 플랫폼 대응 및 성능 개선",
      "Webpack 코드 스플리팅 및 번들 최적화",
      "Kubernetes 카나리 무중단 배포 적용",
    ],
    links: [
      { label: "배포", url: "https://discord-clone-alpha-tawny.vercel.app/login" },
      { label: "GitHub", url: "https://github.com/ChatFlowProject" },
      { label: "Wiki", url: "https://github.com/ChatFlowProject/chatter/wiki" },
    ],
    sections: [
      {
        title: "채팅 · WebRTC · 네트워크 최적화",
        items: [
          "React + SWR + Redux를 활용한 유저 정보 상태 관리",
          "WebSocket 이벤트 기반 유저 상태 실시간 업데이트",
          "SWR 캐싱 전략으로 API 호출 최소화 및 불필요한 리렌더링 방지",
          "Redux 글로벌 상태 관리로 빠른 접근 & 데이터 복구",
        ],
      },
      {
        title: "실시간 소통 구현",
        items: [
          "WebRTC 활용 실시간 커뮤니케이션 — 화면 공유, 음성·화상 통화",
          "다중 사용자 간 네트워크 최적화로 원활한 미디어 스트리밍",
        ],
      },
      {
        title: "채팅 시스템",
        items: [
          "WebSocket & SWR 조합으로 네트워크 성능 최적화 — 서버 부하 최소화 캐싱 전략",
          "최신 메시지 & 유저 상태 동기화 유지",
          "PWA 적용으로 크로스 플랫폼 대응 및 성능 개선",
          "Webpack 코드 스플리팅 및 불필요한 번들 제거",
        ],
      },
      {
        title: "배포 & 인프라",
        items: [
          "Kubernetes 환경 배포 — 마이크로서비스 아키텍처 적용",
          "카나리 무중단 배포 — 트래픽 점진적 전환으로 배포 안정성 유지",
        ],
      },
    ],
  },
];
