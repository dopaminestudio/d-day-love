import "@/app/globals.css";
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
  themeColor: "#ffb6b9",
  category: "데이트, 기념일, 커플",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "커플 D-day 계산기",
    description: "연인과의 특별한 날을 기념하는 D-day 계산기",
    url: "https://your-domain.com/",
    siteName: "커플 D-day 계산기",
    images: [
      {
        url: "https://your-domain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "커플 D-day 계산기 오픈그래프 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "커플 D-day 계산기",
    description: "연인과의 특별한 날을 기념하는 D-day 계산기",
    images: ["https://your-domain.com/og-image.png"],
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
    </html>
  );
}
