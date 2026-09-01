import { BadgeKey } from "./badges";

/**
 * 일대기 — 2021년 첫 인턴십부터 지금까지를 해마다 한 장(章)으로 끊은 것.
 * GROWTH 가 "능력이 어떻게 쌓였는가"를 본다면, 여기는 "무슨 일이 있었는가"를 시간 순으로 본다.
 */

export interface ChronicleMoment {
  when: string;
  what: string;
}

export interface ChronicleYear {
  year: string;
  /** 그 해를 한 단어로 */
  label: string;
  /** 그 해를 한 문장으로 */
  headline: string;
  /** 서사 */
  story: string[];
  moments: ChronicleMoment[];
  /** 그 해에 한 프로젝트 slug */
  projects: string[];
  /** 그 해가 남긴 것 */
  turning: string;
  techs: BadgeKey[];
}

export const CHRONICLE: ChronicleYear[] = [
  {
    year: "2021",
    label: "출발",
    headline: "코드가 사람의 행동을 바꾼다는 걸 처음 봤다",
    story: [
      "아주대학교 커뮤니케이션팀에서 웹 개발 장학인턴으로 일했습니다. 비개발 조직이라 개발 담당은 저 하나였고, 교내 공식 웹사이트를 혼자 맡았습니다.",
      "가진 건 HTML·CSS·jQuery뿐이었고 구조라는 개념도 없었습니다. 그런데 직접 디자인해 올린 팝업의 클릭률이 눈에 띄게 오르는 걸 보면서, 내가 고친 코드가 실제 사용자에게 닿는다는 걸 처음 알았습니다. 계속 개발을 하게 만든 건 그 감각이었습니다.",
    ],
    moments: [
      { when: "2021.08", what: "아주대학교 커뮤니케이션팀 웹 개발 장학인턴 시작" },
      { when: "2021.09 —", what: "교내 공식 웹사이트 유지보수 — 중복 HTML 구조 통합, CSS 네이밍 체계 정리" },
      { when: "2021.11", what: "팝업 UI 직접 디자인·구현 후 Google Analytics로 반응 확인" },
      { when: "2022.03", what: "계약 종료 후에도 외주 형태로 유지보수 지속" },
    ],
    projects: [],
    turning: "프레임워크도 구조도 없었지만, 코드가 사용자에게 닿는다는 감각을 얻었습니다. 여기가 시작점입니다.",
    techs: ["html", "css", "javascript", "jquery"],
  },
  {
    year: "2022",
    label: "기준",
    headline: "혼자 쓰던 코드에서, 남이 읽는 코드로",
    story: [
      "블록체인 지갑을 만드는 회사에서 인턴으로 처음 실무 코드베이스를 만졌습니다. React와 TypeScript로 돌아가는 오픈소스 크롬 익스텐션이었고, 저는 티켓 단위로 기능을 받아 작업했습니다.",
      "가장 크게 배운 건 기술이 아니라 기준이었습니다. 동작하는 코드를 올려도 머지되지 않았습니다. 리뷰 코멘트를 받아 같은 기능을 여러 번 다시 올리면서, 조건 판단을 단순하게 만들고 필요 없는 것을 걷어내는 눈이 생겼습니다.",
    ],
    moments: [
      { when: "2022.08", what: "스탬퍼(Cosmostation) 프론트엔드 개발 인턴 시작" },
      { when: "2022.10", what: "Kujira 체인 추가 — 체인 상수·에셋·목록 등록까지 신규 체인 온보딩 전 과정" },
      { when: "2022.11", what: "이더리움 ERC20 토큰 리스트·검색 페이지 제작" },
      { when: "2022.12", what: "CW20 검색을 전 체인 지원으로 확장, 검색 입력 디바운스 도입" },
    ],
    projects: ["cosmostation-extension"],
    turning: "리뷰를 통과해야 코드가 살아남는다는 것. 이때 생긴 기준이 이후 모든 코드의 바닥이 됐습니다.",
    techs: ["react", "typescript", "redux", "emotion", "webpack"],
  },
  {
    year: "2023",
    label: "폭",
    headline: "디자인부터 마크업까지, 화면 전체를 혼자 책임지다",
    story: [
      "공공기관 웹사이트를 만드는 회사로 옮겼습니다. 디자인 시안을 받는 게 아니라 직접 그리고, 그걸 반응형 마크업까지 혼자 끌고 가는 일이었습니다.",
      "약 200개 페이지를 손으로 겪었습니다. 지루한 반복처럼 보이지만, 이만큼 많이 만들어 보지 않으면 '무엇을 공통으로 묶어야 하고 무엇은 그냥 두어야 하는지'를 감으로 알 수 없습니다. 나중에 디자인 시스템을 설계할 때 이때의 감각을 그대로 썼습니다.",
    ],
    moments: [
      { when: "2023.11", what: "웹비즈 크리에이티브 입사 — 공공기관 SI 디자인 · 퍼블리싱 · PHP 연동" },
      { when: "2023.11 —", what: "이민재단·싸템·양구수목원·사회보장정보원 등 6개 기관 약 200페이지 단독 퍼블리싱" },
      { when: "2023.12", what: "리픽 — Vue·TypeScript 컴포넌트 설계와 Pinia 상태 관리, Storybook 문서화" },
    ],
    projects: ["public-sector-publishing"],
    turning: "많이 만들어 본 사람만 아는 것이 있습니다. 공통화의 기준은 이론이 아니라 반복에서 나왔습니다.",
    techs: ["vue", "typescript", "pinia", "storybook", "html", "css", "php", "figma"],
  },
  {
    year: "2024",
    label: "확장",
    headline: "서버와 배포까지 내려가 본 해",
    story: [
      "프론트만으로는 부족하다고 느껴 백엔드 부트캠프에 들어갔습니다. 같은 서비스를 세 번 만들었습니다 — BOOT_UP을 Spring 백엔드로, 다음엔 Vue 프론트로, 마지막엔 Docker와 GitHub Actions로 배포까지.",
      "덕분에 하나의 도메인을 서버·화면·배포 세 시점에서 보게 됐습니다. 프론트가 백엔드에게 무엇을 요구해야 하는지 감이 생긴 게 이때고, 그 감각이 2년 뒤 API 계약 요청서를 쓰는 일로 이어집니다.",
      "매주 회고를 velog에 남겼습니다. 지금 다시 읽으면 그때 무엇을 몰랐는지가 그대로 보입니다.",
    ],
    moments: [
      { when: "2024.04", what: "한화시스템 BEYOND SW Camp 6기(백엔드 트랙) 입과" },
      { when: "2024.07", what: "BOOT_UP 2차 — Spring·QueryDSL 백엔드, 전역 예외처리와 응답 코드 체계 구현" },
      { when: "2024.07", what: "99클럽 코테 스터디 참여, 주차 회고를 velog에 연재" },
      { when: "2024.08", what: "BOOT_UP 3차 — Vue 프론트엔드 팀 내 최다 기여(54커밋), DevOps 단계는 단독 수행" },
      { when: "2024.08", what: "CalIT — 팀장으로 프론트 단독 개발, 100개 이상 API 연동" },
      { when: "2024.10", what: "BEYOND SW Camp 수료, 프리코스 학생 대상 크로스 강의 진행" },
    ],
    projects: ["boot-up", "calit"],
    turning: "백엔드를 직접 짜 본 프론트 개발자가 됐습니다. 이후로 '서버가 이상해요'라고 말한 적이 없습니다.",
    techs: ["java", "springboot", "querydsl", "vue", "docker", "github", "jenkins", "kafka"],
  },
  {
    year: "2025",
    label: "심화",
    headline: "어려운 문제를 맡고, 남이 쓸 기반을 만들다",
    story: [
      "연초에는 프론트엔드 심화 과정과 스터디에서 개인 프로젝트를 몰아쳤습니다. 번개팅에서 CI/CD를 처음부터 끝까지 세우고, ChatFlow에서 Kubernetes 카나리 배포와 WebRTC를 붙이고, 해커톤에서 20시간 만에 MVP를 배포했습니다.",
      "4월에 플럭시티 DX 기술팀에 합류했습니다. 부산 도시철도 관제에서 협업처가 연동 코드도 문서도 주지 않아, WebRTC를 직접 조사해 가능한 구현 방식을 미리 준비해 간 뒤 현장에서 하나씩 대 보며 맞는 것을 찾았습니다. 그렇게 붙인 CCTV가 실제로 도는 것까지 봤고, 사무실에서 재현되지 않는 버그를 현장에서 고쳐 다시 올리는 일도 이때 배웠습니다.",
      "동시에 프로젝트마다 복사되던 컴포넌트와 API 호출을 모노레포 패키지로 걷어냈습니다. 내가 쓸 코드가 아니라 다른 사람이 가져다 쓸 코드를 만들기 시작한 해입니다.",
    ],
    moments: [
      { when: "2025.01 — 03", what: "코드잇 프론트엔드 심화 우수 수료 · 번개팅, ChatFlow, PPIYO 연달아 완주" },
      { when: "2025.04", what: "플럭시티 DX 기술팀 입사" },
      { when: "2025.05 — 09", what: "부산 도시철도 통합 관제 — WebRTC CCTV 현장 운영까지 도달, 시설물 9종 API 연동" },
      { when: "2025.04 — 09", what: "Plug Platform — 디자인 시스템·공통 API 계층 모노레포화 (머지 PR 17건)" },
      { when: "2025.10 — 11", what: "Plug Atlas — Cesium 지도 IoT 관제의 이벤트·알람 도메인 전반 구현" },
      { when: "2025.11", what: "클라우드팀으로 이동 — VGOLF 프로덕션 서비스 합류" },
    ],
    projects: ["busan-metro", "plug-platform", "plug-atlas", "thunderting", "chatflow", "ppiyo"],
    turning: "화면을 만드는 사람에서 기반을 만드는 사람으로. 외부 스펙을 타입 계약으로 고정하는 습관도 여기서 생겼습니다.",
    techs: ["react", "typescript", "threejs", "cesium", "webrtc", "sse", "zustand", "storybook", "pnpm"],
  },
  {
    year: "2026",
    label: "책임",
    headline: "문제가 브라우저 밖으로 나갔다",
    story: [
      "골프장에서 매일 돌아가는 서비스를 맡으면서, 개발이 브라우저 안에서 끝나지 않는다는 걸 알게 됐습니다. 클라우드에 정적 배포된 웹앱이 매장 사설망 프린터와 닿지 못하는 문제를 로컬 에이전트 브릿지로 풀었고, 망분리된 미니 PC가 네트워크 없이 부팅해도 화면이 뜨도록 서비스워커를 설계했습니다.",
      "React Native 앱은 Expo 없이 네이티브 프로젝트를 직접 소유하며 릴리스 서명과 스토어 제출까지 혼자 끝냈습니다. zod 2층 계약 테스트로 서버가 par에 null을 주며 모든 홀이 더블보기로 표시되던 무증상 오류를 화면 반영 전에 잡았고, API 응답 불일치 12건을 영향·우선순위 표로 만들어 백엔드에 넘겼습니다.",
      "이 시기부터 막힌 지점을 Tistory에 정리하기 시작했습니다. 무인 단말에서 CDN을 못 쓰는 문제, 인앱브라우저의 blob URL 다운로드처럼 검색해도 답이 안 나오던 것들입니다.",
    ],
    moments: [
      { when: "2025.12 — 2026.08", what: "VGOLF F&B — ESC/POS 주방 프린팅, 오프라인 부팅 사이니지, WYSIWYG 편집기까지 단독 개발 (460+커밋)" },
      { when: "2026.04", what: "제1회 코리아IT아카데미 바이브코딩 공모전 500팀 중 3위(장려상) — Argos 프론트엔드 전담" },
      { when: "2026.06 — 08", what: "VGOLF 앱 — React Native 개발부터 Play Console 제출까지 단독 수행 (2개월 487커밋)" },
      { when: "2026.04 —", what: "Tistory에 기술 정리와 실무 트러블슈팅 연재 시작" },
    ],
    projects: ["vgolf-fnb", "vgolf-app", "argos", "vgolf"],
    turning: "하드웨어·네트워크·스토어 심사처럼 코드 바깥의 제약을 설계에 포함시키게 됐습니다. 되돌린 결정도 이유와 함께 남깁니다.",
    techs: ["reactnative", "nextjs", "typescript", "zod", "supabase", "workbox", "escpos", "ios", "android"],
  },
];
