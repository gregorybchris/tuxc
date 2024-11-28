import { MapRef } from "react-map-gl";
import { RunMap } from "../models/runMap";

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type CoordinateTuple = [number, number];

export type CoordinateBounds = {
  min: Coordinate;
  max: Coordinate;
};

export function getRunMapBounds(runMap: RunMap): CoordinateBounds {
  const minLat = Math.min(...runMap.points.map((p) => p.latitude));
  const maxLat = Math.max(...runMap.points.map((p) => p.latitude));
  const minLng = Math.min(...runMap.points.map((p) => p.longitude));
  const maxLng = Math.max(...runMap.points.map((p) => p.longitude));
  return {
    min: { latitude: minLat, longitude: minLng },
    max: { latitude: maxLat, longitude: maxLng },
  };
}

export function getCoordinateTuples(runMap: RunMap): CoordinateTuple[] {
  return runMap.points.map((point) => [point.longitude, point.latitude]);
}

export function getStart(runMap: RunMap): Coordinate {
  return {
    latitude: runMap.points[0].latitude,
    longitude: runMap.points[0].longitude,
  };
}

export function getCenter(runMap: RunMap): Coordinate {
  const bounds = getRunMapBounds(runMap);
  return {
    latitude: (bounds.min.latitude + bounds.max.latitude) / 2,
    longitude: (bounds.min.longitude + bounds.max.longitude) / 2,
  };
}

export function getLineFeature(
  runMap: RunMap,
): GeoJSON.Feature<GeoJSON.Geometry> {
  const coordinateTuples = getCoordinateTuples(runMap);
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: coordinateTuples,
    },
  };
}

export function fitMapBounds(
  mapRef: MapRef,
  bounds: CoordinateBounds,
  padding: number,
  zoomDuration: number,
) {
  mapRef.fitBounds(
    [
      [bounds.min.longitude, bounds.min.latitude],
      [bounds.max.longitude, bounds.max.latitude],
    ],
    { padding: padding, duration: zoomDuration },
  );
}

export function aggregateCenters(coordinates: Coordinate[]): Coordinate {
  const latitudes = coordinates.map((c) => c.latitude);
  const longitudes = coordinates.map((c) => c.longitude);
  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLng = Math.min(...longitudes);
  const maxLng = Math.max(...longitudes);
  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
  };
}

export function aggregateBounds(bounds: CoordinateBounds[]): CoordinateBounds {
  const minLat = Math.min(...bounds.map((b) => b.min.latitude));
  const maxLat = Math.max(...bounds.map((b) => b.max.latitude));
  const minLng = Math.min(...bounds.map((b) => b.min.longitude));
  const maxLng = Math.max(...bounds.map((b) => b.max.longitude));
  return {
    min: { latitude: minLat, longitude: minLng },
    max: { latitude: maxLat, longitude: maxLng },
  };
}

export function haversineDistance(a: Coordinate, b: Coordinate): number {
  function radians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  const [latA, lngA] = [a.latitude, a.longitude];
  const [latB, lngB] = [b.latitude, b.longitude];

  const r = 6371; // Radius of earth (km)
  const d =
    2 *
    r *
    Math.asin(
      Math.sqrt(
        0.5 -
          Math.cos(radians(latB - latA)) / 2 +
          (Math.cos(radians(latA)) *
            Math.cos(radians(latB)) *
            (1 - Math.cos(radians(lngB - lngA)))) /
            2,
      ),
    );
  return d * 0.62137119; // Kilometers to miles
}

type PartitionQueryResult = {
  runMap: RunMap;
  coordinate: Coordinate;
};

export class SpacePartition {
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
