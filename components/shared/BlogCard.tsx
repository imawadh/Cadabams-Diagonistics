import Image from "next/image";
import Link from "next/link";
import type { Blog } from "@/lib/data/blogs";
import { stripLeadingSlash } from "@/lib/data/types";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  blog: Blog;
  className?: string;
}

const FALLBACK_IMAGE = "/shared/image-1727884059139-383535423.webp";

const DATE_FORMATTER = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return DATE_FORMATTER.format(d);
}

export function BlogCard({ blog, className }: BlogCardProps) {
  const slug = stripLeadingSlash(blog.route);
  const href = `/blogs/${slug}`;
  const src = blog.imageUrl && blog.imageUrl.length > 0 ? blog.imageUrl : FALLBACK_IMAGE;
  const excerpt = blog.seo?.description || "";

  return (
    <article
      className={cn(
        "bg-cream-card rounded-lg shadow-sh-2 overflow-hidden hover:shadow-sh-3 transition-shadow duration-200 group flex flex-col",
        className,
      )}
    >
      <Link
        href={href}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={src}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <span className="text-overline uppercase text-orange-600 font-bold">
            {blog.categoryName}
          </span>
          <h3 className="text-h3 text-ink-900 font-bold mt-1 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {blog.title}
          </h3>
          {excerpt && (
            <p className="text-body-sm text-ink-600 line-clamp-3">{excerpt}</p>
          )}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-cream-line">
            <span className="text-meta text-ink-500">{blog.verifiedBy}</span>
            <time
              dateTime={blog.createdAt}
              className="text-meta text-ink-500"
            >
              {formatDate(blog.createdAt)}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
}
