import { Clock, Smile, Star, BadgeCheck } from "lucide-react";

const STATS = [
  { value: "60", label: "Mins Home Collection", Icon: Clock },
  { value: "1M", label: "Happy Customers", Icon: Smile },
  { value: "4.9", label: "Google Rating", Icon: Star },
  { value: "5", label: "Certified Labs", Icon: BadgeCheck },
] as const;

export function LabStats() {
  return (
    <section
      aria-label="Lab statistics"
      className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4"
    >
      {STATS.map(({ value, label, Icon }) => (
        <div
          key={label}
          className="bg-cream-card rounded-xl sm:rounded-2xl border border-cream-line shadow-sh-1 p-3 sm:p-4 lg:p-5 flex items-center gap-2.5 sm:gap-3 lg:gap-4"
        >
          <span className="w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 inline-flex items-center justify-center rounded-pill bg-orange-50 text-orange-600 flex-shrink-0">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
          </span>
          <div className="min-w-0">
            <p className="text-h3 sm:text-h2 lg:text-display-2 font-display font-extrabold text-orange-600 leading-none">
              {value}
            </p>
            <p className="text-caption sm:text-meta lg:text-body-sm text-ink-600 font-medium mt-0.5 sm:mt-1 truncate">
              {label}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
