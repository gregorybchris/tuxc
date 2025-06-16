"use client";

import { useRef } from "react";
import Map, { Layer, MapRef, Source } from "react-map-gl";
import intersections from "../../db/geos/intersections.json";
import townLines from "../../db/geos/town_line_poly.json";

export default function TownLinesPage() {
  const mapRef = useRef<MapRef>(null);

  return (
    <div className="flex flex-row justify-center gap-10 px-5 py-14 md:px-[20%] md:py-20">
      <div className="flex flex-col items-center justify-center gap-7">
        <div className="text-xl font-bold text-black/60">Town Lines Map</div>
        <span className="text-justify indent-4">
          It has long been a tradition for TUXC to race for the town lines in
          the Boston Area. Here, you can find a map of the surrounding town borders along with all crossing points marked in red.
        </span>
        <div className="h-[500px] w-full overflow-hidden rounded-xl">
          <Map
            ref={mapRef}
            initialViewState={{
              latitude: 42.4075,
              longitude: -71.119,
              zoom: 12,
            }}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/outdoors-v12"
            attributionControl={false}
          >
            {townLines && (
              <Source id="geojson-source" type="geojson" data={townLines}>
                <Layer
                  id="geojson-layer"
                  type="fill"
                  paint={{
                    "fill-color": "#add8e6",
                    "fill-opacity": 0.5,
                  }}
                />
                <Layer
                  id="geojson-line-layer"
                  type="line"
                  paint={{
                    "line-color": "#6495ed",
                    "line-width": 2,
                  }}
                />
              </Source>
            )}
            {intersections && (
              <Source id="intersections" type="geojson" data={intersections}>
                <Layer
                  id="intersections-layer"
                  type="circle"
                  paint={{
                    "circle-radius": 5,
                    "circle-color": "#ff4d4f",
                  }}
                />
              </Source>
            )}
          </Map>
        </div>
      </div>
    </div>
  );
}
