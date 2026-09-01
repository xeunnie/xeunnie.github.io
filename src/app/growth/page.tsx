import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Chronicle from "@/components/Chronicle";
import Growth from "@/components/Growth";
import { getBlogPosts } from "@/lib/blog";
import { CHRONICLE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Growth",
  description:
    "2021년 첫 인턴십부터 지금까지 — 무엇을 했고 무엇을 할 수 있게 됐는지, 블로그 기록과 함께 정리한 일대기",
};

/** 정적 export 라 이 fetch 는 빌드 시점에 한 번만 실행된다. */
export const dynamic = "force-static";

export default async function GrowthPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Nav />
      <main className="min-h-screen">
        <PageHeader
          eyebrow="Growth"
          title="일대기"
          lede="2021년 첫 인턴십에서 시작해 지금까지, 해마다 무슨 일이 있었고 그 해가 무엇을 남겼는지 적었습니다. 그때 쓴 블로그 글도 시기별로 함께 붙여 두었습니다."
          aside={
            <div className="flex gap-8">
              <div>
                <p className="text-3xl font-bold text-slate-50 font-mono">{CHRONICLE.length}</p>
                <p className="text-xs font-mono tracking-widest uppercase text-slate-500 mt-1">
                  Years
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-50 font-mono">{posts.length}</p>
                <p className="text-xs font-mono tracking-widest uppercase text-slate-500 mt-1">
                  Posts
                </p>
              </div>
            </div>
          }
        />
        <Chronicle posts={posts} />
        <Growth />
      </main>
      <Footer />
    </>
  );
}
