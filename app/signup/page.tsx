import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create account",
  description:
    "Create a Cadabam's Diagnostics account to book lab tests and scans, access reports, and arrange home sample collection across Bangalore.",
  alternates: { canonical: "https://cadabamsdiagnostics.com/signup" },
  robots: { index: false, follow: true },
};

export default function SignupPage() {
  return (
    <AuthShell
      overline="Get started"
      heading="Create your account"
      subheading="Book tests, get reports in hours, and keep your family's health records in one secure place."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            Sign in instead
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthShell>
  );
}
