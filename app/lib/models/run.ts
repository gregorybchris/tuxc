export type Run = {
  id: number;
  name: string;
  slug: string;
  region: string;
  distance: number;
  description: string | null;
  lore: string | null;
  firstRunBy: string[] | null;
  firstRunYear: number | null;
  createdAt: string;
  updatedAt: string;
};
