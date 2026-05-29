import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getAllBlogSlugs,
  getBlogBySlug,
  getBlogsByCategoryId,
  getRecentBlogs,
} from "@/lib/data/blogs";
import { blogUrl } from "@/lib/urls";
import { MarkdownContent } from "@/components/shared/MarkdownContent";
import { BlogCard } from "@/components/shared/BlogCard";
import { SectionOverline } from "@/components/shared/SectionOverline";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar, UserCheck } from "lucide-react";

export const revalidate = 86400;

const FALLBACK = "/shared/image-1727884059139-383535423.webp";

const DATE_FMT = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return {};
  const fallbackDesc = blog.markdown
    ? blog.markdown.replace(/[#*_`>[\]()]/g, "").slice(0, 160).trim()
    : `${blog.title} — Cadabam's Diagnostics`;
  const canonical =
    blog.seo?.canonicalUrl ||
    `https://cadabamsdiagnostics.com${blogUrl(blog)}`;
  return {
    title: blog.seo?.title || blog.title,
    description: blog.seo?.description || fallbackDesc,
    alternates: { canonical },
    openGraph: {
      title: blog.seo?.ogTitle || blog.seo?.title || blog.title,
      description: blog.seo?.ogDescription || blog.seo?.description || fallbackDesc,
      images: blog.imageUrl ? [{ url: blog.imageUrl }] : undefined,
      type: "article",
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      authors: blog.verifiedBy ? [blog.verifiedBy] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) notFound();

  const related = getBlogsByCategoryId(blog.blogCategoryId)
    .filter((b) => b.id !== blog.id)
    .slice(0, 3);
  const fallback =
    related.length > 0
      ? related
      : getRecentBlogs(4).filter((b) => b.id !== blog.id).slice(0, 3);

  const src = blog.imageUrl && blog.imageUrl.length > 0 ? blog.imageUrl : FALLBACK;
  const published = (() => {
    const d = new Date(blog.createdAt);
    return Number.isNaN(d.getTime()) ? "" : DATE_FMT.format(d);
  })();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.seo?.description,
    image: src,
    author: {
      "@type": "Person",
      name: blog.verifiedBy || "Cadabam's Diagnostics",
    },
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    publisher: {
      "@type": "Organization",
      name: "Cadabam's Diagnostics",
      url: "https://cadabamsdiagnostics.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://cadabamsdiagnostics.com${blogUrl(blog)}`,
    },
  };

  return (
    <main className="bg-cream-bg min-h-screen">
      <div className="mx-auto max-w-4xl px-gutter py-6 lg:py-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/blogs">Blogs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1 max-w-xs">
                {blog.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <article className="mx-auto max-w-4xl px-gutter pb-12 lg:pb-16">
        <header className="mb-8">
          <Link
            href="/blogs"
            className="text-overline uppercase text-orange-600 font-bold hover:text-orange-700 transition-colors"
          >
            {blog.categoryName}
          </Link>
          <h1 className="text-display-2 sm:text-display-1 font-display font-extrabold text-ink-900 mt-3 leading-tight">
            {blog.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-body-sm text-ink-600">
            {blog.verifiedBy && (
              <span className="inline-flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-orange-600" />
                Reviewed by{" "}
                <span className="font-semibold text-ink-900">
                  {blog.verifiedBy}
                </span>
              </span>
            )}
            {published && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-orange-600" />
                <time dateTime={blog.createdAt}>{published}</time>
              </span>
            )}
          </div>
        </header>

        {blog.imageUrl && blog.imageUrl.length > 0 && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-sh-2 mb-8">
            <Image
              src={src}
              alt={blog.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 800px"
            />
          </div>
        )}

        <div className="bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line p-6 sm:p-10">
          <MarkdownContent content={blog.markdown} />
        </div>

        {blog.faqs && blog.faqs.length > 0 && (
          <section className="mt-8 bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line p-6 sm:p-10">
            <SectionOverline>FAQ</SectionOverline>
            <h2 className="text-h2 font-bold text-ink-900 mt-1 mb-4">
              Frequently asked questions
            </h2>
            <Accordion type="single" collapsible>
              {blog.faqs.map((f, i) => (
                <AccordionItem key={i} value={`blog-faq-${i}`}>
                  <AccordionTrigger className="text-left text-body font-semibold text-ink-900 hover:text-orange-600 hover:no-underline">
                    {f.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-body-sm text-ink-600 leading-relaxed">
                    {f.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}
      </article>

      {fallback.length > 0 && (
        <section className="bg-cream-soft py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-gutter">
            <SectionOverline>Keep reading</SectionOverline>
            <h2 className="text-h1 sm:text-display-2 font-display text-ink-900 mt-1 mb-8">
              Related articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fallback.map((b) => (
                <BlogCard key={b.id} blog={b} />
              ))}
            </div>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
