import type { Metadata } from "next";
import { StaticPageShell } from "@/components/shared/StaticPageShell";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "Terms of use for Cadabam's Diagnostics — the rules and conditions that apply when you use our website and services.",
  alternates: { canonical: "https://cadabamsdiagnostics.com/terms-of-use" },
};

export default function TermsOfUsePage() {
  return (
    <StaticPageShell
      overline="Legal"
      title="Terms of use"
      description="These terms govern your use of cadabamsdiagnostics.com and any services booked through it."
    >
      <div className="space-y-6 text-body text-ink-700 leading-relaxed">
        <section>
          <h2 className="text-h2 font-bold text-ink-900 mb-2">
            1. Acceptance of terms
          </h2>
          <p>
            By accessing or using this website, you agree to be bound by these
            terms. If you do not agree, please do not use the site.
          </p>
        </section>
        <section>
          <h2 className="text-h2 font-bold text-ink-900 mb-2">
            2. Use of the website
          </h2>
          <p>
            The content on this site is for general information about our
            diagnostic services and should not be treated as medical advice.
            Always consult a qualified clinician for diagnosis and treatment.
          </p>
        </section>
        <section>
          <h2 className="text-h2 font-bold text-ink-900 mb-2">
            3. Bookings and payments
          </h2>
          <p>
            Bookings made through this site are subject to availability,
            confirmation, and our cancellation and refund policy. Prices are
            shown in INR and may change without notice.
          </p>
        </section>
        <section>
          <h2 className="text-h2 font-bold text-ink-900 mb-2">
            4. Intellectual property
          </h2>
          <p>
            All content, branding, photography, and reports remain the property
            of Cadabam&apos;s Diagnostics or its licensors. You may not
            reproduce or distribute without prior written consent.
          </p>
        </section>
        <section>
          <h2 className="text-h2 font-bold text-ink-900 mb-2">
            5. Contact
          </h2>
          <p>
            Questions about these terms? Email{" "}
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
