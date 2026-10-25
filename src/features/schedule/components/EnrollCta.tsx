import { ButtonLink } from "@/components/ui/ButtonLink";
import { ageLabel, canEnroll, shiftTitle } from "../availability";
import type { Selection, Status } from "../types";

interface EnrollCtaProps {
  selection: Selection;
  status: Status;
}

export function EnrollCta({ selection, status }: EnrollCtaProps) {
  return (
    <section className="cta">
      <div>
        <h2>
          Ready to lock in {shiftTitle(selection.shift)} for ages {ageLabel(selection.age)}?
        </h2>
        <p>Enroll in about five minutes. Siblings save 10% to 15% automatically.</p>
      </div>
      {canEnroll(status) ? (
        <ButtonLink href="/enroll" variant="coral" size="lg">
          Enroll Your Child
        </ButtonLink>
      ) : (
        <ButtonLink href="/programs" variant="outline" size="lg">
          See other programs
        </ButtonLink>
      )}
    </section>
  );
}
