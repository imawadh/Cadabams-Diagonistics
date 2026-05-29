import { ScanListing } from "@/components/scans/ScanListing";
import { scanListingMetadata } from "@/lib/scan-pages";

export const revalidate = 3600;
export const metadata = scanListingMetadata("mri-scan");

interface PageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function MriScanListingPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  return <ScanListing familyPath="mri-scan" searchParams={sp} />;
}
