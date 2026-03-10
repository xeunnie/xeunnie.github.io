import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Activities from "@/components/Activities";
import PeerReview from "@/components/PeerReview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Activities />
      <PeerReview />
      <Contact />
      <Footer />
    </>
  );
}
