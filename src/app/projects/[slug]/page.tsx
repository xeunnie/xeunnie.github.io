import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS, CAREERS, SITE } from "@/lib/constants";
import ProjectDetail from "./ProjectDetail";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} — ${SITE.name}`,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) notFound();

  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null;
  const nextProject = currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null;

  // 같은 소속(회사·팀 또는 학업/활동)에서 한 다른 프로젝트 — 옆으로 건너갈 수 있게
  const sameOrigin = PROJECTS.filter(
    (p) =>
      p.slug !== project.slug &&
      (project.company ? p.company === project.company : p.org === project.org)
  );
  // 가까운 순서로 — 같은 제품군 → 같은 팀 → 같은 소속
  const rank = (p: (typeof PROJECTS)[number]) =>
    project.group && p.group === project.group ? 0 : project.team && p.team === project.team ? 1 : 2;
  const related = [...sameOrigin].sort((a, b) => rank(a) - rank(b)).slice(0, 6);

  const careerIndex = project.company
    ? CAREERS.findIndex(
        (c) => c.company === project.company && (!project.team || c.team === project.team)
      )
    : -1;

  return (
    <ProjectDetail
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
      related={related}
      career={careerIndex >= 0 ? { index: careerIndex, career: CAREERS[careerIndex] } : null}
    />
  );
}
