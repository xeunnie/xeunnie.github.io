import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 py-8">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} {SITE.name}
        </p>
        <p className="text-xs text-slate-600">
          Built with Next.js &middot; Tailwind CSS &middot; Framer Motion
        </p>
      </div>
    </footer>
  );
}
