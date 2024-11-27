# ruff: noqa: T201
import logging
import shutil
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


@main.command(name="convert")
@click.option("--debug", type=bool, default=False, is_flag=True)
def convert_routes(debug: bool) -> None:
    if debug:
        logging.basicConfig(level=logging.INFO)

    gpx_dir = Path(__file__).parent.parent.parent / "gpx"
    jpx_dir = Path(__file__).parent.parent.parent / "app" / "api" / "runs" / "jpx"
    shutil.rmtree(jpx_dir, ignore_errors=True)
    jpx_dir.mkdir(exist_ok=True, parents=True)
    for gpx_filepath in gpx_dir.iterdir():
        if gpx_filepath.suffix != ".gpx":
            continue
        logger.info("Converting %s", gpx_filepath)
        gpx = Gpx.parse(gpx_filepath)
        jpx = GpxCompressor.compress(gpx)
        jpx_filepath = jpx_dir / f"{gpx_filepath.stem}.json"
        jpx.to_file(jpx_filepath)


@main.command(name="test")
@click.option("--debug", type=bool, default=False, is_flag=True)
def test_routes(debug: bool) -> None:
    if debug:
        logging.basicConfig(level=logging.INFO)

    gpx_dir = Path(__file__).parent.parent.parent / "gpx"
    for gpx_filepath in gpx_dir.iterdir():
        if gpx_filepath.suffix != ".gpx":
            continue
        logger.info("Converting %s", gpx_filepath)
        gpx = Gpx.parse(gpx_filepath)
        GpxCompressor.test(gpx, gpx_filepath.stem)
