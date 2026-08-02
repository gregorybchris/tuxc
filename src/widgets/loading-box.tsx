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
        // Warm and light, so a loading grid reads as the cards that will replace it.
        "h-8 w-8 animate-pulse rounded bg-tufts-brown/15",
        className,
      )}
      style={{
        animationDelay: `${delay || 0}ms`,
        animationDuration: `${duration || 1000}ms`,
      }}
    ></div>
  );
}
