import logging
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass
from typing import TYPE_CHECKING

from tuxc.gpx_compressor import GpxCompressor
from tuxc.jpx import Jpx
from tuxc.polyline import encode_polyline

if TYPE_CHECKING:
    from collections.abc import Sequence
    from pathlib import Path

    from tuxc.coordinate import Coordinate

logger = logging.getLogger(__name__)

# Mapbox refuses a URL past this length, and the route is most of what is in it.
MAX_URL_LENGTH = 8192

# Corners left in the route that goes over in the URL. A thumbnail is a few
# hundred pixels across, so this is well past what it can show; the limit is
# there to keep the URL inside the cap above with room to spare.
MAX_POINTS = 400

# Twice the size a card is drawn at, so thumbnails stay sharp on a retina
# screen. Mapbox caps a static image at 1280 on a side.
WIDTH = 600
HEIGHT = 400

# Breathing room around the route, in pixels.
PADDING = 20

STROKE_WIDTH = 3

# The route drawn on each map, matching the `--route` colours in globals.css.
STROKE_COLORS = {"light": "4B87F7", "dark": "6BA0FF"}

# The map underneath. Outdoors is a bright sheet of paper, which is the one
# thing on a dark page no colour token can fix.
STYLES = {"light": "mapbox/outdoors-v12", "dark": "mapbox/dark-v11"}

THEMES = tuple(STYLES)

# WebP costs about a fifth of what the same image costs as PNG, and these are
# committed to the repository.
IMAGE_FORMAT = "webp"


@dataclass
class ThumbnailBuilder:
    """Route thumbnails, rendered by Mapbox once and then served by the site itself.

    Routes in the archive do not change, so every card on the runs page can be a
    real map without a reader's browser ever calling Mapbox: each one is
    rendered here, written into `public`, and committed alongside the route it
    was drawn from.
    """

    @classmethod
    def build_url(cls, points: Sequence[Coordinate], theme: str, token: str) -> str:
        """The Mapbox request that draws one route on one of the two maps.

        The route is worn down first: the corners that go are the ones a
        thumbnail could not have shown anyway, and what is left has to fit in
        the URL.
        """
        fitted = GpxCompressor.simplify_to_count(points, MAX_POINTS)
        polyline = urllib.parse.quote(encode_polyline(fitted), safe="")
        path = f"path-{STROKE_WIDTH}+{STROKE_COLORS[theme]}-1({polyline})"
        query = urllib.parse.urlencode(
            {"padding": PADDING, "attribution": "false", "logo": "false", "access_token": token}
        )
        url = (
            f"https://api.mapbox.com/styles/v1/{STYLES[theme]}/static/"
            f"{path}/auto/{WIDTH}x{HEIGHT}.{IMAGE_FORMAT}?{query}"
        )

        if len(url) > MAX_URL_LENGTH:
            message = f"Route needs {len(url)} characters of URL, over the {MAX_URL_LENGTH} Mapbox allows"
            raise ValueError(message)

        return url

    @classmethod
    def filename(cls, slug: str, theme: str) -> str:
        return f"{slug}-{theme}.{IMAGE_FORMAT}"

    @classmethod
    def render(cls, jpx_filepath: Path, out_dir: Path, token: str, *, force: bool = False) -> int:
        """Draw both themes of one route, skipping any that is already on disk.

        Returns how many images were actually fetched, which is what a run of
        this costs against the Mapbox quota.
        """
        slug = jpx_filepath.stem
        wanted = [
            (theme, out_dir / cls.filename(slug, theme))
            for theme in THEMES
            if force or not (out_dir / cls.filename(slug, theme)).exists()
        ]
        if not wanted:
            return 0

        points = Jpx.model_validate_json(jpx_filepath.read_text()).points
        for theme, filepath in wanted:
            logger.info("Rendering %s", filepath.name)
            url = cls.build_url(points, theme, token)
            request = urllib.request.Request(url, headers={"User-Agent": "tuxc-thumbnails"})  # noqa: S310
            with urllib.request.urlopen(request) as response:  # noqa: S310
                filepath.write_bytes(response.read())

        return len(wanted)
