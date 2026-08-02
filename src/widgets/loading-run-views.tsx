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
        "grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
        className,
      )}
      aria-hidden="true"
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
    <div className="flex flex-col gap-2">
      <LoadingBox
        className="aspect-[3/2] h-auto w-full"
        duration={duration}
        delay={delay}
      />
      <LoadingBox className="h-3 w-2/3" duration={duration} delay={delay} />
    </div>
  );
}
