import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Quote,
  Star,
} from "lucide-react";
import {
  getAllCenterSlugs,
  getCenterBySlug,
} from "@/lib/data/centers";
import { centerUrl } from "@/lib/urls";
import { MarkdownContent } from "@/components/shared/MarkdownContent";
import { CTAButton } from "@/components/shared/CTAButton";
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

const FALLBACK = "/shared/image-1727884059139-383535423.webp";

export function generateStaticParams() {
  return getAllCenterSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const center = getCenterBySlug(slug);
  if (!center) return {};
  const title = center.seo?.title || `${center.basic_info.center_name} | Cadabam's Diagnostics`;
  const description =
    center.seo?.description ||
    `Visit ${center.basic_info.center_name} for accurate diagnostics, lab tests, and scans. ${center.center_info.address}`;
  const canonical = `https://cadabamsdiagnostics.com${centerUrl(center)}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
  };
}

export default async function CenterDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const center = getCenterBySlug(slug);
  if (!center) notFound();

  const primaryPhone = center.center_info.phone.split(",")[0]?.trim() ?? "";
  const telHref = primaryPhone ? `tel:${primaryPhone.replace(/\s+/g, "")}` : null;
  const whatsapp = center.center_info.whatsapp?.replace(/[^\d+]/g, "");
  const waHref = whatsapp && whatsapp.length >= 10 ? `https://wa.me/${whatsapp}` : null;
  const src =
    center.basic_info.center_image && center.basic_info.center_image.length > 0
      ? center.basic_info.center_image
      : FALLBACK;

  const servicesWithContent = center.services.filter(
    (s) => s.title && s.title.trim().length > 0,
  );
  const testimonials = center.testimonials.filter(
    (t) => t.content && t.content.trim().length > 0,
  );
  const team = center.team.filter(
    (m) => m.name && m.name.trim().length > 0,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: center.basic_info.center_name,
    description: center.basic_info.center_sub_title,
    address: {
      "@type": "PostalAddress",
      streetAddress: center.center_info.address,
      addressLocality: center.basic_info.city,
      addressCountry: "IN",
    },
    telephone: primaryPhone,
    email: center.center_info.email,
    url: `https://cadabamsdiagnostics.com${centerUrl(center)}`,
    image: src.startsWith("/") ? `https://cadabamsdiagnostics.com${src}` : src,
    medicalSpecialty: center.services.map((s) => s.title).filter(Boolean),
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
              <BreadcrumbLink href="/bangalore">Bangalore centres</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1 max-w-md">
                {center.basic_info.center_name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mx-auto max-w-7xl px-gutter pb-12 lg:pb-16 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line overflow-hidden">
            <div className="relative aspect-[16/8]">
              <Image
                src={src}
                alt={center.basic_info.center_name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-overline uppercase text-orange-600 font-bold mb-2">
                Diagnostic centre · {center.basic_info.area
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </p>
              <h1 className="text-h1 sm:text-display-2 font-display font-extrabold text-ink-900 leading-tight">
                {center.basic_info.center_name}
              </h1>
              {center.basic_info.center_sub_title && (
                <p className="mt-3 text-body lg:text-h3 text-ink-600 leading-relaxed">
                  {center.basic_info.center_sub_title}
                </p>
              )}

              <div className="mt-6 grid sm:grid-cols-2 gap-3 text-body-sm">
                <div className="flex items-start gap-3 bg-cream-bg rounded-md p-3">
                  <MapPin className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span className="text-ink-700">
                    {center.center_info.address}
                  </span>
                </div>
                {center.working_hours.weekdays && (
                  <div className="flex items-start gap-3 bg-cream-bg rounded-md p-3">
                    <Clock className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-ink-700">
                      Mon–Sat {center.working_hours.weekdays.start}–
                      {center.working_hours.weekdays.end}
                      {center.working_hours.sunday && (
                        <>
                          <br />
                          Sun {center.working_hours.sunday.start}–
                          {center.working_hours.sunday.end}
                        </>
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {servicesWithContent.length > 0 && (
            <section className="bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line p-6 sm:p-8">
              <SectionOverline>Services</SectionOverline>
              <h2 className="text-h2 font-bold text-ink-900 mt-1 mb-5">
                What we offer at this centre
              </h2>
              <div className="space-y-4">
                {servicesWithContent.map((service) => (
                  <div
                    key={service.id}
                    className="rounded-lg border border-cream-line bg-cream-soft p-5"
                  >
                    <h3 className="text-h3 font-bold text-ink-900">
                      {service.title}
                    </h3>
                    {service.description && (
                      <p className="mt-2 text-body-sm text-ink-700 whitespace-pre-line leading-relaxed">
                        {service.description}
                      </p>
                    )}
                    {service.tests.filter((t) => t.id && t.testName).length >
                      0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {service.tests
                          .filter((t) => t.id && t.testName)
                          .map((t) => (
                            <li key={t.id}>
                              <Link
                                href={`/bangalore/lab-test${t.route}`}
                                className="inline-flex items-center bg-cream-card text-body-sm text-ink-700 font-medium border border-cream-line rounded-pill px-3 py-1 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 transition-colors"
                              >
                                {t.testName}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {team.length > 0 && (
            <section className="bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line p-6 sm:p-8">
              <SectionOverline>Specialists</SectionOverline>
              <h2 className="text-h2 font-bold text-ink-900 mt-1 mb-5">
                Meet the team
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {team.map((m) => (
                  <article
                    key={m.id}
                    className="flex gap-4 rounded-lg border border-cream-line bg-cream-soft p-4"
                  >
                    {m.image && m.image.length > 0 && (
                      <div className="relative w-20 h-20 rounded-pill overflow-hidden flex-shrink-0 bg-cream-card shadow-sh-1">
                        <Image
                          src={m.image.startsWith("/") ? m.image : FALLBACK}
                          alt={m.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="text-h3 font-bold text-ink-900">
                        {m.name}
                      </h3>
                      <p className="text-meta text-orange-600 font-semibold mt-1">
                        {m.designation}
                      </p>
                      {m.qualification && (
                        <p className="text-meta text-ink-600 mt-1">
                          {m.qualification}
                        </p>
                      )}
                      {m.experience && (
                        <p className="text-meta text-ink-500 mt-0.5">
                          {m.experience} experience
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {center.markdown && center.markdown.trim().length > 0 && (
            <section className="bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line p-6 sm:p-8">
              <MarkdownContent content={center.markdown} />
            </section>
          )}

          {testimonials.length > 0 && (
            <section className="bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line p-6 sm:p-8">
              <SectionOverline>Patient stories</SectionOverline>
              <h2 className="text-h2 font-bold text-ink-900 mt-1 mb-5">
                What patients say
              </h2>
              <div className="space-y-4">
                {testimonials.slice(0, 4).map((t) => (
                  <article
                    key={t.id}
                    className="rounded-lg border border-cream-line bg-cream-soft p-5"
                  >
                    <Quote className="w-6 h-6 text-orange-300 mb-2" />
                    <p className="text-body text-ink-700 leading-relaxed">
                      {t.content}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-body-sm font-bold text-ink-900">
                          {t.name}
                        </p>
                        <p className="text-meta text-ink-500">{t.location}</p>
                      </div>
                      <div
                        className="flex items-center gap-0.5 text-orange-500"
                        aria-label={`Rated ${t.rating} out of 5`}
                      >
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                        {Array.from({ length: 5 - t.rating }).map((_, i) => (
                          <Star
                            key={`empty-${i}`}
                            className="w-4 h-4 text-ink-300"
                          />
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {center.faqs && center.faqs.length > 0 && (
            <section>
              <SectionOverline>FAQ</SectionOverline>
              <h2 className="text-h2 font-bold text-ink-900 mt-1 mb-5">
                Frequently asked questions
              </h2>
              <FaqList items={center.faqs} idPrefix="center-faq" />
            </section>
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 bg-cream-card rounded-2xl shadow-sh-3 border border-cream-line p-6 space-y-5">
            <SectionOverline>Visit this centre</SectionOverline>
            <h3 className="text-h3 font-bold text-ink-900 leading-snug">
              {center.basic_info.center_name}
            </h3>

            <ul className="space-y-3 text-body-sm text-ink-700 border-y border-cream-line py-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                <span>{center.center_info.address}</span>
              </li>
              {telHref && (
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <a
                    href={telHref}
                    className="text-ink-900 hover:text-orange-600 transition-colors font-semibold"
                  >
                    {primaryPhone}
                  </a>
                </li>
              )}
              {center.center_info.email && (
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <a
                    href={`mailto:${center.center_info.email}`}
                    className="text-ink-900 hover:text-orange-600 transition-colors break-all"
                  >
                    {center.center_info.email}
                  </a>
                </li>
              )}
              {center.working_hours.weekdays && (
                <li className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Mon–Sat: {center.working_hours.weekdays.start}–
                    {center.working_hours.weekdays.end}
                    {center.working_hours.sunday && (
                      <>
                        <br />
                        Sun: {center.working_hours.sunday.start}–
                        {center.working_hours.sunday.end}
                      </>
                    )}
                  </span>
                </li>
              )}
            </ul>

            <div className="space-y-3">
              <CTAButton
                href="/cart"
                variant="primary"
                size="lg"
                className="w-full"
              >
                Book a test
              </CTAButton>
              {waHref && (
                <CTAButton
                  href={waHref}
                  variant="secondary"
                  size="md"
                  className="w-full"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp us
                </CTAButton>
              )}
              {center.center_info.map_location && (
                <a
                  href={center.center_info.map_location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-body-sm text-orange-600 font-semibold hover:text-orange-700 transition-colors pt-1"
                >
                  Open in Maps →
                </a>
              )}
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
