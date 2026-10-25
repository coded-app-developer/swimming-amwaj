import type { ReactNode } from "react";
import { Icon } from "./Icon";

export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="notice" role="note">
      <Icon name="alert" />
      <span>{children}</span>
    </div>
  );
}
