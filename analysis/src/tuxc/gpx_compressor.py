import math
from dataclasses import dataclass
from itertools import pairwise
from typing import TYPE_CHECKING

from rich.console import Console

from tuxc.jpx import Jpx
from tuxc.jpx import Point as JpxPoint

if TYPE_CHECKING:
    from tuxc.gpx import Gpx, Point

EARTH_RADIUS_KM = 6371
KM_TO_MILES = 0.62137119

# How much of a route's length the simplifier may give up, as a fraction.
DEFAULT_THRESHOLD = 0.0001


@dataclass
class GpxCompressor:
    @classmethod
    def to_points(cls, gpx: Gpx) -> list[Point]:
        """Flatten every track and segment of a GPX file into one run of points."""
        return [point for track in gpx.tracks for segment in track.segments for point in segment.points]

    @classmethod
    def to_mercator(cls, point: Point) -> tuple[float, float]:
        r = 6378137  # Radius of earth
        lat_rad = math.radians(point.latitude)
        lon_rad = math.radians(point.longitude)
        x = r * lon_rad
        y = r * math.log(math.tan(math.pi / 4 + lat_rad / 2))
        return x, y

    @classmethod
    def dist(cls, point_a: Point, point_b: Point) -> float:
        """Distance between two points in miles, via the haversine formula."""
        lat_a, lon_a = point_a.latitude, point_a.longitude
        lat_b, lon_b = point_b.latitude, point_b.longitude

        d = (
            2
            * EARTH_RADIUS_KM
            * math.asin(
                math.sqrt(
                    0.5
                    - math.cos(math.radians(lat_b - lat_a)) / 2
                    + math.cos(math.radians(lat_a))
                    * math.cos(math.radians(lat_b))
                    * (1 - math.cos(math.radians(lon_b - lon_a)))
                    / 2
                )
            )
        )
        return d * KM_TO_MILES

    @classmethod
    def path_dist(cls, points: list[Point]) -> float:
        """Distance covered along a route, in miles."""
        return sum((cls.dist(point_a, point_b) for point_a, point_b in pairwise(points)), 0.0)

    @classmethod
    def simplify_route(cls, points: list[Point], percent_threshold: float = DEFAULT_THRESHOLD) -> list[Point]:
        """Drop points that barely bend the route, leaving the start and finish where they are.

        A point goes when running straight past it is no shorter than stopping at it, to within
        the threshold. Returns a new list; the route handed in is left alone.
        """
        # TODO: Update to iteratively remove the most redundant points, use a heap
        kept = list(points)
        i = 1
        while i < len(kept) - 1:
            point_a, point_b, point_c = kept[i - 1], kept[i], kept[i + 1]
            actual_length = cls.dist(point_a, point_b) + cls.dist(point_b, point_c)
            short_length = cls.dist(point_a, point_c)
            if short_length > actual_length * (1 - percent_threshold):
                del kept[i]
            else:
                i += 1
        return kept

    @classmethod
    def compress(cls, gpx: Gpx, percent_threshold: float = DEFAULT_THRESHOLD) -> Jpx:
        """Turn a parsed GPX file into the simplified route the app loads."""
        points = cls.simplify_route(cls.to_points(gpx), percent_threshold)
        jpx_points = [
            JpxPoint(latitude=point.latitude, longitude=point.longitude, elevation=point.elevation) for point in points
        ]
        return Jpx(points=jpx_points)

    @classmethod
    def benchmark(cls, gpx: Gpx, name: str, percent_threshold: float = DEFAULT_THRESHOLD) -> None:
        """Print how many points and how much length a route loses to simplification."""
        console = Console()

        points_before = cls.to_points(gpx)
        n_before = len(points_before)
        dist_before = cls.path_dist(points_before)

        points_after = cls.simplify_route(points_before, percent_threshold)
        n_after = len(points_after)
        dist_after = cls.path_dist(points_after)

        n_reduction = 1.0 - n_after / n_before if n_before else 0.0
        dist_reduction = 1.0 - dist_after / dist_before if dist_before else 0.0

        console.print(f"\n[blue]{name}")
        console.print(f"  {n_reduction * 100:.0f}% fewer points ({n_before:d} -> {n_after:d})")
        console.print(f"  {dist_reduction * 100:.3f}% shorter distance ({dist_before:.3f} -> {dist_after:.3f})")
