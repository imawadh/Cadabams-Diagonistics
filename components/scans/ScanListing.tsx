import { notFound } from "next/navigation";
import {
  getNonLabTestCategoryBySlug,
  getNonLabTestsByCategoryId,
  getNonLabPriceNumber,
  getNonLabDiscountedPriceNumber,
} from "@/lib/data/nonlabtests";
import { nonLabTestUrl } from "@/lib/urls";
import { TestCard } from "@/components/shared/TestCard";
import { MarkdownContent } from "@/components/shared/MarkdownContent";

interface ScanListingProps {
  familyPath: string;
}

export function ScanListing({ familyPath }: ScanListingProps) {
  const category = getNonLabTestCategoryBySlug(familyPath);
  if (!category) notFound();

  const tests = getNonLabTestsByCategoryId(category.id).filter(
    (t) => t.testName && t.testName.trim().length > 0,
  );

  return (
    <main className="bg-cream-bg min-h-screen">
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-pill bg-white/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-32 w-[28rem] h-[28rem] rounded-pill bg-coral-400/30 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-gutter py-14 lg:py-20">
          <p className="text-overline uppercase text-white/80 font-bold mb-3">
            {category.name} in Bangalore
          </p>
          <h1 className="text-display-2 sm:text-display-1 lg:text-[52px] lg:leading-[1.05] font-display font-extrabold mb-4">
            {category.name}
          </h1>
          <p className="text-body lg:text-h3 text-white/90 max-w-2xl leading-relaxed">
            {tests.length} {category.name.toLowerCase()} available in Bangalore.
            Reports in hours. Certified equipment. Trusted by 10,000+ patients.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-gutter py-12 lg:py-16">
        {tests.length === 0 ? (
          <p className="text-body text-ink-500 py-12 text-center">
            No scans available in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test) => {
              const price = getNonLabPriceNumber(test);
              const discounted = getNonLabDiscountedPriceNumber(test);
              return (
                <TestCard
                  key={test.id}
                  name={test.testName}
                  image={test.basic_info.imageSrc ?? null}
                  price={discounted || price}
                  originalPrice={
                    discounted > 0 && discounted < price ? price : undefined
                  }
                  reportTime={test.basic_info.reportsWithin}
                  href={nonLabTestUrl(test)}
                />
              );
            })}
          </div>
        )}

        {category.markdown && category.markdown.trim().length > 0 && (
          <div className="mt-12 bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line p-6 sm:p-8">
            <MarkdownContent content={category.markdown} />
          </div>
        )}
      </section>
    </main>
  );
}
