import heapq
import math
from dataclasses import dataclass
from itertools import pairwise
from typing import TYPE_CHECKING

from rich.console import Console

from tuxc.coordinate import Coordinate
from tuxc.jpx import Jpx
from tuxc.jpx import Point as JpxPoint

if TYPE_CHECKING:
    from collections.abc import Sequence

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
    def dist(cls, point_a: Coordinate, point_b: Coordinate) -> float:
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
    def path_dist(cls, points: Sequence[Coordinate]) -> float:
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
    def detour_cost(cls, point_a: Coordinate, point_b: Coordinate, point_c: Coordinate) -> float:
        """How much longer stopping at the middle point makes the trip, in miles."""
        return cls.dist(point_a, point_b) + cls.dist(point_b, point_c) - cls.dist(point_a, point_c)

    @classmethod
    def simplify_to_count[PointT: Coordinate](cls, points: Sequence[PointT], max_points: int) -> list[PointT]:
        """Wear a route down to at most max_points, leaving the start and finish where they are.

        Same idea as `simplify_route`, but stopping on a count rather than on a
        length budget: the corner that bends the route least goes first, and its
        neighbours are re-costed once it has, so what is left is the corners you
        would actually be able to see.
        """
        if len(points) <= max_points:
            return list(points)

        previous = list(range(-1, len(points) - 1))
        following = list(range(1, len(points) + 1))
        removed = [False] * len(points)
        # Bumped whenever a neighbour disappears, which stales any heap entry
        # already sitting there for this point.
        versions = [0] * len(points)

        def cost_at(index: int) -> float:
            return cls.detour_cost(points[previous[index]], points[index], points[following[index]])

        candidates = [(cost_at(index), 0, index) for index in range(1, len(points) - 1)]
        heapq.heapify(candidates)

        n_kept = len(points)
        while n_kept > max_points and candidates:
            _, version, index = heapq.heappop(candidates)
            if removed[index] or version != versions[index]:
                continue

            removed[index] = True
            n_kept -= 1
            before, after = previous[index], following[index]
            following[before] = after
            previous[after] = before

            for neighbor in (before, after):
                if 0 < neighbor < len(points) - 1:
                    versions[neighbor] += 1
                    heapq.heappush(candidates, (cost_at(neighbor), versions[neighbor], neighbor))

        return [point for index, point in enumerate(points) if not removed[index]]

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
