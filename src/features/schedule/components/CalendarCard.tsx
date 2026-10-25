import { Card } from "@/components/ui/Card";
import {
  SESSION_DAYS_PER_WEEK,
  calendarWeeks,
  formatDay,
  monthOf,
  periodTitle,
  shiftHours,
  weekdayOf,
} from "../availability";
import type { Season, Selection } from "../types";

const WEEKDAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu"];

interface CalendarCardProps {
  season: Season;
  selection: Selection;
  onSelectDay: (day: number) => void;
}

export function CalendarCard({ season, selection, onSelectDay }: CalendarCardProps) {
  const weeks = calendarWeeks(season, selection.period);
  const hours = shiftHours(selection.shift);

  return (
    <Card as="section" aria-label="Calendar">
      <div className="card-h">
        <h2>{periodTitle(season, selection.period)} calendar</h2>
        <span>Sunday to Thursday · pick a day</span>
      </div>
      <div className="cal-h" aria-hidden="true">
        {WEEKDAY_HEADERS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      {weeks.map((week, w) => (
        <div key={w}>
          <p className="wk">Week {w + 1}</p>
          <div className="cal-g">
            {week.map((date, d) => {
              const index = w * SESSION_DAYS_PER_WEEK + d;
              return (
                <button
                  key={index}
                  type="button"
                  className="day"
                  aria-pressed={selection.day === index}
                  aria-label={`${weekdayOf(date)} ${formatDay(date)}, ${hours}`}
                  onClick={() => onSelectDay(index)}
                >
                  <small>{monthOf(date)}</small>
                  <b>{date.getUTCDate()}</b>
                  <span className="day-hours">{hours}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <div className="key">
        <span>
          <i className="key-session" />
          Session day
        </span>
        <span>
          <i className="key-selected" />
          Selected day
        </span>
        <span>Friday and Saturday: no sessions</span>
      </div>
    </Card>
  );
}
