import { Favorite } from "@/lib/models/favorite";
import { useCallback, useMemo } from "react";
import { useStorage } from "./storage";

export function useFavorites() {
  const [storageString, storageSave, storageLoad] = useStorage("tuxc");

  // Parsed once per stored value. A fresh array on every render would restart
  // any effect or memo downstream that depends on the favorites.
  const favorites = useMemo<Favorite[]>(
    () => (storageString === undefined ? [] : JSON.parse(storageString)),
    [storageString],
  );

  const saveFavorites = useCallback(
    (favorites: Favorite[]): void => {
      storageSave(JSON.stringify(favorites));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  function loadFavorites(): Favorite[] {
    const stored = storageLoad();
    return stored === undefined ? [] : JSON.parse(stored);
  }

  return [favorites, saveFavorites, loadFavorites] as const;
}
