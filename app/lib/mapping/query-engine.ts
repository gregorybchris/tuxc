import { RunMap } from "../models/runMap";
import {
  aggregateBounds,
  Coordinate,
  CoordinateBounds,
  getRunMapBounds,
  haversineDistance,
} from "../utilities/map-utils";

type PartitionQueryResult = {
  runMap: RunMap;
  coordinate: Coordinate;
};

export class QueryEngine {
  cells: Map<string, PartitionQueryResult[]>;
  rows: number;
  columns: number;
  bounds: CoordinateBounds;
  width: number;
  height: number;

  constructor(runMaps: RunMap[], rows: number, columns: number) {
    this.cells = new Map<string, PartitionQueryResult[]>();
    this.rows = rows;
    this.columns = columns;
    this.bounds = this.getBounds(runMaps);
    this.width = this.bounds.max.longitude - this.bounds.min.longitude;
    this.height = this.bounds.max.latitude - this.bounds.min.latitude;
    this.partition(runMaps);
  }

  getBounds(runMaps: RunMap[]): CoordinateBounds {
    const mapsBounds = runMaps.map((runMap) => getRunMapBounds(runMap));
    return aggregateBounds(mapsBounds);
  }

  getCellId(coordinate: Coordinate): string {
    const cellWidth = this.width / this.columns;
    const cellHeight = this.height / this.rows;
    const x = coordinate.longitude - this.bounds.min.longitude;
    const column = Math.floor(x / cellWidth);
    const y = coordinate.latitude - this.bounds.min.latitude;
    const row = Math.floor(y / cellHeight);
    return `${row},${column}`;
  }

  partition(runMaps: RunMap[]): void {
    for (const runMap of runMaps) {
      for (const point of runMap.points) {
        const cellId = this.getCellId(point);
        const result = {
          runMap: runMap,
          coordinate: { latitude: point.latitude, longitude: point.longitude },
        };
        if (!this.cells.has(cellId)) {
          this.cells.set(cellId, [result]);
        } else {
          this.cells.get(cellId)?.push(result);
        }
      }
    }
  }

  query(coordinate: Coordinate): PartitionQueryResult[] {
    const cellId = this.getCellId(coordinate);
    const allResults = this.cells.get(cellId) || [];
    const closestByRunMap = new Map<number, PartitionQueryResult>();
    for (const result of allResults) {
      const resultCoordinate = result.coordinate;
      const resultRunMap = result.runMap;
      const currentClosest = closestByRunMap.get(resultRunMap.id);
      if (!currentClosest) {
        closestByRunMap.set(resultRunMap.id, result);
      } else {
        const currentDistance = haversineDistance(
          coordinate,
          currentClosest.coordinate,
        );
        const newDistance = haversineDistance(coordinate, resultCoordinate);
        if (newDistance < currentDistance) {
          closestByRunMap.set(resultRunMap.id, result);
        }
      }
    }
    return Array.from(closestByRunMap.values());
  }
}
