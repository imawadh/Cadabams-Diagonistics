import type { Metadata } from "next";
import { StaticPageShell } from "@/components/shared/StaticPageShell";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Cadabam's Diagnostics collects, uses, and protects your personal and health information.",
  alternates: {
    canonical: "https://cadabamsdiagnostics.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <StaticPageShell
      overline="Legal"
      title="Privacy policy"
      description="Your health information is sensitive. Here's exactly what we collect, why, and how we protect it."
    >
      <div className="space-y-6 text-body text-ink-700 leading-relaxed">
        <section>
          <h2 className="text-h2 font-bold text-ink-900 mb-2">
            What we collect
          </h2>
          <p>
            Identifying details you provide (name, phone, email, address),
            booking and appointment data, and clinical information generated
            during your tests and scans. We only collect what we need to
            deliver care.
          </p>
        </section>
        <section>
          <h2 className="text-h2 font-bold text-ink-900 mb-2">
            How we use it
          </h2>
          <p>
            To schedule appointments, deliver reports, contact you about
            results, and improve our services. We do not sell your data.
            Reports are shared only with you and (with your consent) your
            referring physician.
          </p>
        </section>
        <section>
          <h2 className="text-h2 font-bold text-ink-900 mb-2">
            How we protect it
          </h2>
          <p>
            Industry-standard encryption in transit and at rest, role-based
            access for our clinical team, and audit logs on every record
            access. Physical records are stored securely at our centres.
          </p>
        </section>
        <section>
          <h2 className="text-h2 font-bold text-ink-900 mb-2">Your rights</h2>
          <p>
            You can request a copy of your records, correct inaccurate data,
            or withdraw consent for non-clinical communication at any time.
            Email{" "}
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
