import { RunThumbnail } from "@/components/run-thumbnail";
import { Run } from "@/lib/models/run";
import { cn } from "@/lib/utilities/style-utils";
import { FavoriteStar } from "@/widgets/favorite-star";
import { Link } from "react-router-dom";

interface RunViewProps {
  run: Run;
  isFavorite: boolean;
  // Favorites are owned by the page, so every card and the favorites filter
  // agree the moment one is toggled.
  onToggleFavorite: (run: Run) => void;
  className?: string;
}

export function RunView({
  run,
  isFavorite,
  onToggleFavorite,
  className,
}: RunViewProps) {
  return (
    // min-w-0 keeps the truncated area name from widening its grid track.
    <div className={cn("group/card relative w-full min-w-0", className)}>
      <Link
        to={`/runs/${run.id}`}
        className="flex w-full min-w-0 flex-col gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-tufts-blue focus-visible:ring-offset-2"
      >
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-md bg-tufts-brown ring-0 ring-tufts-blue/40 transition-all group-hover/card:ring-4">
          <RunThumbnail run={run} className="h-full w-full" />
          <DistanceBadge distance={run.distance} />
        </div>

        {/* Padded on the right so a long name never runs under the star. */}
        <div className="group/label flex min-w-0 flex-col pr-8">
          <span className="text-sm leading-snug text-black/70 transition-colors group-hover/card:text-black">
            {run.name}
          </span>
          <span className="truncate text-xs text-black/40">{run.area}</span>
        </div>
      </Link>

      {/* Out of the way until you go looking for it, unless it is already set. */}
      <FavoriteStar
        isFavorite={isFavorite}
        onToggle={() => onToggleFavorite(run)}
        className={cn(
          "absolute bottom-0 right-0 opacity-0 transition-opacity focus-visible:opacity-100 group-hover/card:opacity-100",
          isFavorite && "opacity-100",
        )}
      />
    </div>
  );
}

interface DistanceBadgeProps {
  distance: number;
  className?: string;
}

function DistanceBadge({ distance, className }: DistanceBadgeProps) {
  return (
    <div
      className={cn(
        "absolute bottom-1.5 right-1.5 flex flex-row items-baseline gap-0.5 rounded-full bg-tufts-blue px-2 py-0.5 text-white ring-2 ring-white/20",
        className,
      )}
    >
      <span className="text-[11px] font-bold">{distance}</span>
      <span className="text-[9px] opacity-70">mi</span>
    </div>
  );
}
