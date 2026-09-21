import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Nicknames from "@/components/Nicknames";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

/**
 * 홈은 한 줄기로만 흐른다.
 * 누구인가(히어로) → 어떤 식으로 일하나(별명) → 무엇을 만들었나(대표 작업) → 연락.
 * 중간에 갈림길을 두지 않는다. 처음 온 사람이 "뭐부터 보지" 하고 멈추는 건
 * 볼 게 없어서가 아니라 고를 게 많아서였다.
 * 나머지 영역으로 가는 문은 맨 아래 푸터에만 둔다.
 */
export default function Home() {
  return (
    <div className="landing">
      <Nav />
      <Hero />
      <Nicknames />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
