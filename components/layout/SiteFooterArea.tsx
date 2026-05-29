import { getAllLabTests } from "@/lib/data/labtests";
import { getAllNonLabTests } from "@/lib/data/nonlabtests";
import { getAllCenters } from "@/lib/data/centers";
import { centerUrl, labTestUrl, nonLabTestUrl } from "@/lib/urls";
import {
  TestTagsSection,
  type TestTag,
} from "@/components/home/TestTagsSection";
import { AboutBlurb } from "@/components/home/AboutBlurb";
import { Footer } from "@/components/layout/Footer";

const ABOUT_PARAGRAPHS = [
  "Welcome to Cadabam's Diagnostics, where diagnostic care meets modern convenience. We believe that accessing vital health insights shouldn't mean sacrificing comfort. That's why we bring advanced, high-quality testing services delivered straight to your doorstep. Our commitment to accuracy, speed, and compassion ensures that every test is handled with the utmost care, giving you reliable results without leaving home. Trusted by healthcare providers and patients alike, we're here to support your wellness journey with expertise you can count on.",
];

export function SiteFooterArea() {
  const labTestTags: TestTag[] = getAllLabTests()
    .filter((t) => t.testName && t.testName.trim().length > 0)
    .slice(0, 30)
    .map((t) => ({ id: t.id, name: t.testName, href: labTestUrl(t) }));

  const scanTags: TestTag[] = getAllNonLabTests()
    .filter((t) => t.testName && t.testName.trim().length > 0)
    .slice(0, 25)
    .map((t) => ({ id: t.id, name: t.testName, href: nonLabTestUrl(t) }));

  const centreTags: TestTag[] = getAllCenters().map((c) => ({
    id: c.id,
    name: c.basic_info.area
      .replace(/-/g, " ")
      .replace(/\b\w/g, (ch) => ch.toUpperCase()),
    href: centerUrl(c),
  }));

  return (
    <>
      <TestTagsSection
        overline="Discover more"
        title="Related lab tests"
        tags={labTestTags}
      />
      <TestTagsSection
        overline="Imaging"
        title="Popular radiology scans"
        tags={scanTags}
        className="py-12 lg:py-16 bg-cream-soft"
      />
      <TestTagsSection
        overline="Locations"
        title="Our top diagnostic centres"
        tags={centreTags}
      />
      <AboutBlurb paragraphs={ABOUT_PARAGRAPHS} />
      <Footer />
    </>
  );
}
