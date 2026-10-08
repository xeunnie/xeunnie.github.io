import Nav from "@/components/Nav";
import Nicknames from "@/components/Nicknames";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import YearSection from "@/components/home/YearSection";
import YearIndex from "@/components/home/YearIndex";
import Closing from "@/components/home/Closing";
import { YEARS } from "@/lib/home";

/**
 * 홈은 한 줄기로 내려간다.
 * 첫 화면(문장 하나) → 어떤 사람인가(별명) → 2021년부터 한 해씩 → 연락.
 * 해마다 크게 보여 줄 프로젝트, 작은 프로젝트, 스터디·활동을 같은 자리에 둔다 —
 * 무엇을 언제 했는지가 따로 놀지 않게.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div className="border-t border-slate-800/70">
          <Nicknames />
        </div>
        {YEARS.map((block) => (
          <YearSection key={block.id} block={block} />
        ))}
        <Closing />
      </main>
      <YearIndex />
      <Footer />
    </>
  );
}
