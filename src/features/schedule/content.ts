import type { AgeGroup, ShiftId, Status } from "./types";

export const PRICE_KD = 120;
export const SHIFT_LENGTH_HOURS = 4;
/** Places per shift for the youngest group; older groups get a share via AGE_FACTOR. */
export const SHIFT_CAPACITY = 30;
export const ALMOST_FULL_AT = 6;

export const SHIFT_START: Record<ShiftId, number> = { morning: 8, evening: 14, night: 18 };

export const SHIFT_NAME: Record<ShiftId, string> = {
  morning: "Morning",
  evening: "Evening",
  night: "Night",
};

export const SHIFT_TONE: Record<ShiftId, { bg: string; fg: string }> = {
  morning: { bg: "#FFF1D6", fg: "#8A5A00" },
  evening: { bg: "#FFE3DA", fg: "#8A3417" },
  night: { bg: "#DCE6F3", fg: "#102C46" },
};

export const AGE_FACTOR: Record<AgeGroup, number> = {
  "6-8": 1,
  "9-11": 0.8,
  "12-14": 0.6,
  "15-17": 0.4,
};

export const AGE_FOCUS: Record<AgeGroup, string> = {
  "6-8": "Water Confidence",
  "9-11": "Stroke Foundations",
  "12-14": "Efficiency & Endurance",
  "15-17": "Performance Training",
};

export const AGE_DRILL: Record<AgeGroup, string> = {
  "6-8": "Floating, gliding and kicking with a coach close by.",
  "9-11": "Freestyle and backstroke technique with breathing rhythm.",
  "12-14": "Stroke efficiency, turns and pacing over longer sets.",
  "15-17": "Pace work, race starts and technique under fatigue.",
};

export const AGE_FINISH: Record<AgeGroup, string> = {
  "6-8": "Water games and supervised free play to end on a smile.",
  "9-11": "Relay games and a relaxed cool-down.",
  "12-14": "Endurance set and a stretch-out cool-down.",
  "15-17": "Conditioning circuit and cool-down.",
};

export const STATUS_LABEL: Record<Status, string> = {
  available: "Available",
  "almost-full": "Almost full",
  full: "Full",
  upcoming: "Upcoming",
};

export const STATUS_COLOR: Record<Status, string> = {
  available: "#087F8C",
  "almost-full": "#E8663F",
  full: "#8CA3B2",
  upcoming: "#C9DCE3",
};
