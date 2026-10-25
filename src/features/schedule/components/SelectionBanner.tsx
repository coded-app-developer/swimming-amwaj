import { Fragment } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { StatusPill } from "@/components/ui/StatusPill";
import { ageLabel, canEnroll, periodTitle, placesText, shiftTitle } from "../availability";
import { PRICE_KD } from "../content";
import type { Season, Selection, Status } from "../types";

interface SelectionBannerProps {
  season: Season;
  selection: Selection;
  status: Status;
  spots: number;
}

export function SelectionBanner({ season, selection, status, spots }: SelectionBannerProps) {
  const items = [
    ["Season", season.name],
    ["Period", periodTitle(season, selection.period)],
    ["Shift", shiftTitle(selection.shift)],
    ["Age group", ageLabel(selection.age)],
  ];
  const bookable = canEnroll(status);

  return (
    <div className="ban-w">
      <div className="ban" role="status" aria-live="polite">
        {items.map(([label, value], i) => (
          <Fragment key={label}>
            {i > 0 && <span className="ban-sep" aria-hidden="true" />}
            <div className="ban-item">
              <span>{label}</span>
              <b>{value}</b>
            </div>
          </Fragment>
        ))}
        <span className="ban-gap" />
        <StatusPill status={status} detail={bookable ? placesText(spots) : undefined} />
        {bookable && (
          <ButtonLink href="/enroll" variant="coral" size="sm">
            Enroll · KD {PRICE_KD}
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
