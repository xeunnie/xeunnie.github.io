import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SITE } from "@/lib/constants";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

/** 숫자와 라틴 글자에만 쓰는 세리프 — 연도·번호·이름이 조금 더 '걸린 작품'처럼 보이게 */
const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});

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
  alternates: { canonical: "/" },
  manifest: "/site.webmanifest",
  // SVG 를 먼저 두고 .ico 는 구형 브라우저용으로 남긴다
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: `${SITE.name} — ${SITE.title}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.title}`,
    description: SITE.description,
    images: ["/og.png"],
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
    { media: "(prefers-color-scheme: light)", color: "#f6f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0e" },
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
    <html lang="ko" className={`scroll-smooth ${serif.variable}`} suppressHydrationWarning>
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
