import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { cn } from "@/lib/utils";

export interface TestCardProps {
  name: string;
  /** Local path (e.g. /lab-tests/image-xxx.webp) or a fallback URL. */
  image?: string | null;
  /** Discounted/current price shown prominently. */
  price: number;
  /** Original (struck-through) price, shown only if higher than `price`. */
  originalPrice?: number;
  /** Optional metadata under the title. */
  parameters?: number;
  reportTime?: string;
  /** Full href to the detail page, e.g. /bangalore/lab-test/<slug>. */
  href: string;
  className?: string;
}

const FALLBACK_IMAGE = "/shared/image-1727884059139-383535423.webp";

export function TestCard({
  name,
  image,
  price,
  originalPrice,
  parameters,
  reportTime,
  href,
  className,
}: TestCardProps) {
  const showOriginal =
    typeof originalPrice === "number" && originalPrice > price;
  const discountPct =
    showOriginal && originalPrice
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;
  const src = image && image.length > 0 ? image : FALLBACK_IMAGE;

  return (
    <article
      className={cn(
        "group bg-cream-card rounded-2xl border border-cream-line shadow-sh-1 hover:shadow-sh-3 hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden h-full",
        className,
      )}
    >
      <Link
        href={href}
        aria-label={name}
        className="relative aspect-[4/3] block overflow-hidden bg-cream-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
      >
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-900/30 to-transparent"
        />
        {discountPct > 0 && (
          <span className="absolute top-3 left-3 inline-flex items-center rounded-pill bg-coral-400 text-white text-caption font-bold px-2.5 py-1 shadow-sh-1">
            {discountPct}% OFF
          </span>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-h3 text-ink-900 font-bold leading-snug line-clamp-2 min-h-[2.8rem]">
          <Link
            href={href}
            className="hover:text-orange-600 transition-colors focus-visible:outline-none focus-visible:underline"
          >
            {name}
          </Link>
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-meta text-ink-500 min-h-[1.25rem]">
          {parameters !== undefined && (
            <span className="inline-flex items-center gap-1">
              <span className="w-1 h-1 rounded-pill bg-ink-300" />
              {parameters} parameters
            </span>
          )}
          {reportTime && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-ink-400" />
              {reportTime}
            </span>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-cream-line-soft flex items-end justify-between gap-3">
          <div className="flex flex-col">
            {showOriginal && (
              <span className="text-caption text-ink-400 line-through leading-none">
                ₹{originalPrice.toLocaleString("en-IN")}
              </span>
            )}
            <span className="text-h2 text-ink-900 font-extrabold leading-tight tracking-tight">
              ₹{price.toLocaleString("en-IN")}
            </span>
          </div>
          <CTAButton
            href={href}
            size="sm"
            variant="gradient"
            className="flex-shrink-0 gap-1.5 px-5 py-3 text-body-sm font-bold bg-gradient-cta shadow-glow-orange hover:brightness-110 hover:-translate-y-0.5 group/cta"
          >
            Book now
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-0.5" />
          </CTAButton>
        </div>
      </div>
    </article>
  );
}
