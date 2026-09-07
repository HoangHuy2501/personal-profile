import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://nguyen-hoang-huy.vercel.app"),
  title: {
    default: "Nguyen Hoang Huy | Fresher Full-stack Developer ",
    template: "%s | Nguyen Hoang Huy",
  },
  description:
    "Portfolio of Nguyen Hoang Huy, a Fresher Full-stack Developer building practical web systems with React and Node.js.",
  keywords: [
    "Nguyen Hoang Huy",
    "Fresher Full-stack Developer",
    "Portfolio",
    "Web development",
    "JavaScript",
    "Nguyễn Hoàng Huy",
    "nguyễn hoàng huy",
    "Fresher Fullstack Developer",
    "nguyễn hoàng huy portfolio",
    "React",
    "Next.js",
    "Node.js",
    "Da Nang",
  ],
  authors: [{ name: "Nguyen Hoang Huy" }],
  creator: "Nguyen Hoang Huy",
  alternates: { canonical: "/", languages: { en: "/en", vi: "/vi" } },
  openGraph: {
    type: "website",
    url: "/",
    title: "Nguyen Hoang Huy | Fresher Full-stack Developer",
    description: "Portfolio of Nguyen Hoang Huy from Da Nang, Viet Nam.",
  },
  twitter: {
    card: "summary",
    title: "Nguyen Hoang Huy | Fresher Full-stack Developer",
  },
  robots: { index: true, follow: true },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
      {process.env.NEXT_PUBLIC_GAID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GAID} />
      )}
    </html>
  );
}
