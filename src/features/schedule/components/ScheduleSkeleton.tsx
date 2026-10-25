import { Skeleton } from "@/components/ui/Skeleton";

/** Mirrors the loaded layout (filters, calendar, shift cards) to avoid layout shift. */
export function ScheduleSkeleton() {
  return (
    <div className="skg" style={{ marginTop: 28 }} role="status" aria-busy="true" aria-label="Loading schedule">
      <Skeleton height={170} />
      <Skeleton height={420} />
      <div className="skg skg-c3">
        <Skeleton height={200} />
        <Skeleton height={200} />
        <Skeleton height={200} />
      </div>
    </div>
  );
}
