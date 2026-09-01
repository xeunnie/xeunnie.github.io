import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import ResumeDoc from "./ResumeDoc";

export const metadata: Metadata = {
  title: "Resume",
  description: `${SITE.name} 이력서 — 한 장으로 정리한 경력·프로젝트 요약본 (PDF 저장 가능)`,
  robots: { index: true, follow: true },
};

export default function ResumePage() {
  return <ResumeDoc />;
}
