import { BadgeKey } from "./badges";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectShot {
  /** public/ 기준 경로 */
  src: string;
  caption: string;
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
  /**
   * 목록에서의 우선순위. 낮을수록 앞.
   * "무엇을 먼저 보여줄지"는 최신순으로 자동 정해지지 않아서 손으로 정한다.
   * 기준 — 혼자 끝까지 책임진 범위 · 문제의 난이도 · 검증 가능한 근거(수상·커밋·스크린샷).
   */
  rank?: number;
  /**
   * 목록에서 접어 두는 프로젝트.
   * 개별로 힘을 싣기보다 "여러 도메인·규모·협업을 쉬지 않고 겪었다"는 묶음으로 보여줄 것들.
   * 상세 페이지는 그대로 살아 있다.
   */
  minor?: boolean;
  /**
   * 같은 제품군을 묶는 이름. 지정하면 /projects 에서 한 덩어리로 렌더된다.
   * 한 제품이 여러 앱으로 쪼개져도 목록이 그 제품으로 도배되지 않게 하는 장치.
   */
  group?: string;
  company?: string;
  /** 소속 팀. 회사 안에서 어느 조직에 있었는지 필터링하기 위한 것. */
  team?: string;
  /** 회사 밖 프로젝트의 출처 — 부트캠프·해커톤·수업 이름. */
  org?: string;
  /** 수상 내역. 있으면 카드와 상세에 강조 표시된다. */
  award?: string;
  /** public/ 기준 상장·수상 이미지 경로. 파일이 있을 때만 채운다. */
  awardImage?: string;
  period: string;
  role: string;
  description: string;
  overview: string;
  techs: BadgeKey[];
  highlights: string[];
  links?: ProjectLink[];
  /** 화면 캡처. 첫 장이 목록 카드의 썸네일로도 쓰인다. */
  shots?: ProjectShot[];
  /** 캡처 배치 — "phone": 세로 캡처 3열, "grid": 가로 캡처 2열. 없으면 한 장씩 전폭 */
  shotsLayout?: "phone" | "grid";
  /** 캡처 아래 안내문. 없으면 운영 화면 기본 문구를 쓴다. */
  shotsNote?: string;
  sections?: ProjectSection[];
  /** 이 프로젝트에서 배운 것. 한 줄에 하나씩, 직접 적는 칸이다. */
  learned?: string[];
  /**
   * 무엇이 막혔고(problem) 무엇을 했고(action) 어떻게 됐는지(result).
   * 상세를 열자마자 이 셋이 먼저 읽히게 하려고 따로 둔다 —
   * 기능 목록만 쌓아 두면 "그래서 뭘 해결했나" 가 묻힌다.
   */
  par?: { problem: string; action: string; result: string };
}

export const PROJECTS: Project[] = [
  {
    slug: "onmeet",
    rank: 7,
    org: "코리아IT 풀스택 과정",
    award: "코리아IT 풀스택 과정 수강생 우수상",
    awardImage: "/shot/award-onmeet.jpg",
    title: "OnMeet",
    subtitle: "AI 회의록 자동 생성 B2B 화상회의 SaaS 플랫폼",
    category: "personal",
    period: "2024 — 2026",
    role: "팀장 · Frontend 단독 개발 + Backend MSA 설계·구현",
    description:
      "프론트 구현 + Polyglot MSA 7개 서비스 설계 — Go 전환으로 메모리 96% 감소, LiveKit SFU로 대역폭 O(N²)→O(N)",
    overview:
      "코리아IT에서 들은 풀스택 보강 수업에서 팀장을 맡아 시작한 프로젝트로, 과정 내 수강생 우수상을 받았습니다. AI 회의록 자동 생성 기능을 갖춘 B2B 화상회의 SaaS 플랫폼입니다. 프론트엔드를 맡아 개발(React + Vite + Zustand + TanStack Query)하고, 백엔드 Polyglot MSA 7개 서비스(Gateway/Auth/Video/AI/Notification/File/Email)를 설계·구현했습니다. 화상회의·채팅 영역을 중심으로 주도하며, LiveKit SFU 기반 WebRTC, Kafka 이벤트 드리븐 비동기 통신, Zod 런타임 스키마 검증, SSE 실시간 STT 스트리밍, Defense-in-Depth 보안까지 프론트-백 전 영역을 아우르는 풀스택 프로젝트입니다.",
    techs: ["react", "typescript", "zustand", "reactquery", "vite", "tailwind", "radix", "framer", "zod", "sentry", "firebase", "kotlin", "java", "go", "springboot", "livekit", "webrtc", "kafka", "redis", "s3", "docker", "mysql", "postgresql", "nginx", "gcp", "openai"],
    links: [
      { label: "배포", url: "https://onmeet.cloud" },
      { label: "기술 발표 자료", url: "https://presentation.onmeet.cloud/slide/1/" },
      { label: "GitHub", url: "https://github.com/evencoding/onmeet-frontend" },
      { label: "조직 전체", url: "https://github.com/evencoding" },
    ],
    highlights: [
      "코리아IT 풀스택 과정 수강생 우수상 — 팀장으로 기획부터 배포까지 주도",
      "프론트엔드 구현 — Feature-Based 아키텍처, Zustand + TanStack Query 하이브리드 상태 관리",
      "Zod 런타임 스키마 검증 fetcher 패턴 — 타입 안전한 API 계층 설계",
      "SSE 기반 실시간 STT 스트리밍 — Ref 버퍼링 + 쓰로틀링 + 자동 재연결 커스텀 훅",
      "Polyglot MSA 7개 서비스 — 서비스 특성별 최적 언어 선택 (Kotlin/Java/Go)",
      "Go File Service 전환 → 메모리 96% 감소, API 응답 ~100x 향상",
      "LiveKit SFU — N:N 대역폭 O(N²) → O(N), DataChannel 채팅으로 추가 인프라 제거",
      "참가자별 개별 트랙 Egress → Whisper STT → Claude 요약 AI 파이프라인",
    ],
    learned: [
      "보안 개발 8년차 팀원과 함께 일하며 백엔드 안정성을 보는 눈을 얻었습니다. 기능이 도는 것과 서비스가 버티는 것은 다른 문제라는 걸 이때 알았습니다.",
      "AWS 운영도 곁에서 배웠습니다. 올리고 끝이 아니라 올린 뒤에 무엇을 지켜보고 어디를 조여야 하는지를 이 과정에서 익혔습니다.",
      "LiveKit 연동을 맡으면서 WebRTC를 깊게 들여다봤습니다. SFU가 왜 필요한지, 인원이 늘 때 대역폭이 어떻게 달라지는지를 직접 붙여 보며 이해했고, 이 경험이 이후 지하철 폐쇄망 CCTV 작업의 바탕이 됐습니다.",
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
    rank: 1,
    title: "부산 도시철도 통합 관제",
    subtitle: "3D 역사 관제 + WebRTC CCTV 실시간 스트리밍",
    category: "company",
    featured: true,
    company: "플럭시티",
    team: "DX 기술팀",
    group: "Plug Platform",
    period: "2025.05 — 2025.09",
    role: "Frontend 단독 개발 (3D 관제 · CCTV 스트리밍 · 외부 플랫폼 연동)",
    description:
      "협업처 플랫폼 API 스펙에 맞춰 시설물 9종을 연결하고, WebRTC로 현장 CCTV를 붙여 실제 운영에 올린 도시철도 관제 화면",
    overview:
      "부산교통공사 도시철도(사상하단선) 역사의 시설물을 3D 도면 위에서 관제하는 시스템입니다. 자체 3D 엔진으로 역사 모델을 띄우고 층별 전환·POI를 붙였고, 협업처 관제 플랫폼이 제공한 API 스펙에 맞춰 조명·셔터·CCTV·화재감지 등 시설물 9종과 제어 인터페이스를 연결했습니다. 가장 중요한 축은 CCTV였습니다 — RTSP 카메라를 브라우저에서 보려면 WebRTC 게이트웨이와 SDP를 직접 교환해야 했고, 이 연결을 붙여 현장에서 실제로 영상이 도는 상태까지 만들었습니다. 디자인 협업처 시안을 반영하면서 두 개의 서로 다른 백엔드(협업처 플랫폼 · 자사 API)를 한 화면에서 다뤘고, 현장에 배포한 뒤 즉시 수정·재배포하는 사이클도 직접 돌렸습니다.",
    par: {
      problem:
        "협업처가 CCTV 연동 코드도 문서도 주지 않은 채 현장 일정이 먼저 잡혔습니다. 역사 안 폐쇄망이라 바깥 서비스를 붙일 수도, 인터넷에서 답을 받아 올 수도 없었습니다.",
      action:
        "WebRTC를 먼저 파고들어 RTSP 카메라를 브라우저로 가져오는 경로를 정리했습니다. 상대가 구현했을 법한 방식을 모두 나열하고 각각에 맞는 연결 코드를 미리 준비해 현장에 들어갔습니다. 3D는 현장 PC 사양이 정해져 있어, 한 프레임을 무엇이 잡아먹는지 재 가며 덜어 냈습니다.",
      result:
        "현장에서 하나씩 맞춰 본 끝에 영상을 띄웠고, 시설물 9종과 함께 실제 운영에 올렸습니다. 배포한 뒤에도 그 자리에서 고쳐 다시 올리는 사이클을 직접 돌렸습니다.",
    },
    techs: ["react", "typescript", "vite", "threejs", "webgl", "webrtc", "sse", "zustand", "ky", "tailwind", "pnpm"],
    links: [{ label: "GitHub", url: "https://github.com/seung-choi/busan-sasang" }],
    learned: [
      "사업부와 1대1 — 사업부와 1대1로 매칭되어 들어간 프로젝트였습니다. 요청이 오면 그날 화면으로 옮기고 다시 확인받는 일이 매일이었습니다. 말로 들은 것과 실제로 필요한 것이 다를 때가 많아, 먼저 그려서 보여 드리고 고치는 쪽이 빠르다는 걸 알게 됐습니다. 협업하고 대응하는 힘은 그 사이에서 늘었습니다.",
      "쓰는 사람의 눈높이 — 좋은 화면은 만드는 사람 눈이 아니라 쓰는 사람 눈높이에 맞춘 화면이라는 걸 배웠습니다. 쓰실 분들은 중년의 부산 공무원분들이었고, 보시는 곳은 제 책상이 아니라 조명이 밝은 관제실의 큰 모니터였습니다. 빛이 반사되는 자리라 옅은 글씨는 지워진 것처럼 보였고, 화면이 커진 만큼 멀리서도 읽혀야 했습니다. 글자와 대비를 올리고, 상태를 색 하나로만 알리지 않고 글자를 같이 붙이고, 누르는 단계를 줄였습니다. 제 취향은 접어 두고 그 기준에 맞춰 만들었습니다.",
      "폐쇄망의 보안 — 역사에 들어가는 시스템이라 보안을 계속 신경 써야 했습니다. 밖과 끊긴 망 안에서만 도는 서비스라 평소 쓰던 방식이 그대로 통하지 않았습니다. 만들기 편한 길과 현장에서 쓸 수 있는 길이 다르다는 걸 이때 알았습니다.",
      "남의 일정에 기대지 않기 — 협업처가 제때 움직여 주지 않는 상황도 있었습니다. 연동 규격을 받지 못한 채로 현장 일정이 먼저 잡히기도 했습니다. 기다리는 동안 무엇을 먼저 해 둘지, 끝까지 막히면 어디까지 대신 보여 드릴지를 미리 준비해 두어야 한다는 걸 배웠습니다. 그 뒤로는 남의 일정에 기대야 하는 일이 보이면 대비책부터 적어 둡니다.",
      "주어진 하드웨어 안에서 — 3D가 무거워 화면이 버벅였습니다. 현장 PC는 이미 정해져 있어 더 좋은 기계를 쓸 수 없었고, 주어진 하드웨어 안에서 가장 부드럽게 도는 지점을 찾아야 했습니다. 3D 엔진 수석님과 1대1로 붙어 한참을 같이 들여다봤습니다. 무엇이 한 프레임을 잡아먹는지 재 보고 덜어 낼 것을 하나씩 덜어 내는 일의 반복이었고, 그 과정에서 브라우저가 화면을 그리는 방식을 처음으로 제대로 배웠습니다. 부드럽게 움직이는 상태까지 가는 데 시행착오가 많았고, 쉽지 않았습니다.",
      "대신 들어간 회의 — 백엔드와 서버를 배워 둔 덕에 팀장님을 대신해 회의에 들어가는 일이 잦았습니다. 제가 그 자리에서 답한 말이 그대로 일정이 되었습니다. 모르는 것은 모른다고 말한 뒤 언제까지 확인해 드리겠다고 하는 법도 그때 배웠습니다. 그때부터 이 프로젝트를 제 것으로 여기게 됐습니다.",
    ],
    shots: [
      {
        src: "/shot/busan-3d-asset.jpg",
        caption:
          "역사 전체를 3D로 띄우고 층을 바꿔 가며 봅니다. 왼쪽에서 설비 종류를 고르면 해당 장비만 도면 위에 남습니다. 상단에는 대합실·승강장·외부 온도와 미세먼지가 실시간으로 붙습니다.",
      },
      {
        src: "/shot/busan-cctv.jpg",
        caption:
          "3D 역사 도면 위에서 CCTV를 고르면 WebRTC 스트림이 모달로 열린다. 좌측은 역사 내 CCTV 68대 목록, 상단은 대합실·승강장·외부 환경값, 우측은 층 전환.",
      },
      {
        src: "/shot/busan-admin-space.jpg",
        caption:
          "관리자 공간 관리 — 좌측 GLB 장비 라이브러리(화재센서·공기청정기·소방펌프·FAN·물탱크 등)에서 모델을 골라 역사 도면 위에 배치하고, 이동·회전·삭제로 POI를 편집합니다.",
      },
      {
        src: "/shot/busan-escalator.jpg",
        caption:
          "에스컬레이터 상세 — 중간·대합 두 대의 카메라를 동시에 스트리밍하면서 운행 상태와 장애 상태를 함께 표시.",
      },
      {
        src: "/shot/busan-elevator.jpg",
        caption: "엘리베이터 상세 — 대합·내부 카메라 2개와 동작·장애 상태를 한 모달에서.",
      },
      {
        src: "/shot/busan-shutter.jpg",
        caption: "셔터 상세 — 출구 CCTV와 화재수신기 감지 상태를 함께 확인.",
      },
      {
        src: "/shot/busan-fire.jpg",
        caption: "화재감지기 39개를 목록과 3D POI로 관리하고 감지 상태를 조회.",
      },
      {
        src: "/shot/busan-ventilation.jpg",
        caption:
          "환기시설 18개 — 원격 여부, 운전 상태, 제어 모드, 회전 방향까지 제어 정보를 표출.",
      },
    ],
    highlights: [
      "협업처가 어떻게 구현했는지 알 수 없는 상태에서, 가능한 연결 방식을 미리 다 준비해 가서 현장에서 하나씩 붙여 보며 맞는 것을 찾아냄",
      "WebRTC CCTV 연결 — RTCPeerConnection recvonly 트랜시버로 게이트웨이와 SDP를 교환해 RTSP 카메라를 브라우저에서 재생, 현장 운영 적용",
      "ICE 상태 감시 + 스트림 정리 — failed/disconnected 시 연결을 닫고, 트랙 stop·srcObject 해제 후 재연결하는 경로를 분리",
      "협업처 플랫폼 API 스펙 기반 연결 — 조명·셔터·CCTV·화재감지·엘리베이터·에스컬레이터·물탱크·집수정·공기청정기 9종 + 역사 환경정보·이벤트 현황·제어 요청을 타입으로 고정",
      "서로 다른 두 백엔드를 한 화면에서 — 협업처 관제 플랫폼과 자사 API를 클라이언트 레벨에서 분리해 호출",
      "3D 역사 관제 — 자체 엔진으로 GLTF 모델 로드, 전체층/층별 전환 셀렉터, POI·장치 상태 표시",
      "SSE 실시간 수신 — 열차 도착(ttc) · 이벤트 · 셔터 3개 채널을 이름 있는 이벤트로 구독하고 도착역 코드로 필터링",
      "관리자 공간 관리 — GLB 장비 모델을 3D 도면 위에 배치·이동·회전·삭제하는 편집기 구현",
      "현장 배포·즉시 수정·재배포 — 사무실에서 재현되지 않는 실시간 버그를 현장에서 직접 잡음",
    ],
    sections: [
      {
        title: "코드도 문서도 없이 붙이기 — 준비해 간 경우의 수",
        items: [
          "협업처는 CCTV 연동 코드도 문서도 주지 않았습니다. 카메라 주소만 넘어왔고, 저쪽이 서버를 어떤 방식으로 세웠는지는 붙여 보기 전까지 알 수 없었습니다.",
          "물어봐도 안 나올 답을 기다리는 대신, 먼저 WebRTC 자체를 파고들었습니다 — RTSP 카메라를 브라우저까지 가져오는 경로에 어떤 것들이 있는지, P2P·SFU·게이트웨이가 각각 무엇을 요구하는지, 폐쇄망에서 무엇이 살아남는지.",
          "그래서 '이렇게 만들었을 수도 있다'는 경우를 미리 나열하고, 각 경우에 맞는 연결 코드를 준비한 상태로 들어갔습니다. 현장에서 처음부터 알아보는 게 아니라, 준비한 것을 하나씩 대 보는 방식이었습니다.",
          "그렇게 맞춰 가며 알아낸 것들 — SDP를 base64로 감싸 주고받는 규약을 쓴다는 것, 수신 전용이라 recvonly 트랜시버만 두면 된다는 것, 스트림 타입과 구간 파라미터를 함께 보내야 한다는 것.",
          "연결이 확인된 조합을 샘플로 먼저 세운 뒤, 재연결·스트림 정리 로직을 얹어 제품 코드로 옮겼습니다. 이후 카메라가 늘어나도 백엔드가 주는 주소만 갈아 끼우면 되게 만들었습니다.",
          "결과적으로 알려준 대로 붙인 연동이 아니라, 붙는 방법을 스스로 찾아 정한 연동이 됐습니다.",
        ],
      },
      {
        title: "WebRTC CCTV — 현장에서 도는 상태까지",
        items: [
          "RTCPeerConnection에 video recvonly 트랜시버만 추가해 수신 전용 연결을 구성, ontrack으로 받은 트랙을 MediaStream에 붙여 video 엘리먼트에 연결",
          "onnegotiationneeded에서 offer 생성 → base64로 감싼 SDP(sdp64)를 게이트웨이 스트림 엔드포인트에 POST → 응답 SDP를 디코드해 setRemoteDescription",
          "oniceconnectionstatechange로 failed·disconnected를 감지해 연결을 닫고, 사용자가 다시 시도할 수 있는 재연결 핸들러를 분리",
          "언마운트·재연결 시 getTracks().stop()과 srcObject 해제를 한 곳(cleanupStream)에 모아 스트림이 남지 않게 처리",
          "카메라 주소는 백엔드가 내려주는 streamAddress를 그대로 사용 — 현장 카메라가 늘어나도 코드 변경 없이 붙음",
          "다중 CCTV 동시 스트리밍 — 관제 화면에서 복수 영상을 함께 모니터링",
        ],
      },
      {
        title: "협업처 백엔드 스펙 연결",
        items: [
          "관제 플랫폼이 제공한 스펙에 맞춰 역사 단위 API 클라이언트를 만들고, 시설물 9종을 각각 타입 정의와 함께 서비스로 분리",
          "역사 환경정보·이벤트 현황 조회와 제어 요청/응답(ControlRequest·ControlResponse)까지 계약을 타입으로 고정해 화면이 응답 형태를 추측하지 않게 함",
          "협업처 플랫폼과 자사 API를 별도 클라이언트로 나눠, 한쪽 스펙이 바뀌어도 다른 쪽 화면이 영향받지 않도록 경계를 둠",
          "위젯·역사 단위로 서비스 파일을 쪼개고 index에서 재노출 — 기존 호출부 호환을 유지한 채 구조만 정리",
        ],
      },
      {
        title: "3D 관제 화면 & 실시간",
        items: [
          "자체 3D 엔진을 컨테이너에 마운트하고 역사 GLTF 모델을 로드, 로드 완료·실패 콜백으로 화면 상태를 분기",
          "층 목록에 '전체층'을 자동으로 끼워 넣고 정렬 순서대로 노출하는 층 셀렉터 — 층 데이터가 비어 있어도 화면이 깨지지 않음",
          "3D 맵 위 POI·조명·장치 관리 UI로 시설물 상태를 직관적으로 시각화",
          "SSE로 열차 도착·이벤트·셔터 3개 채널을 구독하고 스토어에 누적, 도착역 코드가 맞는 것만 반영",
          "장비 상세·CCTV 모달을 스토어 기반으로 열고 닫아 3D 뷰와 패널 상태를 분리",
        ],
      },
      {
        title: "관리자 페이지 — 3D 공간을 편집하는 화면",
        items: [
          "GLB 장비 모델 라이브러리 — 화재센서·공기청정기·소방펌프·FAN·물탱크·에어컨 등 3D 에셋을 썸네일로 고르고 도면 위에 배치",
          "배치한 POI를 이동·회전·스케일·삭제하는 편집 도구 — 관제 화면에 뜰 장비 위치를 운영자가 직접 잡을 수 있게 함",
          "역사·층(B1/B2/B3) 단위로 도면을 전환하며 편집 — 서면역 B2 승강장처럼 층마다 다른 배치를 따로 관리",
          "배치 결과가 그대로 관제 뷰의 POI로 이어지도록 좌표계를 맞춤 — 관리자가 옮기면 관제 화면에서도 옮겨짐",
          "자산(Asset)·장비(Device)·시설(Facility)·노선(Line)·사용자(User)·뷰어(Viewer)·대시보드 관리 화면 구성",
          "토스트·에러 바운더리를 공통 컴포넌트로 두고 화면마다 개별 처리하지 않도록 정리",
          "디자인 협업처 시안을 반영하며 헤더·서비스 페이지 UI/UX를 반복 개선",
          "현장 폐쇄망 환경에 배포한 뒤 발생하는 실시간 버그·데이터 오류를 그 자리에서 디버깅·수정·재배포",
        ],
      },
    ],
  },
  {
    slug: "plug-platform",
    rank: 9,
    team: "DX 기술팀",
    group: "Plug Platform",
    title: "Plug Platform",
    subtitle: "SI 프로젝트 공통 모노레포 — 디자인 시스템 · API 계층",
    category: "company",
    company: "플럭시티",
    period: "2025.04 — 2025.09",
    role: "Frontend 개발 (디자인 시스템 · 공통 API 계층)",
    description:
      "프로젝트마다 복사되던 컴포넌트와 API 호출을 모노레포 패키지로 걷어낸 작업 — 머지된 PR 17건, +13,391 / −9,701줄",
    overview:
      "여러 관제 SI 프로젝트가 각자 비슷한 컴포넌트와 API 호출을 복사해 쓰던 상황을 정리하기 위한 pnpm 워크스페이스 모노레포입니다. UI 디자인 시스템(@plug/ui), 공통 API 훅 계층(@plug/api-hooks), 도메인 서비스(@plug/common-services)를 패키지로 분리하고, 부산 사상하단선을 포함한 실제 프로젝트 앱이 이 패키지들을 가져다 쓰도록 구성했습니다. 2025년 4월부터 9월까지 PR 19건(머지 17건)을 올렸고, 컴포넌트 신규 구현부터 아토믹 구조 재편, HTTP 클라이언트 교체, 도메인 서비스 이관까지 담당했습니다.",
    techs: ["react", "typescript", "vite", "tailwind", "storybook", "shadcn", "radix", "ky", "swr", "pnpm", "github"],
    shotsLayout: "grid",
    shots: [
      {
        src: "/shot/plug-indoor-editor.jpg",
        caption:
          "실내지도 편집 — 왼쪽 Asset 목록에서 센서·FAN·CCTV 같은 장비를 골라 3D 도면 위에 배치합니다. 층을 바꿔 가며 편집하고 배치한 장비에는 이름표가 붙습니다.",
      },
      {
        src: "/shot/plug-facility.jpg",
        caption:
          "관제 센터의 시설 관리 — 건물·역사·공장을 탭으로 나누고 카드로 봅니다. 이런 관리 화면을 프로젝트마다 다시 만들지 않도록 공통 패키지로 뽑아냈습니다.",
      },
    ],
    links: [{ label: "GitHub", url: "https://github.com/pluxity/plug-platform" }],
    highlights: [
      "머지된 PR 17건 · +13,391 / −9,701줄 · 450개 파일 (2025.04 — 2025.09)",
      "디자인 시스템 구축 — Form·Input·Checkbox·Radio·Select·Slider·Sheet·Accordion·Table 등을 Storybook 스토리와 함께 패키지화",
      "자체 폼 시스템 — useForm 훅과 validationUtils를 직접 구현해 폼 상태·검증을 컴포넌트 밖으로 분리",
      "아토믹 구조 재편 — 평면적이던 컴포넌트를 atom / molecule 계층으로 정리하고 shadcn 기반으로 전환",
      "공통 API 클라이언트를 fetch에서 ky로 리팩토링 — 인터셉터·에러 처리·prefix URL을 한 곳으로 수렴",
      "useApi · useSWRApi · useReducer 훅과 요청/응답 타입 체계를 api-hooks 패키지로 분리",
      "도메인 서비스 공통화 — auth·user·role·building·file 서비스를 common-services로 이관해 프로젝트 간 중복 제거",
    ],
    sections: [
      {
        title: "@plug/ui — 디자인 시스템",
        items: [
          "Form·Input·InputText·Checkbox·Radio·Slider·Sheet·Accordion·Button·Dropdown·BreadCrumb·Label 구현 및 Storybook 스토리 작성",
          "useForm 훅 + validationUtils를 직접 만들어 폼 상태와 검증 규칙을 컴포넌트에서 분리 — 프로젝트마다 폼 로직을 다시 짜지 않게 함",
          "atom(Button·Input·Select·MultiSelect·Table·Textarea·Card·Badge·SearchInput·DropdownMenu·Avatar) / molecule(Form·AdminProfile) 계층으로 재편",
          "shadcn 의존성을 도입해 접근성·동작이 검증된 프리미티브 위에 자체 스타일을 얹는 방향으로 전환",
          "사이드바 접기/펼치기 아이콘, 프로필 아바타 등 관리자 화면용 공통 에셋 정리",
        ],
      },
      {
        title: "@plug/api-hooks — 공통 API 계층",
        items: [
          "fetch 기반 클라이언트를 ky로 리팩토링 — 재시도·에러 처리·prefix URL 설정을 클라이언트 한 곳에서 관리",
          "일반 요청용 client와 파일 업로드용 fileClient를 분리해 헤더·바디 처리 차이를 호출부가 신경 쓰지 않게 함",
          "useApi · useSWRApi · useReducer 훅과 request/response 타입을 함께 제공해 호출부에서 타입이 자동으로 따라오게 구성",
          "PR #131에서 훅 로직 전면 개편(+2,042 / −467) — 사용처가 늘어난 뒤 드러난 인터페이스 문제를 한 번에 정리",
        ],
      },
      {
        title: "@plug/common-services — 도메인 서비스",
        items: [
          "auth·user·user_admin·role·building·file 서비스를 패키지로 분리해 프로젝트별 중복 구현 제거",
          "사상하단 프로젝트의 역사(station) 서비스를 common-services로 이관하고 토스트·confirm 처리를 함께 정리",
          "인증 흐름 정비 — 로그인, 토큰 리프레시, 만료 처리, protected router, 리프레시 실패 시 로그아웃까지 연결",
        ],
      },
      {
        title: "모노레포 운영",
        items: [
          "pnpm 워크스페이스로 packages(ui · api-hooks · common-services · engine)와 apps(프로젝트별 앱)를 분리",
          "husky + lint-staged로 커밋 시점 린트를 걸어 프로젝트 앱 기준 규칙을 강제",
          "보일러플레이트 프로젝트 세팅(라우팅·린트) 정리로 새 SI 프로젝트의 출발선을 만듦",
        ],
      },
    ],
  },
  {
    slug: "plug-atlas",
    rank: 8,
    team: "DX 기술팀",
    group: "Plug Platform",
    title: "Plug Atlas",
    subtitle: "Cesium 실외 지도 기반 IoT 관제 — 이벤트 · 알람 시스템",
    category: "company",
    company: "플럭시티",
    period: "2025.10 — 2025.11",
    role: "Frontend 개발 (이벤트·알람 시스템 · 공원 관리 · 지도 인터랙션)",
    description:
      "센서가 언제 이벤트를 낼지 정하는 조건 관리부터 알람 수신·조치·통계까지, 관제의 이벤트 흐름 전체를 구현 — 머지된 PR 11건, +8,239 / −2,227줄",
    overview:
      "Cesium 기반 실외 지도 위에서 공원 시설과 IoT 센서를 관제하는 시스템입니다. 실내 3D 도면을 다루던 이전 관제 프로젝트와 달리 지구 좌표계 위에서 마커·폴리곤을 다뤄야 했습니다. 저는 이벤트 도메인 전체를 맡았습니다 — 센서 종류별로 '무엇을 이벤트로 볼지' 정하는 조건 관리, 발생한 이벤트의 조회·필터·시계열 통계, 실시간 알람 수신과 조치 이력, 알람에서 이벤트 상세·발생 위치로 이어지는 흐름까지입니다. 공원 관리(영역 폴리곤 그리기·썸네일)와 지도 마커 인터랙션 개선도 함께 담당했습니다.",
    techs: ["react", "typescript", "vite", "cesium", "zustand", "recharts", "hookform", "tailwind", "pnpm"],
    links: [{ label: "GitHub", url: "https://github.com/pluxity/plug-platform-atlas" }],
    shots: [
      {
        src: "/shot/atlas-alarm.jpg",
        caption:
          "대시보드 — 위성 지도 위에 공원을 얹고, 왼쪽으로 화재·온습도·변위 경고가 발생 순으로 쌓입니다. 각 알람에서 바로 조치로 넘어갈 수 있습니다.",
      },
      {
        src: "/shot/atlas-dashboard-all.jpg",
        caption:
          "성남시 시민안심공원 서비스 전체보기 — Cesium 위성 지도에 공원 POI를 얹고, 공원 12곳·CCTV 55대·IoT 센서 153개를 한 화면에서 봅니다. 아래로 장비 상태 분포, 기간별 자동·수동 조치 집계, 공원별 운영상태, 경고 알림과 조치 현황이 이어집니다.",
      },
      {
        src: "/shot/atlas-dashboard-park.jpg",
        caption:
          "공원별 보기 — 센서를 상태(정상·주의·경계·위험·연결끊김)별로 색이 다른 마커로 지도에 찍습니다. 하단에서 해당 공원의 장치 이력, 종류별 센서 목록, 장치 배터리 알람까지 내려갑니다.",
      },
    ],
    highlights: [
      "머지된 PR 11건 · +8,239 / −2,227줄 · 188개 파일 (2025.10 — 2025.11)",
      "센서 종류별 이벤트 조건 관리 — 어떤 값이 어떤 범위일 때 이벤트로 볼지 정의하는 규칙 편집기와 검증 로직",
      "이벤트 조회·통계 페이지 — 필터, 목록, Recharts 시계열 차트, 통계 섹션",
      "이벤트 상세 모달 — 조치 이력, 발생 위치 지도, 임계값 대비 실측값을 보여주는 ValueRangeIndicator",
      "실시간 알람 — 알림 팝업과 스토어를 붙여 수신·조치까지 연결, 알림 클릭 시 해당 이벤트 상세로 데이터 연동",
      "공원(Site) 관리 — Cesium 폴리곤으로 공원 영역을 직접 그려 저장, 목록 썸네일 업로드 지원",
      "Cesium 마커 인터랙션 개선 및 대시보드 지도뷰 UX 정리",
    ],
    sections: [
      {
        title: "이벤트 조건 관리 — 관제의 입력단",
        items: [
          "센서 종류마다 이벤트 판단 기준이 달라, 종류별로 조건을 정의하고 편집하는 관리 화면을 구성",
          "조건 편집 상태와 검증을 useEventConditionManager 훅으로 분리해 화면은 표시에만 집중하게 함",
          "조건 검증 규칙을 별도 유틸로 빼서, 잘못된 범위·중복 조건이 저장되기 전에 걸러지도록 처리",
        ],
      },
      {
        title: "이벤트 조회 · 통계",
        items: [
          "필터(기간·레벨·상태)와 목록을 분리해 조합이 늘어도 화면이 복잡해지지 않게 구성",
          "Recharts 기반 시계열 차트로 기간별 이벤트 발생 추이를 표시하고, 통계 섹션과 함께 배치",
          "레벨·상태·시간 포맷을 levelUtils · statusUtils · timeUtils로 분리해 목록·모달·차트가 같은 규칙을 공유",
        ],
      },
      {
        title: "실시간 알람과 조치",
        items: [
          "알림 팝업 컴포넌트와 zustand 알림 스토어를 붙여 실시간으로 들어오는 알람을 화면에 반영",
          "알람 목록에서 바로 조치할 수 있게 하고, 조치 이력을 이벤트 상세 모달에서 확인하도록 연결",
          "알림 클릭 시 해당 이벤트의 상세 데이터가 정확히 열리도록 데이터 연동 경로를 정리",
          "이벤트 상세에서 발생 위치를 지도로 보여주고, 측정값이 임계 범위의 어디에 있는지 시각적으로 표시",
        ],
      },
      {
        title: "공원 관리 · 지도 인터랙션",
        items: [
          "Cesium 위에서 공원 영역 폴리곤을 직접 그려 저장하는 편집기(CesiumPolygonDrawer) 구현",
          "공원 목록 썸네일 지원 및 업로드 기능 추가, 업로드 시 content-type 고정으로 실패하던 문제 수정",
          "지도 마커 인터랙션(선택·호버·클릭 반응) 개선 및 대시보드 지도뷰 스타일·UX 정리",
          "센서·CCTV 장비 관리 화면 구성",
        ],
      },
    ],
  },
  {
    slug: "vgolf-pm30",
    rank: 5,
    team: "클라우드팀",
    group: "VGOLF",
    title: "VGOLF 경기관제 PM30",
    subtitle: "태블릿 경기관제 앱을 소형 단말(PM30)로 옮기며 구조를 다시 세운 작업",
    category: "company",
    company: "플럭시티",
    period: "2026.09 — 현재",
    role: "Frontend 단독 — 저장소 분리 · 리팩토링 · 태블릿 기능 이관",
    description:
      "태블릿·모바일 통합 앱에서 모바일만 떼어내 PM30 전용으로 재정비 — 상태 저장 1회 7.89ms → 0.058ms, 진입 번들 −56%, 테스트 0 → 162개",
    overview:
      "골프장 경기관제 앱은 캐디용 태블릿과 모바일 코드가 한 저장소에 섞여 있었습니다. 현장 단말이 세로로 고정된 소형 기기(PM30)로 바뀌면서, 모바일만 떼어낸 저장소를 만들고 태블릿에만 있던 기능을 옮기는 일을 맡았습니다. 분리 이후 커밋 68건 중 66건이 제 작업입니다(나머지 2건은 배포 설정). 기능을 옮기기 전에 구조부터 손봤습니다. 유지보수가 끝난 Recoil을 zustand로 바꾸면서 0.5초마다 849KB를 다시 쓰던 저장 방식을 고쳤고, 운영 번들에 섞여 있던 개발용 데이터를 찾아 분리했고, 테스트가 하나도 없던 코드에 162개의 테스트를 붙였습니다. 다음 사람이 이어받을 수 있도록 구조·데이터 흐름·GPS 판정 원리·이관 목록을 문서 13개로 남겼습니다.",
    par: {
      problem:
        "태블릿용으로 만든 앱을 작은 PM30 단말로 옮겨야 했는데 화면이 버벅였습니다. 들여다보니 0.5초마다 849KB 를 통째로 다시 쓰고 있었습니다. 테스트는 한 개도 없었습니다.",
      action:
        "저장소를 분리하되 분리 때문에 새로 죽은 파일만 골라 지웠습니다. 상태 98개를 쓰기 빈도와 크기로 다섯 칸에 나눠 필요한 것만 쓰도록 바꿨고, 운영 번들에 통째로 들어 있던 개발자 모드 목업도 찾아 분리했습니다.",
      result:
        "상태 저장 한 번이 7.89ms 에서 0.058ms 가 됐고, 진입 번들은 1,485KB 에서 652KB 가 됐습니다. 기기 발열이 줄어 운영처에서도 좋은 반응을 받았습니다. 테스트는 0에서 162개가 됐습니다.",
    },
    techs: ["react", "typescript", "vite", "zustand", "reactquery", "vitest", "rtl", "reactrouter", "i18n", "proj4", "webview", "scss", "axios", "gitea"],
    highlights: [
      "저장소 분리 — 태블릿 코드 328파일·34,827줄을 걷어내되 '분리 때문에 새로 죽은 파일'만 골라 지움. JS 번들 1,991 → 1,557KB",
      "Recoil → zustand 5 — 98개 상태를 쓰기 빈도×크기 기준 5개 저장 칸으로 나누고 직렬화를 몰아서 처리. 상태 저장 1회 7.89ms → 0.058ms",
      "운영 번들에 통째로 들어 있던 개발자 모드 전용 목업 데이터를 찾아 분리 — 진입 청크 1,485 → 652KB(−56%)",
      "테스트 0 → 162개(22파일). 코드를 일부러 깨서 테스트가 실제로 잡는지 확인하는 변형 검증까지",
      "실기기 2대로 재현한 팀 스코어 버그 — 157ms 차이로 합류한 두 기기가 서로가 빠진 명단을 받던 원인을 찾아 수정",
    ],
    shotsLayout: "phone",
    shotsNote:
      "테스트 클럽과 테스트 계정으로 PM30 실기기에서 찍은 화면입니다. 기기 식별자는 가렸습니다.",
    shots: [
      {
        src: "/shot/mob-splash.jpg",
        caption: "초기 진입 화면. 새 시안에 맞춰 다시 만들었습니다. 기기번호·클럽 로고·언어 선택과 앱·서버 버전이 한 화면에 있습니다.",
      },
      {
        src: "/shot/mob-hole.jpg",
        caption: "현재 홀. GPS 위치를 코스 지도에 올리고 남은 거리·고저차·실시간 순위를 보여줍니다.",
      },
      {
        src: "/shot/mob-score-table.jpg",
        caption: "스코어 입력 — 전반·후반 표에서 4명의 홀별 스코어와 합계를 한 번에 봅니다.",
      },
      {
        src: "/shot/mob-score-hole.jpg",
        caption: "홀 단위 입력. 파 기준(−3 ~ +5) 행에서 한 번에 누르고 좌우로 홀을 넘깁니다.",
      },
      {
        src: "/shot/mob-longest.jpg",
        caption: "롱기스트·니어리스트 기록. 거리 표에서 고르고 휠로 세부 값을 넣습니다.",
      },
      {
        src: "/shot/mob-caddie-note.jpg",
        caption: "캐디노트 — 태블릿에만 있던 기능을 옮긴 화면. 고객별 라운드 안내 동의·클럽 장비·고객 정보 확인 상태를 봅니다.",
      },
      {
        src: "/shot/mob-message.jpg",
        caption: "메시지 — 라운드 중 식음·하우스와 주고받습니다. 자주 쓰는 요청은 버튼으로 둡니다.",
      },
      {
        src: "/shot/mob-message-to.jpg",
        caption: "받는 사람 선택. 코스·단체 일행·관리자·식음처럼 그룹 단위로 보내거나 캐디를 검색합니다.",
      },
      {
        src: "/shot/mob-message-alert.jpg",
        caption: "메시지가 오면 어느 화면에 있든 위에 바로 띄웁니다.",
      },
    ],
    sections: [
      {
        title: "저장소 분리 — 무엇을 지울지 정하는 기준",
        items: [
          "vgolf-app(태블릿+모바일)에서 모바일만 떼어낸 저장소. 히스토리를 그대로 승계해 git blame·bisect가 분리 이전 커밋까지 동작",
          "삭제 기준 — 원래 죽어 있던 파일은 손대지 않고(분리와 무관한 기존 부채), 태블릿 제거로 새로 죽은 파일 중 살아남는 파일이 하나라도 참조하면 제외하는 고정점 계산으로 판정. 아직 화면에 붙지 않은 모바일 작업물은 그대로 보존",
          "태블릿 폴더에 섞여 있던 공용 코드(GPS 좌표 변환 554줄 등)는 shared로 옮기되 하위 경로 깊이를 유지 — 태블릿 저장소의 커밋을 cherry-pick할 때 경로 치환만으로 대응되게",
          "모바일 식음 화면 7개가 태블릿 번역 사전을 쓰고 있던 것을 발견 — 그대로 지웠으면 주문 화면 문구가 4개 언어 전부 깨질 상황. 태블릿에만 있던 키 44개를 4개 언어로 이관하고 모든 번역 키가 해석되는지 전수 검증",
          "TS/TSX 589 → 342파일, JS 번들 1,991 → 1,557KB, CSS 778 → 623KB, 의존성 29 → 22개",
        ],
      },
      {
        title: "상태 저장 — 0.5초마다 849KB를 다시 쓰던 구조",
        items: [
          "recoil-persist는 75개 상태가 localStorage 키 하나를 공유해, GPS 좌표 24바이트가 바뀔 때마다 849KB를 읽고 파싱하고 다시 썼음. GPS 엔진은 이걸 0.5초마다 호출",
          "Recoil은 2023년 이후 릴리스가 없고 저장소가 아카이브돼 React 19로 올라갈 수 없는 상태 — zustand 5로 이행",
          "쓰기 빈도×크기에 따라 저장 칸을 hot·session·bulk·config·volatile 5종으로 나누고, 직렬화를 1초 단위로 몰아서 한 번만 수행",
          "Chrome 측정(849KB, 쓰기 200회) — 1회 7.89ms → 0.058ms, 합계 1,578ms → 11.6ms",
          "기존 사용자 데이터는 recoil-persist → zustand 1회 이관 코드로 옮기고, 모든 상태에 저장 정책이 등록돼 있는지 테스트로 전수 검사",
        ],
      },
      {
        title: "번들과 자산",
        items: [
          "페이지를 React.lazy로 나누고 번들을 열어 보니, 개발자 모드에서만 쓰는 목업 클럽 데이터가 부팅 화면을 통해 운영 번들에 통째로 들어 있었음 — 동적 import로 분리해 진입 청크 1,485 → 652KB",
          "지연 로드하면 40KB를 더 줄일 수 있는 슬라이더는 남김 — 골퍼가 특정 지점에 도달하면 바로 떠야 하는 프로모션 모달이 쓰고 있어서",
          "폰트 woff2 변환 29MB → 6.6MB, 이후 Pretendard 하나로 통일",
          "상대경로 254곳을 @/ alias로 바꾸고 폴더를 기능 단위로 재편, 계층 간 의존 방향은 스크립트로 검사",
        ],
      },
      {
        title: "테스트 — 통과하는 테스트를 믿어도 되는지까지",
        items: [
          "0개에서 시작해 162개(22파일) — 저장 계층·데이터 이관·홀 영역 판정·스코어 병합·순위·라운드 시간 역산 같은 순수 함수부터",
          "변형 검증 — 코드를 한 줄씩 일부러 깨고 테스트가 잡는지 확인. 실제 운영 버그(스코어 병합 인자 반전)를 되돌려 넣어 테스트가 실패하는지도 확인",
          "부품 테스트는 전부 통과했는데 PM30에 올리자 앱 전체가 흰 화면 — Provider 밖에서 useQueryClient를 부르고 있었음. queryClient를 모듈 싱글턴으로 분리하고, 조립된 앱을 렌더하는 테스트를 추가",
          "타입체크·lint·stylelint·prettier·테스트·계층·자산·전역 CSS 예산 검사를 npm run check 하나로 묶음 (CI가 아직 꺼져 있어 지금은 로컬 검사)",
        ],
      },
      {
        title: "실기기에서 잡은 버그",
        items: [
          "스코어·순위가 간헐적으로 멈추던 문제 — 병합 함수의 인자 순서가 뒤집혀 과거 로컬 값이 최신 서버 값을 덮고 있었음. '합계는 맞는데 홀 스코어와 순위만 안 바뀌는' 증상에서 원인을 역추적",
          "수동 setInterval·AbortController 폴링을 React Query refetchInterval로 교체하고, 스코어 저장 중에는 팀 스코어 폴링을 멈춤",
          "팀원끼리 서로의 스코어가 안 보이던 문제를 실기기 2대로 재현 — 태블릿 분기를 죽은 코드로 보고 지웠는데 그쪽이 올바른 데이터 경로였고, 서버 명단이 합류 순간의 스냅샷이라 157ms 차이로 합류한 두 기기가 서로를 못 봤음",
          "첫 수정에서 고른 API가 단체팀 전용이라 틀렸던 것을 다음 커밋에서 바로잡고, 틀린 이유(API 요약만 보고 호출 조건을 확인하지 않음)를 커밋에 남김",
          "관제로 보내는 팀원 점수가 null로 나가던 문제 — 내가 입력한 스코어로만 합계를 내던 것을 팀 스코어와 병합하도록 고치되, 명단은 건드리지 않아 GPS 전송 데이터가 오염되지 않게 함",
        ],
      },
      {
        title: "PM30 화면과 태블릿 기능 이관",
        items: [
          "세로 고정·360×640 소형 화면 전용으로 정리 — 태블릿 지도 분기와 화면 방향 분기 CSS 제거",
          "새 시안에 맞춰 초기 진입 화면과 스플래시를 다시 구현, 지도 마커는 2배로 키우고 터치 영역을 48px로",
          "태블릿 기능 이관 목록과 화면별 기능 대조표를 코드에서 직접 뽑아 작성 — 라우트 12개·엔드포인트 63개·SSE 메시지 11종은 이미 동등함을 확인하고, 캐디노트·메시지·롱기스트처럼 태블릿에만 있던 기능을 우선순위대로 이관",
        ],
      },
      {
        title: "인수인계 문서",
        items: [
          "문서 13개, 약 4,300줄 — 처음 맡은 사람이 읽는 순서부터 구조·데이터 흐름·상태 관리·GPS 판정 원리·테스트·도구·배포까지",
          "상태·직렬화·하이드레이션 같은 용어와 홀 영역 판정(레이 캐스팅·바운딩 박스) 원리를 바닥부터 설명",
          "GPS 엔진(2,069줄 컴포넌트)을 분석해, 문제는 성능이 아니라 구독과 ref의 이중화라는 점과 분해 순서를 기록 — 분해 자체는 다음 단계",
          "문서가 사실과 어긋나면 고침 — 'CI가 막는다'는 서술이 실제와 달라 교정",
        ],
      },
    ],
  },
  {
    slug: "vgolf",
    rank: 4,
    team: "클라우드팀",
    group: "VGOLF",
    title: "Vgolf",
    subtitle: "골프장 경기관제 — GPS 카트 추적 & 실시간 라운드 관리",
    category: "company",
    company: "플럭시티",
    period: "2025 — 2026",
    role: "Frontend Developer (경기관제 태블릿 · 미디어바) · 경량화 단독 진행",
    description:
      "매일 도는 경기관제 태블릿 — GPS 카트 추적과 지오펜싱 자동 홀 전환을 붙이고, 업데이트로 받는 파일을 72.9MB에서 8.5MB로 줄였습니다",
    overview:
      "골프장 실시간 라운드 관리 플랫폼의 경기관제 앱입니다. GPS 기반 카트 추적, Proj4 좌표 변환(위경도→코스맵 픽셀), 지오펜싱 자동 홀 전환, 움직이는 카트 위에서의 터치 UX처럼 골프장이라는 환경에만 있는 문제들을 풀었습니다. 지금도 현장에서 매일 돌아가는 서비스라 안정성과 마감에 특히 신경 썼습니다. 미디어바(카트에 붙는 보조 화면)도 같은 화면을 그대로 띄우기 때문에 함께 봐야 했습니다. 2026년 9월에는 한 달 남짓 이 앱을 통째로 다시 재고 줄였습니다. 모바일 코드를 분리해 내보내고, 폰트 여섯 종 열다섯 face를 Pretendard 가변 하나로 모으고, 화면별 지연 로딩과 이미지 압축을 붙였습니다. 상태 저장은 Recoil에서 zustand로 옮기면서 저장 동작을 테스트 40개로 먼저 고정해 두고 바꿨습니다. 그 결과 태블릿이 업데이트 때 받는 파일이 72.9MB에서 8.5MB(−88%)가 됐고, 첫 화면 전에 읽는 JS·CSS가 1/3 수준으로 줄었습니다. 같은 플랫폼의 F&B 주문·사이니지는 별도 프로젝트(VGOLF F&B)로 정리했습니다.",
    par: {
      problem:
        "현장 태블릿은 소스를 업데이트할 때마다 72.9MB 를 내려받았습니다. 느린 회선에서는 1분이 넘고, 카트에 붙는 미디어바는 블루투스로 4분 가까이 받았습니다. 상태는 값 하나가 바뀔 때마다 전체를 직렬화하고 있었습니다.",
      action:
        "모바일 코드를 분리해 내보내고, 폰트 6종 15 face 를 Pretendard 가변 하나로 모았습니다. 쓰지 않는 파일과 CSS · 번역 · 패키지를 전수로 걷어내고 화면별 지연 로딩을 붙였습니다. 상태는 zustand 로 옮기되, 옮기기 전에 Recoil 시절 저장 동작을 테스트 40개로 먼저 고정했습니다.",
      result:
        "받는 파일이 8.5MB 가 되어 10Mbps 에서 61초 걸리던 것이 7초가 됐습니다. 첫 화면 전에 읽는 JS 는 2,048KB 에서 738KB 로 줄었습니다. 옛 버전과 새 버전을 같은 데이터로 띄워 8개 화면을 줄 단위로 비교했고, 달라진 것은 시계 글자뿐이었습니다.",
    },
    techs: ["react", "typescript", "vite", "zustand", "reactquery", "vitest", "scss", "mui", "i18n", "proj4", "webview", "docker", "nginx"],
    shotsLayout: "grid",
    shotsNote:
      "실제 운영 화면입니다. 내장객·캐디 이름은 알아볼 수 없게 처리했습니다.",
    shots: [
      {
        src: "/shot/tab-hole.jpg",
        caption:
          "현재 홀. GPS로 잡은 카트 위치에서 홀컵까지 남은 거리와 고저차를 코스 맵 위에 올린다. 오른쪽은 티샷 순서를 정하는 패널.",
      },
      {
        src: "/shot/tab-hole-detail.jpg",
        caption:
          "홀 상세 — 그린 경사를 색으로 보여주고, 코스에서 주의할 점을 안내합니다. 오른쪽에서 홀을 바로 골라 넘어갈 수 있습니다.",
      },
      {
        src: "/shot/tab-scorecard.jpg",
        caption:
          "스코어 카드. 전반·후반을 나눠 홀별 타수와 합계를 보여주고, 버디 이하는 하트로 표시합니다.",
      },
      {
        src: "/shot/tab-progress.jpg",
        caption:
          "전체 홀 경기 현황. 18홀에 흩어진 팀의 위치와 대기 팀을 한 화면에서 봅니다. 관제실에서 종일 띄워 두는 화면입니다.",
      },
      {
        src: "/shot/tab-bookings.jpg",
        caption: "그날 예약 목록. 팀마다 카트 번호와 전·후반 코스를 지정하고 라운드를 시작합니다.",
      },
      {
        src: "/shot/tab-round-setup.jpg",
        caption:
          "라운드 시작 설정 — 캐디 유무, 부(部), 전·후반 코스, 티오프 시각을 고르고 플레이어를 채운다. 빠진 값이 있으면 시작 버튼이 잠깁니다.",
      },
      {
        src: "/shot/tab-caddie-note.jpg",
        caption:
          "캐디노트. 고객별 라운드 안내 동의와 클럽 장비 확인 상태를 체크하고, 관제·식음에서 온 메시지와 메모를 같이 봅니다.",
      },
      {
        src: "/shot/tab-fnb-order.jpg",
        caption:
          "식음 주문 — 그늘집·레스토랑·스타트하우스를 골라 담습니다. 품절은 주문할 수 없게 막고, 포장 여부를 항목마다 고릅니다.",
      },
      {
        src: "/shot/tab-fnb-history.jpg",
        caption:
          "주문 내역. 요청·취소·조리중 같은 상태가 매장에서 바뀌는 대로 따라 움직입니다.",
      },
      {
        src: "/shot/tab-promotion.jpg",
        caption: "라운드 중 특정 지점에 도달하면 뜨는 프로모션 안내.",
      },
    ],
    highlights: [
      "태블릿이 업데이트 때 받는 파일 72.9MB → 8.5MB (−88%) — 10Mbps 회선에서 61초 걸리던 것이 7초",
      "미디어바 블루투스 첫 전송 46.0MB·3분 56초 → 6.8MB·약 35초",
      "첫 화면 전에 읽는 JS 2,048KB → 738KB, CSS 780KB → 339KB",
      "Recoil → zustand 전환 — 저장 동작을 테스트 40개로 먼저 고정한 뒤 141개 파일을 옮겼습니다",
      "지금도 현장에서 매일 돌아가는 서비스 — 안정성과 마감에 주력",
      "GPS 카트 추적 — 500ms 주기 GPS 읽기, Proj4 좌표 변환(위경도→코스맵 픽셀), 지오펜싱 자동 홀 전환",
      "움직이는 카트 위 터치 UX — Ghost Click 방지, useTap(30px 흔들림 허용), 더블클릭 가드",
      "네트워크 탄력성 — 연속 오류 감지 시 폴링 일시정지, React Query 캐싱, Teams Webhook 텔레메트리",
    ],
    sections: [
      {
        title: "경량화 — 받는 파일을 1/8.5 로 (2026.09)",
        items: [
          "모바일 코드 분리 — 태블릿·미디어바만 남기고 모바일 화면(라우트 12 · 모듈 55 · 전용 CSS 22 등)을 별도 저장소로 내보냈습니다. 남는 쪽의 기능과 화면은 한 줄도 달라지지 않는 것을 원칙으로 잡았습니다",
          "폰트 6종 15 face(29.1MB, 28개 파일) → Pretendard 가변 woff2 하나(2.0MB) — 화면에 보이던 굵기는 그대로 유지",
          "쓰지 않는 정적 파일 102개 제거 — public 은 참조 여부와 상관없이 복사되므로 코드가 아니라 파일 기준으로 전수 확인했습니다",
          "이미지 이중 복사 제거(zip 36.6 → 26.3MB), 큰 이미지 21개 무손실 WebP, 배경 6장만 품질 95 손실 압축(13.1 → 2.2MB)",
          "화면별 지연 로딩 + 부팅 후 미리 받기 — 첫 화면에 필요한 것만 먼저 읽습니다",
          "전역 CSS 에서 어떤 화면에도 매칭될 수 없는 규칙 제거 (layout.css 18,056 → 13,470줄)",
          "쓰지 않는 번역 키 116개·패키지 5개 제거, 런타임 의존성 27 → 21",
          "상대 경로 import 1,216곳을 @/ 로 정리",
        ],
      },
      {
        title: "상태 저장을 Recoil 에서 zustand 로",
        items: [
          "먼저 Recoil 시절의 저장 동작을 테스트 40개로 고정했습니다 — 무엇을 저장하고 무엇을 저장하지 않는지, 같은 값을 넣었을 때 어떻게 되는지, reset 하면 저장소에서 어떻게 빠지는지까지",
          "atom 103개를 hot·session·bulk·config·volatile 다섯 버킷으로 나누고, 1초 지연 쓰기와 바뀐 키만 쓰기로 바꿨습니다",
          "현장 태블릿의 저장 데이터를 잃지 않도록 recoil-persist 값을 한 번 옮기는 경로를 두고, 옛 버전으로 실제 값을 만든 뒤 새 버전을 띄워 17개 키가 값 해시까지 같은지 확인했습니다",
          "미디어바는 본 화면과 영역 iframe 이 같은 저장소를 쓰는데, 버킷을 통째로 저장하면 한 쪽이 다른 쪽 값을 덮었습니다 — 바뀐 키만 합쳐 쓰도록 고쳤습니다",
          "옛 버전과 새 버전을 같은 데이터로 띄워 8개 화면의 모든 요소 computed style 을 줄 단위로 비교 — 시계 글자와 그 폭만 달랐습니다",
          "테스트가 실제로 잡는지 보려고 일부러 코드를 망가뜨려 보고, 안 잡히는 구간에는 테스트를 더 넣었습니다",
        ],
      },
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
          "상태 103개를 저장 정책별로 나눠 보관 — 앱을 다시 켜도 서버 왕복 없이 화면이 돌아옵니다",
          "ConsecutiveErrorGuard — 연속 에러 시 폴링 자동 일시정지/재개",
          "Teams Webhook 텔레메트리 — 에러 실시간 모니터링",
          "4개 언어 동적 로딩 (한/영/일/태국어) — i18next",
        ],
      },
      {
        title: "프로덕션 운영 & 마감 품질",
        items: [
          "현재 운영 중인 프로덕션 서비스 — 실사용 골프장에서 매일 사용",
          "엣지 케이스 꼼꼼한 처리 — 에러 큐잉, Pub/Sub 에러 핸들링, 중복 동작 방지",
          "Docker + Nginx Alpine 정적 배포, 빌드 ID 자동 생성 (YYMMDDHHMI)",
          "usePullToRefresh, useDragScroll 등 터치 UX 커스텀 훅",
        ],
      },
    ],
  },
  {
    slug: "vgolf-app",
    rank: 3,
    team: "클라우드팀",
    group: "VGOLF",
    title: "VGOLF 앱",
    subtitle: "골프 라운드 기록 모바일 앱 (iOS · Android)",
    category: "company",
    featured: true,
    company: "플럭시티",
    period: "2026.06 — 2026.09",
    role: "Frontend Developer · React Native 앱 단독 개발",
    description:
      "React Native 앱을 개발부터 스토어 제출까지 — 555커밋, zod 2층 계약 테스트로 무증상 데이터 오류를 화면 반영 전에 검출",
    overview:
      "골프 라운드 기록을 관리하는 React Native 앱입니다. 화면 구현부터 네이티브 설정, 릴리스 서명, Play Console 제출까지 앱 전체를 맡아 개발했습니다. 555커밋 · 화면 21개 · 소스 16.5k LOC · 문서 55편 규모로, FSD 5레이어 아키텍처와 3겹 에러 안전망을 세우고, zod 2층 스키마 기반 실서버 계약 테스트로 백엔드 응답 계약을 프론트가 주도해 정리했습니다. Expo 없이 ios/ · android/ 프로젝트를 직접 소유하며 소셜 로그인 4종, 2겹 스플래시, 릴리스 서명·환경 분리까지 네이티브 영역을 직접 다뤘습니다.",
    par: {
      problem:
        "React Native 는 처음이었고 앱을 맡을 사람은 저 하나였습니다. 서버 응답도 아직 정리되지 않아, 화면에는 아무 오류가 없는데 값만 틀린 일이 생겼습니다.",
      action:
        "zod 스키마를 런타임용과 엄격용 2층으로 두고 실제 서버 응답을 계약처럼 검사했습니다. 어긋난 12건은 영향과 우선순위를 표로 정리해 백엔드에 전달하되, 하위 호환을 지키는 형태로 제안했습니다. 화면 밖 일은 Expo 없이 ios · android 프로젝트를 직접 들고 갔습니다.",
      result:
        "서버가 par 를 null 로 주어 모든 홀이 더블보기로 보이던 무증상 오류를 화면에 나가기 전에 잡았습니다. 555커밋 · 화면 21개로 스토어 제출까지 마쳤고 지금 Play 스토어에 올라가 있습니다.",
    },
    techs: ["reactnative", "typescript", "zustand", "reactquery", "zod", "hookform", "nativewind", "reanimated", "mmkv", "axios", "sentry", "jest", "ios", "android", "figma", "storybook"],
    links: [
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.pluxity.vgolf",
      },
    ],
    shotsLayout: "phone",
    shotsNote:
      "데모 계정으로 찍은 화면입니다. 이용객 이름과 골프장 상호는 알아볼 수 없게 처리했습니다.",
    shots: [
      {
        src: "/shot/app-login.jpg",
        caption:
          "로그인 — 카카오·네이버·구글·애플 네 가지 소셜 로그인과 이메일 가입을 함께 둡니다. 스토어 심사 요건이라 애플 로그인을 빼놓을 수 없었습니다.",
      },
      {
        src: "/shot/app-home.jpg",
        caption:
          "메인 — 누적 라운드 수와 평균 스코어·베스트·핸디를 위에 두고, 아래로 최근 라운드가 이어집니다. 자동연동과 직접입력을 배지로 구분합니다.",
      },
      {
        src: "/shot/app-scores.jpg",
        caption:
          "스코어 목록 — 라운드마다 골프장·코스·동반자·타수를 카드로 봅니다. 저장이 끝나면 토스트로 알리고 목록을 새로 고칩니다.",
      },
      {
        src: "/shot/app-score-input.jpg",
        caption:
          "스코어 입력 — 라운드 정보와 홀별 입력을 두 단계로 나눴습니다. 파를 고르지 않아도 타수만으로 넣을 수 있고, 홀은 번호나 이동 버튼으로 오갑니다.",
      },
      {
        src: "/shot/app-score-detail.jpg",
        caption:
          "스코어 상세 — 이글·버디·파·보기·더블보기 요약을 먼저 보여주고 전·후반 홀별 표가 이어집니다. 우측 상단에서 공유할 수 있습니다.",
      },
    ],
    highlights: [
      "React Native 앱 — 555커밋, 화면 21개, 16.5k LOC, iOS·Android 동시 대응",
      "FSD 5레이어 + 세그먼트 구조 — 슬라이스 공개 API 규칙으로 '기능 삭제 = 폴더 삭제'가 성립하는 코드베이스",
      "zod 2층 스키마(런타임·엄격) 실서버 계약 테스트 — 서버 par: null로 모든 홀이 더블보기로 표시되던 무증상 오류를 사전 검출",
      "API 응답 불일치 12건을 영향·우선순위(P0/P1) 표로 문서화해 백엔드에 전달 — 하위 호환을 지키는 형태로 제안",
      "3겹 안전망(ErrorBoundary · 전역 핸들러 · QueryState) + axios 에러 6종 정규화 — 로딩·에러·빈 상태를 컴포넌트 3개로 수렴",
      "Expo 없이 네이티브 직접 소유 — 소셜 로그인 4종, 2겹 스플래시, 적응형 아이콘, 릴리스 서명·cleartext 분리",
      "MMKV 암호화 키를 Keychain/Keystore에 보관 + 토큰 재발급 single-flight — 동시 401 중복 재발급·재시도 루프 제거",
      "Play Console 제출 실무 — 데이터 보안 매핑, 공개 약관·개인정보처리방침·회원 탈퇴 페이지 제공",
    ],
    sections: [
      {
        title: "아키텍처 — 레이어를 정하고 지킨 구조",
        items: [
          "FSD 5레이어(shared → entities → features → pages → app) 단방향 의존 + api/model/ui/lib 세그먼트 분리 — 슬라이스 밖에서는 index.ts로만 import",
          "상태를 역할로 3분할 — 서버 데이터는 react-query, 사용자 선택값은 zustand + MMKV 영속, 폼은 react-hook-form + zod로 고정하고 겹치지 않게 규칙 문서화",
          "버전을 '최신'이 아니라 '호환'으로 선택 — MMKV v4(Nitro 네이티브 의존)·zod v4(ESM ↔ RN Babel 충돌)를 v3에 고정하고 올리지 않은 이유를 아키텍처 문서에 기록",
        ],
      },
      {
        title: "안정성 — 사용자 폰에서 조용히 죽지 않게",
        items: [
          "3겹 안전망 — ErrorBoundary(렌더) + ErrorUtils.setGlobalHandler(렌더 밖, 기본 핸들러 체이닝) + QueryState(로딩·에러·빈 상태 render-prop 단일 분기)",
          "모든 실패를 ApiError 하나로 정규화 — axios 인터셉터에서 timeout/network/client/server/invalid/unknown 6종 분류 + 상태코드별 한국어 문구 테이블",
          "조건부 재시도 정책 — network·timeout·5xx만 1회 재시도, 4xx 제외(408·429는 예외), staleTime 60s, 스키마 불일치(invalid)는 재시도 대상에서 제외",
          "Sentry 크래시 대응 — 짝 없는 서로게이트가 네이티브 UTF-8 직렬화에서 앱을 죽이는 문제를 전송 전 정제 단계로 차단",
        ],
      },
      {
        title: "백엔드 협업 — API 계약을 먼저 정리해 제안",
        items: [
          "두 층 스키마 계약 테스트 — 같은 응답을 런타임 스키마(앱이 깨지는가)와 엄격 스키마(서버가 문서대로 주는가)로 이중 파싱",
          "실서버 호출 테스트는 자격증명 없으면 전부 skip + 기본 test/pre-commit에서 제외 — 서버 장애가 커밋을 막지 않게 설계",
          "무증상 버그 검출 사례 — 서버 par: null을 앱이 0으로 보정해 모든 홀이 더블보기로 색칠되던 오류를 엄격 스키마로 검출, '0 보정은 임시 조치'까지 함께 전달",
          "에러 응답 계약 요청서 — 인증 실패 코드 3분리 + retryAfterSeconds 추가 요청, 불일치 12건을 엔드포인트·필드·기대값·앱 영향·P0/P1 표로 정리",
          "결정하지 않은 것도 결정으로 기록 — 동반자 수 계산 불일치는 추측 수정 대신 3안·비용·필요한 최소 정보를 문서화하고 계약 테스트에 비실패 [확인] 항목으로 관찰",
        ],
      },
      {
        title: "디자이너 협업 — 시안을 시스템으로 받기",
        items: [
          "타입 스케일 재정의 — 기준폭 375 → 실기기 393 차이(≈1.05)를 Tailwind 기본 램프 한 스텝 상향으로 흡수, 런타임 폭 스케일은 실익이 작아 채택하지 않음",
          "디자이너가 고칠 파일을 3개로 축소 — 모든 화면을 QueryState로 감싸고 실제 모양은 LoadingState·ErrorState·EmptyState에만 두어 교체 지점을 합의",
          "색 토큰화 — 임의 hex(bg-[#6600FF]) 제거, 단일 팔레트에서 Tailwind 설정과 네이티브 prop용 JS 색상값이 함께 파생되도록 통합 (디자인 커밋 65건)",
          "역으로 스펙 제공 — iOS 투명 배경 거부·Android 적응형 아이콘 세이프존 66% 등 플랫폼 규칙을 체크리스트로 정리해 재작업 없이 산출물 수령",
          "iOS·Android 폰트 정합 — fontWeight를 패밀리명으로 매핑하는 함수를 공용 Text·TextInput이 공유, includeFontPadding: false로 세로 간격까지 일치",
        ],
      },
      {
        title: "인터랙션 — 손맛을 토큰으로 관리",
        items: [
          "공통 모션 토큰 — 스프링 2종·타이밍 3종으로 어휘를 고정하고 모든 애니메이션이 motion.ts를 참조",
          "PressableScale — 눌림 축소를 Reanimated worklet으로 UI 스레드에서 실행해 JS가 바빠도 끊기지 않음",
          "Android 리플 제거 판단 — 축소 애니메이션과 충돌해 양 플랫폼을 opacity 0.6 + 햅틱으로 통일, bottom-tabs PlatformPressable 기본 리플까지 tabBarButton 직접 구현으로 차단",
          "햅틱 적용 기준 표 — 화면 전환 CTA·되돌릴 수 없는 확정은 light, 값 선택은 selection, 목록 카드는 없음. 네이티브 모듈 부재 기기에서는 조용히 무시",
          "접근성 — useReducedMotion()으로 눌림 축소 생략, 공용 Touchable accessibilityRole·TextField 라벨 연결을 기본값화",
        ],
      },
      {
        title: "네이티브 — Expo 없이 ios/ · android/ 직접 소유",
        items: [
          "bare RN 선택 근거를 작업량으로 설명 — 소셜 SDK 3종의 URL 스킴·Info.plist 예외·인텐트 필터·modular_headers·SHA-1 등록, 다이얼로그 테마·cleartext 예외·스플래시 조정이 상시 필요",
          "2겹 스플래시 — 네이티브 런치 화면과 JS 스플래시 배경을 동일 색으로 맞춰 흰 화면 깜빡임 제거, values-v31/styles.xml·스토리보드로 라이브러리 없이 처리, 부팅 대기 구간에 홈 데이터 prefetch",
          "키보드 대응 — automaticallyAdjustKeyboardInsets/adjustResize로 부족한 부분을 measureInWindow 기반 겹침 계산 래퍼로 해결, 계산부는 순수 함수로 분리해 테스트",
          "소셜 로그인 4종 — 카카오·네이버·구글은 email 기준, 애플만 socialId 기준으로 분기(최초 1회 정보 제공·릴레이 주소·Android 네이티브 SDK 부재)를 통합 훅 내부에서 처리",
        ],
      },
      {
        title: "도메인 — 골프 스코어의 규칙에서 나온 문제",
        items: [
          "리스트 키 충돌 — 자동연동(bookingId)과 직접입력(roundedNo)이 별개 시퀀스라 값이 겹치는 문제를 booking-5 / rounded-5 이름공간 분리로 해결",
          "서버 total을 믿지 않는 무한 스크롤 — 다음 페이지 판단을 순수 함수로 분리하고 빈 페이지 수신 시 중단, 화면은 합쳐진 배열만 수신",
          "입력 속도를 위한 도메인 기본값 — 파 72 프리셋 + 수정 방식, 직접입력 칸이 열린 '이유'에 따라 키보드 노출 여부 분기",
          "스코어카드 캡처 공유 — view-shot 캡처 직후 상태 즉시 해제로 멈춤 해결, 저장 URI에 file:// 스킴을 보장해 공유·저장 경로 통일",
          "오프라인 대응 — NetInfo를 react-query onlineManager·focusManager에 연결, isInternetReachable로 '연결됐지만 인터넷 없음'을 배제, 배너는 절대위치로 레이아웃 미영향",
        ],
      },
      {
        title: "보안 · 세션 · 릴리스",
        items: [
          "MMKV 암호화 키를 OS 보안 저장소에 — 256비트 키를 crypto.getRandomValues로 생성해 Keychain/Keystore에 보관, 부팅 시퀀스(키 조회 → 저장소 오픈 → 토큰·persist 복원) 고정",
          "토큰 재발급 single-flight — 공유 프로미스로 1회만 수행하고 재발급 호출은 인터셉터 없는 별도 axios로 보내 401 재시도 루프 차단",
          "빌드 타입 분리 — 키스토어 자격을 레포 밖 gradle.properties에서 로드(없으면 debug 폴백), manifestPlaceholders로 cleartext를 debug=true/release=false 분기, version:set|build로 iOS·Android 버전 동시 상향",
          "Play Console 제출 — 수집 항목을 Play 데이터 타입에 매핑(Sentry는 위탁 처리자), 약관·개인정보처리방침·회원 탈퇴를 로그인 없이 접근 가능한 공개 페이지로 제공",
          "문서 55편 — setup/app/features/api/release/troubleshooting으로 나눠 대안·비용·되돌린 이력까지 남겨 사실상 ADR 역할, pre-commit은 타입체크·린트만 실행",
        ],
      },
      {
        title: "백오피스 — 앱 옆에 같이 만든 관리자 웹",
        items: [
          "스토어 심사에 필요한 공개 페이지(개인정보처리방침·약관·회원 탈퇴 안내)를 인증 밖 경로에 두고, 관리자 화면은 로그인 뒤에 두었다 — 앱 제출에 쓴 공개 URL이 여기서 나옵니다",
          "Vite + React 19 + TypeScript + Tailwind v4 — 커밋 32건, 66파일 3,845줄",
          "앱에서 쓰던 방식을 그대로 옮김 — queryClient·ApiError 정규화 패턴 이식, shared/ 레이어 미러링, react-query·zustand·react-hook-form+zod로 앱과 같은 컨벤션",
          "화면은 로그인 · 대시보드 · 회원 관리 · 약관 · 회원 탈퇴. 탈퇴 화면은 심사자와 실제 이용자가 함께 보는 창구라, 목적(계정·데이터 삭제) 안내를 먼저 읽히도록 다시 짰습니다",
        ],
      },
      {
        title: "되돌린 결정 — 붙였다가 뺀 것들",
        items: [
          "PressableScale 1차 도입 — cssInterop과 애니메이션 스타일이 같은 자리를 두고 충돌해 하단 CTA·FAB·카드가 사라짐. 공용 Text의 동작 방식과 비교해 원인을 규명하고 같은 방식으로 고쳐 재도입",
          "탭 전환 페이드 — 첫 탭을 씹고 빈 화면이 노출되어 하단 탭은 즉시 전환으로 되돌리고 스택 전환에만 모션 유지, '레이아웃을 흔들지 않는다 · 입력 중에는 넣지 않는다'를 모션 원칙으로 문서화",
          "인증 카운트다운 클라이언트 계산 — 쿨다운을 서버가 번호 기준으로 관리하므로 제거하고 판단을 서버로 이관, 그 전제에 맞는 응답 필드를 백엔드에 요청 (제거와 요청서가 한 세트)",
          "목록 항목별 진입 애니메이션 — 카드가 겹쳐 보여 제거하고 첫 로딩 스태거만 유지, 로딩은 스켈레톤으로 대체",
        ],
      },
    ],
  },
  {
    slug: "vgolf-fnb",
    rank: 2,
    team: "클라우드팀",
    group: "VGOLF",
    title: "VGOLF F&B",
    subtitle: "주방 프린터부터 디지털 사이니지까지, 매장을 돌리는 F&B 시스템",
    category: "company",
    featured: true,
    company: "플럭시티",
    period: "2025.12 — 2026.09",
    role: "Frontend Developer · F&B 제품 전반 단독 개발",
    description:
      "10개월 520커밋 — 클라우드 웹앱을 매장 사설망 프린터와 잇고, 무네트워크 부팅 사이니지까지 붙인 매장 운영 시스템",
    overview:
      "골프장 F&B 플랫폼의 주문·관리자·주방 영수증 출력·매장 사이니지 서브시스템을 초기 보일러플레이트 위에서 설계·구현했습니다. 앱 로직을 넘어 매장 하드웨어 연동, 오프라인·실시간 견고성, 상태별 조건 렌더링처럼 실제 배포 현장에서 깨지는 지점들을 붙잡아 해결한 것이 핵심입니다. 초기 인프라(axios·recoil·SSE 훅·login shell)와 일부 모듈은 선행 팀원 기반이며, 2025년 12월 합류 이후 F&B 제품 전반을 맡아 개발했습니다.",
    par: {
      problem:
        "주문 앱은 클라우드에 정적으로 배포되고, 영수증을 뽑을 프린터는 매장 사설망 안에 있었습니다. 둘은 서로 닿지 못합니다. 사이니지 미니 PC는 망이 끊긴 채로 부팅되는 일이 잦았습니다.",
      action:
        "로컬 프린트 에이전트를 두고 raw TCP 로 잇는 경로를 설계했고, ESC/POS 바이트열을 직접 만들었습니다. 80mm 영수증 폭에 맞추느라 한글을 폭 2로 계산하는 고정폭 레이아웃까지 짰습니다. 사이니지는 서비스워커로 문서를 미리 받아 두어 네트워크 없이 부팅해도 화면이 뜨게 했습니다.",
      result:
        "10개월 520커밋으로 주문·관리자·주방 출력·사이니지까지 매장이 도는 데 필요한 것을 붙였습니다. 사이니지는 SSE 로, 주문 화면은 폴링에 야간모드와 연속오류 차단기를 붙여 24시간 무인으로 돕니다.",
    },
    techs: ["nextjs", "react", "typescript", "reactquery", "recoil", "pwa", "workbox", "sse", "dndkit", "pdfjs", "exceljs", "escpos", "indexeddb", "scss"],
    shots: [
      {
        src: "/shot/fnb-order-menu.jpg",
        caption:
          "주문 화면 — 카테고리 탭으로 나눈 메뉴판과 테이블별 주문서. NEW·BEST·시그니처 같은 태그와 품절 여부를 상태값으로 받아 조건부로 그립니다.",
      },
      {
        src: "/shot/fnb-order-live.jpg",
        caption:
          "진행중 오더 보드 — 상단에 홀 진행 상황과 캐디 위치가 흐르고, 주문은 테이블 카드로 쌓입니다. 주방·홀에서 종일 띄워 두는 화면이라 새 주문과 상태 변화가 SSE로 바로 꽂히고 새로고침이 필요 없습니다.",
      },
      {
        src: "/shot/fnb-order-board.jpg",
        caption:
          "정산이 끝난 주문을 모아 보는 화면. 한 팀이 여러 번 나눠 주문한 것을 카드 하나로 묶고, 묶음별 소계와 주문 합계를 같이 보여줍니다.",
      },
      {
        src: "/shot/fnb-message.jpg",
        caption:
          "캐디와 라운지가 주고받는 메시지. \"경기과에 무전이 안 되서 여기로 보냅니다\" 같은 실제 사용 기록이 남아 있습니다. 무전이 닿지 않는 코스에서 주문 변경·취소가 이 경로로 들어옵니다.",
      },
      {
        src: "/shot/fnb-teeoff.jpg",
        caption:
          "티오프 예약을 불러와 내장객을 테이블에 붙인다. 부·코스로 걸러 찾고 단체 예약도 함께 처리합니다. 예약 데이터는 골프장 기간계에서 넘어옵니다.",
      },
      {
        src: "/shot/fnb-menu-admin.jpg",
        caption:
          "메뉴 관리 — 124개 메뉴를 분류·태그·판매 상태·채널로 관리합니다. 상품 정보는 ERP에서 받아 갱신하고, 매장에서는 판매/중지만 바로 바꿀 수 있게 했습니다.",
      },
      {
        src: "/shot/fnb-sales.jpg",
        caption:
          "매출 조회 — 날짜와 캐디로 걸러 공급가·VAT·판매가를 전표 단위까지 봅니다. 정산 담당자가 그대로 쓰도록 엑셀 내보내기를 붙였습니다.",
      },
      {
        src: "/shot/fnb-did-installed.jpg",
        caption:
          "만든 사이니지가 실제로 걸려 있는 모습. 편집기에서 지정한 배경·제목·영문 표기가 그대로 매장 벽면 디스플레이에 표출됩니다.",
      },
      {
        src: "/shot/fnb-did-editor.jpg",
        caption:
          "DID 관리 — 1~4분할을 고르고 칸마다 일반/PDF를 지정합니다. 기기별 연결 탭, 배경 이미지, 글자 색, 정렬, 텍스트 3종의 크기를 조절하면 오른쪽 미리보기가 실제 표출과 같은 방식으로 다시 그려집니다.",
      },
      {
        src: "/shot/fnb-did-output.jpg",
        caption:
          "편집기에서 만든 화면이 실제로 표출된 상태. 해상도가 달라도 위치가 유지되도록 텍스트를 중앙 기준 %오프셋으로 저장하고, 글자 크기는 container-query로 화면 폭을 따라갑니다.",
      },
      {
        src: "/shot/fnb-did-code.jpg",
        caption:
          "사이니지 기기는 코드 한 번으로 연결합니다. 설치하러 간 사람이 계정도 주소도 몰라도 되도록, 관리자가 발급한 코드만 넣으면 그 매장 화면이 뜨게 했습니다.",
      },
      {
        src: "/shot/fnb-did-autorun.jpg",
        caption:
          "설치 담당자를 위한 안내를 화면 안에 넣었다. 기기를 껐다 켜도 같은 화면이 다시 뜨게 하는 절차와, 반대로 빠져나오는 방법(Alt+F4·모서리 5번 탭)까지 적어 두었습니다. 현장에 개발자가 다시 갈 일을 줄이려고 만든 화면입니다.",
      },
      {
        src: "/shot/fnb-layout-editor.jpg",
        caption:
          "배치도 관리 — 좌측 팔레트에서 4·6·8·10·12인 테이블을 끌어다 놓고 캔버스에서 이동·회전·페이지 추가를 합니다. 겹치지 않도록 충돌을 검사하고, 우측 번호 목록은 ERP와 연동됩니다.",
      },
      {
        src: "/shot/fnb-layout-live.jpg",
        caption:
          "같은 배치가 매장 운영 화면으로 그대로 이어집니다. 편집기에서 옮긴 자리가 주문·경과시간이 뜨는 실제 테이블 화면이 됩니다.",
      },
    ],
    highlights: [
      "10개월 · 520커밋 — Next.js App Router 정적 export, TypeScript strict",
      "ESC/POS 열전사 프린팅 직접 구현 — 80mm 주방 영수증 바이트열 생성 + EUC-KR 인코딩, CJK를 폭 2로 계산하는 고정폭 레이아웃 엔진",
      "클라우드→LAN 브릿지 설계 — 정적 배포 앱과 매장 사설망 프린터가 서로 닿지 못하는 구조를, 로컬 프린트 에이전트를 경유해 raw TCP로 해결",
      "오프라인 부팅 사이니지(DID) — 망분리 미니 PC가 네트워크 없이 부팅해도 화면이 뜨도록 서비스워커 문서 프리캐시 설계",
      "WYSIWYG 사이니지 편집기 — 편집 화면과 실제 표출이 동일하게 렌더되도록 %오프셋 저장 + container-query 폰트 자동 스케일",
      "이중 실시간 전략 — 사이니지는 SSE 구독, 주문 화면은 폴링 + 야간모드 상태머신 + 연속에러 서킷브레이커로 24시간 무인 운영",
      "다축 조건 렌더링 설계 — 주문 상태·ERP·권한·화면 분할·네트워크·운영 시간대 6개 축을 독립 분기해 조합 폭발을 관리",
    ],
    sections: [
      {
        title: "하드웨어 연동 — ESC/POS 주방 영수증",
        items: [
          "80mm 열전사 프린터용 ESC/POS 바이트열을 직접 생성하고, 프린터가 이해하는 EUC-KR로 인코딩",
          "CJK 문자를 폭 2로 계산하는 고정폭 레이아웃 엔진으로 한/영 혼용 표 정렬을 맞춤",
          "빌지번호 클라이언트 채번 + IndexedDB 일자 단위 중복방지 — 재시작해도 같은 영수증이 다시 출력되지 않음",
          "구조가 가장 큰 난점 — 앱은 클라우드 정적배포인데 프린터는 매장 사설망(192.168.x.x)이라 서로 닿지 못함",
          "브라우저가 로컬 프린트 에이전트(127.0.0.1:9110)로 명령을 보내고, 에이전트가 raw TCP:9100으로 프린터에 쏘는 브릿지로 해결",
        ],
      },
      {
        title: "디지털 사이니지(DID) — 오프라인 우선",
        items: [
          "망분리 미니 PC가 네트워크 없이 부팅해도 화면이 뜨도록 서비스워커 캐싱을 설계 — 문서 프리캐시를 빌드ID revision과 함께 주입",
          "CDN 폰트가 오프라인에서 누락되는 문제를 자체 호스팅으로 해결",
          "PDF는 브라우저 기본 뷰어를 피하고 canvas 직접 렌더 + 로컬 워커로 처리해 오프라인에서도 표출",
          "배경이 지정되지 않은 경우 템플릿 fallback으로 빈 화면이 뜨지 않게 방어",
        ],
      },
      {
        title: "WYSIWYG 사이니지 편집기",
        items: [
          "1~4분할 레이아웃을 grid-template-areas로 구성해 분할 수가 바뀌어도 같은 렌더 경로를 씀",
          "텍스트 세트 드래그 위치를 중앙 기준 % 오프셋으로 저장 — 편집 해상도와 표출 해상도가 달라도 위치가 유지됨",
          "container-query 기반 폰트 자동 스케일로 화면 크기에 따라 글자가 함께 커지고 작아짐",
          "정렬·폰트·크기·색상·PDF 오버레이·전체화면 미리보기까지 편집기와 실제 표출이 동일하게 렌더",
        ],
      },
      {
        title: "실시간 · 무인 운영 견고성",
        items: [
          "사이니지는 SSE 채널을 구독해 콘텐츠 변경만 수신 — 불필요한 폴링 트래픽 제거",
          "주문 화면은 React Query 폴링에 야간모드 상태머신(off / idle 30s / active 5s)을 얹어 영업 시간대별로 주기를 조정",
          "연속에러 서킷브레이커 가드로 백엔드 장애 시 폴링을 자동 중단, 24시간 무인 환경에서 요청이 쌓이지 않게 함",
          "visibilitychange 연동으로 화면이 보이지 않을 때의 동작을 분리",
          "캐시 무효화는 ERP 연동 여부를 아는(ERP-aware) 중앙집중 방식으로 관리",
        ],
      },
      {
        title: "실시간 골퍼 코스진행 관제 바",
        items: [
          "각 홀의 실제 너비·간격 비율로 트랙을 구성해 코스 형태가 바 위에 그대로 반영되게 함",
          "골퍼를 progress·gap 기반으로 배치 — 홀 내부 진행률과 홀 사이 이동 구간을 구분해 표시",
          "정방향·역방향 진행 순서까지 계산해 한눈에 코스 상황을 읽을 수 있게 구성",
        ],
      },
      {
        title: "매장 배치도 캔버스 에디터",
        items: [
          "pan / zoom과 페이지 간 드래그 이동(포인터 히트테스트)을 지원하는 캔버스 편집기",
          "회전 시 w/h 스왑까지 반영한 AABB 충돌검출로 테이블이 겹치지 않게 배치",
          "근사정사각 멀티페이지 그리드 구성, 좌표는 \"x,y,r\" · \"1920,1080,page\" 형태로 인코딩해 저장·복원",
        ],
      },
      {
        title: "조건별 렌더링 설계",
        items: [
          "하나의 화면이 여러 축의 상태를 동시에 만족해야 해, 상태를 형태(칩·컬러·레이아웃)로 인코딩하고 각 축을 독립 분기해 조합 폭발을 관리",
          "주문 상태 — 접수(R) · 재주문(RN) · 수락(P) · 취소(N) · 완료(Y)에 따라 카드/즉석조리/알림 분기",
          "ERP 연동 — 연동 시 공급가·VAT·전표 컬럼을 조건부 주입하고 orderErp가 있는 행만 필터",
          "화면 분할 — 1~4분할, 일반 ↔ PDF, 텍스트 오버레이 조합",
          "네트워크 — online(최신) / offline(캐시본) / connecting(백오프 재시도)",
          "권한 — canPrintBill · canManageGoods · canCancelOrder 기반 RBAC와 역할별 랜딩 라우팅",
        ],
      },
      {
        title: "정산 · ERP",
        items: [
          "ExcelJS로 서식·병합·테두리를 적용한 매출 시트 export",
          "ERP 연동 시 공급가·VAT·전표 컬럼을 조건부로 주입하고, orderErp가 있는 행만 필터링",
          "그룹 행 forward-fill로 회계 대사에 바로 쓸 수 있는 형태로 정리",
        ],
      },
    ],
  },
  {
    slug: "kikihi",
    rank: 11,
    title: "키키하이 (KiKiHi)",
    subtitle: "커스텀 키보드 조립 웹앱 — 3D 뷰어 & 호환성 검사",
    category: "personal",
    org: "사이드 프로젝트",
    period: "2025.03 — 2025.09",
    role: "Frontend 단독 개발 (프론트 커밋 44건)",
    description:
      "부품을 고르면 3D로 조립되는 커스텀 키보드 웹앱 — 부품 간 호환성 자동 검사와 실시간 3D 렌더링을 프론트에서 구현",
    overview:
      "하우징·키캡·스위치를 골라 나만의 키보드를 조립하고, 3D 뷰어로 확인한 뒤 그대로 구매까지 이어지는 웹앱입니다. 프론트엔드를 맡아 조립 로직, 3D 뷰어, 쇼핑 흐름을 구현했습니다. 회사 일과 병행한 사이드 프로젝트라 6개월에 걸쳐 천천히 붙였고, 3D를 실무(관제)가 아닌 커머스 맥락에서 다뤄 본 경험이 됐습니다.",
    techs: ["react", "typescript", "redux", "threejs", "axios", "pwa", "springboot", "mariadb", "docker", "nginx", "aws", "figma"],
    links: [
      { label: "배포", url: "https://kikihi.netlify.app" },
      { label: "GitHub", url: "https://github.com/KiKi-Hi/Platorm-Front" },
      { label: "조직 전체", url: "https://github.com/KiKi-Hi" },
      { label: "Swagger", url: "https://kikihi.store/swagger-ui/index.html" },
    ],
    highlights: [
      "프론트엔드 구현 — 프론트 레포 커밋 44건",
      "부품 간 호환성 자동 검사 — 하우징·키캡·스위치 조합이 성립하는지 고르는 즉시 판정",
      "3D 커스터마이징 뷰어 — 확대·축소·회전, 부품을 고르면 그 자리에서 다시 렌더링",
      "합계 금액 실시간 계산과 완성본 다운로드·공유·장바구니 담기",
      "쇼핑 흐름 — 카테고리·인기순 정렬, 북마크 찜, 토스페이 결제, 배송지·메시지 입력",
      "PWA 적용으로 모바일에서도 앱처럼 동작",
    ],
    sections: [
      {
        title: "조립과 호환성",
        items: [
          "하우징·키캡·스위치 등 부품을 고르면 조립 결과가 즉시 반영되는 구성 화면",
          "부품 간 호환성을 자동으로 검사해, 성립하지 않는 조합을 고르는 순간 막음",
          "선택이 바뀔 때마다 합계 금액을 다시 계산해 함께 표시",
        ],
      },
      {
        title: "3D 뷰어",
        items: [
          "확대·축소·회전이 가능한 3D 뷰어로 조립 중인 키보드를 실시간 확인",
          "부품을 클릭하면 뷰어에 바로 적용되어 다시 렌더링",
          "완성된 키보드를 이미지로 내려받거나 공유하고, 그대로 장바구니에 담는 흐름 연결",
        ],
      },
      {
        title: "쇼핑 · 배포",
        items: [
          "카테고리·인기순 필터와 정렬, 북마크 기반 관심 목록",
          "토스페이 결제 연동, 배송지 지정과 요청 메시지 입력",
          "React + TypeScript + Redux + styled-components 구성, Netlify 배포",
          "백엔드는 Spring Boot·MariaDB, EC2에 Docker·Nginx로 배포하는 팀 구성",
        ],
      },
    ],
  },
  {
    slug: "vgolf-scorecard",
    company: "플럭시티",
    team: "클라우드팀",
    group: "VGOLF",
    rank: 10,
    title: "VGOLF 스코어카드",
    subtitle: "라운드 결과 공유 웹 — 인앱브라우저 이미지 저장",
    category: "company",
    period: "2026.01 — 2026.09",
    role: "Frontend 단독 유지보수·고도화 (인수인계 후, 본업과 병행)",
    description:
      "인수인계받아 본업과 병행하며 9개월간 혼자 맡은 레거시 — 카카오·네이버 인앱브라우저에서 이미지 저장이 안 되던 문제를 재현부터 문서화까지 끝냄",
    overview:
      "스크린골프 라운드 결과를 개인·팀·단체(시상 포함) 스코어카드로 보여주고, 카카오·네이버 같은 인앱브라우저에서 이미지로 저장·공유하는 모바일 웹입니다. 원 개발자에게서 인수인계받아 F&B·앱 개발과 병행하며 9개월간 맡았습니다(전체 103커밋 중 본인 46건). 새로 설계한 제품이 아니라 남이 짜 둔 코드를 이해하고 안전하게 바꿔 나가는 일이었고, 그중 웹뷰 파편화로 생기는 저장 문제를 끝까지 파고들어 문서로 남긴 것이 가장 값어치 있는 부분입니다.",
    techs: ["react", "typescript", "vite", "recoil", "reactrouter", "scss", "i18n", "html2canvas", "axios", "gitea"],
    shotsLayout: "grid",
    shotsNote:
      "실제 발송된 결과 페이지입니다. 참가자 이름과 골프장 상호·로고는 알아볼 수 없게 처리했습니다.",
    shots: [
      {
        src: "/shot/card-team.jpg",
        caption:
          "라운드가 끝나면 이 페이지 링크가 발송됩니다. 요약(이글·버디·파·보기)과 팀 스코어를 먼저 보여주고, 아래에 전·후반 홀별 표가 이어집니다. 참가자 이름은 서비스가 자체적으로 가운데를 가립니다.",
      },
      {
        src: "/shot/card-round.jpg",
        caption:
          "2인 라운드 결과. 같은 틀이 인원수에 따라 열 수만 달라집니다. 치지 않은 홀은 '-'로 비워 두고 합계에서 뺍니다.",
      },
    ],
    links: [
      {
        label: "관련 글 — 인앱브라우저 이미지 저장",
        url: "https://xeunnie.tistory.com/entry/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1-%EC%9D%B8%EC%95%B1%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%97%90%EC%84%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%A0%80%EC%9E%A5%EC%9D%B4-%EC%95%88-%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0-%E2%80%94-blob-URL%EA%B3%BC-WebView-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%EC%9C%84%EC%9E%84",
      },
    ],
    highlights: [
      "레거시 인수인계 후 9개월 유지보수·고도화 — 전체 103커밋 중 본인 46건, 본업과 병행",
      "인앱브라우저 이미지 저장 문제 해결 — 카카오·네이버 웹뷰에서 저장이 동작하지 않던 것을 재현·분석·해결하고 360줄 트러블슈팅 문서로 남김",
      "저장 이미지가 뿌옇게 나오던 문제 — devicePixelRatio 기반 스케일 처리로 선명도 확보",
      "캡처 로직을 util + 커스텀 훅(useSaveCardImage)으로 추출해 팀·단체 페이지가 공통으로 사용",
      "i18n 리소스를 public HTTP 로드에서 번들 인라인으로 옮겨 네트워크·캐시·MIME·타이밍 이슈 제거",
      "스코어카드 전면 리디자인 + 히어로 헤더 공통 컴포넌트화 — 팀 전용 스타일 122줄 제거",
      "백업 페이지(/team_bu, /scores_bu)를 두고 무중단으로 전환해 리스크 최소화",
    ],
    sections: [
      {
        title: "인앱브라우저에서 이미지가 저장되지 않던 문제",
        items: [
          "증상은 두 가지였습니다. 카카오·네이버 인앱브라우저에서 스코어카드 저장 버튼이 아무 반응이 없었고, 저장이 되더라도 이미지가 뿌옇게 나왔습니다.",
          "일반 브라우저에서는 재현되지 않아, 웹뷰가 다운로드를 어떻게 다루는지부터 파고들었습니다. 환경마다 동작이 갈리는 지점을 하나씩 좁혀 원인을 특정했습니다.",
          "선명도는 devicePixelRatio를 캡처 스케일에 반영해 해결했습니다 — 기기 픽셀 밀도를 무시하고 CSS 픽셀 기준으로 그리던 것이 원인이었습니다.",
          "저장 자체는 인앱브라우저 환경을 감지해 별도 저장 오버레이(SaveImageOverlay)를 띄우고 캡처 플로우를 다시 설계해 우회했습니다.",
          "같은 로직을 팀·단체 페이지가 각자 갖고 있지 않도록 util/captureImage.ts와 useSaveCardImage 훅으로 추출했습니다.",
          "원인·환경별 대응·재발 방지를 360줄짜리 트러블슈팅 문서(docs/image-save-troubleshooting.md)로 남겼고, 같은 내용을 블로그에도 정리했습니다.",
        ],
      },
      {
        title: "리디자인 & 리팩토링 — 안전하게 바꾸기",
        items: [
          "개인·팀 상세와 단체 결과 페이지에 신규 디자인 적용 — 히어로 헤더, 순위 메달, 시상 카드",
          "팀·단체 페이지가 각자 갖고 있던 히어로 헤더를 공통 컴포넌트(ScoreHero)로 추출해 팀 전용 스타일 122줄 제거",
          "인라인 SVG 아이콘 모듈화, 반복되던 JSX를 배열 기반 렌더링으로, 포맷 로직은 util로 분리",
          "인수인계받은 레거시라 한 번에 갈아엎지 않고, 백업 페이지(/team_bu, /scores_bu)를 띄워 둔 채 전환한 뒤 안정화되고 나서 정리 — 문제가 생기면 즉시 되돌릴 수 있는 상태를 유지",
        ],
      },
      {
        title: "스코어 연산 정비",
        items: [
          "파 기준을 홀별 par(holePar) 기반으로 바꾸고, 스코어를 실타수 기준 연산으로 정리",
          "값이 어긋나는 경우를 잡기 위한 검증 로직 추가",
          "파 대비 + 부호를 합계에만 표기하도록 표기 규칙을 하나로 통일",
        ],
      },
      {
        title: "설문 기능 & 배포",
        items: [
          "설문 페이지 신규 개발 — API 연동, 별점 인터랙션, 반응형",
          "POST 응답 상태 분기(완료·중복 제출·오류)와 204 No Content 대응",
          "Gitea Actions 배포 파이프라인(deploy.yml) 운영 — 성공·실패 알림, 운영 포트와 API 연결 정보 관리",
        ],
      },
    ],
  },
  {
    slug: "public-sector-publishing",
    rank: 12,
    title: "공공기관 웹 퍼블리싱",
    subtitle: "6개 기관 사이트 UI/UX 디자인 · 반응형 퍼블리싱",
    category: "company",
    company: "웹비즈 크리에이티브",
    period: "2023.11 — 2024.02",
    role: "웹디자이너 · 퍼블리셔 (디자인 · 마크업 · PHP 연동)",
    description:
      "이민재단·싸템·양구수목원 등 공공기관 사이트 약 200개 페이지를 디자인부터 반응형 마크업까지 담당",
    overview:
      "공공기관 웹사이트를 디자인 시안부터 반응형 퍼블리싱까지 한 사람이 끌고 가는 일이었습니다. 기관마다 정보 구조와 접근성 요구가 달라 페이지 수가 많고 반복이 잦은데, 그만큼 공통 컴포넌트를 어디까지 묶을지 판단하는 기준이 생겼습니다. 산출물은 기관별 마크업 리스트로 관리했고, 각 페이지의 PC·모바일 시안과 퍼블리싱 결과를 함께 추적했습니다. 웹 접근성(A11Y)과 크로스 브라우징 대응이 상시 요건이었습니다.",
    techs: ["html", "css", "javascript", "php", "jquery", "figma"],
    highlights: [
      "6개 기관 사이트 · 약 200개 페이지를 단독 퍼블리싱 — 이민재단(60) · 싸템(69) · 양구수목원(43) · 사회보장정보원(18) · 환경책임투자 플랫폼 · 코네틱",
      "PC·모바일 시안과 퍼블리싱 산출물을 페이지 단위 마크업 리스트로 추적 — 진행 상태·갱신일·메뉴 경로까지 한 표에서 관리",
      "웹 접근성(A11Y) 개선과 크로스 브라우징 대응을 상시 요건으로 처리",
      "디자인 시안 · 반응형 마크업 · PHP 템플릿 연동 · 유지보수를 한 사람이 연결해 수행",
    ],
    links: [
      { label: "이민재단 마크업 리스트", url: "http://121.167.147.150:8087/kiiptest/html_list.html" },
      { label: "양구수목원 마크업 리스트", url: "http://121.167.147.150:8087/yg_eco/html_list.html" },
      { label: "사회보장정보원 마크업 리스트", url: "http://121.167.147.150:8087/ssis/html_list.html" },
      { label: "환경책임투자 마크업 리스트", url: "http://121.167.147.150:8087/gmi/html_list.html" },
      { label: "싸템 마크업 리스트", url: "http://121.167.147.150:8087/ssatem/html_list.html" },
      { label: "코네틱 마크업 리스트", url: "http://121.167.147.150:8087/konetic/html_list.html" },
    ],
    sections: [
      {
        title: "기관별 산출물",
        items: [
          "한국이민재단 KIIP — 회원·평가안내·평가접수·알림마당·마이페이지·구술감독관 등 9개 대분류 60페이지",
          "양구수목원 — 이용안내·추천코스·아카이브·체험학습·수목원 이야기·마이페이지 등 9개 대분류 43페이지",
          "싸템 — 판매·구매·채팅·회원·마이페이지 등 10개 대분류 69페이지의 거래 플랫폼",
          "사회보장정보원 — 홈·통합검색·소식알림·발간자료 등 5개 대분류 18페이지",
          "환경책임투자 종합플랫폼 사용자 화면, 코네틱 메인",
        ],
      },
      {
        title: "일하는 방식",
        items: [
          "페이지마다 PC·모바일 시안, 퍼블리싱 산출물, 진행 상태, 갱신일, 메뉴 경로를 한 표로 묶어 관리",
          "마크업은 전량 직접 작업하고, 리스트의 담당 표기는 후반 QA 검수자를 구분하기 위한 것",
          "공공기관 특성상 요구되는 웹 접근성과 구형 브라우저 대응을 마크업 단계에서 반영",
        ],
      },
    ],
  },
  {
    slug: "cosmostation-extension",
    rank: 13,
    title: "Cosmostation 크롬 익스텐션",
    subtitle: "멀티체인 지갑 — 토큰 검색 페이지 · 체인 추가",
    category: "company",
    company: "스탬퍼 (Cosmostation)",
    period: "2022.10 — 2022.12",
    role: "프론트엔드 개발 인턴 (토큰 검색 · 체인 추가)",
    description:
      "오픈소스 멀티체인 지갑에 Kujira 체인을 추가하고 ERC20·CW20 토큰 검색 페이지를 만들며, 리뷰를 반복해 반영한 첫 실무 경험",
    overview:
      "Cosmos·Ethereum 등 여러 체인을 지원하는 오픈소스 크롬 익스텐션 지갑입니다. 인턴으로 참여해 티켓 단위로 기능을 맡았고, 신규 체인(Kujira) 추가와 토큰 검색 페이지 제작을 담당했습니다. 여기서 처음으로 '동작하는 코드'와 '리뷰를 통과하는 코드'가 다르다는 걸 체감했습니다 — 같은 기능을 리뷰 코멘트에 따라 여러 번 다시 올렸고, 그 과정에서 디바운스 처리와 상태 흐름을 손보며 검색 입력의 반응을 개선했습니다.",
    techs: ["react", "typescript", "redux", "emotion", "webpack", "i18n"],
    links: [
      { label: "GitHub", url: "https://github.com/xeunnie/Internship_Fork_Code" },
    ],
    highlights: [
      "Kujira 체인 추가 — 체인 상수·심볼 에셋·체인 목록 등록까지 신규 체인 온보딩 전 과정",
      "이더리움 ERC20 토큰 리스트·검색 페이지 제작 — entry/layout/styled 구조와 TokenItem 컴포넌트 구성",
      "Cosmos CW20 토큰 검색 페이지 — 특정 체인 전용에서 전 체인 지원으로 확장",
      "검색 입력에 디바운스 도입 — 입력마다 발생하던 조회를 줄이고, 직접 만든 로직을 공통 useDebounce 훅으로 정리",
      "코드 리뷰 반영을 전제로 한 개발 — 같은 기능을 리뷰 코멘트에 따라 반복해 다시 올림",
      "한국어·영어 번역 리소스 추가 — 신규 화면의 i18n 대응",
    ],
    sections: [
      {
        title: "체인 · 토큰 기능",
        items: [
          "Kujira 체인을 익스텐션에 추가 — 체인 정의 상수, 체인 목록 등록, 심볼 이미지까지 함께 반영",
          "이더리움 ERC20 토큰 리스트 페이지 제작 — 검색 화면 구조(entry·layout·styled)와 개별 토큰 아이템 컴포넌트를 나눠 구성",
          "Cosmos CW20 토큰 검색 화면을 만들고, 처음 특정 체인 대상이던 것을 전 체인 지원으로 확장",
          "라우트 상수와 라우터에 새 화면을 연결하고, 지갑 화면의 토큰·코인 목록과 이어지게 함",
        ],
      },
      {
        title: "성능과 리뷰",
        items: [
          "검색 입력에 디바운스를 적용하고 useCallback으로 감싸 불필요한 조회와 재생성을 줄임",
          "직접 만든 디바운스 로직을 이후 공통 useDebounce 훅으로 정리",
          "리뷰 코멘트를 반영한 커밋이 여러 차례 — 조건 판단 로직 단순화, 불필요한 로그·주석 제거, 스타일 정리",
          "신규 화면에 맞춰 한국어·영어 번역 리소스를 함께 추가",
        ],
      },
    ],
  },
  {
    slug: "argos",
    rank: 6,
    title: "Argos",
    subtitle: "AI 실시간 수업 분석 플랫폼",
    category: "personal",
    org: "코리아IT 바이브코딩 공모전",
    period: "2026.04",
    award: "제1회 코리아IT아카데미 바이브코딩 공모전(KIT 해커톤) 장려상 — 500팀 중 3위",
    awardImage: "/shot/award-argos.jpg",
    role: "Frontend 전담 (4개 역할 뷰 전체 구축)",
    description:
      "수강 전·수업 중·수업 후·운영까지 전 주기를 AI로 분석하는 플랫폼 — 프론트엔드를 전담해 약 16,000줄 기여, 500팀 중 3위(장려상)",
    overview:
      "학원의 수업 품질을 데이터로 보는 플랫폼입니다. 수강 신청 단계에서 AI가 지원자 역량을 사전 진단하고, 수업 중에는 실시간 이해도를 히트맵으로 보여주며, 수업 후에는 개인별 리포트를 만들고, 운영 차원에서는 이탈 위험을 조기에 감지합니다. 강사·수강생·원장·멘토 네 역할이 각각 다른 화면을 쓰기 때문에 같은 데이터를 네 가지 관점으로 다시 그려야 했고, 저는 이 프론트엔드 전체를 맡았습니다. 코리아IT아카데미가 주최한 제1회 바이브코딩 공모전(KIT 해커톤)에 출품해 500팀 중 3위(장려상)로 수상했습니다.",
    techs: ["nextjs", "react", "typescript", "supabase", "postgresql", "gemini", "zod", "tailwind", "radix", "recharts", "vitest", "playwright", "vercel"],
    shots: [
      {
        src: "/shot/argos-landing.jpg",
        caption:
          "서비스 소개 화면. 제1회 코리아IT아카데미 바이브코딩 공모전에서 500팀 중 3위(장려상)를 받은 작업입니다.",
      },
    ],
    links: [
      { label: "배포", url: "https://argo-project.vercel.app" },
      { label: "GitHub", url: "https://github.com/xeunnie/argo-project" },
      { label: "팀 조직", url: "https://github.com/mythoscodes" },
      { label: "대회 공식 페이지", url: "http://koreaacademyit.co.kr/2025/landing/kit_26.asp" },
    ],
    highlights: [
      "제1회 코리아IT아카데미 바이브코딩 공모전(KIT 해커톤) 장려상 — 500팀 중 3위",
      "프론트엔드 전담 — 약 16,000줄 기여, 강사·수강생·원장·멘토 4개 역할 뷰 전체 구축",
      "실시간 이해도 히트맵 — 퀴즈 응답이 들어올 때마다 개념별 이해/미이해를 색으로 시각화",
      "과목별 AI 역량 진단 — 정기 측정 결과를 레이더 차트로 시각화하고 역할별 화면에 연동",
      "원장 경영 대시보드 5탭 + 멘토 이탈 방지 뷰 시각화 전면 개편",
      "강사 AI 코칭 구조화 — 오개념 클러스터를 묶어 '어느 개념에서 몇 %가 약한지' 표출",
      "Next.js 16 App Router + Supabase Realtime + Gemini, Zod로 AI 응답까지 전수 검증",
    ],
    sections: [
      {
        title: "네 역할, 네 개의 화면",
        items: [
          "강사 — 세션 생성과 참여 코드 발급, 라이브 대시보드에서 실시간 이해도 히트맵과 AI 코칭 확인",
          "수강생 — 모바일에서 객관식·주관식 퀴즈에 실시간 응답, 개인 대시보드와 학습 리포트, 과목별 역량 진단",
          "원장 — 학원 전체 수업 품질, 반별 평균 이해도, 이탈 위험 감지, 과목별 수준 분포를 5개 탭으로 구성",
          "멘토 — 이탈 위험 레이더와 상담 브리핑을 보고 선제적으로 개입하는 뷰",
          "같은 데이터를 네 관점으로 다시 그려야 해, 화면별로 무엇을 강조하고 무엇을 접을지 기준을 나눔",
        ],
      },
      {
        title: "실시간과 AI",
        items: [
          "Supabase Realtime 구독으로 퀴즈 응답이 들어올 때마다 이해도 히트맵을 갱신",
          "양방향 피드백 루프 — 보충 설명 후 재퀴즈를 돌려 이해도 변화(델타)를 시각화",
          "AI 코칭 결과를 그대로 나열하지 않고 오개념 클러스터로 묶어 강사가 바로 행동할 수 있는 형태로 구조화",
          "Zod로 외부 입력뿐 아니라 AI 응답까지 전수 검증 — 모델이 형태를 흔들어도 화면이 깨지지 않게 함",
          "레이더 차트·추이 그래프 등 Recharts 기반 시각화를 역할별 화면에 재사용",
        ],
      },
      {
        title: "마감 품질",
        items: [
          "심사 동선을 고려한 랜딩 페이지와 원클릭 테스트 계정 — 심사위원이 6개 역할 계정을 바로 체험",
          "데모 시드 데이터 구성 — 이탈 위험·정체·향상 패턴을 가진 수강생을 미리 심어 시나리오가 보이게 함",
          "Toast 피드백과 SEO 메타 정리, 미사용 데이터까지 전수 표출해 빈 화면을 없앰",
          "팀 차원에서 E2E 1,146건과 15화면 97건 테스트케이스, 73페이지 위키를 함께 남김",
        ],
      },
    ],
  },
  {
    slug: "boot-up",
    minor: true,
    title: "BOOT_UP",
    subtitle: "부트캠프 수강생 커뮤니티 — 백엔드 · 프론트 · DevOps 전 단계",
    category: "personal",
    org: "한화시스템 Beyond SW Camp",
    period: "2024.07 — 2024.08",
    role: "Backend · Frontend(Vue) · DevOps (팀 5인, 단계별 역할 전환)",
    description:
      "같은 서비스를 백엔드 → 프론트 → 배포까지 세 번에 나눠 만든 캠프 프로젝트 — 프론트 단계에서는 커밋 54건, DevOps 단계는 혼자 맡음",
    overview:
      "한화시스템 BEYOND SW캠프 수강생 전용 커뮤니티 플랫폼입니다. 캠프가 디스코드만 쓰고 있어 기수 간·수료자 간 소통이 끊긴다는 문제에서 출발해, 커뮤니티·공지사항·출결 알림·스터디룸 예약을 하나로 묶었습니다. 특별한 점은 같은 서비스를 단계별로 다시 만들었다는 것입니다 — 2차에서 Spring 백엔드를, 3차에서 Vue 프론트를, 마지막에 Docker·GitHub Actions 배포를 붙였습니다. 덕분에 하나의 도메인을 서버·화면·배포 세 시점에서 보게 됐고, 이후 프로젝트에서 백엔드와 이야기할 때의 기준이 여기서 생겼습니다.",
    techs: ["java", "springboot", "querydsl", "gradle", "vue", "javascript", "websocket", "mysql", "docker", "github"],
    links: [
      { label: "GitHub", url: "https://github.com/xeunnie/be06-2nd-Dopamines-BOOT_UP" },
      { label: "프론트엔드 레포", url: "https://github.com/xeunnie/be06-3rd-Dopamines-BOOT_UP" },
      { label: "DevOps 레포", url: "https://github.com/xeunnie/beyond-bootcamp-devops" },
      { label: "백엔드 Wiki", url: "https://github.com/beyond-sw-camp/be06-2nd-Dopamines-BOOT_UP/wiki" },
      { label: "프론트엔드 Wiki", url: "https://github.com/beyond-sw-camp/be06-3rd-Dopamines-BOOT_UP/wiki" },
      { label: "팀 조직", url: "https://github.com/DopaminesBeyond" },
    ],
    highlights: [
      "같은 서비스를 3단계로 — 2차 Spring 백엔드 → 3차 Vue 프론트 → DevOps 배포까지 역할을 바꿔가며 수행",
      "프론트 단계 커밋 54건 — 통합검색, 마켓 찜·검색, 댓글·대댓글, 게시글 상세, 공지사항, 메인",
      "백엔드에서 QueryDSL 동적 쿼리와 검색 기능 구현",
      "전역 예외처리와 BaseResponse 성공·에러 코드 체계를 세워 응답 형태를 팀 전체가 공유",
      "DevOps 단계 — GitHub Actions(JDK 17 + Gradle) → Docker 이미지 빌드 → docker-compose로 백엔드·프론트 동시 기동",
      "PR·이슈 템플릿과 코드 컨벤션을 정해 5인 팀의 PR 기반 협업 규칙을 문서화",
    ],
    sections: [
      {
        title: "2차 — Spring 백엔드",
        items: [
          "QueryDSL로 동적 쿼리를 구성해 게시판 검색 기능 구현",
          "전역 예외처리 메시지와 BaseResponse 성공·에러 코드 체계를 세워, 화면이 응답 형태를 추측하지 않게 함",
          "공지사항(NOTICE) 도메인의 엔티티·컨트롤러 구현과 반환 타입 정리",
          "스터디룸 좌석 예약의 시간 타입을 재정의해 예약 충돌 판단을 단순화",
          "feature 브랜치 + PR 기반 협업 — PR·이슈 템플릿을 직접 작성해 팀 규칙으로 고정",
        ],
      },
      {
        title: "3차 — Vue 프론트엔드 (커밋 54건)",
        items: [
          "커뮤니티 게시판 전반 — 목록·상세·작성·수정, 댓글과 대댓글 조회를 화면에 연결",
          "통합검색 구현 — 게시판·마켓·공지사항을 가로지르는 검색 화면 구성",
          "마켓 찜하기와 마켓 검색 완성, 메인 페이지·공지사항 화면 정리",
          "회원(User)·프로젝트 게시판·스터디 자리 예약 화면과 공통 레이아웃 작업",
          "JWT를 HttpOnly로 다루고 액세스 토큰 만료를 1시간으로 두는 등, 팀 위키에 정리된 인증 정책에 맞춰 화면을 연결",
        ],
      },
      {
        title: "DevOps — 단독 수행",
        items: [
          "GitHub Actions 워크플로 작성 — JDK 17 설정, Gradle 셋업, gradlew 권한 부여 후 Docker 이미지 빌드까지 자동화",
          "openjdk:17 기반 Dockerfile로 Spring 애플리케이션 이미지화 (JAR을 빌드 인자로 주입)",
          "docker-compose로 백엔드(8080)와 프론트엔드(3000)를 함께 띄우는 구성 작성",
          "main 브랜치 push를 트리거로 두어 코드가 올라가면 빌드가 도는 상태까지 만듦",
        ],
      },
      {
        title: "팀 문서화",
        items: [
          "백엔드 위키 8편 — API 명세(Swagger), 시퀀스 다이어그램, 기능 테스트, 코드 컨벤션, 시스템·소프트웨어 아키텍처, 성능 개선",
          "프론트 위키 5편 — 시스템 아키텍처, 주요 적용 기술(JWT·WebSocket/STOMP·Vue 선택 근거), 상세 기능, 코드 컨벤션",
          "기술 선택에 근거를 남기는 방식 — 'Vue를 왜 골랐는가'를 React와 비교해 팀의 상황(JS 숙련도, 남은 기간) 기준으로 서술",
        ],
      },
    ],
  },
  {
    slug: "calit",
    minor: true,
    org: "한화시스템 Beyond SW Camp",
    title: "CalIT",
    subtitle: "개발자를 위한 대시보드 기반 스크럼 관리 시스템",
    category: "personal",
    period: "2024.08 — 2024.10",
    role: "프로젝트 팀장 · Frontend 단독 개발 (FE 1 / BE 4)",
    description:
      "프론트를 맡아 100+ API 연동, Kafka 채팅·Jenkins CI/CD·Prometheus 모니터링까지 풀스택 기여",
    overview:
      "한화시스템 Beyond SW 풀스택 부트캠프 최종 프로젝트입니다. Vue 기반의 대시보드로 스크럼 관리, 실시간 알림, 채팅 기능을 통합했습니다. 프론트엔드를 맡아 개발하며 100개 이상의 API를 연동하고, 렌더링 최소화 전략과 Pinia 상태 관리를 적용해 대규모 코드베이스를 안정적으로 유지했습니다. Jenkins CI/CD 파이프라인 구축, Kafka 기반 채팅 시스템 구현, Prometheus + Grafana 모니터링 등 백엔드 협업에도 적극 기여했습니다.",
    techs: ["vue", "javascript", "pinia", "springboot", "kafka", "redis", "mariadb", "jenkins", "kubernetes", "prometheus", "grafana"],
    shots: [
      {
        src: "/shot/calit-kanban.jpg",
        caption:
          "칸반 보드 — 할 일·진행 중·완료로 카드를 옮기고, 같은 데이터를 리스트와 타임라인으로도 봅니다. 담당자와 마감일이 카드에 함께 붙습니다.",
      },
    ],
    highlights: [
      "프론트엔드 구현 — 100개 이상 API 연동 및 비동기 처리",
      "Pinia 상태 관리로 전역 상태 효율화, 불필요한 리렌더링 방지",
      "Kafka 기반 실시간 채팅 시스템 구현 지원",
      "Jenkins CI/CD 파이프라인 구축 지원",
      "Prometheus + Grafana 모니터링 시스템 구축 지원",
      "n8n 기반 AI 챗봇 시나리오 작성 — 자동화 업무 알림",
    ],
    links: [
      { label: "배포", url: "https://calit.netlify.app/" },
      { label: "GitHub", url: "https://github.com/beyond-sw-camp/be06-fin-MINIONZ-CalIT" },
      { label: "팀 조직", url: "https://github.com/MINIONZorg" },
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
    minor: true,
    org: "코드잇 프론트엔드 심화",
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
      { label: "GitHub", url: "https://github.com/DoITFronts/Frontend" },
      { label: "조직 전체", url: "https://github.com/DoITFronts" },
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
    minor: true,
    org: "Google 삐약톤 해커톤",
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
      { label: "GitHub", url: "https://github.com/chickHackathon/Frontend" },
      { label: "조직 전체", url: "https://github.com/chickHackathon" },
    ],
    sections: [
      {
        title: "프로젝트 기획 & 개발",
        items: [
          "20시간 집중 개발을 통해 MVP를 완성하여 해커톤 기간 내 배포",
          "스프링 백엔드 구조를 기반으로 API 설계, 팀원 간 협업 조율",
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
    minor: true,
    org: "Kubernetes & Docker 스터디",
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
      { label: "GitHub", url: "https://github.com/ChatFlowProject/chatter" },
      { label: "조직 전체", url: "https://github.com/ChatFlowProject" },
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
