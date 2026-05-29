import Link from "next/link";
import {
  ChevronRight,
  Clock,
  FlaskConical,
  ShoppingCart,
} from "lucide-react";

export interface FeaturedTestCard {
  id: string;
  name: string;
  href: string;
  reportsWithin: string;
  price: number;
  discountedPrice: number;
  discountPct: number;
  /** "Lab Test" or "Center Visit Only". */
  kind: string;
}

interface FeaturedTestsSliderProps {
  title: string;
  cards: FeaturedTestCard[];
}

function normaliseReportTime(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  // Compact runs like "60mins" -> "60 mins", "6hours" -> "6 hours"
  return trimmed.replace(/^(\d+)\s*(min|minute|hour|hr|day)s?$/i, (_, n, u) => {
    const unit = u.toLowerCase().startsWith("min")
      ? "mins"
      : u.toLowerCase().startsWith("hour") || u.toLowerCase().startsWith("hr")
        ? "hours"
        : `${u.toLowerCase()}s`;
    return `${n} ${unit}`;
  });
}

export function FeaturedTestsSlider({
  title,
  cards,
}: FeaturedTestsSliderProps) {
  if (cards.length === 0) return null;

  return (
    <section className="py-12 lg:py-16 bg-cream-soft">
      <div className="mx-auto max-w-7xl px-gutter">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-overline uppercase text-orange-600 font-bold mb-2">
              Most booked
            </p>
            <h2 className="text-h1 sm:text-display-2 text-ink-900 font-display">
              {title}
            </h2>
          </div>
          <Link
            href="/bangalore/lab-test"
            className="hidden sm:inline-flex items-center gap-1 text-body-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
          >
            See all tests
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cards.map((card) => {
            const showStrike =
              card.discountPct > 0 && card.price > card.discountedPrice;
            const report = normaliseReportTime(card.reportsWithin);
            return (
              <article
                key={card.id}
                className="group relative bg-cream-card rounded-xl shadow-sh-2 hover:shadow-sh-3 border border-cream-line hover:border-orange-200 transition-all duration-200 overflow-hidden hover:-translate-y-0.5"
              >
                <span
                  aria-hidden
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-cta"
                />

                {card.discountPct > 0 && (
                  <span className="absolute top-3.5 right-3.5 bg-orange-500 text-white text-meta font-bold rounded-pill px-2.5 py-1 shadow-glow-orange">
                    {card.discountPct}% off
                  </span>
                )}

                <div className="p-6 pt-7">
                  <div className="w-11 h-11 rounded-pill bg-orange-50 inline-flex items-center justify-center mb-4">
                    <FlaskConical className="w-5 h-5 text-orange-600" />
                  </div>

                  <h3 className="text-h3 text-ink-900 font-bold leading-tight mb-3 line-clamp-2 min-h-[2.4em]">
                    <Link
                      href={card.href}
                      className="hover:text-orange-600 transition-colors focus-visible:outline-none focus-visible:underline"
                    >
                      {card.name}
                    </Link>
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 text-meta mb-4">
                    <span className="inline-flex items-center gap-1.5 text-ink-600">
                      <Clock className="w-3.5 h-3.5 text-orange-500" />
                      Reports in {report}
                    </span>
                    <span aria-hidden className="text-ink-300">
                      ·
                    </span>
                    <span className="font-semibold text-orange-700">
                      {card.kind}
                    </span>
                  </div>

                  <div className="h-px bg-cream-line mb-4" />

                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="text-display-2 font-extrabold text-orange-600 leading-none">
                      ₹{card.discountedPrice.toLocaleString("en-IN")}
                    </span>
                    {showStrike && (
                      <span className="text-body-sm text-ink-400 line-through">
                        ₹{card.price.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <Link
                      href="/cart"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-pill bg-orange-500 text-white font-semibold text-body-sm shadow-glow-orange hover:bg-orange-600 transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-card"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to cart
                    </Link>
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-1 text-body-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors focus-visible:outline-none focus-visible:underline group/link"
                    >
                      View details
                      <ChevronRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
