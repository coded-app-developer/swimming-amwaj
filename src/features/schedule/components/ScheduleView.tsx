"use client";

import { Notice } from "@/components/ui/Notice";
import { findSeason, spotsLeft, statusOf } from "../availability";
import type { ScheduleData } from "../types";
import { useScheduleSelection } from "../useScheduleSelection";
import { AvailabilityMatrix } from "./AvailabilityMatrix";
import { CalendarCard } from "./CalendarCard";
import { DayDetail } from "./DayDetail";
import { EnrollCta } from "./EnrollCta";
import { FilterPanel } from "./FilterPanel";
import { SelectionBanner } from "./SelectionBanner";
import { ShiftCards } from "./ShiftCards";

/** Client root of the schedule: owns the selection, children are presentational. */
export function ScheduleView({ data }: { data: ScheduleData }) {
  const { selection, select } = useScheduleSelection(data);
  const season = findSeason(data, selection.season);
  const spots = spotsLeft(data, season.id, selection.period, selection.shift, selection.age);
  const status = statusOf(season.open, spots);

  return (
    <>
      {data.sample && (
        <Notice>
          <b>Illustrative schedule.</b> Shift hours and course dates are placeholders until supplied by the academy.
        </Notice>
      )}
      <FilterPanel seasons={data.seasons} season={season} selection={selection} onSelect={select} />
      <SelectionBanner season={season} selection={selection} status={status} spots={spots} />
      <div className="cols">
        <CalendarCard season={season} selection={selection} onSelectDay={(day) => select({ day })} />
        <DayDetail season={season} selection={selection} />
      </div>
      <ShiftCards data={data} season={season} selection={selection} onSelectShift={(shift) => select({ shift })} />
      <AvailabilityMatrix data={data} season={season} selection={selection} onSelect={select} />
      <EnrollCta selection={selection} status={status} />
    </>
  );
}
