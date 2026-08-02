import { useStorage } from "./storage";

export function useFavorites() {
  const [storageString, storageSave, storageLoad] = useStorage("tuxc");
  const favorites: Favorite[] =
    storageString === undefined ? [] : JSON.parse(storageString);

  function saveFavorites(favorites: Favorite[]): void {
    storageSave(JSON.stringify(favorites));
  }

  function loadFavorites(): Favorite[] {
    const storageString = storageLoad();
    return storageString === undefined ? [] : JSON.parse(storageString);
  }

  return [favorites, saveFavorites, loadFavorites] as const;
}
