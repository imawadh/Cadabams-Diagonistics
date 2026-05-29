import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, FlaskConical, Activity } from "lucide-react";
import { getAllCenters } from "@/lib/data/centers";
import { centerUrl } from "@/lib/urls";
import { StaticPageShell } from "@/components/shared/StaticPageShell";
import { SectionOverline } from "@/components/shared/SectionOverline";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Cadabam's Diagnostics in Bangalore",
  description:
    "Lab tests, radiology, and health checkups across Bangalore. Five centres, certified labs, advanced imaging, and home sample collection.",
  alternates: { canonical: "https://cadabamsdiagnostics.com/bangalore" },
};

const SCAN_FAMILIES = [
  { slug: "lab-test", label: "Lab Tests", Icon: FlaskConical },
  { slug: "xray-scan", label: "X-Ray scans", Icon: Activity },
  { slug: "mri-scan", label: "MRI scans", Icon: Activity },
  { slug: "ct-scan", label: "CT scans", Icon: Activity },
  { slug: "ultrasound-scan", label: "Ultrasound scans", Icon: Activity },
  { slug: "pregnancy-scan", label: "Pregnancy scans", Icon: Activity },
  { slug: "msk-scan", label: "MSK scans", Icon: Activity },
];

const FALLBACK = "/shared/image-1727884059139-383535423.webp";

export default function BangaloreLandingPage() {
  const centers = getAllCenters();

  return (
    <StaticPageShell
      overline="Diagnostic services in Bangalore"
      title="Accurate diagnostics across Bangalore"
      description="Five Cadabam's centres, advanced imaging, certified labs, and home sample collection — designed for the way Bangalore lives."
      bodyMaxWidth="max-w-7xl"
    >
      <section className="mb-12">
        <SectionOverline>What you can book</SectionOverline>
        <h2 className="text-h1 font-display text-ink-900 mt-1 mb-6">
          Services
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {SCAN_FAMILIES.map(({ slug, label, Icon }) => (
            <Link
              key={slug}
              href={`/bangalore/${slug}`}
              className="group block rounded-2xl bg-cream-card border border-cream-line shadow-sh-1 hover:shadow-sh-3 hover:border-orange-200 hover:-translate-y-0.5 transition-all duration-200 p-5"
            >
              <div className="w-11 h-11 rounded-pill bg-orange-50 inline-flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-body font-bold text-ink-900 group-hover:text-orange-600 transition-colors">
                {label}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-meta font-semibold text-orange-600">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionOverline>Our centres</SectionOverline>
        <h2 className="text-h1 font-display text-ink-900 mt-1 mb-6">
          Find a centre near you
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {centers.map((c) => {
            const src =
              c.basic_info.center_image && c.basic_info.center_image.length > 0
                ? c.basic_info.center_image
                : FALLBACK;
            return (
              <li key={c.id}>
                <Link
                  href={centerUrl(c)}
                  className="group block bg-cream-card rounded-2xl border border-cream-line shadow-sh-2 hover:shadow-sh-3 transition-all duration-200 overflow-hidden h-full"
                >
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={src}
                      alt={c.basic_info.center_name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-overline uppercase text-orange-600 font-bold">
                      {c.basic_info.area
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (ch) => ch.toUpperCase())}
                    </p>
                    <h3 className="text-h3 font-bold text-ink-900 mt-1 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {c.basic_info.center_name}
                    </h3>
                    <p className="mt-2 text-body-sm text-ink-600 line-clamp-2">
                      {c.center_info.address}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-meta font-semibold text-orange-600">
                      <Building2 className="w-3.5 h-3.5" />
                      View centre
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </StaticPageShell>
  );
}
