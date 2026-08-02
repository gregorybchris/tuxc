import { useMapColors, useMapStyle } from "@/lib/hooks/theme";
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
  const mapStyle = useMapStyle();

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
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
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
  lineColor,
  lineOpacity = 1,
  lineWidth = 4,
}: LineSourceProps) {
  const colors = useMapColors();

  return (
    <Source type="geojson" data={lineFeature}>
      <Layer
        type="line"
        paint={{
          "line-color": lineColor ?? colors.route,
          "line-width": lineWidth,
          "line-opacity": lineOpacity,
        }}
      />
    </Source>
  );
}
