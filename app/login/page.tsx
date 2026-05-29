import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Sign in to your Cadabam's Diagnostics account to view reports, manage bookings and track home sample collections.",
  alternates: { canonical: "https://cadabamsdiagnostics.com/login" },
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <AuthShell
      overline="Welcome back"
      heading="Sign in to your account"
      subheading="View reports, track home collections, and manage your bookings from one place."
      footer={
        <>
          New to Cadabam&apos;s?{" "}
          <Link
            href="/signup"
            className="font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
