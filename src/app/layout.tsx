import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "张三 - 全栈开发工程师 | 个人简历网站",
  description: "张三的个人简历网站，展示项目作品、技能和经验。全栈开发工程师，专注于构建高性能、用户友好的Web应用。",
  keywords: "张三, 全栈开发, 前端开发, React, Next.js, 简历, 作品集",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body>
        {children}
      </body>
    </html>
  );
}
