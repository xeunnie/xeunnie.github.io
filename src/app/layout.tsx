import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SITE } from "@/lib/constants";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.title}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "프론트엔드 개발자", "Frontend Developer", "React", "Next.js", "TypeScript",
    "WebRTC", "Three.js", "실시간 통신", "3D 웹", "포트폴리오",
    "Seungeun Choi", "최승은",
  ],
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: `${SITE.name} — ${SITE.title}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.title}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d10" },
  ],
  width: "device-width",
  initialScale: 1,
};

const themeScript = `
  (function(){
    try {
      var t = localStorage.getItem('theme');
      document.documentElement.setAttribute('data-theme', t === 'dark' ? 'dark' : 'light');
    } catch(e){}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {SITE.ga_id && <GoogleAnalytics gaId={SITE.ga_id} />}
      </body>
    </html>
  );
}
