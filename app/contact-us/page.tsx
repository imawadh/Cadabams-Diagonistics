import type { Metadata } from "next";
import { StaticPageShell } from "@/components/shared/StaticPageShell";
import { ContactFormSection } from "@/components/home/ContactFormSection";
import { getAllCenters } from "@/lib/data/centers";
import { getNavbar } from "@/lib/data/navbars";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Get in touch with Cadabam's Diagnostics. Phone, email, WhatsApp, and addresses for all our Bangalore centres.",
  alternates: { canonical: "https://cadabamsdiagnostics.com/contact-us" },
};

export default function ContactUsPage() {
  const navbar = getNavbar();
  const centers = getAllCenters();
  const primaryCenter = centers[0];

  return (
    <>
      <StaticPageShell
        overline="Contact"
        title="We're here to help"
        description="Phone, email, or a quick form — pick whatever's easiest. Our team usually replies within an hour during business hours."
        bodyMaxWidth="max-w-7xl"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {centers.map((c) => {
            const phone = c.center_info.phone.split(",")[0]?.trim() ?? "";
            return (
              <article
                key={c.id}
                className="bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line p-6"
              >
                <p className="text-overline uppercase text-orange-600 font-bold">
                  {c.basic_info.area
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (ch) => ch.toUpperCase())}
                </p>
                <h2 className="text-h3 font-bold text-ink-900 mt-1 leading-snug">
                  {c.basic_info.center_name}
                </h2>
                <p className="mt-3 text-body-sm text-ink-700 leading-relaxed">
                  {c.center_info.address}
                </p>
                <div className="mt-4 space-y-1.5 text-body-sm">
                  {phone && (
                    <p>
                      <span className="text-ink-500">Phone: </span>
                      <a
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        className="text-orange-600 hover:text-orange-700 font-semibold"
                      >
                        {phone}
                      </a>
                    </p>
                  )}
                  {c.center_info.email && (
                    <p>
                      <span className="text-ink-500">Email: </span>
                      <a
                        href={`mailto:${c.center_info.email}`}
                        className="text-orange-600 hover:text-orange-700 font-semibold break-all"
                      >
                        {c.center_info.email}
                      </a>
                    </p>
                  )}
                </div>
                {c.working_hours.weekdays && (
                  <p className="mt-3 text-meta text-ink-500">
                    Mon–Sat {c.working_hours.weekdays.start}–
                    {c.working_hours.weekdays.end}
                    {c.working_hours.sunday && (
                      <>
                        {" · "}Sun {c.working_hours.sunday.start}–
                        {c.working_hours.sunday.end}
                      </>
                    )}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </StaticPageShell>
      <ContactFormSection
        logo={navbar.content.logo}
        phone={primaryCenter?.center_info.phone.split(",")[0]?.trim()}
        email={primaryCenter?.center_info.email}
        address={primaryCenter?.center_info.address}
      />
    </>
  );
}
