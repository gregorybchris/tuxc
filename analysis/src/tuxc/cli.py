import logging
import os
import shutil
import time
from pathlib import Path

import click
from rich.console import Console

from tuxc.gpx import Gpx
from tuxc.gpx_compressor import DEFAULT_THRESHOLD, GpxCompressor
from tuxc.thumbnails import THEMES, ThumbnailBuilder

logger = logging.getLogger(__name__)

console = Console()

# The repository root, up out of analysis/src/tuxc.
PROJECT_ROOT = Path(__file__).parent.parent.parent.parent
GPX_DIR = PROJECT_ROOT / "gpx"
JPX_DIR = PROJECT_ROOT / "src" / "db" / "jpx"
THUMBNAIL_DIR = PROJECT_ROOT / "public" / "thumbnails"

# The same token the app builds with, which is where this looks if the
# environment does not already carry one.
TOKEN_VARIABLE = "VITE_MAPBOX_TOKEN"  # noqa: S105 — the name of the variable, not a token.
ENV_FILE = PROJECT_ROOT / ".env.local"

THRESHOLD_HELP = "Fraction of route length the simplifier may give up."


def read_mapbox_token() -> str:
    """The Mapbox token, from the environment or the file the app builds with."""
    token = os.environ.get(TOKEN_VARIABLE)
    if token:
        return token

    if ENV_FILE.exists():
        for line in ENV_FILE.read_text().splitlines():
            name, separator, value = line.partition("=")
            if separator and name.strip() == TOKEN_VARIABLE:
                return value.strip().strip("\"'")

    message = f"No Mapbox token: set {TOKEN_VARIABLE} or put it in {ENV_FILE.name}"
    raise click.ClickException(message)


@click.group()
def main() -> None:
    pass


@main.command(name="convert")
@click.option("--threshold", type=float, default=DEFAULT_THRESHOLD, help=THRESHOLD_HELP)
@click.option("--debug", type=bool, default=False, is_flag=True)
def convert_routes(threshold: float, debug: bool) -> None:
    """Convert every GPX route into the simplified JSON the app loads."""
    if debug:
        logging.basicConfig(level=logging.INFO)

    shutil.rmtree(JPX_DIR, ignore_errors=True)
    JPX_DIR.mkdir(exist_ok=True, parents=True)

    start_time = time.time()
    gpx_filepaths = sorted(GPX_DIR.glob("*.gpx"))
    for gpx_filepath in gpx_filepaths:
        logger.info("Converting %s", gpx_filepath)
        gpx = Gpx.parse(gpx_filepath)
        jpx = GpxCompressor.compress(gpx, threshold)
        jpx_filepath = JPX_DIR / f"{gpx_filepath.stem}.json"
        jpx.to_file(jpx_filepath)
    elapsed_time = time.time() - start_time

    console.print(f"Converted {len(gpx_filepaths)} GPX files to JPX files in {elapsed_time:.2f} seconds.")


@main.command(name="thumbnails")
@click.option("--force", type=bool, default=False, is_flag=True, help="Redraw routes already on disk.")
@click.option("--debug", type=bool, default=False, is_flag=True)
def render_thumbnails(force: bool, debug: bool) -> None:
    """Render the map thumbnail for every route, in both themes.

    Only routes without an image already are drawn, so adding a run costs two
    Mapbox requests rather than the whole archive. The images are committed, and
    the site serves them itself: no reader's browser ever calls Mapbox.
    """
    if debug:
        logging.basicConfig(level=logging.INFO)

    token = read_mapbox_token()
    THUMBNAIL_DIR.mkdir(exist_ok=True, parents=True)

    start_time = time.time()
    jpx_filepaths = sorted(JPX_DIR.glob("*.json"))
    n_rendered = 0
    with click.progressbar(jpx_filepaths, label="Rendering thumbnails") as progress:
        for jpx_filepath in progress:
            n_rendered += ThumbnailBuilder.render(jpx_filepath, THUMBNAIL_DIR, token, force=force)
    elapsed_time = time.time() - start_time

    n_skipped = len(jpx_filepaths) * len(THEMES) - n_rendered
    console.print(
        f"Rendered {n_rendered} thumbnails for {len(jpx_filepaths)} routes "
        f"in {elapsed_time:.2f} seconds, {n_skipped} already drawn."
    )


@main.command(name="benchmark")
@click.option("--threshold", type=float, default=DEFAULT_THRESHOLD, help=THRESHOLD_HELP)
@click.option("--debug", type=bool, default=False, is_flag=True)
def benchmark_compressor(threshold: float, debug: bool) -> None:
    """Report how much each route shrinks when it is simplified."""
    if debug:
        logging.basicConfig(level=logging.INFO)

    for gpx_filepath in sorted(GPX_DIR.glob("*.gpx")):
        logger.info("Benchmarking %s", gpx_filepath)
        gpx = Gpx.parse(gpx_filepath)
        GpxCompressor.benchmark(gpx, gpx_filepath.stem, threshold)
