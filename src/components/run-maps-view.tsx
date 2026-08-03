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
  /** A click on the map: where it landed, and every route within reach of it. */
  onClickPoint: (coordinate: Coordinate, slugs: string[]) => void;
  onHoverRuns: (slugs: string[]) => void;
  /** The dropped pin, kept by the page so it survives across renders. */
  pinnedCoordinate: Coordinate | null;
  /** Routes to draw at full strength, whether hovered on the map or in a list. */
  highlightedSlugs: string[];
  className?: string;
}

export function RunMapsView({
  runMaps,
  onClickPoint,
  onHoverRuns,
  pinnedCoordinate,
  highlightedSlugs,
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
  const hoveredSlugsRef = useRef<string[]>([]);

  useEffect(() => {
    if (!engineRef.current) {
      engineRef.current = new QueryEngine(runMaps, radius);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Closest first, which is the order both the hover card and the list keep.
  function getRunsAt(event: MapLayerMouseEvent): QueryResult[] {
    const coordinate = {
      latitude: event.lngLat.lat,
      longitude: event.lngLat.lng,
    };
    if (!engineRef.current) {
      return [];
    }
    return engineRef.current.query(coordinate);
  }

  // The pin drops where you clicked rather than on the nearest route: with
  // several routes under the cursor, snapping to one of them would be picking a
  // winner, which is the choice the list exists to hand back to you.
  const onClick = (event: MapLayerMouseEvent) => {
    const results = getRunsAt(event);
    const coordinate = {
      latitude: event.lngLat.lat,
      longitude: event.lngLat.lng,
    };
    onClickPoint(
      coordinate,
      results.map((result) => result.runMap.slug),
    );
  };

  function onHover(event: MapLayerMouseEvent) {
    const results = getRunsAt(event);
    if (results.length > 0) {
      setMarkerCoordinate(results[0].coordinate);
    } else {
      setMarkerCoordinate(null);
    }
    // Only report a change when the cursor crosses into a different set of
    // routes, so moving along a single route doesn't rerender on every pixel.
    const slugs = results.map((result) => result.runMap.slug);
    if (!sameSlugs(hoveredSlugsRef.current, slugs)) {
      hoveredSlugsRef.current = slugs;
      onHoverRuns(slugs);
    }
  }

  // Reaching for the list means leaving the canvas, and without this the hover
  // card would stay behind naming wherever the cursor last crossed.
  function onLeave() {
    setMarkerCoordinate(null);
    if (hoveredSlugsRef.current.length > 0) {
      hoveredSlugsRef.current = [];
      onHoverRuns([]);
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
        onMouseOut={onLeave}
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

        {pinnedCoordinate && (
          <Marker
            latitude={pinnedCoordinate.latitude}
            longitude={pinnedCoordinate.longitude}
            anchor="bottom"
          >
            <Pin color={colors.droppedPin} size={28} />
          </Marker>
        )}

        {runMaps.map((runMap) => {
          const lineFeature = getLineFeature(runMap);
          const highlighted = highlightedSlugs.includes(runMap.slug);
          return (
            <LineSource
              key={runMap.slug}
              lineFeature={lineFeature}
              lineOpacity={highlighted ? 0.9 : 0.3}
              lineWidth={5}
            />
          );
        })}
      </Map>
    </div>
  );
}

function sameSlugs(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((slug, i) => slug === b[i]);
}
