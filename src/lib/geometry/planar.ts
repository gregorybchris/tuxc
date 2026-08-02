import { Point } from "../models/point";
import { Coordinate, haversineDistance } from "../utilities/map-utils";
import { Vector } from "../models/vector";

const EARTH_RADIUS_KM = 6371;
const KM_TO_MILES = 0.62137119;
const EARTH_RADIUS_MILES = EARTH_RADIUS_KM * KM_TO_MILES;

// A route may finish this far from its start, as a fraction of the distance
// covered, and still count as a loop.
const MAX_LOOP_GAP_PERCENT = 0.02;
// ...but always allow at least this much, in miles, so short loops are not held
// to inches.
const MIN_LOOP_GAP_MILES = 0.1;

function radians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/** The center of a route's bounding box, used as the origin to project around. */
export function centerOf(points: Coordinate[]): Coordinate {
  const latitudes = points.map((point) => point.latitude);
  const longitudes = points.map((point) => point.longitude);
  return {
    latitude: (Math.min(...latitudes) + Math.max(...latitudes)) / 2,
    longitude: (Math.min(...longitudes) + Math.max(...longitudes)) / 2,
  };
}

/**
 * Project a point onto a local plane centered on an origin, in miles.
 *
 * Equal-area across a single route, unlike Mercator, so the shapes it draws hold
 * their proportions. Distortion grows with distance from the origin, so keep the
 * origin near the middle of the route.
 */
export function toPlanar(point: Coordinate, origin: Coordinate): Vector {
  // A degree of longitude covers less ground the further from the equator you go.
  const milesPerDegreeNorth = EARTH_RADIUS_MILES * radians(1);
  const milesPerDegreeEast =
    milesPerDegreeNorth * Math.cos(radians(origin.latitude));
  return {
    x: (point.longitude - origin.longitude) * milesPerDegreeEast,
    y: (point.latitude - origin.latitude) * milesPerDegreeNorth,
  };
}

/** Distance covered along a route, in miles. */
export function pathDistance(points: Coordinate[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += haversineDistance(points[i - 1], points[i]);
  }
  return total;
}

/** How far the finish is from the start, in miles. */
export function loopGap(points: Coordinate[]): number {
  if (points.length === 0) return 0;
  return haversineDistance(points[points.length - 1], points[0]);
}

/**
 * Whether a route finishes near enough to its start to count as a loop.
 *
 * The allowance scales with the route, since finishing a block away means
 * something different on a marathon than on a lap of the park, but it never
 * falls below a floor that would hold a short loop to inches.
 */
export function isLoop(points: Coordinate[]): boolean {
  const allowed = Math.max(
    MIN_LOOP_GAP_MILES,
    MAX_LOOP_GAP_PERCENT * pathDistance(points),
  );
  return loopGap(points) <= allowed;
}

/** How much further it is to stop at pointB on the way from pointA to pointC.
 *
 * Zero when the three are in a straight line, and larger the sharper the detour.
 * This is exactly what the route loses in length if pointB is dropped.
 */
export function detourCost(
  pointA: Coordinate,
  pointB: Coordinate,
  pointC: Coordinate,
): number {
  return (
    haversineDistance(pointA, pointB) +
    haversineDistance(pointB, pointC) -
    haversineDistance(pointA, pointC)
  );
}

/** Project every point of a route onto a plane centered on the route itself. */
export function toPlanarRoute(points: Point[]): Vector[] {
  const origin = centerOf(points);
  return points.map((point) => toPlanar(point, origin));
}
