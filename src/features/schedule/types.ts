export const SHIFTS = ["morning", "evening", "night"] as const;
export const AGE_GROUPS = ["6-8", "9-11", "12-14", "15-17"] as const;
export const PERIODS = ["p1", "p2"] as const;

export type ShiftId = (typeof SHIFTS)[number];
export type AgeGroup = (typeof AGE_GROUPS)[number];
export type PeriodId = (typeof PERIODS)[number];

export type Status = "available" | "almost-full" | "full" | "upcoming";

export interface Season {
  id: string;
  name: string;
  /** Upcoming seasons are listed but not yet bookable. */
  open: boolean;
  /** ISO dates (YYYY-MM-DD); each period starts on a Sunday. */
  periods: Record<PeriodId, { start: string; end: string }>;
}

/** Remaining places per season → period → shift, before the age-group factor. */
export type BaseSpots = Record<string, Record<PeriodId, Record<ShiftId, number>>>;

export interface ScheduleData {
  seasons: Season[];
  baseSpots: BaseSpots;
  /** Set only by the fixture stub; the page shows a placeholder notice while it is true. */
  sample?: true;
}

export interface Selection {
  season: string;
  period: PeriodId;
  shift: ShiftId;
  age: AgeGroup;
  /** 0–9: index into the two Sunday–Thursday weeks of the period. */
  day: number;
}
