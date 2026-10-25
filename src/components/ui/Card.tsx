import type { ReactNode } from "react";

interface CardProps {
  as?: "section" | "aside" | "div";
  className?: string;
  "aria-label"?: string;
  children: ReactNode;
}

export function Card({ as: Tag = "div", className, children, ...rest }: CardProps) {
  return (
    <Tag className={className ? `card ${className}` : "card"} {...rest}>
      {children}
    </Tag>
  );
}
