import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, FlaskConical, Phone, ShieldCheck, Tag } from "lucide-react";
import {
  getNonLabCategorySlug,
  getNonLabDiscountedPriceNumber,
  getNonLabPriceNumber,
  getNonLabTestBySlug,
  getNonLabTestCategoryById,
  getNonLabTestsByIds,
} from "@/lib/data/nonlabtests";
import { nonLabTestUrl } from "@/lib/urls";
import { MarkdownContent } from "@/components/shared/MarkdownContent";
import { CTAButton } from "@/components/shared/CTAButton";
import { TestCard } from "@/components/shared/TestCard";
import { SectionOverline } from "@/components/shared/SectionOverline";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FaqList } from "@/components/shared/FaqList";
import { Badge } from "@/components/ui/badge";

const CITY = "bangalore";
const PHONE = "+91 99006 64696";

interface ScanDetailProps {
  familyPath: string;
  slug: string;
}

export function ScanDetail({ familyPath, slug }: ScanDetailProps) {
  const test = getNonLabTestBySlug(slug);
  if (!test) notFound();

  const category = getNonLabTestCategoryById(test.basic_info.categoryId);
  if (!category || getNonLabCategorySlug(category) !== familyPath) {
    notFound();
  }

  const price = getNonLabPriceNumber(test);
  const discountedPrice = getNonLabDiscountedPriceNumber(test);
  const showDiscount = discountedPrice > 0 && discountedPrice < price;
  const stated = Number(test.basic_info.discount);
  const computed = showDiscount
    ? Math.round(((price - discountedPrice) / price) * 100)
    : 0;
  const discountPct = stated > 0 ? stated : computed;
  const finalPrice = discountedPrice || price;

  const relatedTests = test.relative_test?.tests
    ? getNonLabTestsByIds(test.relative_test.tests.map((t) => t.id)).filter(
        (t) => t.id !== test.id,
      )
    : [];

  const hasInterpretations =
    test.interpretations?.rows && test.interpretations.rows.length > 0;
  const hasRequisites =
    test.requisites?.some((r) => r.value && r.value.trim().length > 0) ?? false;
  const hasFaqs = test.faqs && test.faqs.length > 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: test.testName,
    description:
      test.seo?.description ||
      test.basic_info.Identifies ||
      `${test.testName} scan`,
    procedureType: category.name,
    provider: {
      "@type": "MedicalOrganization",
      name: "Cadabam's Diagnostics",
      url: "https://cadabamsdiagnostics.com",
    },
    offers: {
      "@type": "Offer",
      price: finalPrice,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `https://cadabamsdiagnostics.com${nonLabTestUrl(test)}`,
    },
  };

  return (
    <main className="bg-cream-bg min-h-screen">
      <div className="mx-auto max-w-7xl px-gutter py-6 lg:py-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${CITY}/${familyPath}`}>
                {category.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1 max-w-xs">
                {test.testName}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mx-auto max-w-7xl px-gutter pb-12 lg:pb-16 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line overflow-hidden">
            <div className="bg-gradient-orange-soft px-6 sm:px-8 py-8">
              <Link
                href={`/${CITY}/${familyPath}`}
                className="text-overline uppercase text-orange-700 font-bold hover:text-orange-800 transition-colors"
              >
                {category.name}
              </Link>
              <h1 className="text-h1 sm:text-display-2 font-display font-extrabold text-ink-900 mt-2 leading-tight">
                {test.testName}
              </h1>
              {test.basic_info.alsoKnownAs && (
                <p className="mt-2 text-body-sm text-ink-600">
                  Also known as:{" "}
                  <span className="font-semibold text-ink-800">
                    {test.basic_info.alsoKnownAs}
                  </span>
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-3 text-body-sm text-ink-700">
                <span className="inline-flex items-center gap-1.5 bg-cream-card rounded-pill px-3 py-1 shadow-sh-1">
                  <FlaskConical className="w-4 h-4 text-orange-600" />
                  {test.basic_info.testCategory || category.name}
                </span>
                {test.basic_info.reportsWithin && (
                  <span className="inline-flex items-center gap-1.5 bg-cream-card rounded-pill px-3 py-1 shadow-sh-1">
                    <Clock className="w-4 h-4 text-orange-600" />
                    Reports in {test.basic_info.reportsWithin}
                  </span>
                )}
                {test.basic_info.testId && (
                  <span className="inline-flex items-center gap-1.5 bg-cream-card rounded-pill px-3 py-1 shadow-sh-1">
                    <Tag className="w-4 h-4 text-orange-600" />
                    Test ID: {test.basic_info.testId}
                  </span>
                )}
              </div>
            </div>

            {(test.basic_info.Identifies || test.basic_info.measures) && (
              <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-cream-line border-t border-cream-line">
                {test.basic_info.Identifies && (
                  <div className="p-5">
                    <p className="text-overline uppercase text-orange-600 font-bold mb-1">
                      Identifies
                    </p>
                    <p className="text-body text-ink-700">
                      {test.basic_info.Identifies}
                    </p>
                  </div>
                )}
                {test.basic_info.measures && (
                  <div className="p-5">
                    <p className="text-overline uppercase text-orange-600 font-bold mb-1">
                      Measures
                    </p>
                    <p className="text-body text-ink-700">
                      {test.basic_info.measures}
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>

          {hasRequisites && (
            <section className="bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line p-6 sm:p-8">
              <SectionOverline>Preparation</SectionOverline>
              <h2 className="text-h2 font-bold text-ink-900 mt-1 mb-4">
                Before your scan
              </h2>
              <ul className="space-y-3">
                {test.requisites
                  .filter((r) => r.value && r.value.trim().length > 0)
                  .map((r, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-body text-ink-700 leading-relaxed"
                    >
                      <ShieldCheck className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>{r.value.trim()}</span>
                    </li>
                  ))}
              </ul>
            </section>
          )}

          {test.markdown && test.markdown.trim().length > 0 && (
            <section className="bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line p-6 sm:p-8">
              <MarkdownContent content={test.markdown} />
            </section>
          )}

          {hasInterpretations && (
            <section className="bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line p-6 sm:p-8">
              <SectionOverline>Results</SectionOverline>
              <h2 className="text-h2 font-bold text-ink-900 mt-1 mb-4">
                {test.interpretations.title || "How to read your results"}
              </h2>
              <div className="overflow-x-auto rounded-md border border-cream-line">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-cream-soft">
                      {test.interpretations.cols.map((c, i) => (
                        <th
                          key={i}
                          className="text-left text-body-sm font-semibold text-ink-900 px-4 py-3 border-b border-cream-line"
                        >
                          {c.trim()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {test.interpretations.rows.map((row, ri) => (
                      <tr
                        key={ri}
                        className="border-b border-cream-line last:border-b-0"
                      >
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className="px-4 py-3 text-body-sm text-ink-700 align-top"
                          >
                            {cell.trim()}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {hasFaqs && (
            <section>
              <SectionOverline>FAQ</SectionOverline>
              <h2 className="text-h2 font-bold text-ink-900 mt-1 mb-5">
                Frequently asked questions
              </h2>
              <FaqList items={test.faqs} idPrefix="scan-faq" />
            </section>
          )}

          {relatedTests.length > 0 && (
            <section>
              <SectionOverline>Related scans</SectionOverline>
              <h2 className="text-h2 font-bold text-ink-900 mt-1 mb-5">
                You may also need
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {relatedTests.slice(0, 4).map((t) => {
                  const p = getNonLabPriceNumber(t);
                  const dp = getNonLabDiscountedPriceNumber(t);
                  return (
                    <TestCard
                      key={t.id}
                      name={t.testName}
                      image={t.basic_info.imageSrc ?? null}
                      price={dp || p}
                      originalPrice={dp > 0 && dp < p ? p : undefined}
                      reportTime={t.basic_info.reportsWithin}
                      href={nonLabTestUrl(t)}
                    />
                  );
                })}
              </div>
            </section>
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 bg-cream-card rounded-2xl shadow-sh-3 border border-cream-line p-6 space-y-5">
            <SectionOverline>Book this scan</SectionOverline>

            <h3 className="text-h3 font-bold text-ink-900 leading-snug">
              {test.testName}
            </h3>

            <div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-display-2 font-display font-extrabold text-orange-600 leading-none">
                  ₹{finalPrice.toLocaleString("en-IN")}
                </span>
                {showDiscount && (
                  <span className="text-body-sm text-ink-400 line-through">
                    ₹{price.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              {discountPct > 0 && (
                <Badge className="mt-2 bg-success-bg text-success border-transparent font-semibold rounded-pill">
                  Save {discountPct}%
                </Badge>
              )}
            </div>

            <ul className="space-y-2.5 text-body-sm text-ink-700 border-y border-cream-line py-4">
              {test.basic_info.reportsWithin && (
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-orange-600 flex-shrink-0" />
                  Reports in {test.basic_info.reportsWithin}
                </li>
              )}
              <li className="flex items-center gap-2.5">
                <FlaskConical className="w-4 h-4 text-orange-600 flex-shrink-0" />
                {category.name}
              </li>
              <li className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-orange-600 flex-shrink-0" />
                Centre visit · advanced equipment
              </li>
            </ul>

            <div className="space-y-3">
              <CTAButton
                href="/cart"
                variant="primary"
                size="lg"
                className="w-full"
              >
                Book now
              </CTAButton>
              <CTAButton
                href={`tel:${PHONE.replace(/\s+/g, "")}`}
                variant="secondary"
                size="md"
                className="w-full"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call {PHONE}
              </CTAButton>
            </div>
          </div>
        </aside>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
