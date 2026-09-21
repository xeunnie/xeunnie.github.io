import Link from "next/link";
import { SITE, NAV_ITEMS, MORE_ITEMS } from "@/lib/constants";

/**
 * 상단 메뉴에서 뺀 곳들이 사라진 건 아니다.
 * 다 보고 내려온 사람에게만 나머지 문을 열어 준다 — 시작할 때 고르게 하지 않기 위해서.
 */
export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6">
        <nav aria-label="사이트 전체">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {[...NAV_ITEMS, ...MORE_ITEMS].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-slate-400 underline-offset-4 transition-colors hover:text-ice-500 hover:underline"
                >
                  {item.ko}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-2 border-t border-slate-800/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {SITE.name}
          </p>
          <p className="text-xs text-slate-600">
            Built with Next.js &middot; Tailwind CSS &middot; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
