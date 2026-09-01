import { BadgeKey } from "./badges";

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
    school: "코리아IT 풀스택 과정",
    major: "풀스택 웹 포트폴리오 보강 과정",
    period: "2024 — 2026",
    highlights: [
      "OnMeet — 팀장으로 AI 회의록 자동 생성 화상회의 플랫폼을 기획부터 배포까지 주도, 과정 내 수강생 우수상",
      "제1회 코리아IT아카데미 바이브코딩 공모전 500팀 중 3위, 장려상 — Argos 프론트엔드 전담",
    ],
    techs: ["react", "typescript", "nextjs", "supabase", "livekit", "kafka"],
  },
  {
    school: "한화시스템 Beyond SW Camp 6기",
    major: "Backend Track · 수료",
    period: "2024.04 — 2024.10",
    highlights: [
      "Spring, Docker, K8s, Jenkins, ArgoCD 등 백엔드 풀스택",
      "BOOT_UP — 같은 서비스를 백엔드·프론트(Vue)·DevOps 세 단계로 나눠 구현, 최종 프로젝트는 CalIT",
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
