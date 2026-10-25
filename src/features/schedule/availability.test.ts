import { describe, expect, it } from "vitest";
import {
  calendarWeeks,
  fillPercent,
  formatLongDate,
  periodTitle,
  sessionBlocks,
  spotsLeft,
  spotsText,
  statusOf,
} from "./availability";
import { ALMOST_FULL_AT, SHIFT_CAPACITY } from "./content";
import { parseSelection, toSearchParams, DEFAULT_SELECTION } from "./selection";
import type { ScheduleData, Season } from "./types";

const season: Season = {
  id: "w27",
  name: "Winter 2027",
  open: true,
  periods: { p1: { start: "2027-01-03", end: "2027-01-14" }, p2: { start: "2027-01-17", end: "2027-01-28" } },
};
const data: ScheduleData = {
  seasons: [season],
  baseSpots: { w27: { p1: { morning: 14, evening: 5, night: 0 }, p2: { morning: 1, evening: 11, night: 3 } } },
};

describe("availability", () => {
  it("scales spots by age group and keeps a partly free shift at one or more", () => {
    expect(spotsLeft(data, "w27", "p1", "morning", "9-11")).toBe(11);
    expect(spotsLeft(data, "w27", "p2", "morning", "15-17")).toBe(1);
    expect(spotsLeft(data, "w27", "p1", "night", "6-8")).toBe(0);
    expect(spotsLeft(data, "missing", "p1", "night", "6-8")).toBe(0);
  });

  it("derives status from openness and spots", () => {
    expect(statusOf(false, 30)).toBe("upcoming");
    expect(statusOf(true, 0)).toBe("full");
    expect(statusOf(true, 6)).toBe("almost-full");
    expect(statusOf(true, 7)).toBe("available");
  });

  it("formats spot text and meter fill", () => {
    expect(spotsText("upcoming", 30)).toBe("Opens soon");
    expect(spotsText("full", 0)).toBe("No places");
    expect(spotsText("almost-full", 1)).toBe("1 place");
    expect(fillPercent("upcoming", 30, "6-8")).toBe(0);
    expect(fillPercent("available", 15, "6-8")).toBe(50);
  });

  it("builds two Sunday–Thursday weeks from the period start", () => {
    const weeks = calendarWeeks(season, "p1");
    expect(weeks).toHaveLength(2);
    expect(weeks[0].map((d) => d.getUTCDay())).toEqual([0, 1, 2, 3, 4]);
    expect(formatLongDate(weeks[1][4])).toBe("Thu 14 Jan 2027");
    expect(periodTitle(season, "p2")).toBe("Period 2 · 17 Jan – 28 Jan");
  });

  it("lays out four hourly blocks from the shift start", () => {
    const blocks = sessionBlocks("night", "6-8");
    expect(blocks.map((b) => b.time)).toEqual(["18:00 – 19:00", "19:00 – 20:00", "20:00 – 21:00", "21:00 – 22:00"]);
  });
});

describe("availability boundaries", () => {
  it("flips to almost-full exactly at the threshold and to full at zero", () => {
    expect(statusOf(true, ALMOST_FULL_AT + 1)).toBe("available");
    expect(statusOf(true, ALMOST_FULL_AT)).toBe("almost-full");
    expect(statusOf(true, 1)).toBe("almost-full");
    expect(statusOf(true, 0)).toBe("full");
  });

  it("never shows a bookable season as full when the shift has any base place", () => {
    const tiny: ScheduleData = { ...data, baseSpots: { w27: { p1: { morning: 1, evening: 1, night: 1 }, p2: { morning: 1, evening: 1, night: 1 } } } };
    for (const age of ["6-8", "9-11", "12-14", "15-17"] as const) {
      expect(spotsLeft(tiny, "w27", "p1", "morning", age)).toBe(1);
    }
  });

  it("keeps the capacity meter within 0–100", () => {
    expect(fillPercent("full", 0, "6-8")).toBe(100);
    expect(fillPercent("available", SHIFT_CAPACITY, "6-8")).toBe(0);
    expect(fillPercent("available", SHIFT_CAPACITY * 2, "6-8")).toBe(0);
  });
});

describe("selection URL state", () => {
  const ids = ["w27", "s27"];

  it("falls back to defaults for missing or invalid params", () => {
    const parsed = parseSelection(new URLSearchParams("season=x&period=p9&shift=noon&age=1-2&day=42"), ids);
    expect(parsed).toEqual(DEFAULT_SELECTION);
    expect(parseSelection(new URLSearchParams("day=1.5"), ids).day).toBe(0);
    expect(parseSelection(new URLSearchParams("shift=garbage&age=99"), ids)).toEqual(DEFAULT_SELECTION);
  });

  it("keeps valid params when others are invalid", () => {
    const parsed = parseSelection(new URLSearchParams("shift=night&age=99&day=-1"), ids);
    expect(parsed).toEqual({ ...DEFAULT_SELECTION, shift: "night" });
  });

  it("round-trips a selection and omits defaults", () => {
    const sel = { ...DEFAULT_SELECTION, season: "s27", shift: "night" as const, day: 7 };
    const params = toSearchParams(sel, "w27");
    expect(params.toString()).toBe("season=s27&shift=night&day=7");
    expect(parseSelection(params, ids)).toEqual(sel);
    expect(toSearchParams(DEFAULT_SELECTION, "w27").toString()).toBe("");
  });
});
