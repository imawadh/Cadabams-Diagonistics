import type { Metadata } from "next";
import { StaticPageShell } from "@/components/shared/StaticPageShell";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "How Cadabam's Diagnostics uses cookies and similar technologies on this website.",
  alternates: { canonical: "https://cadabamsdiagnostics.com/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <StaticPageShell
      overline="Legal"
      title="Cookie policy"
      description="What cookies we set, what they do, and how you can control them."
    >
      <div className="space-y-6 text-body text-ink-700 leading-relaxed">
        <section>
          <h2 className="text-h2 font-bold text-ink-900 mb-2">
            What cookies are
          </h2>
          <p>
            Cookies are small text files placed on your device that help
            websites remember you between visits. We use them to make this
            site work, to remember preferences, and to understand which pages
            are most useful.
          </p>
        </section>
        <section>
          <h2 className="text-h2 font-bold text-ink-900 mb-2">
            What we use
          </h2>
          <ul className="space-y-2 list-disc ml-6">
            <li>
              <span className="font-semibold text-ink-900">Essential cookies </span>
              that keep you signed in to your cart and remember your selected
              centre.
            </li>
            <li>
              <span className="font-semibold text-ink-900">Analytics cookies </span>
              to understand which pages and tests are most viewed (aggregate,
              not personal).
            </li>
            <li>
              <span className="font-semibold text-ink-900">Marketing pixels </span>
              from advertising platforms when you arrive from a paid ad — used
              to measure effectiveness, never to identify you.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="text-h2 font-bold text-ink-900 mb-2">
            Managing cookies
          </h2>
          <p>
            You can clear or block cookies through your browser settings.
            Blocking essential cookies may break booking flows.
          </p>
        </section>
      </div>
    </StaticPageShell>
  );
}
