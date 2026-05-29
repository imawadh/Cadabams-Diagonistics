#!/usr/bin/env node
// Downloads every image URL referenced in data/md+json/*.json,
// converts to WebP via sharp, saves under public/<section>/, and
// rewrites the JSON in place to use the local /<section>/<file>.webp path.
//
// Usage:
//   node scripts/download-images.mjs                     # process all mapped files
//   node scripts/download-images.mjs --only=heros.json   # process one file
//   node scripts/download-images.mjs --dry-run           # plan only, no writes
//   node scripts/download-images.mjs heros.json homepages.json   # positional file list

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data", "md+json");
const PUBLIC_DIR = path.join(ROOT, "public");

// One destination folder per JSON source.
const FOLDER_MAP = {
  "blogcategories.json": "blogs",
  "blogs.json": "blogs",
  "centerpages.json": "centers",
  "discountoffers.json": "shared",
  "features.json": "shared",
  "healthmonitorings.json": "health-checkups",
  "heros.json": "home",
  "homepages.json": "home",
  "labtest-categories.json": "lab-tests",
  "labtesthomepages.json": "lab-tests",
  "labtests.json": "lab-tests",
  "mostbookedcheckups.json": "health-checkups",
  "navbars.json": "shared",
  "nonlabtest-categories.json": "scans",
  "nonlabtests.json": "scans",
  "searchbars.json": "shared",
  "vitalorgans.json": "shared",
};

// Match a *whole* string that is an http(s) URL ending in an image extension
// (with optional query string). Anchored on both ends so multi-line markdown
// bodies containing image links won't accidentally match.
const IMAGE_URL_PATTERN =
  /^https?:\/\/[^\s]+\.(?:png|jpe?g|webp|gif|bmp|tiff?)(?:\?[^\s]*)?$/i;

const args = process.argv.slice(2);
const onlyFlagIdx = args.findIndex((a) => a.startsWith("--only="));
const positionalFiles = args.filter((a) => !a.startsWith("--"));
const onlyFiles =
  onlyFlagIdx >= 0
    ? args[onlyFlagIdx]
        .slice("--only=".length)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : positionalFiles;
const dryRun = args.includes("--dry-run");

function localPathFor(url, destFolder) {
  const noQuery = url.split("?")[0];
  const raw = noQuery.split("/").pop() || "image";
  // Strip any extension, then add .webp
  const stem = raw.replace(/\.[A-Za-z0-9]+$/i, "");
  return `/${destFolder}/${stem}.webp`;
}

async function downloadAndConvert(url, destFolder) {
  const local = localPathFor(url, destFolder);
  const absPath = path.join(PUBLIC_DIR, local);

  if (fs.existsSync(absPath)) {
    return { local, status: "cached" };
  }
  if (dryRun) {
    return { local, status: "planned" };
  }

  fs.mkdirSync(path.dirname(absPath), { recursive: true });
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf).webp({ quality: 85 }).toFile(absPath);
    return { local, status: "downloaded" };
  } catch (err) {
    return { local: null, status: "failed", error: String(err.message || err) };
  }
}

async function transform(value, destFolder, stats) {
  if (typeof value === "string") {
    if (!IMAGE_URL_PATTERN.test(value)) return value;
    const result = await downloadAndConvert(value, destFolder);
    if (result.status === "failed") {
      console.warn(`  ✗ ${value}\n      → ${result.error}`);
      stats.failed++;
      return value;
    }
    const marker =
      result.status === "downloaded"
        ? "✓"
        : result.status === "cached"
          ? "·"
          : "○";
    console.log(`  ${marker} ${result.local}  (from ${value})`);
    stats[result.status]++;
    return result.local;
  }
  if (Array.isArray(value)) {
    const out = new Array(value.length);
    for (let i = 0; i < value.length; i++) {
      out[i] = await transform(value[i], destFolder, stats);
    }
    return out;
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = await transform(v, destFolder, stats);
    }
    return out;
  }
  return value;
}

async function processFile(filename) {
  const destFolder = FOLDER_MAP[filename];
  if (!destFolder) {
    console.warn(`Skipping ${filename} (no folder mapping)`);
    return;
  }
  const absJsonPath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(absJsonPath)) {
    console.warn(`Skipping ${filename} (file not found at ${absJsonPath})`);
    return;
  }

  console.log(`\n→ ${filename}  →  public/${destFolder}/`);
  const raw = fs.readFileSync(absJsonPath, "utf8");
  const data = JSON.parse(raw);
  const stats = { downloaded: 0, cached: 0, planned: 0, failed: 0 };
  const transformed = await transform(data, destFolder, stats);

  if (!dryRun) {
    fs.writeFileSync(
      absJsonPath,
      JSON.stringify(transformed, null, 2) + "\n",
      "utf8",
    );
  }
  const summaryBits = [];
  if (stats.downloaded) summaryBits.push(`${stats.downloaded} downloaded`);
  if (stats.cached) summaryBits.push(`${stats.cached} cached`);
  if (stats.planned) summaryBits.push(`${stats.planned} planned`);
  if (stats.failed) summaryBits.push(`${stats.failed} FAILED`);
  console.log(
    `  Summary: ${summaryBits.join(", ") || "no image URLs found"}${dryRun ? " (dry-run, JSON untouched)" : ""}`,
  );
}

async function main() {
  const files = onlyFiles.length > 0 ? onlyFiles : Object.keys(FOLDER_MAP);
  for (const f of files) {
    await processFile(f);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
