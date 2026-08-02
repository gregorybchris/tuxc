import { Point } from "@/lib/models/point";
import { RunMap } from "@/lib/models/runMap";

/**
 * Every route file in db/jpx, gathered at build time and keyed by its slug.
 *
 * `tuxc convert` writes those files straight out of the GPX folder, so adding a
 * run is one command and an entry in runs.json. There is no import list or id
 * table here to fall out of step with what is on disk.
 */
const JPX = import.meta.glob<{ points: Point[] }>("./jpx/*.json", {
  eager: true,
  import: "default",
});

function slugFromPath(path: string): string {
  return path.replace("./jpx/", "").replace(".json", "");
}

const POINTS_BY_SLUG = new Map<string, Point[]>(
  Object.entries(JPX).map(([path, route]) => [
    slugFromPath(path),
    route.points,
  ]),
);

/** Whether a run has a mapped route. Answers without reading the points. */
export function hasRunMap(slug: string): boolean {
  return POINTS_BY_SLUG.has(slug);
}

export function getRunMap(slug: string): RunMap | undefined {
  const points = POINTS_BY_SLUG.get(slug);
  return points && { slug, points };
}

export function getRunMaps(slugs: string[]): RunMap[] {
  return slugs
    .map((slug) => getRunMap(slug))
    .filter((runMap): runMap is RunMap => runMap !== undefined);
}
