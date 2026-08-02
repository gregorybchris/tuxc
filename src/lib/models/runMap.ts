import { Point } from "./point";

export type RunMap = {
  /** Matches the run's slug, which is also the name of its file in db/jpx. */
  slug: string;
  points: Point[];
};
