import type { Metadata } from "next";
import type { ReactNode } from "react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const isVietnamese = locale === "vi";

  return {
    title: {
      absolute: isVietnamese
        ? "Giới thiệu Nguyễn Hoàng Huy | Lập trình viên Full-stack"
        : "About Nguyen Hoang Huy | Full-stack Developer",
    },
    description: isVietnamese
      ? "Tìm hiểu về Nguyễn Hoàng Huy: học vấn, kỹ năng và kinh nghiệm phát triển ứng dụng web với React, Next.js và Node.js."
      : "Learn about Nguyen Hoang Huy: education, skills and experience building web applications with React, Next.js and Node.js.",
  };
}

export default function AboutLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}