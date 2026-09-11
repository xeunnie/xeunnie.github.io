/**
 * 블로그 RSS를 빌드 시점에 읽어 온다.
 * 정적 배포(output: export)라 런타임 fetch는 CORS에 막히므로, 서버 컴포넌트에서
 * 빌드할 때 한 번 받아 페이지에 구워 넣는다.
 * 네트워크가 실패해도 빌드가 깨지지 않도록 항상 빈 배열로 떨어진다.
 */

export interface BlogSource {
  key: "tistory" | "velog";
  name: string;
  home: string;
  feed: string;
  /** 이 블로그가 무엇을 담고 있는지 — 타임라인에서 맥락으로 쓴다 */
  note: string;
}

export const BLOG_SOURCES: BlogSource[] = [
  {
    key: "velog",
    name: "velog",
    home: "https://velog.io/@xeunnie",
    feed: "https://api.velog.io/rss/@xeunnie",
    note: "부트캠프 주차 회고와 코테 스터디 TIL, 기술서 북리뷰를 쌓던 곳",
  },
  {
    key: "tistory",
    name: "Tistory",
    home: "https://xeunnie.tistory.com",
    feed: "https://xeunnie.tistory.com/rss",
    note: "실무에서 막힌 지점과 기술 선택 근거를 정리하는 곳",
  },
];

export interface BlogPost {
  source: BlogSource["key"];
  title: string;
  link: string;
  category?: string;
  /** ISO 날짜 (YYYY-MM-DD) */
  date: string;
  year: string;
}

const MONTHS: Record<string, string> = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

/** RFC822(RSS pubDate) → YYYY-MM-DD. 파싱 실패하면 빈 문자열. */
function toIso(pubDate: string): string {
  const m = pubDate.match(/(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})/);
  if (!m) return "";
  const [, d, mon, y] = m;
  const mm = MONTHS[mon];
  if (!mm) return "";
  return `${y}-${mm}-${d.padStart(2, "0")}`;
}

const ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  mdash: "—", ndash: "–", hellip: "…", middot: "·", laquo: "«", raquo: "»",
};

function decodeOnce(v: string): string {
  return v
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (full, name) => ENTITIES[name.toLowerCase()] ?? full);
}

/**
 * 피드에 따라 엔티티가 이중으로 감싸져 온다 (`&amp;mdash;` → `&mdash;` → `—`).
 * 더 이상 변하지 않을 때까지 최대 3번 푼다.
 */
function decode(raw: string): string {
  let v = raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");
  for (let i = 0; i < 3; i++) {
    const next = decodeOnce(v);
    if (next === v) break;
    v = next;
  }
  return v.replace(/<[^>]*>/g, "").trim();
}

function tag(item: string, name: string): string {
  const m = item.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return m ? decode(m[1]) : "";
}

function parseFeed(xml: string, source: BlogSource["key"]): BlogPost[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];
  return items
    .map((item) => {
      const date = toIso(tag(item, "pubDate"));
      return {
        source,
        title: tag(item, "title"),
        link: tag(item, "link"),
        category: tag(item, "category") || undefined,
        date,
        year: date.slice(0, 4),
      };
    })
    .filter((p) => p.title && p.link && p.year);
}

/**
 * 두 블로그의 글을 모아 최신순으로 돌려준다.
 * 한쪽이 실패해도 다른 쪽은 살린다 — 블로그가 죽어도 타임라인 페이지는 떠야 한다.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const results = await Promise.all(
    BLOG_SOURCES.map(async (src) => {
      try {
        const res = await fetch(src.feed, {
          headers: { "user-agent": "portfolio-build" },
          signal: AbortSignal.timeout(15_000),
        });
        if (!res.ok) return [];
        return parseFeed(await res.text(), src.key);
      } catch {
        return [];
      }
    })
  );
  return results.flat().sort((a, b) => b.date.localeCompare(a.date));
}
