# ruff: noqa: T201
import logging
from pathlib import Path

import click

from tuxc.gpx import Gpx
from tuxc.gpx_compressor import GpxCompressor

logger = logging.getLogger(__name__)


@click.group()
def main() -> None:
    pass


@main.command(name="route")
@click.argument("route_id", type=str)
@click.option("--debug", type=bool, default=False, is_flag=True)
def get_route(route_id: str, debug: bool) -> None:
    if debug:
        logging.basicConfig(level=logging.INFO)

    # TODO: Implement route fetching
    logger.info("Fetching route information for route %s", route_id)


@main.command(name="compress")
@click.option("--debug", type=bool, default=False, is_flag=True)
def compress_routes(debug: bool) -> None:
    if debug:
        logging.basicConfig(level=logging.INFO)

    gpx_dir = Path(__file__).parent.parent.parent / "gpx"
    for filepath in gpx_dir.iterdir():
        gpx = Gpx.parse(filepath)
        GpxCompressor.compress(gpx, filepath.stem)
