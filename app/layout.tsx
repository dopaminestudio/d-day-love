import "@/app/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";

import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "커플 D-day 계산기",
  description: "연인과의 특별한 날을 기념하는 D-day 계산기",
  keywords: ["D-day", "커플", "기념일", "연인", "데이트", "사랑", "기념", "계산기"],
  applicationName: "커플 D-day 계산기",
  category: "데이트, 기념일, 커플",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "커플 D-day 계산기",
    description: "연인과의 특별한 날을 기념하는 D-day 계산기",
    siteName: "커플 D-day 계산기",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "커플 D-day 계산기",
    description: "연인과의 특별한 날을 기념하는 D-day 계산기",
  },
  verification: {
    google: "rdjN5J-LdWDojRgp3r1S1Lcf49HjxOUcZkEqz0FOw6M",
    other: {
      "naver-site-verification": "1eff4a9ff93e182546014343204b143df604eb45",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-47JE73BPQQ" />
    </html>
  );
}
