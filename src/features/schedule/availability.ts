import {
  AGE_DRILL,
  AGE_FACTOR,
  AGE_FINISH,
  ALMOST_FULL_AT,
  SHIFT_CAPACITY,
  SHIFT_LENGTH_HOURS,
  SHIFT_NAME,
  SHIFT_START,
} from "./content";
import type { AgeGroup, PeriodId, ScheduleData, Season, ShiftId, Status } from "./types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const SESSION_DAYS_PER_WEEK = 5; // Sunday–Thursday
export const WEEKS_PER_PERIOD = 2;

/* ---------- time & dates (UTC so server and browser render the same day) ---------- */

export const formatHour = (h: number) => `${String(h).padStart(2, "0")}:00`;

export const shiftHours = (shift: ShiftId) =>
  `${formatHour(SHIFT_START[shift])}–${formatHour(SHIFT_START[shift] + SHIFT_LENGTH_HOURS)}`;

export const parseIsoDate = (iso: string) => new Date(`${iso}T00:00:00Z`);

export const formatDay = (d: Date) => `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
export const monthOf = (d: Date) => MONTHS[d.getUTCMonth()];
export const weekdayOf = (d: Date) => WEEKDAYS[d.getUTCDay()];
export const formatLongDate = (d: Date) => `${weekdayOf(d)} ${formatDay(d)} ${d.getUTCFullYear()}`;

export const ageLabel = (age: AgeGroup) => age.replace("-", "–");

export const periodName = (period: PeriodId) => `Period ${period === "p1" ? 1 : 2}`;

export const periodRange = (season: Season, period: PeriodId) => {
  const { start, end } = season.periods[period];
  return `${formatDay(parseIsoDate(start))} – ${formatDay(parseIsoDate(end))}`;
};

export const periodTitle = (season: Season, period: PeriodId) =>
  `${periodName(period)} · ${periodRange(season, period)}`;

/** Session days of a period: WEEKS_PER_PERIOD rows of Sunday–Thursday dates. */
export function calendarWeeks(season: Season, period: PeriodId): Date[][] {
  const start = parseIsoDate(season.periods[period].start).getTime();
  const DAY_MS = 86_400_000;
  return Array.from({ length: WEEKS_PER_PERIOD }, (_, w) =>
    Array.from({ length: SESSION_DAYS_PER_WEEK }, (_, d) => new Date(start + (w * 7 + d) * DAY_MS)),
  );
}

/* ---------- availability ---------- */

export function findSeason(data: ScheduleData, id: string): Season {
  return data.seasons.find((s) => s.id === id) ?? data.seasons[0];
}

export function spotsLeft(
  data: ScheduleData,
  seasonId: string,
  period: PeriodId,
  shift: ShiftId,
  age: AgeGroup,
): number {
  const base = data.baseSpots[seasonId]?.[period]?.[shift] ?? 0;
  // A partly free shift always shows at least one place for every age group.
  return base === 0 ? 0 : Math.max(1, Math.round(base * AGE_FACTOR[age]));
}

export function statusOf(open: boolean, spots: number): Status {
  if (!open) return "upcoming";
  if (spots === 0) return "full";
  return spots <= ALMOST_FULL_AT ? "almost-full" : "available";
}

export const canEnroll = (status: Status) => status === "available" || status === "almost-full";

export const placesText = (n: number) => `${n} ${n === 1 ? "place" : "places"}`;

export function spotsText(status: Status, spots: number) {
  if (status === "upcoming") return "Opens soon";
  return spots === 0 ? "No places" : placesText(spots);
}

/** How full a shift is, 0–100, for the capacity meter. */
export function fillPercent(status: Status, spots: number, age: AgeGroup) {
  if (status === "upcoming") return 0;
  const capacity = Math.round(SHIFT_CAPACITY * AGE_FACTOR[age]);
  return Math.min(100, Math.max(0, Math.round((1 - spots / capacity) * 100)));
}

/* ---------- session outline ---------- */

export interface SessionBlock {
  n: number;
  time: string;
  title: string;
  text: string;
}

export function sessionBlocks(shift: ShiftId, age: AgeGroup): SessionBlock[] {
  const h = SHIFT_START[shift];
  const slot = (i: number) => `${formatHour(h + i)} – ${formatHour(h + i + 1)}`;
  return [
    { title: "Arrival, warm-up and water safety", text: "Check-in, group briefing and a gentle warm-up." },
    { title: "Technique focus", text: AGE_DRILL[age] },
    { title: "Guided practice", text: "Putting the skills together in small coached groups." },
    { title: "Finish strong", text: AGE_FINISH[age] },
  ].map((b, i) => ({ ...b, n: i + 1, time: slot(i) }));
}

export const shiftTitle = (shift: ShiftId) => `${SHIFT_NAME[shift]} · ${shiftHours(shift)}`;
