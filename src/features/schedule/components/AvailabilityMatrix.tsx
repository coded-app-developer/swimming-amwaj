import { Fragment } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusPill } from "@/components/ui/StatusPill";
import { ageLabel, periodTitle, spotsLeft, spotsText, statusOf } from "../availability";
import { SHIFT_NAME, STATUS_LABEL } from "../content";
import { AGE_GROUPS, SHIFTS, type ScheduleData, type Season, type Selection } from "../types";

interface AvailabilityMatrixProps {
  data: ScheduleData;
  season: Season;
  selection: Selection;
  onSelect: (patch: Partial<Selection>) => void;
}

export function AvailabilityMatrix({ data, season, selection, onSelect }: AvailabilityMatrixProps) {
  return (
    <section className="sec">
      <SectionHeading
        eyebrow="Availability by age group"
        title={`Compare every age group for ${periodTitle(season, selection.period)}.`}
      />
      <div className="mx">
        <div className="mx-g">
          <span className="mx-h" />
          {SHIFTS.map((s) => (
            <span key={s} className="mx-h">
              {SHIFT_NAME[s]}
            </span>
          ))}
          {AGE_GROUPS.map((age) => (
            <Fragment key={age}>
              <span className="mx-r">{ageLabel(age)}</span>
              {SHIFTS.map((shift) => {
                const spots = spotsLeft(data, season.id, selection.period, shift, age);
                const status = statusOf(season.open, spots);
                return (
                  <button
                    key={shift}
                    type="button"
                    className="cell"
                    aria-pressed={selection.age === age && selection.shift === shift}
                    aria-label={`Ages ${ageLabel(age)}, ${SHIFT_NAME[shift]}, ${STATUS_LABEL[status]}`}
                    onClick={() => onSelect({ age, shift })}
                  >
                    <StatusPill status={status} />
                    <span>{spotsText(status, spots)}</span>
                  </button>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
