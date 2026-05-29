export interface SEO {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  schemaMarkup?: string;
  robotsMeta?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface InterpretationTable {
  title?: string;
  cols: string[];
  rows: string[][];
}

export interface RelatedTestRef {
  id: string;
  testName: string;
  route: string;
}

export interface RelativeTestBlock {
  title?: string;
  categoryId?: string;
  tests: RelatedTestRef[];
}

export function stripLeadingSlash(s: string | undefined | null): string {
  if (!s) return "";
  return s.replace(/^\/+/, "");
}

export function slugifyLocation(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
