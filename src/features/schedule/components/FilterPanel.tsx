import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { ageLabel, formatDay, parseIsoDate, periodName, shiftHours } from "../availability";
import { SHIFT_NAME } from "../content";
import { AGE_GROUPS, PERIODS, SHIFTS, type Season, type Selection } from "../types";

interface FilterPanelProps {
  seasons: Season[];
  season: Season;
  selection: Selection;
  onSelect: (patch: Partial<Selection>) => void;
}

export function FilterPanel({ seasons, season, selection, onSelect }: FilterPanelProps) {
  const seasonOptions = seasons.map((s) => ({ value: s.id, label: s.name }));
  const periodOptions = PERIODS.map((p) => ({
    value: p,
    label: `${periodName(p)} · ${formatDay(parseIsoDate(season.periods[p].start))}`,
  }));
  const shiftOptions = SHIFTS.map((s) => ({ value: s, label: `${SHIFT_NAME[s]} ${shiftHours(s)}` }));
  const ageOptions = AGE_GROUPS.map((a) => ({ value: a, label: ageLabel(a) }));

  return (
    <div className="panel">
      {/* Changing season or period resets the day: the old index would point at different dates. */}
      <SegmentedControl
        label="Season"
        options={seasonOptions}
        value={selection.season}
        onChange={(v) => onSelect({ season: v, day: 0 })}
      />
      <SegmentedControl
        label="Period"
        options={periodOptions}
        value={selection.period}
        onChange={(v) => onSelect({ period: v, day: 0 })}
      />
      <SegmentedControl label="Shift" options={shiftOptions} value={selection.shift} onChange={(v) => onSelect({ shift: v })} />
      <SegmentedControl label="Age group" options={ageOptions} value={selection.age} onChange={(v) => onSelect({ age: v })} />
    </div>
  );
}
