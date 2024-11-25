import Map from "react-map-gl";
import { Run } from "../lib/models/run";
import { RunMap } from "../lib/models/runMap";

interface RunMapViewProps {
  run: Run;
  runMap: RunMap;
}

export function RunMapView({ run, runMap }: RunMapViewProps) {
  return (
    <div className="overflow-hidden rounded-lg">
      <Map
        initialViewState={{
          longitude: -0.09,
          latitude: 51.505,
          zoom: 13,
        }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      />
    </div>
  );
}
