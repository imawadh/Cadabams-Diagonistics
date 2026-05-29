import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/cart", "/checkout", "/login"],
      },
    ],
    sitemap: [
      "https://cadabamsdiagnostics.com/sitemap.xml",
      "https://cadabamsdiagnostics.com/sitemap.txt",
    ],
    host: "https://cadabamsdiagnostics.com",
  };
}
