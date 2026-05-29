import type { Metadata } from "next";
import Image from "next/image";
import { getAllCenters } from "@/lib/data/centers";
import { StaticPageShell } from "@/components/shared/StaticPageShell";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Clinical team",
  description:
    "Meet the radiologists, fetal medicine specialists, and clinical experts behind Cadabam's Diagnostics across our Bangalore centres.",
  alternates: { canonical: "https://cadabamsdiagnostics.com/clinical-team" },
};

const FALLBACK = "/shared/image-1727884059139-383535423.webp";

export default function ClinicalTeamPage() {
  // Dedupe team members across centres by name + designation.
  const seen = new Set<string>();
  const team = getAllCenters()
    .flatMap((c) => c.team)
    .filter((m) => m.name && m.name.trim().length > 0)
    .filter((m) => {
      const key = `${m.name}|${m.designation}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  return (
    <StaticPageShell
      overline="Clinical team"
      title="Specialists you can trust"
      description="Our radiologists and clinical experts bring decades of combined experience in fetal medicine, musculoskeletal imaging, and diagnostic radiology."
      bodyMaxWidth="max-w-7xl"
    >
      {team.length === 0 ? (
        <p className="text-body text-ink-500">
          Team information will be available shortly.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((m) => {
            const src = m.image && m.image.length > 0 ? m.image : FALLBACK;
            return (
              <li key={m.id}>
                <article className="bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line p-6 h-full">
                  <div className="relative w-24 h-24 rounded-pill overflow-hidden bg-cream-soft mx-auto mb-4 shadow-sh-1">
                    <Image
                      src={src}
                      alt={m.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <h2 className="text-h3 font-bold text-ink-900 text-center">
                    {m.name}
                  </h2>
                  <p className="mt-2 text-meta text-orange-600 font-semibold text-center">
                    {m.designation}
                  </p>
                  {m.qualification && (
                    <p className="mt-2 text-meta text-ink-600 text-center">
                      {m.qualification}
                    </p>
                  )}
                  {m.experience && (
                    <p className="mt-1 text-meta text-ink-500 text-center">
                      {m.experience} experience
                    </p>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </StaticPageShell>
  );
}
