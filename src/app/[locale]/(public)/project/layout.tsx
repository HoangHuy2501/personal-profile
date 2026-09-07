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
        ? "Dự án của Nguyễn Hoàng Huy | Lập trình viên Full-stack"
        : "Projects by Nguyen Hoang Huy | Full-stack Developer",
    },
    description: isVietnamese
      ? "Khám phá các dự án web Nguyễn Hoàng Huy đã tham gia, cùng vai trò, công nghệ sử dụng và kinh nghiệm thực hiện."
      : "Explore web projects Nguyen Hoang Huy has contributed to, including his role, technologies used and practical experience.",
  };
}

export default function ProjectLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}