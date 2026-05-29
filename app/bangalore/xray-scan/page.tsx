import { ScanListing } from "@/components/scans/ScanListing";
import { scanListingMetadata } from "@/lib/scan-pages";

export const revalidate = 3600;
export const metadata = scanListingMetadata("xray-scan");

interface PageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function XrayScanListingPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  return <ScanListing familyPath="xray-scan" searchParams={sp} />;
}
