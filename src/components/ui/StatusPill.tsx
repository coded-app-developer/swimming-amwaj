import { STATUS_LABEL } from "@/features/schedule/content";
import type { Status } from "@/features/schedule/types";

interface StatusPillProps {
  status: Status;
  /** Extra text after the status label, e.g. "5 places". */
  detail?: string;
}

export function StatusPill({ status, detail }: StatusPillProps) {
  return (
    <span className={`pill pill-${status}`}>
      {STATUS_LABEL[status]}
      {detail ? ` · ${detail}` : null}
    </span>
  );
}
