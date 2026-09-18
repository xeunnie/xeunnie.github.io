import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ProjectsIndex from "@/components/ProjectsIndex";
import { PROJECTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "무엇을 만들었고 그 안에서 무엇을 판단했는지 — 프로젝트별 문제·대응·근거를 정리한 목록입니다.",
};

export default function ProjectsPage() {
  const company = PROJECTS.filter((p) => p.category === "company").length;

  return (
    <>
      <Nav />
      <main className="min-h-screen">
        <PageHeader
          title="프로젝트"
          lede="회사·학업·팀·제품군으로 걸러 볼 수 있습니다. 상세 페이지에는 무엇이 문제였고 그때 어떻게 판단했는지를 적어 두었습니다. 궁금한 것부터 골라 보셔도 됩니다."
          aside={
            <div className="flex gap-8">
              <div>
                <p className="text-3xl font-bold text-slate-50 font-mono">{PROJECTS.length}</p>
                <p className="text-xs font-mono tracking-widest uppercase text-slate-500 mt-1">
                  전체
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-50 font-mono">{company}</p>
                <p className="text-xs font-mono tracking-widest uppercase text-slate-500 mt-1">
                  회사
                </p>
              </div>
            </div>
          }
        />
        <ProjectsIndex />
      </main>
      <Footer />
    </>
  );
}
