import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ActivityOpening from "@/components/ActivityOpening";
import Activities from "@/components/Activities";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "활동",
  description:
    "퇴근 후의 스터디와 그 전의 팀 활동 — 군밤즈·프론트 닌자스·Devlog Challengers 운영 기록과 학보사·동아리 리더십",
};

export default function ActivityPage() {
  return (
    <>
      <Nav />
      <main className="landing min-h-screen">
        <ActivityOpening />
        <Activities />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
