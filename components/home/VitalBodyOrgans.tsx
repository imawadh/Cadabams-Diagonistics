import Image from "next/image";
import Link from "next/link";
import { SectionOverline } from "@/components/shared/SectionOverline";
import type { NonLabTestCategory } from "@/lib/data/nonlabtests";
import { nonLabCategoryUrl } from "@/lib/urls";

interface VitalBodyOrgansProps {
  title: string;
  description?: string;
  categories: NonLabTestCategory[];
}

const FALLBACK = "/shared/image-1727884059139-383535423.webp";

export function VitalBodyOrgans({
  title,
  description,
  categories,
}: VitalBodyOrgansProps) {
  if (categories.length === 0) return null;

  return (
    <section className="py-12 lg:py-20 bg-cream-soft">
      <div className="mx-auto max-w-7xl px-gutter">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <SectionOverline className="mx-auto inline-block">
            By specialty
          </SectionOverline>
          <h2 className="text-h1 sm:text-display-2 text-ink-900 font-display mt-2">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-body text-ink-600 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((cat) => {
            const src = cat.image && cat.image.length > 0 ? cat.image : FALLBACK;
            return (
              <li key={cat.id}>
                <Link
                  href={nonLabCategoryUrl(cat.id)}
                  className="group flex flex-col items-center gap-3 focus-visible:outline-none"
                >
                  <div className="relative w-24 h-24 rounded-pill bg-cream-card shadow-sh-2 group-hover:shadow-glow-orange group-hover:-translate-y-1 transition-all duration-200 flex items-center justify-center overflow-hidden border-2 border-cream-line group-hover:border-orange-300">
                    <Image
                      src={src}
                      alt=""
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-body-sm font-semibold text-ink-900 group-hover:text-orange-600 transition-colors text-center">
                    {cat.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
