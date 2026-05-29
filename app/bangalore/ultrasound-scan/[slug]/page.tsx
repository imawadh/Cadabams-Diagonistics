import { ScanDetail } from "@/components/scans/ScanDetail";
import {
  scanDetailMetadata,
  scanFamilyStaticParams,
} from "@/lib/scan-pages";

export const revalidate = 86400;

export function generateStaticParams() {
  return scanFamilyStaticParams("ultrasound-scan");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return scanDetailMetadata(slug);
}

export default async function UltrasoundScanDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ScanDetail familyPath="ultrasound-scan" slug={slug} />;
}
