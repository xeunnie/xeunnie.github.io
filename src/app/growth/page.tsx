import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Chronicle from "@/components/Chronicle";
import ActivitiesPreview from "@/components/ActivitiesPreview";
import { getBlogPosts } from "@/lib/blog";
import { CHRONICLE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Growth",
  description:
    "2021년 첫 인턴십부터 지금까지, 해마다 한 일과 할 수 있게 된 것을 블로그 글과 함께 정리한 타임라인",
};

/** 정적 export 라 이 fetch 는 빌드 시점에 한 번만 실행된다. */
export const dynamic = "force-static";

export default async function GrowthPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Nav />
      <main className="landing min-h-screen">
        <PageHeader
          title="타임라인"
          lede="2021년 첫 인턴십부터 지금까지, 해마다 한 일과 그 덕분에 할 수 있게 된 것을 적었습니다. 그때 쓴 블로그 글도 시기별로 함께 붙여 두었습니다."
          mark="Growth"
          aside={
            <dl className="flex gap-12">
              <div className="flex flex-col-reverse">
                <dt className="mt-3 text-[11px] tracking-[0.16em] text-slate-500">연차</dt>
                <dd className="font-serif text-[3.25rem] leading-none tabular-nums text-slate-50">{CHRONICLE.length}</dd>
              </div>
              <div className="flex flex-col-reverse">
                <dt className="mt-3 text-[11px] tracking-[0.16em] text-slate-500">블로그 글</dt>
                <dd className="font-serif text-[3.25rem] leading-none tabular-nums text-slate-50">{posts.length}</dd>
              </div>
            </dl>
          }
        />
        <Chronicle posts={posts} />
        <ActivitiesPreview />
      </main>
      <Footer />
    </>
  );
}
