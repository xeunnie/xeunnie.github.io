import { BadgeKey } from "./badges";
import { EDUCATION } from "./education";

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
    chapter: "프로덕션 서비스 · 제품 단위 책임",
    summary:
      "골프장에서 매일 실사용되는 서비스의 제품 단위 책임자로 일하고 있습니다. GPS 좌표를 코스맵 픽셀로 변환하고, 움직이는 카트 위에서도 정확히 동작하는 터치 UX를 설계했으며, F&B 제품 전반과 React Native 앱을 스토어 제출까지 각각 단독으로 진행했습니다. 사설망 프린터, 망분리 단말, 스토어 심사처럼 브라우저 밖의 조건까지 고려해야 했습니다.",
    details: [
      "Vgolf 경기관제 태블릿 앱 — 500ms GPS 폴링 데이터를 Proj4로 코스맵 픽셀 좌표에 매핑, 홀 폴리곤 지오펜싱으로 진행 홀 자동 전환",
      "움직이는 카트 환경의 터치 UX — 진동·속도 변수를 고려해 useTap(30px 허용 임계값), Ghost Click 방지, 더블클릭 가드를 설계",
      "VGOLF F&B 제품 전반 단독 개발 (9개월 · 460+커밋) — 주문·관리자·주방 영수증 출력·매장 사이니지 서브시스템을 설계·구현",
      "ESC/POS 열전사 프린팅 직접 구현 — 클라우드 정적배포 앱과 매장 사설망(192.168.x.x) 프린터가 닿지 못하는 구조를 로컬 에이전트 경유 raw TCP 브릿지로 해결",
      "오프라인 부팅 사이니지(DID) — 망분리 미니 PC가 네트워크 없이 부팅해도 화면이 뜨도록 서비스워커 문서 프리캐시 설계, pdf.js canvas 직접 렌더로 오프라인 대응",
      "24시간 무인 운영 견고성 — 사이니지는 SSE 구독, 주문 화면은 폴링 + 야간모드 상태머신(off/30s/5s) + 연속에러 서킷브레이커",
      "네트워크 불안정 환경 대응 — ConsecutiveErrorGuard로 연속 에러 시 폴링 자동 중단, Recoil Persist로 앱 재시작 시 서버 왕복 없이 복원",
      "프로덕션 마감 품질 — 중복 주문 방지, Pub/Sub 에러 큐잉, 엣지 케이스 처리를 통해 실사용 환경 안정성 확보",
      "VGOLF 모바일 앱(React Native) 단독 개발 — 2개월 487커밋, FSD 5레이어 구조와 3겹 에러 안전망을 세우고 Expo 없이 네이티브 설정·릴리스 서명·Play Console 제출까지 수행",
      "zod 2층 스키마(런타임·엄격) 기반 실서버 계약 테스트 도입 — 서버가 par: null을 주며 모든 홀이 더블보기로 표시되던 무증상 오류를 화면 반영 전에 검출",
      "API 응답 불일치 12건을 엔드포인트·기대값·앱 영향·P0/P1 표로 문서화해 백엔드에 전달 — 인증 에러 코드 세분화와 retryAfterSeconds 추가를 하위 호환 형태로 제안",
      "VGOLF 스코어카드 인수인계 후 단독 유지보수 — 카카오·네이버 인앱브라우저에서 이미지 저장이 되지 않던 문제를 devicePixelRatio 스케일과 저장 오버레이로 해결하고 360줄 문서로 남김",
      "VGOLF 경기관제 PM30 이관 — 태블릿·모바일 통합 앱에서 모바일만 분리하고 Recoil을 zustand로 이행. 상태 저장 1회 7.89ms → 0.058ms, 진입 번들 −56%, 테스트 0 → 162개",
      "Argos(AI 실시간 수업 분석 플랫폼) 프론트엔드 전담 — 제1회 코리아IT아카데미 바이브코딩 공모전(KIT 해커톤) 500팀 중 3위(장려상)",
    ],
    projects: ["Vgolf 경기관제", "VGOLF F&B", "VGOLF 앱 (React Native)", "VGOLF 스코어카드", "VGOLF 경기관제 PM30"],
    techs: ["react", "reactnative", "typescript", "nextjs", "vite", "recoil", "reactquery", "zustand", "zod", "vitest", "pwa", "workbox", "sse", "exceljs", "i18n", "indexeddb"],
  },
  {
    company: "플럭시티",
    team: "DX 기술팀",
    role: "개발자 (프론트엔드, 백엔드)",
    period: "2025.04 — 2025.11",
    type: "full-time",
    chapter: "3D·실시간 관제 SI · 폐쇄망 현장 배포",
    summary:
      "3D·지도 기반 관제 SI의 프론트엔드 책임자로 일했습니다. 그 전 1년간 부트캠프와 스터디에서 익힌 것을 실무에서 본격적으로 쓴 곳입니다. 폐쇄망 현장에서 WebRTC CCTV를 운영까지 올렸고, 프로젝트마다 복사되던 컴포넌트와 API 호출을 모노레포 패키지로 옮겼습니다.",
    details: [
      "3D 역사 관제 — 자체 엔진으로 GLTF 모델을 띄우고 층별 전환·POI·장치 상태를 하나의 실시간 관제 화면에 통합",
      "다중 CCTV 동시 스트리밍과 ICE 상태 기반 재연결 로직 구현",
      "부산 도시철도 통합 관제 — 협업처 관제 플랫폼 API 스펙에 맞춰 시설물 9종(조명·셔터·CCTV·화재감지·엘리베이터 등)과 제어 인터페이스를 타입으로 고정해 연결",
      "WebRTC CCTV — RTCPeerConnection recvonly 트랜시버로 게이트웨이와 SDP를 교환해 RTSP 카메라를 브라우저에서 재생, 현장 운영 적용",
      "현장 대응 — 지하철 현장에서 배포 후 즉시 발생하는 실시간 버그·데이터 오류를 직접 디버깅·수정·재배포",
      "모노레포 디자인 시스템(plug-platform) — 머지 PR 17건 · +13,391/−9,701줄. @plug/ui 컴포넌트를 Storybook과 함께 패키지화하고 atom/molecule 구조로 재편",
      "공통 API 계층 — fetch를 ky로 리팩토링해 인터셉터·에러 처리·prefix URL을 수렴하고, useApi/useSWRApi 훅과 요청·응답 타입 체계를 api-hooks 패키지로 분리",
      "도메인 서비스 공통화 — auth·user·role·building·file 서비스를 common-services로 이관해 프로젝트 간 중복 제거",
      "Plug Atlas(Cesium 실외 지도 IoT 관제) — 머지 PR 11건 · +8,239/−2,227줄. 센서 종류별 이벤트 조건 관리부터 조회·통계·실시간 알람·조치 이력까지 이벤트 도메인 전반을 구현",
      "다수 관제 SI (탄천·성남 AIOT·GS 인증) — 프로젝트별 폐쇄망·내부망 환경에 맞는 배포 전략 수립 및 서버 프록시 보안 설정",
    ],
    projects: [
      "부산 도시철도 통합 관제(사상하단선)",
      "Plug Platform (모노레포 디자인 시스템)", "Plug Atlas (Cesium IoT 관제)",
      "탄천 오염도 모니터링", "GS 인증 플랫폼", "성남 AIOT 관제",
    ],
    techs: ["react", "typescript", "threejs", "webgl", "cesium", "webrtc", "sse", "websocket", "webview", "storybook", "zustand", "ky", "pnpm"],
  },
  {
    company: "웹비즈 크리에이티브",
    role: "프론트엔드 개발자 · 웹디자이너 · 퍼블리셔",
    period: "2023.11 — 2024.02",
    type: "full-time",
    chapter: "공공기관 SI · 디자인부터 퍼블리싱까지",
    summary:
      "공공기관 SI를 맡았습니다. 디자인 시안부터 반응형 퍼블리싱, PHP 연동까지 혼자 진행하는 일이었고, 6개 기관 약 200페이지를 일정에 맞춰 넘겼습니다. 쓸 수 있는 기술은 제한적이었지만 마감과 접근성 기준을 지키는 법을 익혔습니다.",
    details: [
      "공공기관 SI 전 과정 — 디자인 시안, 반응형 퍼블리싱, PHP 템플릿 연동까지 한 사람이 담당",
      "리픽 — Vue.js + TypeScript 컴포넌트 설계, Pinia 상태 관리, Storybook UI 문서화로 디자이너·백엔드와의 협업 접점을 체계화",
      "인천교육청 교육이음 — XD 기반 교육 플랫폼 UI/UX 디자인 + 반응형 퍼블리싱을 맡아 수행",
      "공공기관 6개 사이트 약 200페이지 — 이민재단(60) · 싸템(69) · 양구수목원(43) · 사회보장정보원(18) 등의 마크업을 전량 단독 수행",
      "페이지별 PC·모바일 시안·퍼블리싱 산출물·진행 상태를 마크업 리스트로 추적 — 후반 QA 검수 담당까지 표에서 함께 관리",
      "레거시 코드의 웹 접근성(A11Y) 개선 및 크로스 브라우징 대응",
    ],
    projects: [
      "리픽", "인천교육청 교육이음", "공공기관 웹 퍼블리싱",
      "한국이민재단", "양구 수목원", "싸템", "사회보장정보원", "환경책임투자 플랫폼", "코네틱", "한마음청소년수련원",
    ],
    techs: ["vue", "typescript", "pinia", "storybook", "html", "css", "javascript", "php", "figma"],
  },
  {
    company: "스탬퍼 (Cosmostation)",
    role: "프론트엔드 개발 인턴",
    period: "2022.09 — 2022.12",
    type: "intern",
    chapter: "첫 실무 코드베이스 · 코드 리뷰",
    summary:
      "블록체인 생태계에서 React·TypeScript를 실무에 적용한 첫 현장입니다. 티켓 단위로 기능을 맡아 신규 체인 추가와 토큰 검색 페이지를 만들었고, 같은 기능을 리뷰 코멘트에 따라 여러 번 다시 올리며 '동작하는 코드'와 '리뷰를 통과하는 코드'의 차이를 배웠습니다.",
    details: [
      "Kujira 체인 추가 — 체인 상수·심볼 에셋·체인 목록 등록까지 신규 체인 온보딩 전 과정을 티켓 단위로 담당",
      "ERC20·CW20 토큰 검색 페이지 제작 — 특정 체인 전용이던 CW20 검색을 전 체인 지원으로 확장",
      "검색 입력 디바운스 처리 — 입력마다 발생하던 조회를 줄이고, 직접 만든 로직을 공통 useDebounce 훅으로 정리",
      "리뷰 반영 반복 — 조건 판단 단순화, 불필요한 로그·주석 제거, 스타일 정리를 코멘트에 따라 여러 차례 다시 올림",
      "Mintscan 블록체인 대시보드 — 아토믹 컴포넌트 설계와 SWR 캐싱 적용",
      "Confluence 기반 기술 문서화 문화 주도 — 퇴근 후 동료들과 자발적 스터디 운영, 일일 학습 기록 공유",
    ],
    projects: ["Cosmostation 크롬 익스텐션", "Mintscan Dashboard"],
    techs: ["react", "typescript", "svelte", "redux", "swr", "emotion", "webpack", "storybook", "i18n", "confluence"],
  },
  {
    company: "아주대학교 커뮤니케이션팀",
    role: "웹 개발 장학인턴",
    period: "2021.08 — 2022.03",
    type: "intern",
    chapter: "첫 개발 업무 · 교내 웹사이트",
    summary:
      "비개발 조직의 유일한 개발 담당이라 문제를 혼자 찾아 해결해야 했습니다. 직접 디자인해 올린 팝업의 반응을 Google Analytics로 확인하며, 만든 결과를 데이터로 확인하는 습관이 생겼습니다.",
    details: [
      "교내 공식 웹사이트 유지보수 — 중복된 HTML 구조를 통합하고, CSS 네이밍 체계를 정리해 유지보수성 확보",
      "팝업 UI 직접 디자인·구현 후 Google Analytics로 반응 확인 — 코드가 사용자 행동에 미치는 영향을 체감",
      "레거시 리팩토링 — 불필요한 JS 로직 제거로 페이지 로딩 속도 개선 및 런타임 오류 감소",
      "계약 종료 후에도 외주 형태로 지속 유지보수 담당 — 신뢰 기반의 장기 협업 관계 유지",
    ],
    techs: ["html", "css", "javascript", "jquery"],
  },
];

/**
 * 실제로 근무한 개월 수. 기간이 겹치면 한 번만 센다.
 * "첫 인턴부터 지금까지"가 아니라 "실제로 일한 달"만 세기 위한 것 —
 * 부트캠프 기간처럼 재직하지 않은 구간은 빠진다.
 */
export function workedMonths(types: Career["type"][] = ["full-time", "intern"]): number {
  const toIdx = (v: string) => {
    const m = v.match(/(\d{4})\.(\d{1,2})/);
    if (!m) return null;
    return Number(m[1]) * 12 + Number(m[2]);
  };
  const now = new Date();
  const nowIdx = now.getFullYear() * 12 + now.getMonth() + 1;

  const months = new Set<number>();
  for (const c of CAREERS) {
    if (!types.includes(c.type)) continue;
    const [rawStart, rawEnd = ""] = c.period.split("—").map((v) => v.trim());
    const start = toIdx(rawStart);
    if (start === null) continue;
    const end = rawEnd.includes("현재") ? nowIdx : toIdx(rawEnd) ?? start;
    for (let i = start; i <= end; i++) months.add(i);
  }
  return months.size;
}

/** "2년 10개월" 형태로 */
export function formatMonths(total: number): string {
  const y = Math.floor(total / 12);
  const m = total % 12;
  if (y === 0) return `${m}개월`;
  return m === 0 ? `${y}년` : `${y}년 ${m}개월`;
}

/**
 * 재직 + 교육 과정을 합친 "개발에 몰입한 기간".
 * 실무 경력과는 따로 보여준다 — 부트캠프·과정도 손을 놓고 있던 시간은 아니기 때문.
 */
export function devMonths(): number {
  const toIdx = (v: string) => {
    const m = v.match(/(\d{4})\.(\d{1,2})/);
    return m ? Number(m[1]) * 12 + Number(m[2]) : null;
  };
  const now = new Date();
  const nowIdx = now.getFullYear() * 12 + now.getMonth() + 1;
  const months = new Set<number>();

  const add = (period: string) => {
    const [rawStart, rawEnd = ""] = period.split("—").map((v) => v.trim());
    const start = toIdx(rawStart);
    if (start === null) return;
    const end = rawEnd.includes("현재") ? nowIdx : toIdx(rawEnd) ?? start;
    for (let i = start; i <= end; i++) months.add(i);
  };

  CAREERS.forEach((c) => add(c.period));
  EDUCATION.forEach((e) => add(e.period));
  return months.size;
}
