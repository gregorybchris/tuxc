import { Vector } from "../models/vector";

// Two segments closer to parallel than this, relative to their lengths, are
// treated as missing.
const PARALLEL_EPSILON = 1e-12;
// Crossings count only strictly inside both segments, so shared endpoints are
// not crossings.
const INTERIOR_EPSILON = 1e-12;

// Splitting is bounded so a messy track cannot stall the page. Every split turns
// one crossing into a shared corner, so a route that needs more than this many
// is drawn from whatever rings are left rather than searched any further.
const MAX_LOOPS = 64;

/** A closed ring of corners, repeating its first corner at the end. */
export type Ring = Vector[];

/** A straight run between two corners of a ring.
 *
 * The offsets and length ride along rather than being recomputed, since crossing
 * detection reaches for them once for every pair of segments in the route.
 */
interface Segment {
  start: Vector;
  dx: number;
  dy: number;
  length: number;
}

/** A place where two segments of a ring cross. */
export interface Crossing {
  segmentA: number;
  segmentB: number;
  coord: Vector;
}

function segmentBetween(start: Vector, end: Vector): Segment {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  return { start, dx, dy, length: Math.hypot(dx, dy) };
}

/** Close a route into a ring by repeating its first corner at the end. */
export function toRing(coords: Vector[]): Ring {
  if (coords.length === 0) return [];
  const first = coords[0];
  const last = coords[coords.length - 1];
  if (coords.length > 1 && first.x === last.x && first.y === last.y) {
    return [...coords];
  }
  return [...coords, first];
}

function segmentsOf(ring: Ring): Segment[] {
  const segments: Segment[] = [];
  for (let i = 1; i < ring.length; i++) {
    segments.push(segmentBetween(ring[i - 1], ring[i]));
  }
  return segments;
}

/**
 * Where two segments cross, or null if they miss, only touch at an end, or run
 * parallel.
 *
 * Solves startA + fractionA * a == startB + fractionB * b for the two fractions.
 */
function intersectSegments(
  segmentA: Segment,
  segmentB: Segment,
): Vector | null {
  // A cross product of the two directions, which is zero when they are parallel.
  // Parallel segments either miss entirely or lie along each other, and an
  // overlap has no single point to call the crossing.
  const denominator = segmentA.dx * segmentB.dy - segmentA.dy * segmentB.dx;
  if (
    Math.abs(denominator) <=
    PARALLEL_EPSILON * segmentA.length * segmentB.length
  ) {
    return null;
  }

  // How far segment b starts from segment a, crossed with each direction in turn.
  const gapX = segmentB.start.x - segmentA.start.x;
  const gapY = segmentB.start.y - segmentA.start.y;
  const fractionA = (gapX * segmentB.dy - gapY * segmentB.dx) / denominator;
  const fractionB = (gapX * segmentA.dy - gapY * segmentA.dx) / denominator;

  // A crossing lands strictly inside both segments; grazing an endpoint does not
  // count.
  if (fractionA <= INTERIOR_EPSILON || fractionA >= 1 - INTERIOR_EPSILON) {
    return null;
  }
  if (fractionB <= INTERIOR_EPSILON || fractionB >= 1 - INTERIOR_EPSILON) {
    return null;
  }
  return {
    x: segmentA.start.x + fractionA * segmentA.dx,
    y: segmentA.start.y + fractionA * segmentA.dy,
  };
}

/**
 * The first place a ring crosses itself, or null if it never does.
 *
 * Compares every pair of segments, stopping at the first hit, since splitting
 * renumbers the segments of both halves and the rest are re-found there.
 */
function findFirstCrossing(ring: Ring): Crossing | null {
  const segments = segmentsOf(ring);
  const lastSegment = segments.length - 1;

  for (let indexA = 0; indexA < segments.length; indexA++) {
    // Neighboring segments share a corner, so start two along to skip that touch.
    for (let indexB = indexA + 2; indexB < segments.length; indexB++) {
      // The first and last segments are neighbors too, meeting at the ring's start.
      if (indexA === 0 && indexB === lastSegment) continue;

      const coord = intersectSegments(segments[indexA], segments[indexB]);
      if (coord === null) continue;
      return { segmentA: indexA, segmentB: indexB, coord };
    }
  }
  return null;
}

/** Every place a ring crosses itself. */
export function findCrossings(ring: Ring): Crossing[] {
  const segments = segmentsOf(ring);
  const lastSegment = segments.length - 1;
  const crossings: Crossing[] = [];

  for (let indexA = 0; indexA < segments.length; indexA++) {
    for (let indexB = indexA + 2; indexB < segments.length; indexB++) {
      if (indexA === 0 && indexB === lastSegment) continue;
      const coord = intersectSegments(segments[indexA], segments[indexB]);
      if (coord === null) continue;
      crossings.push({ segmentA: indexA, segmentB: indexB, coord });
    }
  }
  return crossings;
}

/**
 * Split a ring into the two rings that meet at a crossing.
 *
 * The crossing becomes a temporary corner, opening and closing both halves.
 */
function splitAtCrossing(ring: Ring, crossing: Crossing): [Ring, Ring] {
  const meetingPoint = crossing.coord;
  const firstCornerAfterA = crossing.segmentA + 1;
  const firstCornerAfterB = crossing.segmentB + 1;

  // One half is the stretch of route between the two segments that cross.
  const between = [
    meetingPoint,
    ...ring.slice(firstCornerAfterA, crossing.segmentB + 1),
    meetingPoint,
  ];
  // The other is everything else, wrapping past the end of the ring and back to
  // the start. The ring's last corner repeats its first, so drop it to avoid
  // visiting the start twice.
  const around = [
    meetingPoint,
    ...ring.slice(firstCornerAfterB, ring.length - 1),
    ...ring.slice(0, firstCornerAfterA),
    meetingPoint,
  ];
  return [between, around];
}

/** Break a self-crossing ring into rings that do not cross themselves. */
export function splitIntoLoops(ring: Ring): Ring[] {
  const loops: Ring[] = [];
  const unchecked: Ring[] = [ring];

  while (unchecked.length > 0) {
    const candidate = unchecked.pop();
    if (candidate === undefined) break;

    if (loops.length + unchecked.length + 1 >= MAX_LOOPS) {
      loops.push(candidate, ...unchecked);
      break;
    }

    const crossing = findFirstCrossing(candidate);
    if (crossing === null) {
      loops.push(candidate);
      continue;
    }

    // Each split turns a crossing into a shared corner, one fewer than before,
    // so the work always runs out.
    unchecked.push(...splitAtCrossing(candidate, crossing));
  }
  return loops;
}
