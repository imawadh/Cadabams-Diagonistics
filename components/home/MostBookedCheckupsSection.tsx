import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Stethoscope, Sparkles } from "lucide-react";
import { SectionOverline } from "@/components/shared/SectionOverline";
import { getNonLabTestById } from "@/lib/data/nonlabtests";
import {
  nonLabCategoryUrl,
  nonLabTestUrl,
  normalizeInternalHref,
} from "@/lib/urls";
import type { HomeMostBookedCheckups } from "@/lib/data/homepages";
import { cn } from "@/lib/utils";

interface MostBookedCheckupsSectionProps {
  block: HomeMostBookedCheckups;
}

function resolveCheckupHref(
  checkupHref: string,
  categoryId: string | undefined,
): string {
  const test = getNonLabTestById(checkupHref);
  if (test) return nonLabTestUrl(test);
  if (categoryId) return nonLabCategoryUrl(categoryId);
  return normalizeInternalHref(checkupHref);
}

/** Three tile-background variations cycled across the grid for warm depth. */
const TILE_TONES = [
  "bg-gradient-to-br from-orange-500 via-orange-500 to-orange-600",
  "bg-gradient-to-br from-coral-400 via-coral-400 to-orange-500",
  "bg-gradient-to-br from-orange-600 via-orange-700 to-ink-800",
];

export function MostBookedCheckupsSection({
  block,
}: MostBookedCheckupsSectionProps) {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-cream-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-1/3 w-[28rem] h-[28rem] rounded-pill bg-gradient-to-br from-orange-200/40 to-coral-300/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-20 w-96 h-96 rounded-pill bg-gradient-to-tr from-pink-200/30 to-orange-200/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-gutter grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:items-start">
        <div className="lg:sticky lg:top-24 space-y-6">
          <SectionOverline>Radiology</SectionOverline>

          <h2 className="text-h1 sm:text-display-2 lg:text-display-1 text-ink-900 font-display leading-[1.1]">
            We specialise in{" "}
            <span className="relative inline-block text-orange-600">
              Radiology
              <span
                aria-hidden
                className="absolute left-0 bottom-1 w-full h-2.5 bg-orange-200/70 -z-10 rounded-sm"
              />
            </span>
          </h2>

          {block.description && (
            <p className="text-body text-ink-600 leading-relaxed max-w-md">
              {block.description}
            </p>
          )}

          {block.viewAllCheckup && (
            <div className="pt-1">
              <Link
                href={normalizeInternalHref(block.viewAllCheckup)}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-pill px-6 py-3 shadow-glow-orange transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-bg"
              >
                View all radiology
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          <div className="flex items-start gap-3 bg-cream-card rounded-2xl border border-cream-line shadow-sh-2 p-4 max-w-md mt-2">
            <span className="w-11 h-11 rounded-pill bg-gradient-cta text-white inline-flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <p className="text-body-sm font-bold text-ink-900 leading-snug">
                Bangalore&apos;s most advanced machines
              </p>
              <p className="text-meta text-ink-600 mt-0.5">
                3T MRI, multi-slice CT, 3D/4D fetal imaging.
              </p>
            </div>
          </div>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-5">
          {block.checkups.map((c, i) => {
            const href = resolveCheckupHref(c.href, c.catid);
            const tone = TILE_TONES[i % TILE_TONES.length];
            return (
              <li key={c.id}>
                <Link
                  href={href}
                  className={cn(
                    "group relative block aspect-square rounded-2xl overflow-hidden text-white shadow-sh-2 hover:shadow-glow-orange hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-bg",
                    tone,
                  )}
                >
                  <span
                    aria-hidden
                    className="absolute -top-12 -right-12 w-32 h-32 rounded-pill bg-white/10 group-hover:scale-125 transition-transform duration-500"
                  />
                  <span
                    aria-hidden
                    className="absolute -bottom-16 -left-10 w-28 h-28 rounded-pill bg-white/5 group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="relative h-full p-5 flex flex-col justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-cream-card shadow-sh-2 inline-flex items-center justify-center overflow-hidden">
                      {c.icon && c.icon.length > 0 ? (
                        <Image
                          src={c.icon}
                          alt=""
                          width={36}
                          height={36}
                          className="object-contain"
                        />
                      ) : (
                        <Stethoscope className="w-7 h-7 text-orange-600" />
                      )}
                    </div>

                    <div>
                      <h3 className="text-h3 sm:text-h2 font-bold leading-tight">
                        {c.title}
                      </h3>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-meta font-semibold text-white/90 group-hover:text-white">
                        Explore
                        <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
