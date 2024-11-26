"use client";

import { cn } from "../lib/utilities/style-utils";
import { LoadingBox } from "./loading-box";

interface LoadingRunViewsProps {
  numLoading: number;
  duration?: number;
  className?: string;
}

export function LoadingRunViews({
  numLoading,
  duration,
  className,
}: LoadingRunViewsProps) {
  const sequentialDelay = (duration || 1000) / numLoading;
  return (
    <div
      className={cn(
        "flex flex-row flex-wrap justify-center gap-6 md:justify-start",
        className,
      )}
    >
      {[...Array(numLoading).keys()].map((i) => (
        <LoadingRunView
          key={i}
          duration={duration}
          delay={i * sequentialDelay}
        />
      ))}
    </div>
  );
}

interface LoadingRunViewProps {
  duration?: number;
  delay?: number;
}

export function LoadingRunView({ duration, delay }: LoadingRunViewProps) {
  return (
    <div className="flex flex-col gap-1">
      <LoadingBox
        className="md:h-30 h-24 w-40 md:w-36"
        duration={duration}
        delay={delay}
      />
    </div>
  );
}
