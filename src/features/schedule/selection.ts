import { SESSION_DAYS_PER_WEEK, WEEKS_PER_PERIOD } from "./availability";
import { AGE_GROUPS, PERIODS, SHIFTS, type Selection } from "./types";

export const DEFAULT_SELECTION: Selection = {
  season: "w27",
  period: "p1",
  shift: "evening",
  age: "9-11",
  day: 0,
};

const MAX_DAY = SESSION_DAYS_PER_WEEK * WEEKS_PER_PERIOD - 1;

const oneOf = <T extends string>(allowed: readonly T[], value: string | null, fallback: T): T =>
  value !== null && (allowed as readonly string[]).includes(value) ? (value as T) : fallback;

/**
 * Reads the selection from URL params. The URL is user input, so every value
 * is checked against the allowed set and falls back to the default.
 */
export function parseSelection(params: URLSearchParams, seasonIds: readonly string[]): Selection {
  const day = Number(params.get("day"));
  return {
    season: oneOf(seasonIds, params.get("season"), seasonIds[0] ?? DEFAULT_SELECTION.season),
    period: oneOf(PERIODS, params.get("period"), DEFAULT_SELECTION.period),
    shift: oneOf(SHIFTS, params.get("shift"), DEFAULT_SELECTION.shift),
    age: oneOf(AGE_GROUPS, params.get("age"), DEFAULT_SELECTION.age),
    day: Number.isInteger(day) && day >= 0 && day <= MAX_DAY ? day : DEFAULT_SELECTION.day,
  };
}

/** Writes a selection back to params, omitting defaults to keep URLs short. */
export function toSearchParams(selection: Selection, defaultSeason: string): URLSearchParams {
  const defaults = { ...DEFAULT_SELECTION, season: defaultSeason };
  const params = new URLSearchParams();
  for (const key of Object.keys(selection) as (keyof Selection)[]) {
    if (selection[key] !== defaults[key]) params.set(key, String(selection[key]));
  }
  return params;
}
