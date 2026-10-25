import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { NavLinks } from "./NavLinks";

export function SiteHeader() {
  return (
    <header className="hd">
      <div className="wrap hd-in">
        <Link className="logo" href="/" aria-label="Mawj Swim Academy home">
          <svg width="36" height="36" viewBox="0 0 40 40" aria-hidden="true">
            <circle cx="20" cy="20" r="20" fill="#087F8C" />
            <path
              d="M6 17c4-5 8-5 12 0s8 5 12 0 4-3 4-3M6 24c4-5 8-5 12 0s8 5 12 0 4-3 4-3"
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <span>Mawj Swim Academy</span>
        </Link>
        <NavLinks />
        <ButtonLink href="/enroll" variant="coral">
          Enroll Your Child
        </ButtonLink>
      </div>
    </header>
  );
}
