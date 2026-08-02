/**
 * The original GPX files, as they came off a watch or a route planner.
 *
 * Vite emits each one as a static asset and hands back its hashed URL, so the
 * download is the untouched file rather than the simplified track the app draws
 * from. Preserving those files is the point of the archive.
 */
const GPX_URLS = import.meta.glob("/gpx/*.gpx", {
  query: "?url",
  import: "default",
  eager: true,
}) as Record<string, string>;

export function getGpxUrl(slug: string): string | undefined {
  return GPX_URLS[`/gpx/${slug}.gpx`];
}
