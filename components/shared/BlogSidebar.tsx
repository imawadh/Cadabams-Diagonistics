"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import {
  Beaker,
  Check,
  HeartPulse,
  Sparkles,
} from "lucide-react";
import {
  CentersListCard,
  type CentersListItem,
} from "@/components/shared/CentersListCard";

interface BlogSidebarProps {
  centers?: CentersListItem[];
}

type Status = "idle" | "submitting" | "submitted" | "error";

const FRESHSALES_ENDPOINT =
  "https://cadabamsdiagnostics.myfreshworks.com/crm/sales/smart_form/create_entity?file_attachments_present=false";
const FRESHSALES_KEY =
  "bb88c16791f1cb14ef2689824060cde9861d5bfdd5e32975167f8cdb57f7b0b6";

export function BlogSidebar({ centers }: BlogSidebarProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    try {
      const formData = new FormData();
      formData.append("smart_form_data[contact][first_name]", name.trim());
      formData.append("smart_form_data[contact][mobile_number]", phone.trim());
      formData.append("smart_form_data[note][description]", message.trim());
      formData.append("form_data_key", FRESHSALES_KEY);
      await fetch(FRESHSALES_ENDPOINT, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });
      setStatus("submitted");
      setName("");
      setPhone("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="space-y-5">
      <section className="bg-cream-card rounded-2xl shadow-sh-3 border border-cream-line overflow-hidden">
        <div className="bg-gradient-orange-soft p-5 border-b border-cream-line">
          <p className="text-overline uppercase text-orange-700 font-bold tracking-overline">
            Get in touch
          </p>
          <h3 className="text-h3 font-bold text-ink-900 leading-snug mt-1">
            Need a test or scan?
          </h3>
          <p className="text-body-sm text-ink-600 mt-1">
            Share your details — our team will call you back within minutes.
          </p>
        </div>

        {status === "submitted" ? (
          <div className="p-5 flex items-start gap-3">
            <span className="w-9 h-9 inline-flex items-center justify-center rounded-pill bg-success-bg text-success flex-shrink-0">
              <Check className="w-5 h-5" />
            </span>
            <div>
              <p className="text-body font-bold text-ink-900">Thanks!</p>
              <p className="text-body-sm text-ink-600 mt-0.5">
                We&apos;ve received your request and will reach out shortly.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3">
            <div>
              <label
                htmlFor="blog-sb-name"
                className="block text-meta font-semibold text-ink-700 mb-1"
              >
                Your name
              </label>
              <input
                id="blog-sb-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Priya Sharma"
                className="w-full bg-cream-bg rounded-md border border-cream-line text-ink-900 placeholder:text-ink-400 px-3 py-2.5 text-body-sm focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="blog-sb-phone"
                className="block text-meta font-semibold text-ink-700 mb-1"
              >
                Phone number
              </label>
              <input
                id="blog-sb-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                inputMode="tel"
                pattern="[0-9+\s\-()]{7,}"
                placeholder="+91 98765 43210"
                className="w-full bg-cream-bg rounded-md border border-cream-line text-ink-900 placeholder:text-ink-400 px-3 py-2.5 text-body-sm focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="blog-sb-msg"
                className="block text-meta font-semibold text-ink-700 mb-1"
              >
                What test or scan?{" "}
                <span className="text-ink-400 font-normal">(optional)</span>
              </label>
              <textarea
                id="blog-sb-msg"
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Lab test name, scan type, or symptoms"
                className="w-full bg-cream-bg rounded-md border border-cream-line text-ink-900 placeholder:text-ink-400 px-3 py-2.5 text-body-sm resize-none focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full inline-flex items-center justify-center gap-2 rounded-pill bg-gradient-cta text-white font-bold px-5 py-3 text-body shadow-glow-orange ring-2 ring-orange-300/30 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              {status === "submitting" ? "Submitting…" : "Request a callback"}
            </button>
            {status === "error" && (
              <p className="text-caption text-red-600 text-center">
                Something went wrong. Please try again or call us directly.
              </p>
            )}
            <p className="text-caption text-ink-400 text-center pt-1">
              By submitting, you agree to be contacted by our team.
            </p>
          </form>
        )}
      </section>

      <section className="bg-cream-card rounded-2xl shadow-sh-2 border border-cream-line overflow-hidden">
        <div className="px-5 py-3 border-b border-cream-line">
          <p className="text-meta font-bold text-ink-700 uppercase tracking-overline">
            Quick book
          </p>
        </div>
        <div className="p-5 space-y-3">
          <Link
            href="/bangalore/lab-test"
            className="w-full inline-flex items-center justify-center gap-2 rounded-pill bg-orange-50 hover:bg-orange-100 text-orange-700 font-semibold px-5 py-3 text-body border-2 border-orange-200 hover:border-orange-300 transition-all active:scale-[0.98]"
          >
            <Beaker className="w-4 h-4" />
            Book a lab test
          </Link>
          <Link
            href="/bangalore/xray-scan"
            className="w-full inline-flex items-center justify-center gap-2 rounded-pill bg-orange-50 hover:bg-orange-100 text-orange-700 font-semibold px-5 py-3 text-body border-2 border-orange-200 hover:border-orange-300 transition-all active:scale-[0.98]"
          >
            <HeartPulse className="w-4 h-4" />
            Book a radiology scan
          </Link>
        </div>
      </section>

      {centers && centers.length > 0 && <CentersListCard centers={centers} />}
    </div>
  );
}
