# ruff: noqa: T201
import logging
import shutil
import time
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

    project_root_dirpath = Path(__file__).parent.parent.parent.parent
    gpx_dir = project_root_dirpath / "gpx"
    jpx_dir = project_root_dirpath / "app" / "db" / "jpx"
    shutil.rmtree(jpx_dir, ignore_errors=True)
    jpx_dir.mkdir(exist_ok=True, parents=True)
    start_time = time.time()
    for gpx_filepath in gpx_dir.iterdir():
        if gpx_filepath.suffix != ".gpx":
            continue
        logger.info("Converting %s", gpx_filepath)
        gpx = Gpx.parse(gpx_filepath)
        jpx = GpxCompressor.compress(gpx)
        jpx_filepath = jpx_dir / f"{gpx_filepath.stem}.json"
        jpx.to_file(jpx_filepath)
    elapsed_time = time.time() - start_time

    console.print(f"Converted {len(list(gpx_dir.iterdir()))} GPX files to JPX files in {elapsed_time:.2f} seconds.")


@main.command(name="benchmark")
@click.option("--debug", type=bool, default=False, is_flag=True)
def benchmark_compressor(debug: bool) -> None:
    if debug:
        logging.basicConfig(level=logging.INFO)

    project_root_dirpath = Path(__file__).parent.parent.parent.parent
    gpx_dir = project_root_dirpath / "gpx"
    for gpx_filepath in gpx_dir.iterdir():
        if gpx_filepath.suffix != ".gpx":
            continue
        logger.info("Converting %s", gpx_filepath)
        gpx = Gpx.parse(gpx_filepath)
        GpxCompressor.benchmark(gpx, gpx_filepath.stem)
