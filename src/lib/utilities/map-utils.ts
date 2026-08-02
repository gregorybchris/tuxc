import { MapRef } from "react-map-gl";
import { RunMap } from "../models/runMap";
import { Vector } from "../models/vector";

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

export function extendBounds(
  bounds: CoordinateBounds,
  size: number,
): CoordinateBounds {
  return {
    min: {
      latitude: bounds.min.latitude - size,
      longitude: bounds.min.longitude - size,
    },
    max: {
      latitude: bounds.max.latitude + size,
      longitude: bounds.max.longitude + size,
    },
  };
}

export function coordinateToTuple(coordinate: Coordinate): CoordinateTuple {
  return [coordinate.longitude, coordinate.latitude];
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
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: runMap.points.map(coordinateToTuple),
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

function radians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function haversineDistance(a: Coordinate, b: Coordinate): number {
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

export function toMercator(point: Coordinate): Vector {
  const r = 6378137; // Radius of earth
  const latRadians = radians(point.latitude);
  const lngRadians = radians(point.longitude);
  const x = r * lngRadians;
  const y = r * Math.log(Math.tan(Math.PI / 4 + latRadians / 2));
  return { x, y };
}
