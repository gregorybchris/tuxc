import { useTheme } from "@/lib/hooks/theme";
import { Run } from "@/lib/models/run";
import { cn } from "@/lib/utilities/style-utils";

/**
 * The map on a run's card.
 *
 * Drawn by Mapbox once, by `tuxc thumbnails`, and served from this site rather
 * than fetched: routes in the archive do not change, so there is nothing here
 * for a reader's browser to work out or for Mapbox to be asked about.
 */
interface RunThumbnailProps {
  run: Run;
  className?: string;
}

export function RunThumbnail({ run, className }: RunThumbnailProps) {
  const { theme } = useTheme();

  return (
    <img
      src={`/thumbnails/${run.slug}-${theme}.webp`}
      className={cn("object-cover", className)}
      loading="lazy"
      decoding="async"
      alt={`Route map for ${run.name}`}
    />
  );
}
