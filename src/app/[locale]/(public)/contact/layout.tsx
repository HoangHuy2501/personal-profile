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
        ? "Liên hệ Nguyễn Hoàng Huy | Lập trình viên Full-stack"
        : "Contact Nguyen Hoang Huy | Full-stack Developer",
    },
    description: isVietnamese
      ? "Liên hệ Nguyễn Hoàng Huy để trao đổi về cơ hội tuyển dụng và hợp tác phát triển ứng dụng web."
      : "Contact Nguyen Hoang Huy to discuss job opportunities and collaboration on web development projects.",
  };
}

export default function ContactLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}