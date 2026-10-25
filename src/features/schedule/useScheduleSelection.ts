"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { parseSelection, toSearchParams } from "./selection";
import type { ScheduleData, Selection } from "./types";

/**
 * Selection lives in the URL so it survives refresh and is shareable.
 * history.replaceState keeps it client-side (no server round trip) while
 * Next keeps useSearchParams in sync.
 */
export function useScheduleSelection(data: ScheduleData) {
  const params = useSearchParams();
  const pathname = usePathname();
  const seasonIds = useMemo(() => data.seasons.map((s) => s.id), [data.seasons]);

  const selection = useMemo(
    () => parseSelection(new URLSearchParams(params.toString()), seasonIds),
    [params, seasonIds],
  );

  const select = useCallback(
    (patch: Partial<Selection>) => {
      const query = toSearchParams({ ...selection, ...patch }, seasonIds[0]).toString();
      window.history.replaceState(null, "", query ? `${pathname}?${query}` : pathname);
    },
    [selection, seasonIds, pathname],
  );

  return { selection, select };
}
