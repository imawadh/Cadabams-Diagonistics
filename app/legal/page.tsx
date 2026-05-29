import type { Metadata } from "next";
import Link from "next/link";
import { StaticPageShell } from "@/components/shared/StaticPageShell";
import { ChevronRight } from "lucide-react";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Legal",
  description:
    "Legal information, disclaimers, and policy index for Cadabam's Diagnostics.",
  alternates: { canonical: "https://cadabamsdiagnostics.com/legal" },
};

const LINKS = [
  { href: "/terms-of-use", label: "Terms of use" },
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/cookie-policy", label: "Cookie policy" },
  { href: "/refund-policy", label: "Refund & cancellation policy" },
];

export default function LegalPage() {
  return (
    <StaticPageShell
      overline="Legal"
      title="Legal information"
      description="Quick links to our policies, plus important disclaimers about the use of this site and our services."
    >
      <div className="space-y-8 text-body text-ink-700 leading-relaxed">
        <section>
          <h2 className="text-h2 font-bold text-ink-900 mb-3">Our policies</h2>
          <ul className="bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line divide-y divide-cream-line overflow-hidden">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="flex items-center justify-between gap-2 px-5 py-4 text-body font-medium text-ink-900 hover:bg-cream-soft hover:text-orange-600 transition-colors"
                >
                  {l.label}
                  <ChevronRight className="w-4 h-4 text-orange-600" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-h2 font-bold text-ink-900 mb-2">
            Medical disclaimer
          </h2>
          <p>
            Information on this site is for general awareness about our
            diagnostic services. It is not a substitute for professional
            medical advice. Always consult a qualified clinician for
            diagnosis, treatment, or interpretation of your results.
          </p>
        </section>

        <section>
          <h2 className="text-h2 font-bold text-ink-900 mb-2">
            Entity details
          </h2>
          <p>
            Cadabam&apos;s Diagnostics is operated by Cadabams Health Care
            Pvt. Ltd. For corporate enquiries, write to{" "}
            <a
              href="mailto:info@cadabamsdiagnostics.com"
              className="text-orange-600 font-semibold underline underline-offset-2 decoration-orange-300 hover:decoration-orange-600"
            >
              info@cadabamsdiagnostics.com
            </a>
            .
          </p>
        </section>
      </div>
    </StaticPageShell>
  );
}
