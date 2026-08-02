import { cn } from "@/lib/utilities/style-utils";
import { CommonIcon } from "./common-icon";

export const FAVORITE_GOLD = "#E0A526";
export const FAVORITE_OUTLINE = "#3172AE";

interface FavoriteStarProps {
  isFavorite: boolean;
  onToggle: () => void;
  size?: number;
  className?: string;
}

/** Toggles whether a run is a favorite. Gold and filled once it is one. */
export function FavoriteStar({
  isFavorite,
  onToggle,
  size = 16,
  className,
}: FavoriteStarProps) {
  return (
    <button
      type="button"
      onClick={(event) => {
        // On a run card this sits on top of a link to the run.
        event.preventDefault();
        event.stopPropagation();
        onToggle();
      }}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={cn(
        "rounded p-1.5 outline-none transition-colors hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-tufts-blue",
        className,
      )}
    >
      <CommonIcon
        name="star"
        size={size}
        color={isFavorite ? FAVORITE_GOLD : FAVORITE_OUTLINE}
        weight={isFavorite ? "fill" : "regular"}
      />
    </button>
  );
}
