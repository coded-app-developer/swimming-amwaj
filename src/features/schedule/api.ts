import "server-only";
import type { ScheduleData } from "./types";

// shortcut: in-memory fixtures with simulated latency, replace with a real fetch/DB query when the academy API exists.
const FIXTURE: ScheduleData = {
  sample: true,
  seasons: [
    {
      id: "w27",
      name: "Winter 2027",
      open: true,
      periods: { p1: { start: "2027-01-03", end: "2027-01-14" }, p2: { start: "2027-01-17", end: "2027-01-28" } },
    },
    {
      id: "s27",
      name: "Spring 2027",
      open: true,
      periods: { p1: { start: "2027-04-04", end: "2027-04-15" }, p2: { start: "2027-04-18", end: "2027-04-29" } },
    },
    {
      id: "u27",
      name: "Summer 2027",
      open: false,
      periods: { p1: { start: "2027-06-06", end: "2027-06-17" }, p2: { start: "2027-06-20", end: "2027-07-01" } },
    },
  ],
  baseSpots: {
    w27: { p1: { morning: 14, evening: 5, night: 0 }, p2: { morning: 22, evening: 11, night: 3 } },
    s27: { p1: { morning: 20, evening: 9, night: 7 }, p2: { morning: 26, evening: 16, night: 12 } },
    u27: { p1: { morning: 30, evening: 30, night: 30 }, p2: { morning: 30, evening: 30, night: 30 } },
  },
};

const SIMULATED_LATENCY_MS = 900;

export async function getScheduleData(): Promise<ScheduleData> {
  // Dev only, so the skeleton can be seen; production builds never wait.
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));
  }
  return FIXTURE;
}
