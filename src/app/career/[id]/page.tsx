import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CAREERS, SITE } from "@/lib/constants";
import CareerDetail from "./CareerDetail";

export function generateStaticParams() {
  return CAREERS.map((_, i) => ({ id: String(i) }));
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const career = CAREERS[Number(id)];
  if (!career) return {};

  return {
    title: `${career.company} | ${SITE.name}`,
    description: career.summary,
  };
}

export default async function CareerPage({ params }: Props) {
  const { id } = await params;
  const idx = Number(id);
  const career = CAREERS[idx];
  if (!career) notFound();

  const prev = idx < CAREERS.length - 1 ? { id: idx + 1, name: CAREERS[idx + 1].company } : null;
  const next = idx > 0 ? { id: idx - 1, name: CAREERS[idx - 1].company } : null;

  return <CareerDetail career={career} prev={prev} next={next} />;
}
