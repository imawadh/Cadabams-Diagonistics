import type { Metadata } from "next";
import {
  type Blog,
  getAllBlogs,
  getBlogCategories,
  getBlogsByCategoryId,
} from "@/lib/data/blogs";
import { BlogCard } from "@/components/shared/BlogCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Health & Diagnostics Blog",
  description:
    "Expert articles on lab tests, scans, preventive health, and wellness from Cadabam's Diagnostics — written and reviewed by doctors.",
  alternates: { canonical: "https://cadabamsdiagnostics.com/blogs" },
  openGraph: {
    title: "Cadabam's Diagnostics Blog",
    description:
      "Doctor-reviewed articles on tests, scans, and preventive health.",
    url: "/blogs",
    type: "website",
  },
};

const TAB_ALL = "all";

export default function BlogsListingPage() {
  const blogs = getAllBlogs();
  const categories = getBlogCategories().filter(
    (c) => c.title.trim().length > 0,
  );

  return (
    <main className="bg-cream-bg min-h-screen">
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-pill bg-white/10 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-gutter py-14 lg:py-20">
          <p className="text-overline uppercase text-white/80 font-bold mb-3">
            Cadabam&apos;s Diagnostics blog
          </p>
          <h1 className="text-display-2 sm:text-display-1 lg:text-[52px] lg:leading-[1.05] font-display font-extrabold mb-4">
            Health insights you can trust
          </h1>
          <p className="text-body lg:text-h3 text-white/90 max-w-2xl leading-relaxed">
            Doctor-reviewed articles on lab tests, scans, preventive health,
            and wellness — to help you make confident health decisions.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-gutter py-12 lg:py-16">
        <Tabs defaultValue={TAB_ALL} className="w-full">
          <TabsList className="mb-8 flex flex-wrap h-auto gap-2 bg-transparent p-0 justify-start">
            <TabsTrigger
              value={TAB_ALL}
              className="rounded-pill border border-cream-line bg-cream-card px-4 py-2 text-body-sm font-semibold text-ink-700 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:border-orange-500 data-[state=active]:shadow-glow-orange transition-all"
            >
              All articles ({blogs.length})
            </TabsTrigger>
            {categories.map((c) => {
              const count = getBlogsByCategoryId(c.id).length;
              if (count === 0) return null;
              return (
                <TabsTrigger
                  key={c.id}
                  value={c.id}
                  className="rounded-pill border border-cream-line bg-cream-card px-4 py-2 text-body-sm font-semibold text-ink-700 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:border-orange-500 data-[state=active]:shadow-glow-orange transition-all"
                >
                  {c.title} ({count})
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value={TAB_ALL} className="mt-0">
            <BlogsGrid blogs={blogs} />
          </TabsContent>
          {categories.map((c) => (
            <TabsContent key={c.id} value={c.id} className="mt-0">
              <BlogsGrid blogs={getBlogsByCategoryId(c.id)} />
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </main>
  );
}

function BlogsGrid({ blogs }: { blogs: Blog[] }) {
  if (blogs.length === 0) {
    return (
      <p className="text-body text-ink-500 py-12 text-center">
        No articles in this category yet.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
