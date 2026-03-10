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
    school: "한화시스템 Beyond SW Camp 6기",
    major: "Backend Track · 수료",
    period: "2024.04 — 2024.10",
    highlights: [
      "Spring, Docker, K8s, Jenkins, ArgoCD 등 백엔드 풀스택",
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
