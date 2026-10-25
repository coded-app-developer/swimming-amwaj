import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonLinkProps {
  href: string;
  variant?: "primary" | "coral" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ href, variant = "primary", size = "md", className, children }: ButtonLinkProps) {
  const cls = ["btn", `btn-${variant}`, size !== "md" && `btn-${size}`, className].filter(Boolean).join(" ");
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
