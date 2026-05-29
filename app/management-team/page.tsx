import type { Metadata } from "next";
import { StaticPageShell } from "@/components/shared/StaticPageShell";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Management team",
  description:
    "The leadership team behind Cadabam's Diagnostics — clinicians, operators, and quality leads who set the standard for diagnostic care in Bangalore.",
  alternates: {
    canonical: "https://cadabamsdiagnostics.com/management-team",
  },
};

export default function ManagementTeamPage() {
  return (
    <StaticPageShell
      overline="Management"
      title="The team behind Cadabam's Diagnostics"
      description="Clinicians, operators, and quality leads who built this network — and continue to raise the bar for diagnostic care across Bangalore."
    >
      <div className="space-y-6 text-body text-ink-700 leading-relaxed">
        <p>
          Cadabam&apos;s Diagnostics is led by a multidisciplinary team that
          blends clinical expertise with operational rigour. From day-to-day
          centre operations to long-term clinical strategy, our leadership
          works closely with the medical team to keep patient outcomes at the
          centre of every decision.
        </p>
        <div className="bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line p-6 sm:p-8">
          <h2 className="text-h2 font-bold text-ink-900">
            What our leadership focuses on
          </h2>
          <ul className="mt-4 space-y-3 text-body-sm text-ink-700">
            <li>
              <span className="font-semibold text-ink-900">
                Clinical governance.
              </span>{" "}
              Regular peer review, double-blind reporting on critical
              imaging, and ongoing CME for every clinician.
            </li>
            <li>
              <span className="font-semibold text-ink-900">
                Quality &amp; accreditation.
              </span>{" "}
              NABL-aligned lab processes, calibrated equipment, and
              reproducible reference ranges across centres.
            </li>
            <li>
              <span className="font-semibold text-ink-900">
                Patient experience.
              </span>{" "}
              Transparent pricing, predictable report timelines, and a
              dedicated team for home sample collection.
            </li>
            <li>
              <span className="font-semibold text-ink-900">
                Technology &amp; data.
              </span>{" "}
              Digital reports via WhatsApp and email, secure record-keeping,
              and a referral workflow that respects your data.
            </li>
          </ul>
        </div>
        <p>
          Detailed profiles of our leadership team are available on request.
          For partnerships, press, or governance enquiries, please reach out
          via the{" "}
          <a
            href="/contact-us"
            className="text-orange-600 font-semibold underline underline-offset-2 decoration-orange-300 hover:decoration-orange-600"
          >
            contact page
          </a>
          .
        </p>
      </div>
    </StaticPageShell>
  );
}
