import { CHRONICLE } from "./chronicle";
import { PROJECTS } from "./projects";
import { ACTIVITIES } from "./activities";
import type { ChronicleYear } from "./chronicle";
import type { Project } from "./projects";
import type { Activity } from "./activities";

/**
 * 홈은 한 해씩 위에서 아래로 읽힌다.
 * 데이터는 타임라인(CHRONICLE)·프로젝트(PROJECTS)·활동(ACTIVITIES)을 그대로 쓰고,
 * 여기서는 "어느 해에 무엇을 어떤 크기로 보여 줄지" 만 정한다.
 */

export interface YearBlock {
  id: string;
  chronicle: ChronicleYear;
  /** 크게 보여 주는 프로젝트 */
  works: Project[];
  /** 작은 프로젝트 — 카드로 */
  smallWorks: Project[];
  /** 그 해에 시작한 스터디·활동. 프로젝트로 이미 보여 준 활동은 뺀다 */
  activities: Activity[];
}

const byRank = (a: Project, b: Project) => (a.rank ?? 999) - (b.rank ?? 999);
const startYear = (period: string) => period.slice(0, 4);

/** 프로젝트 목록 우선순위 상위 셋 — 홈에서 "대표" 표시를 붙인다 */
export const HIGHLIGHTS = new Set([...PROJECTS].sort(byRank).slice(0, 3).map((p) => p.slug));

export const YEARS: YearBlock[] = [...CHRONICLE]
  .sort((a, b) => a.year.localeCompare(b.year))
  .map((chronicle) => {
    const projects = chronicle.projects
      .map((slug) => PROJECTS.find((p) => p.slug === slug))
      .filter((p): p is Project => Boolean(p));
    return {
      id: `y${chronicle.year}`,
      chronicle,
      works: projects.filter((p) => !p.minor).sort(byRank),
      smallWorks: projects.filter((p) => p.minor),
      activities: ACTIVITIES.filter(
        (a) => startYear(a.period) === chronicle.year && !a.projects?.length
      ),
    };
  });
