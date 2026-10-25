interface SkeletonProps {
  height: number;
  className?: string;
}

export function Skeleton({ height, className }: SkeletonProps) {
  return <div className={className ? `sk ${className}` : "sk"} style={{ height }} aria-hidden="true" />;
}
