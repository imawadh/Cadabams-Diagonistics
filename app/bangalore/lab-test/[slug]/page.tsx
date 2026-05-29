import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  FlaskConical,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Home as HomeIcon,
  Zap,
} from "lucide-react";
import {
  getAllLabTestSlugs,
  getDiscountedPriceNumber,
  getLabTestBySlug,
  getLabTestCategoryById,
  getLabTestsByIds,
  getPriceNumber,
} from "@/lib/data/labtests";
import { labTestUrl } from "@/lib/urls";
import { stripLeadingSlash } from "@/lib/data/types";
import { MarkdownContent } from "@/components/shared/MarkdownContent";
import { TestCard } from "@/components/shared/TestCard";
import { TestBookingActions } from "@/components/shared/TestBookingActions";
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

export const revalidate = 86400;

const CITY = "bangalore";
const FALLBACK_IMAGE = "/shared/image-1727884059139-383535423.webp";

export async function generateStaticParams() {
  return getAllLabTestSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const test = getLabTestBySlug(slug);
  if (!test) return {};

  const fallbackTitle = `${test.testName} in Bangalore | Cadabam's Diagnostics`;
  const fallbackDesc =
    `Book ${test.testName} in Bangalore. ${test.basic_info.Identifies || ""}`.trim();
  const canonical =
    test.seo?.canonicalUrl ||
    `https://cadabamsdiagnostics.com${labTestUrl(test)}`;

  return {
    title: test.seo?.title || fallbackTitle,
    description: test.seo?.description || fallbackDesc,
    alternates: { canonical },
    openGraph: {
      title: test.seo?.ogTitle || test.seo?.title || fallbackTitle,
      description:
        test.seo?.ogDescription || test.seo?.description || fallbackDesc,
      images: test.seo?.ogImage ? [{ url: test.seo.ogImage }] : undefined,
      type: "article",
    },
  };
}

export default async function LabTestDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const test = getLabTestBySlug(slug);
  if (!test) notFound();

  const price = getPriceNumber(test);
  const discountedPrice = getDiscountedPriceNumber(test);
  const showDiscount = discountedPrice > 0 && discountedPrice < price;
  const stated = Number(test.basic_info.discount);
  const computed = showDiscount
    ? Math.round(((price - discountedPrice) / price) * 100)
    : 0;
  const discountPct = stated > 0 ? stated : computed;
  const finalPrice = discountedPrice || price;

  const category = getLabTestCategoryById(test.basic_info.categoryId);
  const heroImage =
    test.basic_info.imageSrc || category?.image || FALLBACK_IMAGE;

  const relatedTests = test.relative_test?.tests
    ? getLabTestsByIds(test.relative_test.tests.map((t) => t.id)).filter(
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
    "@type": "MedicalTest",
    name: test.testName,
    description:
      test.seo?.description ||
      test.basic_info.Identifies ||
      `${test.testName} lab test`,
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
      url: `https://cadabamsdiagnostics.com${labTestUrl(test)}`,
    },
  };

  return (
    <main className="bg-cream-bg min-h-screen">
      <section className="relative overflow-hidden bg-gradient-orange-soft">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-pill bg-orange-300/30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-10 w-96 h-96 rounded-pill bg-coral-300/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-gutter pt-6 pb-10 lg:pt-8 lg:pb-14">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${CITY}/lab-test`}>
                  Lab Tests
                </BreadcrumbLink>
              </BreadcrumbItem>
              {category && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      href={`/${CITY}/lab-test?category=${stripLeadingSlash(category.path)}`}
                    >
                      {category.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1 max-w-xs">
                  {test.testName}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mt-6 lg:mt-8 grid gap-6 lg:gap-10 lg:grid-cols-[1fr_440px] items-start">
            <div className="space-y-5">
              {category && (
                <Link
                  href={`/${CITY}/lab-test?category=${stripLeadingSlash(category.path)}`}
                  className="inline-flex items-center gap-1.5 rounded-pill bg-cream-card border border-cream-line px-3 py-1 text-overline uppercase text-orange-700 font-bold hover:border-orange-200 transition-colors"
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  {category.name}
                </Link>
              )}

              <h1 className="text-h1 sm:text-display-2 lg:text-display-1 font-display font-extrabold text-ink-900 leading-tight tracking-tight">
                {test.testName}
              </h1>

              {test.basic_info.Identifies && (
                <p className="text-body lg:text-h3 text-ink-700 leading-relaxed max-w-2xl">
                  {test.basic_info.Identifies}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {test.basic_info.reportsWithin && (
                  <span className="inline-flex items-center gap-1.5 bg-cream-card rounded-pill px-3 py-1.5 text-meta font-semibold text-ink-700 shadow-sh-1 border border-cream-line">
                    <Clock className="w-3.5 h-3.5 text-orange-600" />
                    Reports in {test.basic_info.reportsWithin}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 bg-cream-card rounded-pill px-3 py-1.5 text-meta font-semibold text-ink-700 shadow-sh-1 border border-cream-line">
                  <HomeIcon className="w-3.5 h-3.5 text-orange-600" />
                  Free home collection
                </span>
                <span className="inline-flex items-center gap-1.5 bg-cream-card rounded-pill px-3 py-1.5 text-meta font-semibold text-ink-700 shadow-sh-1 border border-cream-line">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
                  NABL Accredited
                </span>
                {test.basic_info.testId && (
                  <span className="inline-flex items-center gap-1.5 bg-cream-card rounded-pill px-3 py-1.5 text-meta font-semibold text-ink-700 shadow-sh-1 border border-cream-line">
                    <Tag className="w-3.5 h-3.5 text-orange-600" />
                    ID {test.basic_info.testId}
                  </span>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream-card shadow-sh-3 border border-cream-line">
                <Image
                  src={heroImage}
                  alt={test.testName}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 440px"
                />
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-900/40 to-transparent"
                />
                {discountPct > 0 && (
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-pill bg-coral-400 text-white text-meta font-bold px-3 py-1.5 shadow-sh-2">
                    <Zap className="w-3.5 h-3.5 fill-white" />
                    Save {discountPct}%
                  </span>
                )}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <div className="bg-cream-card/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-sh-2">
                    <p className="text-caption text-ink-500 font-medium leading-none">
                      Starting at
                    </p>
                    <p className="text-h3 font-extrabold text-orange-600 leading-tight mt-0.5">
                      ₹{finalPrice.toLocaleString("en-IN")}
                    </p>
                  </div>
                  {test.basic_info.reportsWithin && (
                    <div className="bg-cream-card/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-sh-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <p className="text-body-sm font-bold text-ink-900 leading-none">
                        {test.basic_info.reportsWithin}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-gutter py-10 lg:py-14 grid gap-6 lg:gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {(test.basic_info.Identifies || test.basic_info.measures) && (
            <section className="bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line p-6 sm:p-8">
              <SectionOverline>About this test</SectionOverline>
              <h2 className="text-h2 font-bold text-ink-900 mt-1 mb-5">
                What it tells you
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {test.basic_info.Identifies && (
                  <div className="bg-orange-50/60 rounded-xl p-4 border border-orange-100">
                    <p className="text-overline uppercase text-orange-700 font-bold mb-1.5 tracking-overline">
                      Identifies
                    </p>
                    <p className="text-body-sm text-ink-700 leading-relaxed">
                      {test.basic_info.Identifies}
                    </p>
                  </div>
                )}
                {test.basic_info.measures && (
                  <div className="bg-orange-50/60 rounded-xl p-4 border border-orange-100">
                    <p className="text-overline uppercase text-orange-700 font-bold mb-1.5 tracking-overline">
                      Measures
                    </p>
                    <p className="text-body-sm text-ink-700 leading-relaxed">
                      {test.basic_info.measures}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {hasRequisites && (
            <section className="bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line p-6 sm:p-8">
              <SectionOverline>Preparation</SectionOverline>
              <h2 className="text-h2 font-bold text-ink-900 mt-1 mb-4">
                Before your test
              </h2>
              <ul className="space-y-3">
                {test.requisites
                  .filter((r) => r.value && r.value.trim().length > 0)
                  .map((r, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-body text-ink-700 leading-relaxed"
                    >
                      <CheckCircle2 className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
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
              <FaqList items={test.faqs} idPrefix="labtest-faq" />
            </section>
          )}

          {relatedTests.length > 0 && (
            <section>
              <SectionOverline>Related tests</SectionOverline>
              <h2 className="text-h2 font-bold text-ink-900 mt-1 mb-5">
                You may also need
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {relatedTests.slice(0, 4).map((t) => {
                  const p = getPriceNumber(t);
                  const dp = getDiscountedPriceNumber(t);
                  const tCategory = getLabTestCategoryById(
                    t.basic_info.categoryId,
                  );
                  return (
                    <TestCard
                      key={t.id}
                      name={t.testName}
                      image={t.basic_info.imageSrc || tCategory?.image}
                      price={dp || p}
                      originalPrice={dp > 0 && dp < p ? p : undefined}
                      reportTime={t.basic_info.reportsWithin}
                      href={labTestUrl(t)}
                    />
                  );
                })}
              </div>
            </section>
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 bg-cream-card rounded-2xl shadow-sh-3 border border-cream-line overflow-hidden">
            <div className="bg-gradient-orange-soft p-5 border-b border-cream-line">
              <p className="text-overline uppercase text-orange-700 font-bold tracking-overline">
                Book this test
              </p>
              <h3 className="text-h3 font-bold text-ink-900 leading-snug mt-1 line-clamp-2">
                {test.testName}
              </h3>

              <div className="mt-4 flex items-baseline gap-2.5">
                <span className="text-display-2 font-display font-extrabold text-orange-600 leading-none">
                  ₹{finalPrice.toLocaleString("en-IN")}
                </span>
                {showDiscount && (
                  <span className="text-body-sm text-ink-400 line-through">
                    ₹{price.toLocaleString("en-IN")}
                  </span>
                )}
                {discountPct > 0 && (
                  <span className="ml-auto inline-flex items-center rounded-pill bg-success-bg text-success text-meta font-bold px-2.5 py-1">
                    Save {discountPct}%
                  </span>
                )}
              </div>
            </div>

            <ul className="px-5 py-4 space-y-2.5 text-body-sm text-ink-700 border-b border-cream-line">
              {test.basic_info.reportsWithin && (
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-orange-600 flex-shrink-0" />
                  Reports in {test.basic_info.reportsWithin}
                </li>
              )}
              <li className="flex items-center gap-2.5">
                <HomeIcon className="w-4 h-4 text-orange-600 flex-shrink-0" />
                Free home sample collection
              </li>
              <li className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-orange-600 flex-shrink-0" />
                NABL Accredited certified lab
              </li>
            </ul>

            <div className="p-5">
              <TestBookingActions
                testName={test.testName}
                finalPrice={finalPrice}
              />
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
