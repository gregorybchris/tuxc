import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import Map, { MapLayerMouseEvent, MapRef, Marker } from "react-map-gl";
import { QueryEngine, QueryResult } from "../lib/mapping/query-engine";
import { RunMap } from "../lib/models/runMap";
import {
  aggregateBounds,
  aggregateCenters,
  Coordinate,
  fitMapBounds,
  getCenter,
  getLineFeature,
  getRunMapBounds,
} from "../lib/utilities/map-utils";
import { cn } from "../lib/utilities/style-utils";
import { Pin } from "./run-map-pin";
import { LineSource } from "./run-map-view";
interface RunMapViewProps {
  runMaps: RunMap[];
  onClickRun: (id: number) => void;
  onHoverRun: (id?: number) => void;
  className?: string;
}

export function RunMapsView({
  runMaps,
  onClickRun,
  onHoverRun,
  className,
}: RunMapViewProps) {
  const mapRef = useRef<MapRef>(null);
  const radius = 0.001;
  const engineRef = useRef<QueryEngine>();
  const [markerCoordinate, setMarkerCoordinate] = useState<Coordinate | null>(
    null,
  );

  useEffect(() => {
    if (mapRef.current) {
      const bounds = aggregateBounds(
        runMaps.map((runMap) => getRunMapBounds(runMap)),
      );
      fitMapBounds(mapRef.current, bounds, padding, zoomDuration);
    }
    if (!engineRef.current) {
      engineRef.current = new QueryEngine(runMaps, radius);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getClosestRun(event: MapLayerMouseEvent): QueryResult | null {
    const coordinate = {
      latitude: event.lngLat.lat,
      longitude: event.lngLat.lng,
    };
    if (!engineRef.current) {
      return null;
    }
    const results = engineRef.current.query(coordinate);
    if (results.length === 0) {
      return null;
    }
    return results[0];
  }

  const onClick = (event: MapLayerMouseEvent) => {
    const closestResult = getClosestRun(event);
    if (closestResult) {
      setMarkerCoordinate(closestResult.coordinate);
      onClickRun(closestResult.runMap.id);
    }
  };

  function onHover(event: MapLayerMouseEvent) {
    const closestResult = getClosestRun(event);
    if (closestResult) {
      setMarkerCoordinate(closestResult.coordinate);
      onHoverRun(closestResult.runMap.id);
    } else {
      setMarkerCoordinate({ latitude: 0, longitude: 0 });
      onHoverRun(undefined);
    }
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
        {markerCoordinate && (
          <Marker
            latitude={markerCoordinate.latitude}
            longitude={markerCoordinate.longitude}
            anchor="bottom"
          >
            <Pin />
          </Marker>
        )}

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
