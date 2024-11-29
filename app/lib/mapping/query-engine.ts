import { RunMap } from "../models/runMap";
import {
  aggregateBounds,
  Coordinate,
  CoordinateBounds,
  extendBounds,
  getRunMapBounds,
  haversineDistance,
} from "../utilities/map-utils";

type Loc = {
  r: number;
  c: number;
};

export type QueryResult = {
  runMap: RunMap;
  coordinate: Coordinate;
};

export class QueryEngine {
  cells: QueryResult[][][];
  radius: number;
  bounds: CoordinateBounds;
  width: number;
  height: number;
  numCols: number;
  numRows: number;

  constructor(runMaps: RunMap[], radius: number) {
    this.radius = radius;
    this.bounds = this.getBounds(runMaps);
    this.width = this.bounds.max.longitude - this.bounds.min.longitude;
    this.height = this.bounds.max.latitude - this.bounds.min.latitude;
    this.numCols = Math.floor(this.width / this.radius);
    this.numRows = Math.floor(this.height / this.radius);
    this.cells = Array.from({ length: this.numRows }, () => {
      return Array.from({ length: this.numCols }, () => []);
    });
    this.preprocess(runMaps);
  }

  getBounds(runMaps: RunMap[]): CoordinateBounds {
    const mapsBounds = runMaps.map((runMap) => getRunMapBounds(runMap));
    const fullBounds = aggregateBounds(mapsBounds);
    return extendBounds(fullBounds, this.radius);
  }

  coordinateInBounds(coordinate: Coordinate): boolean {
    return (
      coordinate.latitude >= this.bounds.min.latitude &&
      coordinate.latitude <= this.bounds.max.latitude &&
      coordinate.longitude >= this.bounds.min.longitude &&
      coordinate.longitude <= this.bounds.max.longitude
    );
  }

  getLoc(coordinate: Coordinate): Loc {
    const c = Math.floor(
      ((coordinate.longitude - this.bounds.min.longitude) / this.width) *
        this.numCols,
    );
    const r = Math.floor(
      ((coordinate.latitude - this.bounds.min.latitude) / this.height) *
        this.numRows,
    );
    return { r, c };
  }

  getNeighborLocs(loc: Loc): Loc[] {
    const cells = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const r = loc.r + dr;
        const c = loc.c + dc;
        if (r >= 0 && r < this.numRows && c >= 0 && c < this.numCols) {
          cells.push({ r, c });
        }
      }
    }
    return cells;
  }

  preprocess(runMaps: RunMap[]): void {
    for (const runMap of runMaps) {
      for (const point of runMap.points) {
        const centerLoc = this.getLoc(point);
        const locs = this.getNeighborLocs(centerLoc);
        const coordinate = {
          latitude: point.latitude,
          longitude: point.longitude,
        };
        for (const cell of locs) {
          this.cells[cell.r][cell.c].push({ runMap, coordinate });
        }
      }
    }
  }

  query(coordinate: Coordinate): QueryResult[] {
    if (!this.coordinateInBounds(coordinate)) {
      return [];
    }
    const centerLoc = this.getLoc(coordinate);
    const locs = this.getNeighborLocs(centerLoc);
    const candidates = locs.map((cell) => this.cells[cell.r][cell.c]).flat();
    const closest = new Map<number, QueryResult>();
    for (const candidate of candidates) {
      const distance = haversineDistance(candidate.coordinate, coordinate);
      const current = closest.get(candidate.runMap.id);
      if (
        !current ||
        distance < haversineDistance(current.coordinate, coordinate)
      ) {
        closest.set(candidate.runMap.id, candidate);
      }
    }
    return Array.from(closest.values()).sort(
      (a, b) =>
        haversineDistance(a.coordinate, coordinate) -
        haversineDistance(b.coordinate, coordinate),
    );
  }
}
