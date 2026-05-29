"use client";

import { FormEvent, useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight } from "lucide-react";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // UI-only — auth logic not wired up.
  }

  const strength = passwordStrength(password);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="signup-name"
          className="block text-meta font-semibold text-ink-700 mb-1.5"
        >
          Full name
        </label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none" />
          <input
            id="signup-name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Priya Sharma"
            className="w-full bg-cream-bg rounded-md border border-cream-line text-ink-900 placeholder:text-ink-400 pl-10 pr-3 py-3 text-body-sm focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="signup-email"
            className="block text-meta font-semibold text-ink-700 mb-1.5"
          >
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none" />
            <input
              id="signup-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-cream-bg rounded-md border border-cream-line text-ink-900 placeholder:text-ink-400 pl-10 pr-3 py-3 text-body-sm focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="signup-phone"
            className="block text-meta font-semibold text-ink-700 mb-1.5"
          >
            Phone
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none" />
            <input
              id="signup-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              pattern="[0-9+\s\-()]{7,}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full bg-cream-bg rounded-md border border-cream-line text-ink-900 placeholder:text-ink-400 pl-10 pr-3 py-3 text-body-sm focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
            />
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="signup-password"
          className="block text-meta font-semibold text-ink-700 mb-1.5"
        >
          Create password
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400 pointer-events-none" />
          <input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            className="w-full bg-cream-bg rounded-md border border-cream-line text-ink-900 placeholder:text-ink-400 pl-10 pr-11 py-3 text-body-sm focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 inline-flex items-center justify-center rounded-pill text-ink-500 hover:text-ink-900 hover:bg-cream-line transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {password.length > 0 && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex gap-1 flex-1">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`h-1 flex-1 rounded-pill transition-colors ${
                    i < strength.score
                      ? strength.color
                      : "bg-cream-line"
                  }`}
                />
              ))}
            </div>
            <span
              className={`text-caption font-semibold ${strength.textColor}`}
            >
              {strength.label}
            </span>
          </div>
        )}
      </div>

      <label className="flex items-start gap-2.5 text-meta text-ink-700 cursor-pointer select-none">
        <input
          type="checkbox"
          required
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-cream-line text-orange-500 focus:ring-2 focus:ring-orange-300 focus:ring-offset-0 flex-shrink-0"
        />
        <span>
          I agree to the{" "}
          <a
            href="/terms-of-use"
            className="text-orange-600 font-semibold hover:text-orange-700"
          >
            Terms of Use
          </a>{" "}
          and{" "}
          <a
            href="/privacy-policy"
            className="text-orange-600 font-semibold hover:text-orange-700"
          >
            Privacy Policy
          </a>
          .
        </span>
      </label>

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2 rounded-pill bg-gradient-cta text-white font-bold px-6 py-3 text-body shadow-glow-orange ring-2 ring-orange-300/30 hover:brightness-110 active:scale-[0.98] transition-all duration-200"
      >
        Create my account
        <ArrowRight className="w-4 h-4" />
      </button>

      <div className="relative pt-2">
        <span aria-hidden className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-cream-line" />
        </span>
        <span className="relative flex justify-center">
          <span className="bg-cream-card px-3 text-meta font-semibold text-ink-500 uppercase tracking-overline">
            or
          </span>
        </span>
      </div>

      <button
        type="button"
        className="w-full inline-flex items-center justify-center gap-2.5 rounded-pill bg-cream-card hover:bg-cream-soft text-ink-900 font-semibold px-6 py-3 text-body border border-cream-line transition-all"
      >
        <GoogleIcon className="w-5 h-5" />
        Continue with Google
      </button>
    </form>
  );
}

function passwordStrength(pw: string): {
  score: number;
  label: string;
  color: string;
  textColor: string;
} {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const buckets = [
    { label: "Too short", color: "bg-red-400", textColor: "text-red-600" },
    { label: "Weak", color: "bg-red-400", textColor: "text-red-600" },
    { label: "Fair", color: "bg-orange-400", textColor: "text-orange-700" },
    { label: "Good", color: "bg-yellow-400", textColor: "text-yellow-700" },
    { label: "Strong", color: "bg-green-500", textColor: "text-green-700" },
  ];
  return { score, ...buckets[score]! };
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.12c-.22-.66-.35-1.36-.35-2.12s.13-1.46.35-2.12V7.04H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.96l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}
