"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/schedule", label: "Schedule" },
  { href: "/enroll", label: "Enroll" },
];

/** Inline nav on desktop; below 760px the same links sit behind a disclosure button. */
export function NavLinks() {
  const pathname = usePathname();
  // Remember which page the menu was opened on, so a route change closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenOn(null);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="nv-w">
      <button
        ref={toggleRef}
        type="button"
        className="nv-toggle"
        aria-expanded={open}
        aria-controls="primary-nav"
        onClick={() => setOpenOn(open ? null : pathname)}
      >
        <Icon name={open ? "close" : "menu"} />
        <span>Menu</span>
      </button>
      <nav id="primary-nav" className="nv" aria-label="Primary" data-open={open}>
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={pathname === l.href ? "page" : undefined}
            onClick={() => setOpenOn(null)}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
