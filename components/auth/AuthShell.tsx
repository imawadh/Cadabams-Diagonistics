import Link from "next/link";
import { ReactNode } from "react";
import { ShieldCheck, Clock, HeartPulse, BadgeCheck } from "lucide-react";

interface AuthShellProps {
  overline: string;
  heading: string;
  subheading: string;
  children: ReactNode;
  footer: ReactNode;
}

const STATS = [
  { Icon: BadgeCheck, label: "NABL Accredited" },
  { Icon: Clock, label: "Reports in 6 hours" },
  { Icon: HeartPulse, label: "1M+ patients trust us" },
  { Icon: ShieldCheck, label: "Bank-grade security" },
] as const;

export function AuthShell({
  overline,
  heading,
  subheading,
  children,
  footer,
}: AuthShellProps) {
  return (
    <main className="bg-cream-bg min-h-screen">
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-gutter py-8 lg:py-14 grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14 items-stretch">
          <div className="relative hidden lg:flex flex-col justify-between rounded-3xl overflow-hidden bg-gradient-hero text-white p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-pill bg-white/15 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 -left-20 w-96 h-96 rounded-pill bg-coral-300/30 blur-3xl"
            />

            <div className="relative">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-overline uppercase font-bold tracking-overline text-white/90"
              >
                Cadabam&apos;s Diagnostics
              </Link>
              <h2 className="mt-6 text-display-2 lg:text-[40px] lg:leading-[1.1] font-display font-extrabold tracking-tight">
                Your health, in trusted hands.
              </h2>
              <p className="mt-4 text-body lg:text-h3 text-white/85 leading-relaxed max-w-md">
                Book lab tests, scans and health checkups across Bangalore.
                Reports in hours. Home sample collection. Doctor-reviewed
                insights — all in one account.
              </p>
            </div>

            <ul className="relative mt-10 space-y-3.5">
              {STATS.map(({ Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 text-body-sm font-semibold"
                >
                  <span className="w-9 h-9 inline-flex items-center justify-center rounded-pill bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
                    <Icon className="w-4 h-4" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <div className="bg-cream-card rounded-3xl shadow-sh-3 border border-cream-line p-6 sm:p-8 lg:p-10">
              <p className="text-overline uppercase text-orange-700 font-bold tracking-overline">
                {overline}
              </p>
              <h1 className="mt-2 text-h1 sm:text-display-2 font-display font-extrabold text-ink-900 leading-tight tracking-tight">
                {heading}
              </h1>
              <p className="mt-3 text-body-sm sm:text-body text-ink-600 leading-relaxed">
                {subheading}
              </p>

              <div className="mt-6 sm:mt-8">{children}</div>
            </div>

            <div className="mt-5 text-center text-body-sm text-ink-600">
              {footer}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
