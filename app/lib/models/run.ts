export type Run = {
  id: number;
  name: string;
  slug: string;
  region: string;
  distance: number;
  lore: string;
  firstRunBy: string | null;
  firstRunAround: string | null;
  createdAt: string;
  updatedAt: string;
};
