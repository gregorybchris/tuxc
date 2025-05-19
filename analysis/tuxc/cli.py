# ruff: noqa: T201
import logging
import shutil
from pathlib import Path

import click
from rich.console import Console

from tuxc.gpx import Gpx
from tuxc.gpx_compressor import GpxCompressor

logger = logging.getLogger(__name__)

console = Console()


@click.group()
def main() -> None:
    pass


@main.command(name="convert")
@click.option("--debug", type=bool, default=False, is_flag=True)
def convert_routes(debug: bool) -> None:
    if debug:
        logging.basicConfig(level=logging.INFO)

    gpx_dir = Path(__file__).parent.parent.parent / "gpx"
    jpx_dir = Path(__file__).parent.parent.parent / "app" / "db" / "jpx"
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

    console.print(f"Converted {len(list(gpx_dir.iterdir()))} GPX files to JPX files.")


@main.command(name="benchmark")
@click.option("--debug", type=bool, default=False, is_flag=True)
def benchmark_compressor(debug: bool) -> None:
    if debug:
        logging.basicConfig(level=logging.INFO)

    gpx_dir = Path(__file__).parent.parent.parent / "gpx"
    for gpx_filepath in gpx_dir.iterdir():
        if gpx_filepath.suffix != ".gpx":
            continue
        logger.info("Converting %s", gpx_filepath)
        gpx = Gpx.parse(gpx_filepath)
        GpxCompressor.benchmark(gpx, gpx_filepath.stem)
