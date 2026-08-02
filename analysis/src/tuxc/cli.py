import logging
import shutil
import time
from pathlib import Path

import click
from rich.console import Console

from tuxc.gpx import Gpx
from tuxc.gpx_compressor import DEFAULT_THRESHOLD, GpxCompressor

logger = logging.getLogger(__name__)

console = Console()

# The repository root, up out of analysis/src/tuxc.
PROJECT_ROOT = Path(__file__).parent.parent.parent.parent
GPX_DIR = PROJECT_ROOT / "gpx"
JPX_DIR = PROJECT_ROOT / "src" / "db" / "jpx"

THRESHOLD_HELP = "Fraction of route length the simplifier may give up."


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
