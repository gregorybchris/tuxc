import { useMapColors, useMapStyle } from "@/lib/hooks/theme";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import Map, { MapLayerMouseEvent, MapRef, Marker } from "react-map-gl";
import { QueryEngine, QueryResult } from "../lib/mapping/query-engine";
import { RunMap } from "../lib/models/runMap";
import {
  Coordinate,
  getLineFeature,
  medianCenter,
} from "../lib/utilities/map-utils";
import { cn } from "../lib/utilities/style-utils";
import { Pin } from "./run-map-pin";
import { LineSource } from "./run-map-view";
interface RunMapViewProps {
  runMaps: RunMap[];
  onClickRun: (slug: string) => void;
  onHoverRun: (slug?: string) => void;
  className?: string;
}

export function RunMapsView({
  runMaps,
  onClickRun,
  onHoverRun,
  className,
}: RunMapViewProps) {
  const mapRef = useRef<MapRef>(null);
  const mapStyle = useMapStyle();
  const colors = useMapColors();
  // Radius trades off how long it takes to process a query (larger radius takes longer)
  // with how precise you have to be when hovering to see the pin (smaller radius is more difficult to hover).
  // This value should generally be a few streets wide.
  const radius = 0.0004;
  const engineRef = useRef<QueryEngine>();
  const [markerCoordinate, setMarkerCoordinate] = useState<Coordinate | null>(
    null,
  );

  useEffect(() => {
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
      onClickRun(closestResult.runMap.slug);
    }
  };

  function onHover(event: MapLayerMouseEvent) {
    const closestResult = getClosestRun(event);
    if (closestResult) {
      setMarkerCoordinate(closestResult.coordinate);
      onHoverRun(closestResult.runMap.slug);
    } else {
      setMarkerCoordinate({ latitude: 0, longitude: 0 });
      onHoverRun(undefined);
    }
  }

  // Every point of every route, so the middle lands where the running is
  // densest rather than halfway to the furthest outlier.
  const center = medianCenter(runMaps.flatMap((runMap) => runMap.points));
  const initialZoom = 11;

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
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
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
            <Pin color={colors.pin} />
          </Marker>
        )}

        {runMaps.map((runMap) => {
          const lineFeature = getLineFeature(runMap);
          return (
            <LineSource
              key={runMap.slug}
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
