import { cn } from "../lib/utilities/style-utils";

interface BoxLoadingProps {
  duration?: number;
  delay?: number;
  className?: string;
}

export function LoadingBox({ duration, delay, className }: BoxLoadingProps) {
  return (
    <div
      className={cn(
        // The colour of the plate a route is drawn on, so a loading grid reads
        // as the cards that will replace it: warm in light, cool in dark.
        "h-8 w-8 animate-pulse rounded bg-edge/15",
        className,
      )}
      style={{
        animationDelay: `${delay || 0}ms`,
        animationDuration: `${duration || 1000}ms`,
      }}
    ></div>
  );
}
