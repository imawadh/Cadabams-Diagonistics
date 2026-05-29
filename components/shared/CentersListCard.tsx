import Link from "next/link";
import { Building2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CentersListItem {
  name: string;
  slug: string;
}

interface CentersListCardProps {
  centers: CentersListItem[];
  /** Slug of the currently-viewed centre (highlighted, no link). */
  activeSlug?: string | null;
  /** Override card heading. */
  heading?: string;
  className?: string;
}

export function CentersListCard({
  centers,
  activeSlug = null,
  heading = "Visit our centres",
  className,
}: CentersListCardProps) {
  if (!centers || centers.length === 0) return null;

  return (
    <section
      className={cn(
        "bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line overflow-hidden",
        className,
      )}
    >
      <div className="px-5 py-3 border-b border-cream-line">
        <p className="text-meta font-bold text-ink-700 uppercase tracking-overline">
          {heading}
        </p>
      </div>
      <ul className="divide-y divide-cream-line">
        {centers.map((c) => {
          const isActive = activeSlug === c.slug;
          const content = (
            <>
              <span
                className={cn(
                  "w-8 h-8 inline-flex items-center justify-center rounded-pill flex-shrink-0 transition-colors",
                  isActive
                    ? "bg-orange-100 text-orange-700"
                    : "bg-orange-50 text-orange-600 group-hover:bg-orange-100",
                )}
              >
                <Building2 className="w-4 h-4" />
              </span>
              <span
                className={cn(
                  "flex-1 line-clamp-2 leading-snug",
                  isActive ? "text-orange-700" : "text-ink-900",
                )}
              >
                {c.name}
              </span>
              <ChevronRight
                className={cn(
                  "w-4 h-4 flex-shrink-0 transition-all",
                  isActive
                    ? "text-orange-600"
                    : "text-ink-300 group-hover:text-orange-600 group-hover:translate-x-0.5",
                )}
              />
            </>
          );
          return (
            <li key={c.slug}>
              {isActive ? (
                <div
                  aria-current="page"
                  className="flex items-center gap-3 px-5 py-3 text-body-sm font-semibold bg-orange-50/60"
                >
                  {content}
                </div>
              ) : (
                <Link
                  href={`/bangalore/center/${c.slug}`}
                  className="group flex items-center gap-3 px-5 py-3 text-body-sm font-semibold text-ink-900 hover:bg-cream-soft hover:text-orange-700 transition-colors"
                >
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
