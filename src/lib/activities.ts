import type { ProjectSection, ProjectShot } from "./projects";

export interface ActivityLink {
  label: string;
  url: string;
}

export interface Activity {
  /** 상세 페이지 주소 — /activity/[slug] */
  slug: string;
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
  /** 상세 페이지 첫머리 — 왜 시작했고 어떻게 굴러갔는지 */
  overview?: string;
  /** 상세 페이지 본문 — 주차별 주제, 운영 방식처럼 묶어서 보여 줄 것 */
  sections?: ProjectSection[];
  /** 이 활동에서 배운 것. 한 줄에 하나씩 */
  learned?: string[];
  /** 발표 자료·결과물 캡처. public/ 기준 경로 */
  shots?: ProjectShot[];
}

export const ACTIVITIES: Activity[] = [
  {
    slug: "gunbamz",
    name: "군밤즈 스터디",
    category: "dev",
    org: "FESI Study",
    period: "2025.01 — 2025.09",
    role: "스터디 팀장",
    active: false,
    overview:
      "사수 없이 일하는 프론트엔드 주니어들이 모여 만든 스터디입니다. 궁금했던 기술이나 실무에서 손대고 싶던 개선을 혼자 붙잡지 않고, 함께 제대로 파 보며 정당하게 성장하자는 마음으로 시작했습니다. 주제마다 이론과 실습을 나눠 맡고, 직접 만들어 측정하고 뜯어 본 결과를 레포 위키에 남긴 뒤 다 같이 리뷰했습니다.",
    highlights: [
      "스터디를 만들고 팀장을 맡음 — 회의를 진행하고, 주제와 진행 방식을 먼저 정리해 제안하며 깊이 있게 이어 가도록 챙김",
      "2025년 1월부터 9월까지 31주차, 주제마다 레포를 하나씩 만들고 이론·실습·트러블슈팅을 위키로 정리",
      "Webpack 주차에는 번개팅의 next.config를 실습 재료로 가져옴 — 번들 분석기, Terser, contenthash, 트리 셰이킹, PWA 런타임 캐싱, Sentry 설정",
      "2025년 5월부터 정리한 내용을 Substack에 시리즈로 연재 — React 렌더링, WebP, PWA, 번들링, 자바스크립트 동작 원리, 리액트 훅, 모듈 시스템, 타입스크립트",
    ],
    shots: [
      {
        src: "/shot/gunbamz-substack.webp",
        caption: "Substack 연재 — 주차마다 공부한 내용을 시리즈로 정리해 올렸습니다.",
      },
    ],
    sections: [
      {
        title: "진행 방식",
        items: [
          "회의에서 다음 주제를 정함 — 각자 궁금했던 기술과 실무에서 막혔던 개선 과제에서 출발",
          "주제를 이론과 실습으로 나누고, 팀원마다 페이지나 시나리오를 하나씩 맡아 직접 구현",
          "Lighthouse, 빌드 결과물, 커버리지, 네트워크 요청처럼 눈으로 확인할 수 있는 근거를 남기고 함께 리뷰",
        ],
      },
      {
        title: "렌더링 방식 비교",
        items: [
          "같은 페이지를 CSR·SSR·SSG로 만들어 Lighthouse 성능을 비교 — CSR 89, SSR 94, SSG 100",
          "이미지가 많은 페이지에서 SSG는 LCP 1,250ms·CLS 0.01, CSR은 1,860ms·0.15",
          "CSR에서 SSG·SSR·ISR로 바꾸자 First Load JS가 120kB대에서 101kB로 줄어듦",
          "빌드 결과물을 열어 봄 — SSG 페이지는 Link 이동 시 HTML 없이 hover 때 미리 받은 JSON으로 하이드레이션하고, HTML 속 빈 주석은 텍스트 노드가 합쳐져 하이드레이션이 어긋나는 것을 막는 용도",
          "쇼핑몰 페이지마다 렌더링 방식을 고름 — 메인 ISR, 검색 SSR, 설정 CSR, 상세는 빌드 시간과 저장 공간을 따져 SSG와 SSR 사이에서 결정",
        ],
      },
      {
        title: "테스트",
        items: [
          "Jest·RTL 이론과 테스트 커버리지 정리, 회원가입 통합 테스트를 직접 맡음 — 6개 시나리오, 구문 커버리지 97%",
          "커버되지 않은 줄을 따라가 쓰이지 않는 로직을 찾음",
          "jsdom에 없는 alert, 즉시 resolve되는 mock 때문에 로딩 상태를 못 잡는 문제 등 막힌 지점을 트러블슈팅으로 모음",
          "JSDOM은 CSSOM을 만들지 않아 미디어쿼리와 display:none을 판별하지 못한다는 것을 실험으로 확인",
        ],
      },
      {
        title: "CI/CD와 서버 상태",
        items: [
          "GitHub Actions로 lint·build·test 파이프라인, Codecov 리포트, Vercel 프리뷰 배포, Sentry 에러 수집을 연결",
          "실패한 테스트는 커버리지를 낮추지 않는다는 것을 확인하고, Codecov 목표치를 팀 상황에 맞게 조정",
          "모임 상세 페이지의 useEffect 패칭을 React Query로 바꾸고, SSR 하이드레이션 불일치와 중복 호출을 해결",
          "SWR을 도입해 같은 데이터를 두 곳에서 부를 때 나던 중복 요청을 1번으로 줄임",
        ],
      },
      {
        title: "그 뒤로 다룬 주제",
        items: [
          "Webpack 설정, Lazy Loading과 Suspense, useTransition, 웹 크롤링, Google Analytics",
          "React 렌더링과 Fiber, 메모이제이션과 key, WebP, PWA, 번들링과 번들러, 코드 스플리팅",
          "자바스크립트 동작 원리, 리액트 훅, 모듈 시스템, 타입스크립트 타입 넓히기와 좁히기, 웹 접근성",
          "마이크로 프론트엔드, 객체지향, async/await, 브라우저 렌더링, 웹 아키텍처, CDN",
        ],
      },
    ],
    learned: [
      "성능 개선이나 기술을 이론으로만 알 때와 직접 만들어 뜯어 봤을 때의 이해는 달랐습니다. 다 같이 리뷰하면서 혼자서는 놓쳤을 부분도 짚을 수 있었습니다.",
      "팀장으로서 하나의 주제를 이렇게 섬세하게 뜯어보며 공부할 수 있어서 좋았습니다.",
      "사수가 없는 환경의 개발자들이 더 나은 개발자가 되려고 애쓰는 모습이 보기 좋았고, 다 같이 으쌰으쌰 배워 나가는 시간이 즐거웠습니다.",
    ],
    links: [
      { label: "스터디 조직", url: "https://github.com/FESIStudy" },
      { label: "렌더링 위키", url: "https://github.com/FESIStudy/W1_RenderingExplore_SSG/wiki" },
      { label: "테스트 위키", url: "https://github.com/FESIStudy/W2_Test_SignupSignin/wiki" },
      { label: "주차별 레포", url: "https://github.com/orgs/FESIStudy/repositories" },
      { label: "Substack 연재", url: "https://gunbamz.substack.com/" },
    ],
  },
  {
    slug: "front-ninjas",
    name: "프론트 닌자스 스터디",
    category: "dev",
    org: "Front Ninjas",
    period: "2025.01 — 2025.09",
    role: "스터디 팀장",
    active: false,
    overview:
      "매일 쓰는 자바스크립트와 타입스크립트, 그리고 그 위에서 돌아가는 도구들을 제대로 이해하려고 만든 서적 스터디입니다. 『모던 자바스크립트 Deep Dive』와 『우아한 타입스크립트 with 리액트』 두 권을 함께 읽으며 장마다 각자 정리 노트를 남겼습니다. 중간에 느려지고 멈춘 시기도 있었지만, 도구를 쓸 줄 아는 데서 그치지 않고 왜 그렇게 동작하는지까지 알고 쓰려 했던 공부입니다.",
    highlights: [
      "스터디를 만들고 운영 — 두 레포의 장별 구조와, 일차마다 키워드와 질문을 꺼내는 토론 템플릿을 직접 만듦",
      "모던 자바스크립트 Deep Dive 26장, 우아한 타입스크립트 13장까지 진행 — 장마다 멤버별 정리 노트",
      "직접 쓴 정리 노트 51개 — 자바스크립트 22개, 타입스크립트 29개",
    ],
    sections: [
      {
        title: "도구와 이어 본 것",
        items: [
          "타입스크립트 컴파일 — tsc가 코드를 읽고 검사해 자바스크립트로 내보내는 단계(Scanner → Parser → Binder → Checker → Emitter)와 target에 따른 트랜스파일 결과 비교",
          "프로젝트 관리 — tsc --noEmit --incremental, type-coverage, allowJs에서 strict로 가는 점진적 마이그레이션, pnpm·Turborepo·Nx 모노레포 비교, declare global과 번들러 주입",
          "상태 관리 — 책에 나온 MobX·Redux·Recoil·Zustand에 Jotai·Valtio·TanStack Query·XState·Effector를 더해, 9개 라이브러리를 어떤 상황에 맞는지로 비교",
          "리액트 훅의 타입 — useRef 오버로드(MutableRefObject와 RefObject), 빈 배열 useState의 never[] 함정, useEffect 안의 async, eslint-plugin-react-hooks",
          "API 에러 처리 — 에러 클래스, axios 인터셉터, ErrorBoundary, React Query를 함께 쓰는 구조",
        ],
      },
      {
        title: "공부한 방식",
        items: [
          "책 내용을 옮기는 데서 멈추지 않고, 지금 쓰는 도구와 맞닿는 지점을 찾아 덧붙임",
          "\"타입 정보는 컴파일 때 지워지는데 타입 가드는 왜 런타임에도 유효해야 할까\", \"strict mode보다 린트 도구가 선호되는 이유는\" 같은 질문을 스스로 던지고 답하는 식으로 정리",
          "2월에는 하루 한 장 꼴로 읽었고, 봄 이후로는 2~4주에 한 장으로 느려지며 2025년 9월에 멈춤",
        ],
      },
    ],
    learned: [
      "자바스크립트와 타입스크립트가 어떻게 동작하는지 세세하게 파고들었습니다. AI로 개발하는 세대가 되었지만, 쓰는 언어를 정확히 알 때 코드를 한 단계 더 발전시킬 수 있다는 걸 배웠습니다.",
      "단순히 돌아가게 만드는 개발이 아니라 깊이 있게 개발하는 데 도움이 됐고, 기술자라는 마음으로 개발하게 된 계기였습니다.",
    ],
    links: [
      { label: "스터디 조직", url: "https://github.com/Front-Ninjas" },
      { label: "모던 JS 딥다이브", url: "https://github.com/Front-Ninjas/modern-javascript-deep-dive" },
      { label: "우아한 타입스크립트", url: "https://github.com/Front-Ninjas/woowahan-typescript-with-react" },
    ],
  },
  {
    slug: "devlog-challengers",
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
    slug: "ppiyakthon",
    name: "삐약톤 (Google Developers 해커톤)",
    category: "dev",
    org: "Google Developers",
    period: "2025.01",
    role: "팀장 · 프론트엔드",
    active: false,
    overview:
      "Google Developers 커뮤니티의 해커톤 삐약톤에 참여해, 짧은 시간 안에 위치 기반 스터디 모집 서비스 PPIYo를 만들고 배포했습니다. 시간은 짧았지만 완성도 있게 마무리했고, 디자이너·프론트엔드·백엔드가 서로 맞춰 가며 배포까지 함께 마쳤습니다.",
    highlights: [
      "팀장 — 디자이너 1 · 프론트엔드 3 · 백엔드 3명과 일을 나누고 맞춰 가며, 짧은 시간 안에 스터디 모집 서비스를 기획부터 배포까지",
      "백엔드도 알아서, 디자이너와 백엔드 사이에서 서로의 말을 이어 주는 역할을 맡음",
      "스터디 상세 페이지를 맡아 카카오맵 위에 모임 장소와 주변 장소 목록을 띄우고, 새벽까지 백엔드 API와 맞춰 가며 연결",
      "Figma 와이어프레임과 Swagger로 화면과 API를 맞추고, 기능 브랜치와 PR로 자주 합치며 진행",
    ],
    sections: [
      {
        title: "만든 것",
        items: [
          "카테고리별 스터디 검색과 모집글 작성",
          "참여자들의 중간 지점을 계산해 모이기 좋은 장소를 추천하고, 그 주변 1km 안의 장소를 찾아 줌",
          "프론트엔드는 React · TypeScript · Redux, Netlify 배포 / 백엔드는 Spring Boot · MariaDB · EC2 · Docker",
        ],
      },
    ],
    learned: [
      "이전에 배운 것들을 바탕으로 개발에 대한 용기가 생긴 계기였습니다.",
      "이미 여러 라이브러리와 선택지를 알고 있는 상태에서 시작해서 진행이 빠르게 이루어졌습니다.",
      "디자이너·프론트엔드·백엔드 협업이 원활했고, 다 같이 안정적인 서비스를 만들면서 많이 배웠습니다.",
    ],
    links: [
      { label: "팀 조직", url: "https://github.com/chickHackathon" },
      { label: "프론트엔드 레포", url: "https://github.com/chickHackathon/Frontend" },
      { label: "배포", url: "https://bbiyagiez.netlify.app/" },
    ],
    projects: ["ppiyo"],
  },
  {
    slug: "k8s-docker",
    name: "쿠버네티스 · 도커 스터디",
    category: "dev",
    org: "Kubernetes DevOps Study",
    period: "2024.12 — 2025.08",
    role: "스터디 팀장 · 프론트엔드",
    active: false,
    overview:
      "쿠버네티스와 도커를 공부하던 스터디에서 출발해, 배운 것을 실제 서비스에 적용해 보려고 이어 간 포트폴리오 스터디입니다. 따로 교재를 정하기보다 각자 지금까지 아는 것을 바탕으로 디스코드 같은 실시간 채팅 서비스 ChatFlow를 처음부터 만들었습니다. 팀원 모두 취업 준비나 회사 일을 병행했지만, 각자의 기술적 한계를 넘어 보려고 꾸준히 공부하며 반년 넘게 이어 갔습니다.",
    highlights: [
      "스터디 팀장 — 프론트엔드를 맡아 화면부터 백엔드 연동까지 진행",
      "백엔드는 회원·팀·채팅·알림 서비스를 나눈 마이크로서비스, 쿠버네티스 설정은 별도 매니페스트 레포로 관리",
      "프론트엔드도 도커 이미지와 실행 스크립트를 직접 만들어 배포 흐름에 맞춤",
      "웹소켓을 본격적으로 다루기 시작한 프로젝트 — SockJS + STOMP로 백엔드 채팅 서비스와 연결",
    ],
    sections: [
      {
        title: "직접 만든 것 — 실시간 채팅",
        items: [
          "WebSocket(SockJS + STOMP) 연결과 토큰 처리 — 백엔드 채팅 서비스와 맞춰 가며 함께 테스트",
          "메시지가 두 번 전송·저장되던 버그를 잡고 메시지 타입 정리",
          "메시지 전송 낙관적 업데이트, 전송 중 상태, 이전 메시지 불러오기",
          "멘션(개별·everyone), 참여 멤버 목록, 이미지·파일 첨부 전송, 팀 초대 메시지",
        ],
      },
      {
        title: "구조와 협업",
        items: [
          "패키지 구조를 기능(feature) 레이어와 화면(ui) 레이어로 나눠 개편, zod + react-hook-form 도입",
          "서버·채널·팀 API 연결, 유저 프로필 전역 상태와 AuthProvider 리팩토링",
          "Jira 이슈(FLOW-n) 단위로 브랜치를 따고 PR로 합치며 진행",
          "2024년 12월 시작 — 2~3월 컴포넌트, 4월 구조 개편과 API 연동, 5~8월 실시간 채팅",
        ],
      },
    ],
    learned: [
      "웹소켓을 제대로 다뤄 보기 시작한 게 이때입니다. 연결과 토큰, 중복 전송, 낙관적 업데이트까지 직접 부딪히면서 실시간 기능을 다루는 힘이 크게 늘었습니다.",
      "AI에 기대지 않고 직접 찾고 읽어 가며 구현하려고 애썼고, 그 과정에서 많이 배웠습니다.",
      "다들 취업 준비나 회사 일을 병행하면서도 기술적 한계를 넘어 보려고 열심히 공부했습니다.",
    ],
    links: [
      { label: "팀 조직", url: "https://github.com/ChatFlowProject" },
      { label: "프론트엔드 레포", url: "https://github.com/ChatFlowProject/chatter" },
      { label: "쿠버네티스 매니페스트", url: "https://github.com/ChatFlowProject/k8s-manifest" },
    ],
    projects: ["chatflow"],
  },
  {
    slug: "ajou-press",
    name: "아주대학교 학보사",
    category: "leadership",
    org: "Ajou Press",
    period: "2021.01 — 2022.12",
    role: "정기자 → 미디어 편집장",
    active: false,
    highlights: [
      "10명 이상의 팀과 주간 보도를 기획하고 기사 품질 점검을 맡음",
      "500명+ 응답 설문을 바탕으로 데이터 기획 보도 진행",
    ],
  },
  {
    slug: "shalla",
    name: "Shalla 영어회화 동아리",
    category: "leadership",
    org: "서울경인 연합",
    period: "2019.03 — 2021.08",
    role: "부회장 · 기획총무",
    active: false,
    highlights: [
      "연 450명 이상 참여 행사의 기획과 운영 담당",
      "예산·운영안·프로그램 구성·홍보 콘텐츠 제작 담당",
    ],
  },
  {
    slug: "nubi-ajou",
    name: "Nubi Ajou 글로벌 교류단",
    category: "leadership",
    org: "아주대학교",
    period: "2021.02 — 2022.12",
    role: "대외홍보팀장",
    active: false,
    highlights: [
      "국제 학생 대상 문화 교류 프로그램 대외 홍보 담당",
      "카드뉴스·영상 기획부터 촬영·편집·업로드까지 직접 진행",
      "300명 이상 참여 행사 운영",
    ],
  },
  {
    slug: "link-supporters",
    name: "링크 산학협력 서포터즈",
    category: "leadership",
    org: "링크사업단",
    period: "2021.08 — 2023.02",
    role: "서포터즈 팀장",
    active: false,
    highlights: [
      "창업 아이디어 공모전 홍보 기획과 콘텐츠 운영 담당",
      "1,500명 대상 설문 조사와 피드백 분석을 바탕으로 콘텐츠 개선",
    ],
  },
  {
    slug: "job-supporters",
    name: "일자리 서포터즈",
    category: "leadership",
    org: "경기도",
    period: "2021.08 — 2022.03",
    role: "기획팀장",
    active: false,
    highlights: [
      "50개 이상 기업과 연계한 채용 박람회 기획·운영 담당",
      "현장 피드백을 바로 모아 개선안 정리, 팀 일정 조율",
    ],
  },
];
