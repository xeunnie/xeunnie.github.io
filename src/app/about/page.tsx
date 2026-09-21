import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Future from "@/components/Future";
import NextUp from "@/components/NextUp";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "About",
  description:
    "어떤 사람이고 어떤 개발자인지 — 좌우명, 일할 때 중요하게 보는 것, 해 본 범위, 앞으로의 계획",
};

/**
 * 읽는 데 시간이 드는 협업 기록·동료 평가는 /collaboration 으로 뺐다.
 * 이 페이지는 "어떤 사람이냐" 하나만 붙잡는다.
 */
export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="landing min-h-screen">
        <About />
        <Skills />
        <Future />
        <NextUp />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
