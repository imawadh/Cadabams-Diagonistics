import type { Metadata } from "next";
import { StaticPageShell } from "@/components/shared/StaticPageShell";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Refund policy",
  description:
    "How refunds and cancellations work at Cadabam's Diagnostics for lab tests, scans, and health checkups.",
  alternates: { canonical: "https://cadabamsdiagnostics.com/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <StaticPageShell
      overline="Legal"
      title="Refund &amp; cancellation policy"
      description="Plans change. Here's how we handle cancellations and refunds for bookings made through Cadabam's Diagnostics."
    >
      <div className="space-y-6 text-body text-ink-700 leading-relaxed">
        <section>
          <h2 className="text-h2 font-bold text-ink-900 mb-2">
            Cancellations
          </h2>
          <p>
            You can cancel any test or scan booking up to 2 hours before your
            scheduled appointment for a full refund. Cancellations within 2
            hours, or no-shows, are not refunded.
          </p>
        </section>
        <section>
          <h2 className="text-h2 font-bold text-ink-900 mb-2">Rescheduling</h2>
          <p>
            Rescheduling is free up to 1 hour before your appointment. To
            reschedule, call us on +91 99006 64696 or reply to your booking
            confirmation.
          </p>
        </section>
        <section>
          <h2 className="text-h2 font-bold text-ink-900 mb-2">
            Refund timelines
          </h2>
          <p>
            Refunds are processed within 5–7 business days back to your
            original payment method. UPI and card refunds are usually faster.
          </p>
        </section>
        <section>
          <h2 className="text-h2 font-bold text-ink-900 mb-2">
            Test-result disputes
          </h2>
          <p>
            If you believe a result is incorrect, contact us within 7 days. We
            will retest at no additional cost. We do not refund the original
            test fee for clinically valid results.
          </p>
        </section>
      </div>
    </StaticPageShell>
  );
}
