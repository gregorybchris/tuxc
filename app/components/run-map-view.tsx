import { useEffect, useRef } from "react";
import Map, { Layer, MapRef, Source } from "react-map-gl";
import { Run } from "../lib/models/run";
import { RunMap } from "../lib/models/runMap";
import { cn } from "../lib/utilities/style-utils";

interface RunMapViewProps {
  run: Run;
  runMap: RunMap;
  className?: string;
}

export function RunMapView({ run, runMap, className }: RunMapViewProps) {
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    const minLat = Math.min(...runMap.points.map((p) => p.latitude));
    const maxLat = Math.max(...runMap.points.map((p) => p.latitude));
    const minLng = Math.min(...runMap.points.map((p) => p.longitude));
    const maxLng = Math.max(...runMap.points.map((p) => p.longitude));
    mapRef.current?.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 40, duration: 1000 },
    );
  }, [runMap]);

  const coordinates = runMap.points.map((point) => [
    point.longitude,
    point.latitude,
  ]);

  const routeGeoJSON: GeoJSON.Feature<GeoJSON.Geometry> = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: coordinates,
    },
  };

  const initialViewState = {
    latitude: 42.40923,
    longitude: -71.11457,
    zoom: 13,
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="h-[500px] w-full overflow-hidden md:w-[80%] md:rounded-xl">
        <Map
          ref={mapRef}
          initialViewState={initialViewState}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          attributionControl={false}
        >
          <Source type="geojson" data={routeGeoJSON}>
            <Layer
              type="line"
              paint={{
                "line-color": "#4B87F7",
                "line-width": 4,
                "line-opacity": 1,
              }}
            />
          </Source>
        </Map>
      </div>
    </div>
  );
}
