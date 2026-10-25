import { Card } from "@/components/ui/Card";
import {
  SESSION_DAYS_PER_WEEK,
  ageLabel,
  calendarWeeks,
  formatLongDate,
  sessionBlocks,
  shiftHours,
} from "../availability";
import { AGE_FOCUS, PRICE_KD, SHIFT_NAME } from "../content";
import type { Season, Selection } from "../types";

interface DayDetailProps {
  season: Season;
  selection: Selection;
}

export function DayDetail({ season, selection }: DayDetailProps) {
  const weeks = calendarWeeks(season, selection.period);
  const date =
    weeks[Math.floor(selection.day / SESSION_DAYS_PER_WEEK)][selection.day % SESSION_DAYS_PER_WEEK];

  return (
    <Card as="aside" className="dt" aria-label="Selected day">
      <p className="eyebrow">Selected day</p>
      <p className="dt-d">{formatLongDate(date)}</p>
      <p className="dt-s">
        {SHIFT_NAME[selection.shift]} shift · {shiftHours(selection.shift)} (illustrative)
      </p>
      <div className="chiprow">
        <span>Ages {ageLabel(selection.age)}</span>
        <span>{AGE_FOCUS[selection.age]}</span>
        <span>KD {PRICE_KD} per child</span>
      </div>
      <ol className="tl">
        {sessionBlocks(selection.shift, selection.age).map((b) => (
          <li key={b.n}>
            <span className="tl-n" aria-hidden="true">
              {b.n}
            </span>
            <div>
              <small>{b.time}</small>
              <b>{b.title}</b>
              <span>{b.text}</span>
            </div>
          </li>
        ))}
      </ol>
      <p className="note">Illustrative four-hour session outline. The academy will confirm the final structure.</p>
    </Card>
  );
}
