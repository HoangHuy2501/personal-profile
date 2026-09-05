import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://nguyen-hoang-huy.vercel.app/sitemap.xml",
  };
}
