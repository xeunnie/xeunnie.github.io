import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Nicknames from "@/components/Nicknames";
import Projects from "@/components/Projects";
import Explore from "@/components/Explore";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

/**
 * 홈은 한 줄기로만 흐른다.
 * 누구인가(히어로) → 무엇을 만들었나(대표 작업 셋) → 어떤 사람인가(별명)
 * → 더 뜯어볼 곳 → 연락.
 * 히어로의 버튼도 바깥으로 나가지 않고 다음 구간으로 내려간다 —
 * 처음 온 사람은 일단 한 바퀴 읽고 나서 갈 곳을 고르는 편이 헤매지 않는다.
 * 갈림길은 한 바퀴 다 읽은 뒤, "더 뜯어볼 곳" 에서 한꺼번에 연다.
 */
export default function Home() {
  return (
    <div className="landing">
      <Nav />
      <Hero />
      <Projects />
      <Nicknames />
      <Explore />
      <Contact />
      <Footer />
    </div>
  );
}
