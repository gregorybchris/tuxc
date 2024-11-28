import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import Map, { Layer, MapRef, Marker, Source } from "react-map-gl";
import { RunMap } from "../lib/models/runMap";
import {
  fitMapBounds,
  getCenter,
  getLineFeature,
  getRunMapBounds,
  getStart,
} from "../lib/utilities/map-utils";
import { cn } from "../lib/utilities/style-utils";
import { Pin } from "./run-map-pin";
interface RunMapViewProps {
  runMap: RunMap;
  className?: string;
}

export function RunMapView({ runMap, className }: RunMapViewProps) {
  const mapRef = useRef<MapRef>(null);

  const bounds = getRunMapBounds(runMap);
  const center = getCenter(runMap);
  const start = getStart(runMap);
  const lineFeature = getLineFeature(runMap);
  const initialZoom = 12;
  const zoomDuration = 1000;
  const padding = 40;

  useEffect(() => {
    if (mapRef.current) {
      fitMapBounds(mapRef.current, bounds, padding, zoomDuration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runMap]);

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
      >
        <Marker
          latitude={start.latitude}
          longitude={start.longitude}
          anchor="bottom"
        >
          <Pin />
        </Marker>
        <LineSource lineFeature={lineFeature} />
      </Map>
    </div>
  );
}

interface LineSourceProps {
  lineFeature: GeoJSON.Feature<GeoJSON.Geometry>;
  lineColor?: string;
  lineOpacity?: number;
  lineWidth?: number;
}

export function LineSource({
  lineFeature,
  lineColor = "#4B87F7",
  lineOpacity = 1,
  lineWidth = 4,
}: LineSourceProps) {
  return (
    <Source type="geojson" data={lineFeature}>
      <Layer
        type="line"
        paint={{
          "line-color": lineColor,
          "line-width": lineWidth,
          "line-opacity": lineOpacity,
        }}
      />
    </Source>
  );
}
