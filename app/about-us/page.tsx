import type { Metadata } from "next";
import { StaticPageShell } from "@/components/shared/StaticPageShell";
import { Activity, Award, HeartPulse, Microscope, Users } from "lucide-react";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "About us",
  description:
    "Cadabam's Diagnostics is a network of advanced diagnostic centres across Bangalore offering lab tests, radiology, and health checkups — backed by certified specialists and modern equipment.",
  alternates: { canonical: "https://cadabamsdiagnostics.com/about-us" },
};

const PILLARS = [
  {
    Icon: Microscope,
    title: "Advanced equipment",
    body: "3T MRI, multi-slice CT, GE Healthcare X-ray, high-resolution ultrasound — calibrated and serviced regularly.",
  },
  {
    Icon: Award,
    title: "Certified labs",
    body: "NABL-aligned quality controls, double-blind review on critical tests, and consistent reference ranges across centres.",
  },
  {
    Icon: HeartPulse,
    title: "Patient-first care",
    body: "Reports in 6 hours for most lab tests, gentle staff, transparent pricing, and home sample collection when you need it.",
  },
  {
    Icon: Activity,
    title: "Specialist-led",
    body: "Reports reviewed by radiologists with 15–25 years of fetal medicine, MSK imaging, and diagnostic experience.",
  },
];

export default function AboutUsPage() {
  return (
    <StaticPageShell
      overline="Our story"
      title="Accurate diagnostics, compassionate care"
      description="Cadabam's Diagnostics is a network of advanced diagnostic centres across Bangalore. We combine modern equipment, certified labs, and specialist-led reporting so you get answers you can trust — fast."
    >
      <div className="space-y-10 text-body text-ink-700 leading-relaxed">
        <p>
          We started Cadabam&apos;s Diagnostics with a simple idea: accessing
          vital health insights shouldn&apos;t mean sacrificing comfort. From
          routine blood work to advanced MRI imaging, every test should be
          handled with care, accuracy, and respect for your time.
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {PILLARS.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line p-6"
            >
              <div className="w-11 h-11 rounded-pill bg-orange-50 inline-flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-h3 font-bold text-ink-900">{title}</h2>
              <p className="mt-2 text-body-sm text-ink-600">{body}</p>
            </div>
          ))}
        </div>

        <div className="bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="w-11 h-11 rounded-pill bg-gradient-cta text-white inline-flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-h2 font-bold text-ink-900">
                Trusted by 10,000+ patients
              </h2>
              <p className="mt-2 text-body text-ink-700">
                With five centres across Bangalore — Banashankari, Kanakapura
                Road, Indiranagar, Jayanagar, and Kalyan Nagar — and a
                home-collection network that covers the city, we&apos;re built to
                meet you where you are.
              </p>
            </div>
          </div>
        </div>
      </div>
    </StaticPageShell>
  );
}
