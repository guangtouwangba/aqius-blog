import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConfigProvider } from "@/components/providers/config-provider";
import { Layout } from "@/components/layout/layout";
import { getConfig } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "TechBlog - 技术博客",
    template: "%s | TechBlog"
  },
  description: "专注于前端技术、后端开发和软件工程的技术博客",
  keywords: ["技术博客", "前端开发", "后端开发", "软件工程", "编程"],
  authors: [{ name: "TechBlog" }],
  creator: "TechBlog",
  metadataBase: new URL("https://techblog.example.com"),
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://techblog.example.com",
    title: "TechBlog - 技术博客",
    description: "专注于前端技术、后端开发和软件工程的技术博客",
    siteName: "TechBlog",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechBlog - 技术博客",
    description: "专注于前端技术、后端开发和软件工程的技术博客",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = getConfig()
  
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConfigProvider config={config}>
            <Layout>{children}</Layout>
          </ConfigProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
