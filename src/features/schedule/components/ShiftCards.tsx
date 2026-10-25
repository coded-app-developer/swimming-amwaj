import type { CSSProperties } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusPill } from "@/components/ui/StatusPill";
import { fillPercent, shiftHours, spotsLeft, spotsText, statusOf } from "../availability";
import { SHIFT_NAME, SHIFT_TONE, STATUS_COLOR } from "../content";
import { SHIFTS, type ScheduleData, type Season, type Selection, type ShiftId } from "../types";

const SHIFT_ICON: Record<ShiftId, IconName> = { morning: "sun", evening: "sunset", night: "moon" };

interface ShiftCardsProps {
  data: ScheduleData;
  season: Season;
  selection: Selection;
  onSelectShift: (shift: ShiftId) => void;
}

export function ShiftCards({ data, season, selection, onSelectShift }: ShiftCardsProps) {
  return (
    <section className="sec">
      <SectionHeading eyebrow="Shifts at a glance" title="Pick the shift that fits your week." />
      <div className="shifts">
        {SHIFTS.map((shift) => {
          const spots = spotsLeft(data, season.id, selection.period, shift, selection.age);
          const status = statusOf(season.open, spots);
          const tone = { "--tone-bg": SHIFT_TONE[shift].bg, "--tone-fg": SHIFT_TONE[shift].fg } as CSSProperties;
          return (
            <button
              key={shift}
              type="button"
              className="sc"
              aria-pressed={selection.shift === shift}
              onClick={() => onSelectShift(shift)}
            >
              <span className="tick">
                <Icon name="check" size={16} strokeWidth={3.5} />
              </span>
              <span className="sc-top">
                <span className="si" style={tone}>
                  <Icon name={SHIFT_ICON[shift]} size={26} />
                </span>
                <span>
                  <h3>{SHIFT_NAME[shift]} shift</h3>
                  <p>{shiftHours(shift)} · four hours</p>
                </span>
              </span>
              <span className="sc-big">{spotsText(status, spots)}</span>
              <span className="meter" aria-hidden="true">
                <b
                  style={{
                    width: `${fillPercent(status, spots, selection.age)}%`,
                    background: STATUS_COLOR[status],
                  }}
                />
              </span>
              <StatusPill status={status} />
            </button>
          );
        })}
      </div>
    </section>
  );
}
