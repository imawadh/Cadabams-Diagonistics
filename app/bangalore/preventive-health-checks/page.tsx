import { ScanListing } from "@/components/scans/ScanListing";
import { scanListingMetadata } from "@/lib/scan-pages";

export const revalidate = 3600;
export const metadata = scanListingMetadata("preventive-health-checks");

interface PageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function PreventiveHealthChecksListingPage({
  searchParams,
}: PageProps) {
  const sp = await searchParams;
  return (
    <ScanListing familyPath="preventive-health-checks" searchParams={sp} />
  );
}
