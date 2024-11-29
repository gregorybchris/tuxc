import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import Map, { MapLayerMouseEvent, MapRef } from "react-map-gl";
import { QueryEngine } from "../lib/mapping/query-engine";
import { RunMap } from "../lib/models/runMap";
import {
  aggregateBounds,
  aggregateCenters,
  fitMapBounds,
  getCenter,
  getLineFeature,
  getRunMapBounds,
  haversineDistance,
} from "../lib/utilities/map-utils";
import { cn } from "../lib/utilities/style-utils";
import { LineSource } from "./run-map-view";
interface RunMapViewProps {
  runMaps: RunMap[];
  onClickRun: (id: number) => void;
  className?: string;
}

export function RunMapsView({
  runMaps,
  onClickRun,
  className,
}: RunMapViewProps) {
  const mapRef = useRef<MapRef>(null);
  const engineRef = useRef<QueryEngine>(new QueryEngine(runMaps, 20, 20));

  useEffect(() => {
    if (mapRef.current) {
      const bounds = aggregateBounds(
        runMaps.map((runMap) => getRunMapBounds(runMap)),
      );
      fitMapBounds(mapRef.current, bounds, padding, zoomDuration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = (event: MapLayerMouseEvent) => {
    const latitude = event.lngLat.lat;
    const longitude = event.lngLat.lng;
    const queryCoordinate = { latitude, longitude };
    const results = engineRef.current.query(queryCoordinate);
    const closestResult = results.reduce((prev, current) => {
      const prevDistance = haversineDistance(prev.coordinate, queryCoordinate);
      const currentDistance = haversineDistance(
        current.coordinate,
        queryCoordinate,
      );
      return prevDistance < currentDistance ? prev : current;
    });

    onClickRun(closestResult.runMap.id);
  };

  function onHover(event: MapLayerMouseEvent) {
    // console.log("Coordinate", event.lngLat);
  }

  const center = aggregateCenters(runMaps.map((runMap) => getCenter(runMap)));
  const initialZoom = 10;
  const zoomDuration = 1000;
  const padding = 20;

  return (
    <div
      className={cn("h-full w-full overflow-hidden md:rounded-xl", className)}
    >
      <Map
        ref={mapRef}
        initialViewState={{
          latitude: center.latitude,
          longitude: center.longitude,
          zoom: initialZoom,
        }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        attributionControl={false}
        onClick={onClick}
        onMouseMove={onHover}
      >
        {runMaps.map((runMap, i) => {
          const lineFeature = getLineFeature(runMap);
          return (
            <LineSource
              key={i}
              lineFeature={lineFeature}
              lineOpacity={0.3}
              lineWidth={5}
            />
          );
        })}
      </Map>
    </div>
  );
}
