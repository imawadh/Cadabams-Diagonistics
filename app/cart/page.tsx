"use client";

import Link from "next/link";
import { ShoppingCart, Phone } from "lucide-react";
import { CTAButton } from "@/components/shared/CTAButton";

export default function CartPage() {
  return (
    <main className="bg-cream-bg min-h-screen">
      <section className="mx-auto max-w-3xl px-gutter py-16 lg:py-24 text-center">
        <div className="w-20 h-20 mx-auto rounded-pill bg-orange-50 inline-flex items-center justify-center mb-6">
          <ShoppingCart className="w-9 h-9 text-orange-600" />
        </div>
        <h1 className="text-h1 sm:text-display-2 font-display font-extrabold text-ink-900">
          Your cart is empty
        </h1>
        <p className="mt-3 text-body lg:text-h3 text-ink-600 max-w-xl mx-auto leading-relaxed">
          Browse our lab tests or radiology scans to add a test to your
          cart, or call us directly and we&apos;ll book it for you.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <CTAButton href="/bangalore/lab-test" variant="primary" size="lg">
            Browse lab tests
          </CTAButton>
          <CTAButton href="/bangalore/xray-scan" variant="secondary" size="lg">
            Browse radiology
          </CTAButton>
        </div>

        <div className="mt-10 bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line p-5 max-w-md mx-auto">
          <p className="text-body-sm text-ink-700">
            Prefer to talk to a person?
          </p>
          <Link
            href="tel:+919900664696"
            className="mt-2 inline-flex items-center justify-center gap-2 text-h3 font-bold text-orange-600 hover:text-orange-700 transition-colors"
          >
            <Phone className="w-5 h-5" />
            +91 99006 64696
          </Link>
        </div>
      </section>
    </main>
  );
}
