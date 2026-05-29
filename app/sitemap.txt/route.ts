import { getAllBlogs } from "@/lib/data/blogs";
import { getAllLabTests } from "@/lib/data/labtests";
import { getAllNonLabTests } from "@/lib/data/nonlabtests";
import { getAllCenters } from "@/lib/data/centers";
import { blogUrl, centerUrl, labTestUrl, nonLabTestUrl } from "@/lib/urls";

export const revalidate = 3600;

const BASE = "https://cadabamsdiagnostics.com";

const SCAN_FAMILIES = [
  "lab-test",
  "xray-scan",
  "mri-scan",
  "ct-scan",
  "ultrasound-scan",
  "msk-scan",
  "pregnancy-scan",
  "preventive-health-checks",
] as const;

const STATIC_PATHS = [
  "",
  "/bangalore",
  "/blogs",
  "/about-us",
  "/management-team",
  "/clinical-team",
  "/contact-us",
  "/terms-of-use",
  "/privacy-policy",
  "/cookie-policy",
  "/refund-policy",
  "/legal",
];

/**
 * Plain-text sitemap served at /sitemap.txt — one absolute URL per line.
 * A valid sitemap format accepted by Google and Bing, kept in sync with the
 * same data sources as the XML sitemap.
 */
export function GET(): Response {
  const urls = new Set<string>();

  for (const p of STATIC_PATHS) urls.add(`${BASE}${p}`);
  for (const f of SCAN_FAMILIES) urls.add(`${BASE}/bangalore/${f}`);
  for (const c of getAllCenters()) urls.add(`${BASE}${centerUrl(c)}`);
  for (const t of getAllLabTests()) urls.add(`${BASE}${labTestUrl(t)}`);
  for (const t of getAllNonLabTests()) urls.add(`${BASE}${nonLabTestUrl(t)}`);
  for (const b of getAllBlogs()) urls.add(`${BASE}${blogUrl(b)}`);

  const body = Array.from(urls).join("\n") + "\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
