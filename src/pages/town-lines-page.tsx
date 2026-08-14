import { Pin } from "@/components/run-map-pin";
import { useMapColors, useMapStyle } from "@/lib/hooks/theme";
import { pinImageUrl } from "@/lib/utilities/pin-utils";
import { Page, PageHeader } from "@/widgets/page";
import { useCallback, useRef, useState } from "react";
import Map, { Layer, MapRef, Source } from "react-map-gl";
import intersections from "../db/geos/intersections.json";
import townLines from "../db/geos/town-line-poly.json";

const PIN_IMAGE = "crossing-pin";
// Drawn at twice its display size so it stays sharp on a retina screen.
const PIN_PIXELS = 48;

export default function TownLinesPage() {
  const mapRef = useRef<MapRef>(null);
  const mapStyle = useMapStyle();
  // The lighter blue reads against the town boundaries in either theme.
  const colors = useMapColors();
  const [pinReady, setPinReady] = useState(false);

  // Which colour the registered pin was drawn in, so a redundant styledata
  // event does not redraw thousands of icons for nothing.
  const pinColor = useRef<string>();

  /**
   * Registers the crossing pin with the map.
   *
   * The crossings are a symbol layer, so the image has to exist before the
   * layer naming it can render. It has to be done again after every style
   * change: swapping to the dark base style drops the images the old one held.
   */
  const registerPin = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;
    if (map.hasImage(PIN_IMAGE) && pinColor.current === colors.pin) {
      setPinReady(true);
      return;
    }

    const image = new Image(PIN_PIXELS, PIN_PIXELS);
    image.onload = () => {
      if (map.hasImage(PIN_IMAGE)) map.removeImage(PIN_IMAGE);
      map.addImage(PIN_IMAGE, image, { pixelRatio: 2 });
      pinColor.current = colors.pin;
      setPinReady(true);
    };
    image.src = pinImageUrl(colors.pin, PIN_PIXELS);
  }, [colors.pin]);

  return (
    <Page className="flex flex-col gap-6">
      <PageHeader
        title="Town Lines"
        lede="It has long been a tradition for TUXC to race for the town lines in the Boston Area. Here, you can find a map of the surrounding town borders along with all crossing points marked with a pin."
      />

      <div className="h-[60vh] min-h-[24rem] w-full overflow-hidden rounded-xl border border-ink/10">
        <Map
          ref={mapRef}
          initialViewState={{
            latitude: 42.4075,
            longitude: -71.119,
            // Each zoom level halves the scale, so 11 covers twice the ground 12 did.
            zoom: 11,
          }}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
          style={{ width: "100%", height: "100%" }}
          mapStyle={mapStyle}
          attributionControl={false}
          onLoad={registerPin}
          onStyleData={registerPin}
        >
          {townLines && (
            <Source id="geojson-source" type="geojson" data={townLines}>
              <Layer
                id="geojson-line-layer"
                type="line"
                paint={{
                  "line-color": colors.boundary,
                  "line-width": 2,
                }}
              />
            </Source>
          )}
          {intersections && pinReady && (
            <Source id="intersections" type="geojson" data={intersections}>
              <Layer
                id="intersections-layer"
                type="symbol"
                layout={{
                  "icon-image": PIN_IMAGE,
                  "icon-anchor": "bottom",
                  "icon-size": 0.55,
                  // There are thousands of these and they sit close together, so
                  // let them overlap rather than dropping most of them.
                  "icon-allow-overlap": true,
                  "icon-ignore-placement": true,
                }}
                paint={{
                  // See-through, so a cluster of crossings reads as a cluster
                  // rather than one solid blob.
                  "icon-opacity": 0.6,
                }}
              />
            </Source>
          )}
        </Map>
      </div>

      <p className="flex flex-row items-center gap-2 text-sm text-ink/50">
        <Pin color={colors.pin} size={14} />
        Crossing point
      </p>
    </Page>
  );
}
