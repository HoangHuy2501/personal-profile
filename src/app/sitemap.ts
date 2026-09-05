import type { MetadataRoute } from "next";

const baseUrl = "https://nguyen-hoang-huy.vercel.app";

const pages = [
  {
    vi: "/vi",
    en: "/en",
    priority: 1,
  },
  {
    vi: "/vi/about",
    en: "/en/about",
    priority: 0.8,
  },
  {
    vi: "/vi/project",
    en: "/en/project",
    priority: 0.9,
  },
  {
    vi: "/vi/contact",
    en: "/en/contact",
    priority: 0.7,
  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ vi, en, priority }) => [
    {
      url: `${baseUrl}${vi}`,
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: {
          "vi-VN": `${baseUrl}${vi}`,
          "en-US": `${baseUrl}${en}`,
          "x-default": `${baseUrl}${vi}`,
        },
      },
    },
    {
      url: `${baseUrl}${en}`,
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: {
          "vi-VN": `${baseUrl}${vi}`,
          "en-US": `${baseUrl}${en}`,
          "x-default": `${baseUrl}${vi}`,
        },
      },
    },
  ]);
}