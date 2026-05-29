import Image from "next/image";
import type { HomeFeature } from "@/lib/data/homepages";

export function FeaturesBar({ features }: { features: HomeFeature[] }) {
  return (
    <section className="bg-cream-card border-y border-cream-line">
      <div className="mx-auto max-w-7xl px-gutter py-6 grid grid-cols-3 gap-4">
        {features.map((f) => (
          <div
            key={f.id}
            className="flex items-center justify-center gap-3 text-center sm:text-left"
          >
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src={f.icon}
                alt=""
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
            <p className="text-body-sm sm:text-body font-semibold text-ink-900">
              {f.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
