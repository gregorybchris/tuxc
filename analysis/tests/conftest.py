from pathlib import Path
from typing import TYPE_CHECKING

import pytest

from tuxc.gpx import Gpx, Point

if TYPE_CHECKING:
    from collections.abc import Callable

GPX_DIR = Path(__file__).parent.parent.parent / "gpx"


@pytest.fixture
def load_route() -> Callable[[str], Gpx]:
    """Load a route from the gpx directory by name."""

    def load(name: str) -> Gpx:
        return Gpx.parse(GPX_DIR / f"{name}.gpx")

    return load


def make_points(coords: list[tuple[float, float]]) -> list[Point]:
    """Build a route from (latitude, longitude) pairs."""
    return [Point(latitude=latitude, longitude=longitude, elevation=0.0) for latitude, longitude in coords]
