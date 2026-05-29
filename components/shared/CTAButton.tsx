import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "gradient" | "secondary" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-orange-500 text-white shadow-glow-orange hover:bg-orange-600",
  gradient: "bg-gradient-cta text-white shadow-glow-soft",
  secondary: "bg-cream-card text-ink-900 shadow-sh-2 hover:shadow-sh-3",
  ghost: "bg-transparent text-orange-500 hover:bg-orange-50",
  dark: "bg-ink-800 text-white hover:bg-ink-900",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2.5 text-meta",
  md: "px-5 py-3.5 text-[15px]",
  lg: "px-7 py-4 text-body",
};

const base =
  "inline-flex items-center justify-center font-semibold rounded-pill transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-bg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
  };

type AnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "href"> & {
    href: string;
  };

export type CTAButtonProps = ButtonProps | AnchorProps;

function isExternal(href: string): boolean {
  return /^(https?:|mailto:|tel:)/i.test(href);
}

export function CTAButton(props: CTAButtonProps) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props as AnchorProps;
    if (isExternal(href)) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { ...rest } = props as ButtonProps;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
