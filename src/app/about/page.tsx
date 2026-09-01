import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import About from "@/components/About";
import CollaborationSection from "@/components/Collaboration";
import Experience from "@/components/Experience";
import PeerReview from "@/components/PeerReview";
import Activities from "@/components/Activities";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "About",
  description:
    "어떤 동료로 일하는지 — 일하는 방식과 실제 협업 기록, 함께 일한 사람들의 평가를 모았습니다.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen">
        <PageHeader
          eyebrow="About"
          title="어떤 동료인가"
          lede="기술 스택은 이력서에 있습니다. 이 페이지는 그 사람이 팀에 들어왔을 때 실제로 어떻게 일하는지에 대한 것입니다."
        />
        <About />
        <CollaborationSection />
        <Experience />
        <PeerReview />
        <Activities />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
