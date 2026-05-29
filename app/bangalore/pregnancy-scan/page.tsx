import { ScanListing } from "@/components/scans/ScanListing";
import { scanListingMetadata } from "@/lib/scan-pages";

export const revalidate = 3600;
export const metadata = scanListingMetadata("pregnancy-scan");

interface PageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function PregnancyScanListingPage({
  searchParams,
}: PageProps) {
  const sp = await searchParams;
  return <ScanListing familyPath="pregnancy-scan" searchParams={sp} />;
}
