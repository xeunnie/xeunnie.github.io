import type { MetadataRoute } from "next";
import { SITE, PROJECTS, CAREERS } from "@/lib/constants";

export const dynamic = "force-static";

/**
 * 빌드 시 sitemap.xml 을 만든다.
 * PROJECTS / CAREERS 에서 직접 읽으므로, 프로젝트가 추가되면 여기는 손대지 않아도 된다.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projects`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/growth`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/collaboration`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/resume`, changeFrequency: "monthly", priority: 0.9 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    changeFrequency: "monthly",
    priority: p.featured ? 0.8 : 0.6,
  }));

  const careerRoutes: MetadataRoute.Sitemap = CAREERS.map((_, i) => ({
    url: `${base}/career/${i}`,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...projectRoutes, ...careerRoutes];
}
