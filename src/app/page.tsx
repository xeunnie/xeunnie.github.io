import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import AreaHub from "@/components/AreaHub";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

/**
 * 홈은 "개발자로서의 나"를 보여주는 얼굴이다.
 * 경력·활동·동료 평가처럼 읽는 데 시간이 드는 것은 /about 으로,
 * 전체 프로젝트 목록은 /projects 로 넘긴다.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <AreaHub />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}
