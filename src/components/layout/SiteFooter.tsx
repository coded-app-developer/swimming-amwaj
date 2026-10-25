import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <span>© 2027 Mawj Swim Academy. Concept design with fictional data.</span>
        <span>
          <Link href="/">Home</Link> · <Link href="/programs">Programs</Link> · <Link href="/enroll">Enroll</Link>
        </span>
      </div>
    </footer>
  );
}
