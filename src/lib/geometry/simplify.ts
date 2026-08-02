import { Point } from "../models/point";
import { detourCost, pathDistance } from "./planar";

/** A point's neighbors, tracked as points are removed from around it. */
interface Link {
  previous: number;
  following: number;
  removed: boolean;
  // Bumped whenever a neighbor disappears, which invalidates any heap entry for
  // this point.
  version: number;
}

/** A candidate point to remove. Ordering by cost first is what drives the heap. */
interface Removal {
  cost: number;
  version: number;
  index: number;
}

function isCheaper(a: Removal, b: Removal): boolean {
  if (a.cost !== b.cost) return a.cost < b.cost;
  if (a.version !== b.version) return a.version < b.version;
  return a.index < b.index;
}

/** A binary min-heap of removal candidates, ordered by what they cost. */
class RemovalHeap {
  private items: Removal[] = [];

  get size(): number {
    return this.items.length;
  }

  push(removal: Removal): void {
    this.items.push(removal);
    let child = this.items.length - 1;
    while (child > 0) {
      const parent = (child - 1) >> 1;
      if (!isCheaper(this.items[child], this.items[parent])) break;
      this.swap(child, parent);
      child = parent;
    }
  }

  pop(): Removal | undefined {
    const top = this.items[0];
    const last = this.items.pop();
    if (last !== undefined && this.items.length > 0) {
      this.items[0] = last;
      this.sink(0);
    }
    return top;
  }

  private sink(start: number): void {
    let parent = start;
    for (;;) {
      const left = 2 * parent + 1;
      const right = left + 1;
      let smallest = parent;
      if (
        left < this.items.length &&
        isCheaper(this.items[left], this.items[smallest])
      ) {
        smallest = left;
      }
      if (
        right < this.items.length &&
        isCheaper(this.items[right], this.items[smallest])
      ) {
        smallest = right;
      }
      if (smallest === parent) return;
      this.swap(parent, smallest);
      parent = smallest;
    }
  }

  private swap(a: number, b: number): void {
    [this.items[a], this.items[b]] = [this.items[b], this.items[a]];
  }
}

/**
 * Drop the points that matter least, cheapest first, until told to stop.
 *
 * Removing a point makes both its neighbors more expensive to remove, so the
 * shape wears down evenly instead of collapsing in one place. `keepGoing` is
 * asked about each candidate before it is dropped: it receives what dropping the
 * point would cost in miles, what has been given up so far, and how many points
 * are still standing.
 */
function reduceRoute(
  points: Point[],
  keepGoing: (cost: number, spent: number, remaining: number) => boolean,
): Point[] {
  const count = points.length;
  if (count < 3) return [...points];

  const links: Link[] = points.map((_, index) => ({
    previous: Math.max(index - 1, 0),
    following: Math.min(index + 1, count - 1),
    removed: false,
    version: 0,
  }));

  // The start and finish anchor the route, so only the points between them are
  // candidates.
  const isInterior = (index: number) => index > 0 && index < count - 1;

  function costOf(index: number): number {
    const link = links[index];
    return detourCost(
      points[link.previous],
      points[index],
      points[link.following],
    );
  }

  const heap = new RemovalHeap();
  for (let index = 1; index < count - 1; index++) {
    heap.push({ cost: costOf(index), version: 0, index });
  }

  let spent = 0;
  let remaining = count;
  while (heap.size > 0) {
    const removal = heap.pop();
    if (removal === undefined) break;
    const link = links[removal.index];
    // Stale entries are left on the heap rather than hunted down, so skip them
    // here.
    if (link.removed || removal.version !== link.version) continue;
    // Everything still on the heap costs at least this much, so there is nothing
    // cheaper to fall back to once the front of the queue is refused.
    if (!keepGoing(removal.cost, spent, remaining)) break;

    spent += removal.cost;
    remaining--;
    link.removed = true;
    links[link.previous].following = link.following;
    links[link.following].previous = link.previous;

    for (const neighbor of [link.previous, link.following]) {
      if (!isInterior(neighbor) || links[neighbor].removed) continue;
      links[neighbor].version++;
      heap.push({
        cost: costOf(neighbor),
        version: links[neighbor].version,
        index: neighbor,
      });
    }
  }

  return points.filter((_, index) => !links[index].removed);
}

/**
 * Simplify a route until it has shrunk as much as it is allowed to.
 *
 * The threshold is the fraction of the route's distance that may be given up in
 * total, so 0.01 lets the result come out one percent shorter.
 */
export function simplifyRoute(
  points: Point[],
  percentThreshold = 0.0001,
): Point[] {
  const budget = percentThreshold * pathDistance(points);
  return reduceRoute(points, (cost, spent) => spent + cost <= budget);
}

/**
 * Simplify a route down to at most `maxPoints` points.
 *
 * Same wearing-down as `simplifyRoute`, but stopping on a point count rather
 * than a distance budget. Drawing at thumbnail size cannot show more corners
 * than this anyway, and every step that follows costs time per corner.
 */
export function simplifyToPointCount(
  points: Point[],
  maxPoints: number,
): Point[] {
  return reduceRoute(
    points,
    (_cost, _spent, remaining) => remaining > maxPoints,
  );
}
