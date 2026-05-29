import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  ChevronRight,
  Sparkles,
  Stethoscope,
  GraduationCap,
  BriefcaseMedical,
  ShieldCheck,
  Users,
  Award,
  Phone,
} from "lucide-react";
import { getAllCenters } from "@/lib/data/centers";
import { ContactActionButton } from "@/components/shared/ContactActionButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Clinical team",
  description:
    "Meet the radiologists, fetal-medicine specialists, and clinical experts behind Cadabam's Diagnostics across our Bangalore centres.",
  alternates: { canonical: "https://cadabamsdiagnostics.com/clinical-team" },
};

interface Member {
  name: string;
  designation: string;
  qualification: string;
  experience: string;
  image: string;
}

/**
 * Normalise a doctor name so "Dr S Pradeep" and "Dr. S Pradeep" collapse to
 * the same key: lowercase, drop a leading Dr/Dr. honorific, strip punctuation,
 * and collapse whitespace.
 */
function nameKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/^dr\.?\s+/, "")
    .replace(/[.,]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Ensure the display name carries a clean "Dr. " honorific. */
function displayName(name: string): string {
  const bare = name.replace(/^dr\.?\s+/i, "").trim();
  return `Dr. ${bare}`;
}

function cleanExperience(exp: string): string {
  return exp
    .trim()
    .replace(/\s*(years?)\s*(experience)?$/i, "")
    .replace(/\+\s*$/, "+")
    .trim();
}

function getClinicalTeam(): Member[] {
  const byKey = new Map<string, Member>();
  for (const center of getAllCenters()) {
    for (const m of center.team ?? []) {
      const name = (m.name ?? "").trim();
      if (name.length === 0) continue;
      const key = nameKey(name);
      const candidate: Member = {
        name,
        designation: (m.designation ?? "").trim(),
        qualification: (m.qualification ?? "").trim(),
        experience: (m.experience ?? "").trim(),
        image: m.image ?? "",
      };
      const existing = byKey.get(key);
      if (!existing) {
        byKey.set(key, candidate);
        continue;
      }
      // Keep the richer record (prefer one that has an image, then longer
      // designation/qualification text).
      const score = (x: Member) =>
        (x.image ? 4 : 0) +
        (x.designation.length > 0 ? 2 : 0) +
        (x.qualification.length > 0 ? 1 : 0) +
        Math.min(x.designation.length + x.qualification.length, 100) / 100;
      if (score(candidate) > score(existing)) byKey.set(key, candidate);
    }
  }
  return Array.from(byKey.values());
}

export default function ClinicalTeamPage() {
  const team = getClinicalTeam();
  const centerCount = getAllCenters().filter(
    (c) => c.basic_info?.center_name?.trim().length > 0,
  ).length;

  return (
    <main className="bg-cream-bg min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-pill bg-white/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-32 w-[28rem] h-[28rem] rounded-pill bg-coral-400/30 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-gutter pt-5 pb-12 sm:pt-6 sm:pb-16 lg:pt-8 lg:pb-24">
          <Breadcrumb>
            <BreadcrumbList className="text-white/80">
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="inline-flex items-center gap-1 hover:text-white"
                >
                  <Home className="w-3.5 h-3.5" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/50" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white font-semibold">
                  Clinical team
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mt-6 sm:mt-8 max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-pill bg-white/15 backdrop-blur-md ring-1 ring-white/25 px-3 py-1 text-overline uppercase font-bold tracking-overline">
              <Stethoscope className="w-3.5 h-3.5" />
              Clinical Team
            </span>
            <h1 className="mt-4 text-h1 sm:text-display-2 lg:text-[52px] lg:leading-[1.05] font-display font-extrabold tracking-tight">
              Specialists you can trust with your health.
            </h1>
            <p className="mt-4 text-body sm:text-h3 text-white/90 leading-relaxed max-w-2xl">
              Our radiologists and clinical experts bring decades of combined
              experience in fetal medicine, musculoskeletal imaging, and
              diagnostic radiology — reviewing every report across {centerCount}{" "}
              centres in Bangalore.
            </p>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="mx-auto max-w-7xl px-gutter -mt-6 lg:-mt-10 relative z-10">
        <div className="bg-cream-card rounded-2xl shadow-sh-3 border border-cream-line p-4 lg:p-5 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          <MiniStat Icon={Users} value={`${team.length}`} label="Specialists" />
          <MiniStat Icon={Award} value="25+" label="Years of experience" />
          <MiniStat
            Icon={ShieldCheck}
            value="NABL"
            label="Accredited reporting"
          />
          <MiniStat Icon={Stethoscope} value="6 hrs" label="Report turnaround" />
        </div>
      </section>

      {/* Team grid */}
      <section className="mx-auto max-w-7xl px-gutter py-12 sm:py-14 lg:py-20">
        <div className="mb-8 sm:mb-10 max-w-2xl">
          <p className="text-overline uppercase text-orange-700 font-bold mb-2 tracking-overline">
            Meet the team
          </p>
          <h2 className="text-h1 sm:text-display-2 font-display font-extrabold text-ink-900 tracking-tight leading-tight">
            The people behind your reports.
          </h2>
        </div>

        {team.length === 0 ? (
          <p className="text-body text-ink-500">
            Team information will be available shortly.
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {team.map((m, i) => (
              <li key={`${nameKey(m.name)}-${i}`}>
                <article className="group bg-cream-card rounded-2xl shadow-sh-1 hover:shadow-sh-3 border border-cream-line hover:border-orange-200 transition-all duration-200 overflow-hidden h-full flex flex-col hover:-translate-y-0.5">
                  <div className="relative aspect-[4/3] bg-cream-soft overflow-hidden">
                    {m.image && m.image.startsWith("/") ? (
                      <Image
                        src={m.image}
                        alt={displayName(m.name)}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="w-20 h-20 inline-flex items-center justify-center rounded-pill bg-orange-50 text-orange-600">
                          <Stethoscope className="w-9 h-9" />
                        </span>
                      </div>
                    )}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-900/35 to-transparent"
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-h3 font-bold text-ink-900 leading-snug">
                      {displayName(m.name)}
                    </h3>
                    {m.designation && (
                      <p className="mt-1.5 text-body-sm font-semibold text-orange-700 leading-snug">
                        {m.designation}
                      </p>
                    )}

                    <div className="mt-auto pt-4 space-y-2 border-t border-cream-line-soft mt-4">
                      {m.qualification && (
                        <p className="flex items-start gap-2 text-meta text-ink-600">
                          <GraduationCap className="w-3.5 h-3.5 text-orange-600 flex-shrink-0 mt-0.5" />
                          <span>{m.qualification}</span>
                        </p>
                      )}
                      {m.experience && (
                        <p className="flex items-center gap-2 text-meta text-ink-600">
                          <BriefcaseMedical className="w-3.5 h-3.5 text-orange-600 flex-shrink-0" />
                          <span>
                            {cleanExperience(m.experience)} years experience
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Closing CTA */}
      <section className="bg-cream-soft py-12 sm:py-14 lg:py-20 border-t border-cream-line">
        <div className="mx-auto max-w-5xl px-gutter">
          <div className="relative overflow-hidden bg-gradient-hero text-white rounded-3xl shadow-sh-3 p-8 sm:p-10 lg:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-16 w-72 h-72 rounded-pill bg-white/15 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-10 w-80 h-80 rounded-pill bg-coral-300/30 blur-3xl"
            />
            <div className="relative grid gap-6 lg:grid-cols-[1.4fr_1fr] items-center">
              <div>
                <p className="text-overline uppercase font-bold text-white/80 mb-2 tracking-overline">
                  Need a second opinion?
                </p>
                <h2 className="text-h1 sm:text-display-2 font-display font-extrabold tracking-tight leading-tight">
                  Talk to our specialists.
                </h2>
                <p className="mt-3 text-body lg:text-h3 text-white/85 max-w-xl leading-relaxed">
                  Book a test or reach out for a report walk-through — our
                  clinical team is here to help.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href="/bangalore/lab-test"
                  className="inline-flex items-center justify-center gap-2 rounded-pill bg-white text-orange-700 font-bold px-6 py-3 text-body shadow-sh-2 hover:brightness-95 active:scale-[0.98] transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Book a test
                </Link>
                <ContactActionButton
                  mode="call"
                  phone="+91 99006 64696"
                  context="Clinical team — consultation"
                  className="inline-flex items-center justify-center gap-2 rounded-pill bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 text-body border border-white/30 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Talk to us
                </ContactActionButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function MiniStat({
  Icon,
  value,
  label,
}: {
  Icon: typeof Users;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <span className="w-10 h-10 inline-flex items-center justify-center rounded-pill bg-orange-50 text-orange-600 flex-shrink-0">
        <Icon className="w-5 h-5" />
      </span>
      <div className="min-w-0">
        <p className="text-h3 font-display font-extrabold text-ink-900 leading-none">
          {value}
        </p>
        <p className="text-caption text-ink-500 font-medium mt-0.5 truncate">
          {label}
        </p>
      </div>
    </div>
  );
}
