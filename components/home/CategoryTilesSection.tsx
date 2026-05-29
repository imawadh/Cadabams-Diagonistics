import Image from "next/image";
import Link from "next/link";
import { SectionOverline } from "@/components/shared/SectionOverline";

export interface CategoryTile {
  id: string;
  name: string;
  image: string;
  href: string;
}

interface CategoryTilesSectionProps {
  overline?: string;
  title: string;
  description?: string;
  tiles: CategoryTile[];
}

const FALLBACK = "/shared/image-1727884059139-383535423.webp";

export function CategoryTilesSection({
  overline,
  title,
  description,
  tiles,
}: CategoryTilesSectionProps) {
  if (tiles.length === 0) return null;
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-gutter">
        {overline && <SectionOverline>{overline}</SectionOverline>}
        <h2 className="text-h1 sm:text-display-2 text-ink-900 font-display max-w-2xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-body text-ink-600 max-w-2xl">{description}</p>
        )}
        <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {tiles.map((tile) => (
            <li key={tile.id}>
              <Link
                href={tile.href}
                className="group block bg-cream-card rounded-lg shadow-sh-2 hover:shadow-sh-3 transition-shadow duration-200 p-4 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                <div className="relative w-16 h-16 mx-auto mb-3">
                  <Image
                    src={tile.image && tile.image.length > 0 ? tile.image : FALLBACK}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </div>
                <p className="text-body-sm font-semibold text-ink-900 group-hover:text-orange-600 transition-colors">
                  {tile.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
