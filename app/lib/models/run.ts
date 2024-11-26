export type Run = {
  id: number;
  name: string;
  slug: string;
  area: string;
  distance: number;
  description: string | null;
  lore: string | null;
  editors: string[] | null;
  firstRunBy: string[] | null;
  firstRunYear: number | null;
  createdAt: string;
  updatedAt: string;
  mapLink: string;
};
