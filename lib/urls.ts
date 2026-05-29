import type { LabTest } from "@/lib/data/labtests";
import { getLabTestCategoryById } from "@/lib/data/labtests";
import type { NonLabTest } from "@/lib/data/nonlabtests";
import {
  getNonLabCategorySlug,
  getNonLabTestCategoryById,
} from "@/lib/data/nonlabtests";
import type { Blog } from "@/lib/data/blogs";
import type { Center } from "@/lib/data/centers";
import { getCenterSlug } from "@/lib/data/centers";
import { stripLeadingSlash } from "@/lib/data/types";

const CITY = "bangalore";

export function labTestUrl(test: LabTest): string {
  return `/${CITY}/lab-test/${stripLeadingSlash(test.route)}`;
}

export function nonLabTestUrl(test: NonLabTest): string {
  const cat = getNonLabTestCategoryById(test.basic_info.categoryId);
  const family = cat ? getNonLabCategorySlug(cat) : "scan";
  return `/${CITY}/${family}/${stripLeadingSlash(test.route)}`;
}

export function labCategoryUrl(categoryId: string): string {
  const cat = getLabTestCategoryById(categoryId);
  if (!cat) return `/${CITY}/lab-test`;
  return `/${CITY}/lab-test/${stripLeadingSlash(cat.path)}`;
}

export function nonLabCategoryUrl(categoryId: string): string {
  const cat = getNonLabTestCategoryById(categoryId);
  if (!cat) return `/${CITY}`;
  return `/${CITY}/${getNonLabCategorySlug(cat)}`;
}

export function blogUrl(blog: Blog): string {
  return `/blogs/${stripLeadingSlash(blog.route)}`;
}

export function centerUrl(center: Center): string {
  return `/${CITY}/center/${getCenterSlug(center)}`;
}

/** Normalize a raw href stored in JSON: add leading slash if missing, pass external/tel/mailto through. */
export function normalizeInternalHref(href: string | undefined | null): string {
  if (!href) return "/";
  if (/^(https?:|mailto:|tel:)/i.test(href)) return href;
  return href.startsWith("/") ? href : `/${href}`;
}
