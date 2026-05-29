import { Sparkles } from "lucide-react";
import { CTAButton } from "@/components/shared/CTAButton";

interface DiscountStripeProps {
  title: string;
  code: string;
}

export function DiscountStripe({ title, code }: DiscountStripeProps) {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-gutter">
        <div className="bg-gradient-cta text-white rounded-2xl shadow-glow-soft px-6 py-8 sm:px-10 sm:py-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-pill bg-white/15 flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </span>
            <div>
              <p className="text-overline uppercase text-white/80 font-bold">
                Limited-time offer
              </p>
              <h2 className="text-h1 font-display">{title}</h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <code className="bg-white text-orange-600 font-bold tracking-wider px-4 py-2 rounded-md text-body select-all">
              {code}
            </code>
            <CTAButton href="/labtest" variant="secondary" size="md">
              Book now
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
