import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectsOpening from "@/components/ProjectsOpening";
import ProjectsIndex from "@/components/ProjectsIndex";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "무엇을 만들었고 그 안에서 무엇을 판단했는지 — 프로젝트별 문제·대응·근거를 정리한 목록입니다.",
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="landing min-h-screen">
        <ProjectsOpening />
        <ProjectsIndex />
      </main>
      <Footer />
    </>
  );
}
