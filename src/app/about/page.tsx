import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import About from "@/components/About";
import CollaborationSection from "@/components/Collaboration";
import PeerReview from "@/components/PeerReview";
import CareerLinks from "@/components/CareerLinks";
import Future from "@/components/Future";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "About",
  description:
    "실제로 어떻게 일해 왔는지 — 협업 기록, 커리어, 함께 일한 동료들의 평가",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen">
        <PageHeader
          title="일하는 방식"
          lede="실제로 어떻게 일해 왔는지를 협업 기록과 함께 일한 분들의 평가로 정리했습니다."
        />
        <About />
        <CollaborationSection />
        <PeerReview />
        <Future />
        <CareerLinks />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
