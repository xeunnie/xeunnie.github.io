import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import CollaborationSection from "@/components/Collaboration";
import PeerReview from "@/components/PeerReview";
import CareerLinks from "@/components/CareerLinks";

export const metadata: Metadata = {
  title: "협업 기록",
  description:
    "누구와 어떻게 일했는지 — 디자이너·백엔드·현장 담당자와의 협업 기록과, 함께 일한 분들이 해 주신 이야기",
};

export default function CollaborationPage() {
  return (
    <>
      <Nav />
      <main className="landing min-h-screen">
        <PageHeader
          title="함께 일한 기록"
          lede="혼자 만든 화면은 하나도 없습니다. 어떤 분들과 어떻게 맞춰 갔는지, 그리고 그분들이 저를 어떻게 보셨는지 모았습니다."
        />
        <CollaborationSection />
        <PeerReview />
        <CareerLinks />
      </main>
      <Footer />
    </>
  );
}
