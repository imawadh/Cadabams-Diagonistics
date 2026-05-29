"""
Convert MongoDB-dump JSON files under data/db-json-data/ into one
consolidated JSON file per collection under data/md+json/.

Each output file is an array of records. Every record carries the cleaned
structured fields (Mongo $oid / $date wrappers stripped, __v dropped, _id
renamed to id) and, where applicable, a `markdown` field holding the
long-form body content converted from HTML to Markdown.

Re-run safe: the entire data/md+json/ directory is wiped and recreated.

Usage:
    python scripts/convert_db_to_md.py
"""

from __future__ import annotations

import html
import json
import re
import shutil
import sys
from pathlib import Path
from typing import Any

from markdownify import markdownify

ROOT = Path(__file__).resolve().parent.parent
SRC_DIR = ROOT / "data" / "db-json-data"
OUT_DIR = ROOT / "data" / "md+json"


# --- Mongo extended-JSON cleanup ---------------------------------------------

def clean_mongo(value: Any) -> Any:
    if isinstance(value, dict):
        if set(value.keys()) == {"$oid"}:
            return value["$oid"]
        if set(value.keys()) == {"$date"}:
            return value["$date"]
        out: dict[str, Any] = {}
        for k, v in value.items():
            if k == "__v":
                continue
            if k == "_id":
                out["id"] = clean_mongo(v)
            else:
                out[k] = clean_mongo(v)
        return out
    if isinstance(value, list):
        return [clean_mongo(v) for v in value]
    return value


# --- Rich-content unwrapping --------------------------------------------------

def unwrap_json_string(s: str) -> str:
    """Blog `content` is double-JSON-encoded:  "\"\\\"<p>...</p>\\\"\"".
    Repeatedly json.loads until the value is no longer a JSON-encoded string."""
    if not isinstance(s, str):
        return s
    current = s
    for _ in range(5):
        trimmed = current.strip()
        if not (trimmed.startswith('"') and trimmed.endswith('"')):
            break
        try:
            nxt = json.loads(trimmed)
        except (ValueError, json.JSONDecodeError):
            break
        if not isinstance(nxt, str) or nxt == current:
            break
        current = nxt
    return current


def html_to_md(raw: str) -> str:
    if not raw:
        return ""
    unwrapped = unwrap_json_string(raw)
    decoded = html.unescape(unwrapped)
    md = markdownify(
        decoded,
        heading_style="ATX",
        bullets="-",
        strip=["script", "style"],
    )
    md = re.sub(r"\n{3,}", "\n\n", md).strip()
    return md


def _clean_faq(faq: Any) -> Any:
    if not isinstance(faq, dict):
        return faq
    out = dict(faq)
    for k in ("question", "answer"):
        v = out.get(k)
        if isinstance(v, str) and ("<" in v or "&" in v):
            out[k] = html_to_md(v)
    return out


# --- Section-body extraction (lab/non-lab test templates) --------------------

SECTION_BODY_KEYS = (
    "description",
    "about_test",
    "measures",
    "type_of_test",
    "often_take_test",
    "risks_limitations",
    "testParameters",
    "who_need_test",
    "benifit_taking_test",
    "diseases_diagnosed",
    "testPreparation",
)


def _section_body(alldata: Any) -> tuple[str, dict[str, Any]]:
    if isinstance(alldata, dict):
        items: list[tuple[str, Any]] = list(alldata.items())
    elif isinstance(alldata, list):
        items = []
        for entry in alldata:
            if isinstance(entry, dict) and len(entry) == 1:
                items.append(next(iter(entry.items())))
    else:
        return ("", {})

    body_parts: list[str] = []
    extras: dict[str, Any] = {}
    for key, val in items:
        if key in SECTION_BODY_KEYS and isinstance(val, dict):
            title = (val.get("title") or "").strip()
            desc_md = html_to_md(val.get("desc") or "")
            image = val.get("imageSrc") or val.get("imageurl") or ""
            if not title and not desc_md and not image:
                continue
            if title:
                body_parts.append(f"## {title}")
            if image:
                body_parts.append(f"![{title or key}]({image})")
            if desc_md:
                body_parts.append(desc_md)
        else:
            extras[key] = val
    return ("\n\n".join(body_parts), extras)


# --- Per-collection record builders ------------------------------------------
# Each builder takes the raw record list and returns a list of cleaned dicts,
# each with the cleaned fields plus (optionally) a `markdown` body field.

def _attach_body(record: dict, body: str) -> dict:
    if body:
        record["markdown"] = body
    return record


def build_blogs(records: list[dict]) -> list[dict]:
    out: list[dict] = []
    for r in records:
        r = clean_mongo(r)
        body = html_to_md(r.get("content") or "")
        faqs_raw = r.get("faqs") or []
        faqs: list = []
        if isinstance(faqs_raw, list):
            for item in faqs_raw:
                if isinstance(item, str):
                    try:
                        parsed = json.loads(item)
                        faqs.extend(parsed if isinstance(parsed, list) else [parsed])
                    except (ValueError, json.JSONDecodeError):
                        faqs.append(item)
                else:
                    faqs.append(item)
        faqs = [_clean_faq(f) for f in faqs]
        seo = r.get("seo") or {}
        if isinstance(seo, dict):
            seo = {k: v for k, v in seo.items() if k != "id"}
        rec = {
            "id": r.get("id", ""),
            "title": r.get("title", ""),
            "route": r.get("route", ""),
            "categoryName": r.get("categoryName", ""),
            "blogCategoryId": r.get("blogCategory"),
            "verifiedBy": r.get("verifiedBy", ""),
            "imageUrl": r.get("imageUrl", ""),
            "pageState": r.get("pageState", ""),
            "createdAt": r.get("createdAt"),
            "updatedAt": r.get("updatedAt"),
            "seo": seo,
            "faqs": faqs,
        }
        out.append(_attach_body(rec, body))
    return out


def build_test_template(records: list[dict]) -> list[dict]:
    out: list[dict] = []
    for r in records:
        r = clean_mongo(r)
        basic_info: dict = {}
        alldata = r.get("alldata") or []
        if alldata and isinstance(alldata[0], dict) and "basic_info" in alldata[0]:
            basic_info = alldata[0].get("basic_info") or {}
            alldata = alldata[1:]
        body, extras = _section_body(alldata)
        if isinstance(extras.get("faqs"), list):
            extras["faqs"] = [_clean_faq(f) for f in extras["faqs"]]
        seo = r.get("seo") or {}
        if isinstance(seo, dict):
            seo = {k: v for k, v in seo.items() if k != "id"}
        rec = {
            "id": r.get("id", ""),
            "templateName": r.get("templateName", ""),
            "testName": r.get("testName") or basic_info.get("name", ""),
            "route": r.get("route") or basic_info.get("route", ""),
            "basic_info": basic_info,
            **extras,
            "seo": seo,
        }
        out.append(_attach_body(rec, body))
    return out


def build_centerpages(records: list[dict]) -> list[dict]:
    out: list[dict] = []
    for r in records:
        r = clean_mongo(r)
        basic_info = r.get("basic_info") or {}
        center_desc = basic_info.get("center_description") or ""
        body = ""
        if center_desc:
            body = html_to_md(center_desc) if "<" in center_desc else center_desc
        seo = r.get("seo") or {}
        if isinstance(seo, dict):
            seo = {k: v for k, v in seo.items() if k != "id"}
        rec = {
            "id": r.get("id", ""),
            "templateName": r.get("templateName", ""),
            "basic_info": {k: v for k, v in basic_info.items() if k != "center_description"},
            "center_info": r.get("center_info") or {},
            "working_hours": r.get("working_hours") or {},
            "services": r.get("services") or [],
            "testimonials": r.get("testimonials") or [],
            "team": r.get("team") or [],
            "faqs": r.get("faqs") or [],
            "seo": seo,
        }
        out.append(_attach_body(rec, body))
    return out


def build_simple_category(records: list[dict]) -> list[dict]:
    out: list[dict] = []
    for r in records:
        r = clean_mongo(r)
        desc = r.get("description") or ""
        desc_md = html_to_md(desc) if "<" in desc else desc
        rec = {k: v for k, v in r.items() if k not in ("description", "allData", "alldata")}
        section_src = r.get("allData") if r.get("allData") is not None else r.get("alldata")
        section_body, extras = _section_body(section_src) if section_src else ("", {})
        if isinstance(extras.get("faqs"), list):
            extras["faqs"] = [_clean_faq(f) for f in extras["faqs"]]
        if extras:
            rec["allData"] = extras
        body = "\n\n".join(part for part in [desc_md, section_body] if part)
        out.append(_attach_body(rec, body))
    return out


BODY_FIELDS = (
    "content", "description", "longDescription",
    "center_description", "about", "overview", "summary",
    "body",
)


def build_generic(records: list[dict]) -> list[dict]:
    """Catch-all: any HTML-looking string field becomes the markdown body."""
    out: list[dict] = []
    for r in records:
        r = clean_mongo(r)
        body = ""
        rec: dict[str, Any] = {}
        for k, v in r.items():
            if k in BODY_FIELDS and isinstance(v, str) and v.strip():
                unwrapped = unwrap_json_string(v)
                if "<" in unwrapped and ">" in unwrapped:
                    body = html_to_md(unwrapped)
                    continue
                if not body:
                    body = unwrapped
                    continue
            rec[k] = v
        out.append(_attach_body(rec, body))
    return out


# --- Driver -------------------------------------------------------------------

JOBS = [
    # Content pages — bespoke builders
    ("test.blogs.json",                "blogs",                 build_blogs),
    ("test.pagetemplates.json",        "labtests",              build_test_template),
    ("test.nonlabtests.json",          "nonlabtests",           build_test_template),
    ("test.centerpages.json",          "centerpages",           build_centerpages),
    ("test.labtestcategories.json",    "labtest-categories",    build_simple_category),
    ("test.nonlabtestcategories.json", "nonlabtest-categories", build_simple_category),
    ("test.vitalorgans.json",          "vitalorgans",           build_simple_category),
    # UI singletons & config
    ("test.heros.json",                "heros",                 build_generic),
    ("test.navbars.json",              "navbars",               build_generic),
    ("test.features.json",             "features",              build_generic),
    ("test.healthmonitorings.json",    "healthmonitorings",     build_generic),
    ("test.discountoffers.json",       "discountoffers",        build_generic),
    ("test.mostbookedcheckups.json",   "mostbookedcheckups",    build_generic),
    ("test.homepages.json",            "homepages",             build_generic),
    ("test.labtesthomepages.json",     "labtesthomepages",      build_generic),
    ("test.searchbars.json",           "searchbars",            build_generic),
    ("test.hompagetemplates.json",     "homepagetemplates",     build_generic),
    ("test.blogcategories.json",       "blogcategories",        build_generic),
    # Operational / sensitive — included per user request
    ("test.admins.json",               "admins",                build_generic),
    ("test.users.json",                "users",                 build_generic),
    ("test.otps.json",                 "otps",                  build_generic),
    ("test.carts.json",                "carts",                 build_generic),
    ("test.cartitems.json",            "cartitems",             build_generic),
]


def main() -> int:
    if not SRC_DIR.is_dir():
        print(f"ERROR: source directory not found: {SRC_DIR}", file=sys.stderr)
        return 1
    # Wipe the entire output dir for a clean re-run.
    if OUT_DIR.exists():
        shutil.rmtree(OUT_DIR)
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    total_records = 0
    for filename, out_name, builder in JOBS:
        src = SRC_DIR / filename
        if not src.is_file():
            print(f"skip  {filename:35s}  (not found)")
            continue
        try:
            with src.open("r", encoding="utf-8") as f:
                records = json.load(f)
        except json.JSONDecodeError as e:
            print(f"FAIL  {filename:35s}  JSON parse error: {e}", file=sys.stderr)
            continue
        if not isinstance(records, list):
            records = [records]
        if not records:
            print(f"skip  {filename:35s}  (empty array)")
            continue
        bundle = builder(records)
        out_file = OUT_DIR / f"{out_name}.json"
        with out_file.open("w", encoding="utf-8") as f:
            json.dump(bundle, f, ensure_ascii=False, indent=2)
        total_records += len(bundle)
        print(f"ok    {filename:35s}  -> md+json/{out_name}.json  ({len(bundle)} records)")
    print(f"\nDone. Wrote {total_records} records across {OUT_DIR}.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
