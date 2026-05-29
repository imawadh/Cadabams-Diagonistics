import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionOverlineProps {
  children: ReactNode;
  className?: string;
}

export function SectionOverline({ children, className }: SectionOverlineProps) {
  return (
    <p
      className={cn(
        "text-overline uppercase text-orange-600 font-bold mb-2",
        className,
      )}
    >
      {children}
    </p>
  );
}
