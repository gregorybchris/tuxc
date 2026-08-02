import { Ring, splitIntoLoops, toRing } from "../geometry/loops";
import { isLoop, toPlanarRoute } from "../geometry/planar";
import { simplifyToPointCount } from "../geometry/simplify";
import { RunMap } from "../models/runMap";
import { Point } from "../models/point";
import { Vector } from "../models/vector";

// Corners are dropped down to this many before anything else happens. A
// thumbnail is a couple hundred pixels across and cannot show more detail than
// that, and finding self-crossings compares every pair of segments.
const MAX_CORNERS = 120;

// Coordinates are drawn on a box this many units across, so path strings stay
// short whether the route is a lap of the track or a marathon.
const GRID = 1000;

// Breathing room around the route, in grid units, so strokes are not clipped by
// the edge of the viewBox.
const PADDING = 50;

// Fewer points than this cannot enclose anything.
const MIN_RING_POINTS = 3;

/**
 * A route drawn as flat SVG geometry: every enclosed loop as a shape to fill,
 * and the route itself as a line to trace over the top.
 */
export interface RouteOutline {
  viewBox: string;
  /** Path data for each enclosed loop, empty for a route that is not a loop. */
  loops: string[];
  /** Path data for the route itself. */
  route: string;
  /** Whether the route finishes near enough to its start to enclose anything. */
  closed: boolean;
}

/**
 * Fit projected miles onto the drawing grid.
 *
 * Both axes take the same scale, so the route keeps its proportions, and the y
 * axis flips because the grid counts north while SVG counts down the screen.
 */
function toGrid(planar: Vector[]): { corners: Vector[]; viewBox: string } {
  const xs = planar.map((corner) => corner.x);
  const ys = planar.map((corner) => corner.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  // A route that never leaves one spot would divide by zero here.
  const span = Math.max(maxX - minX, maxY - minY) || 1;
  const scale = GRID / span;

  const corners = planar.map((corner) => ({
    x: (corner.x - minX) * scale,
    y: (maxY - corner.y) * scale,
  }));

  const width = (maxX - minX) * scale;
  const height = (maxY - minY) * scale;
  const viewBox = [
    -PADDING,
    -PADDING,
    width + 2 * PADDING,
    height + 2 * PADDING,
  ].join(" ");

  return { corners, viewBox };
}

function toPath(corners: Vector[], close: boolean): string {
  const steps = corners.map(
    (corner, index) =>
      `${index === 0 ? "M" : "L"}${Math.round(corner.x)},${Math.round(corner.y)}`,
  );
  return steps.join(" ") + (close ? " Z" : "");
}

/**
 * Trace a route's outline: the shapes it encloses and the line it runs.
 *
 * A route that comes back to where it started is closed into a ring and broken
 * into loops that do not cross themselves, which is what makes them fillable.
 * Overlapping loops stack their fills, the same way the area they cover sums.
 * An open route encloses nothing, so it is only traced.
 *
 * Returns null for a route with too few points to draw.
 */
export function buildRouteOutline(points: Point[]): RouteOutline | null {
  if (points.length < 2) return null;

  const simplified = simplifyToPointCount(points, MAX_CORNERS);
  const { corners, viewBox } = toGrid(toPlanarRoute(simplified));

  const closed = isLoop(simplified) && corners.length >= MIN_RING_POINTS;
  const loops: Ring[] = closed ? splitIntoLoops(toRing(corners)) : [];

  return {
    viewBox,
    loops: loops.map((loop) => toPath(loop, true)),
    route: toPath(corners, closed),
    closed,
  };
}

const outlines = new Map<number, RouteOutline | null>();

/**
 * The outline for a run, traced once and kept.
 *
 * The runs page draws every route in the archive at once, and none of them ever
 * change.
 */
export function getRouteOutline(runMap: RunMap): RouteOutline | null {
  const cached = outlines.get(runMap.id);
  if (cached !== undefined) return cached;

  const outline = buildRouteOutline(runMap.points);
  outlines.set(runMap.id, outline);
  return outline;
}
