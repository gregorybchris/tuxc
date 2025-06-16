import math
from dataclasses import dataclass

from rich.console import Console

from tuxc.gpx import Gpx, Point
from tuxc.jpx import Jpx
from tuxc.jpx import Point as JpxPoint


@dataclass
class GpxCompressor:
    @classmethod
    def to_points(cls, gpx: Gpx) -> list[Point]:
        points = []
        for track in gpx.tracks:
            for segment in track.segments:
                for point in segment.points:
                    points.append(point)
        return points

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
        """Haversine formula"""
        lat_a, lon_a = point_a.latitude, point_a.longitude
        lat_b, lon_b = point_b.latitude, point_b.longitude

        r = 6371  # Radius of earth (km)
        d = (
            2
            * r
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
        return d * 0.62137119  # Kilometers to miles

    @classmethod
    def path_dist(cls, points: list[Point]) -> float:
        total_dist = 0.0
        for i in range(1, len(points)):
            point_a, point_b = points[i - 1], points[i]
            total_dist += cls.dist(point_a, point_b)
        return total_dist

    @classmethod
    def simplify_route(cls, points: list[Point], percent_threshold: float = 0.0001) -> list[Point]:
        # TODO: Update to iteratively remove the most redundant points, use a heap
        i = 1
        while i < len(points) - 1:
            point_a, point_b, point_c = points[i - 1], points[i], points[i + 1]
            actual_length = cls.dist(point_a, point_b) + cls.dist(point_b, point_c)
            short_length = cls.dist(point_a, point_c)
            if short_length > actual_length * (1 - percent_threshold):
                del points[i]
            else:
                i += 1
        return points

    @classmethod
    def compress(cls, gpx: Gpx) -> Jpx:
        points_before = cls.to_points(gpx)
        points_after = cls.simplify_route(points_before)

        def gpx_point_to_jpx(point: Point) -> JpxPoint:
            return JpxPoint(latitude=point.latitude, longitude=point.longitude, elevation=point.elevation)

        jpx_points = [gpx_point_to_jpx(point) for point in points_after]
        return Jpx(points=jpx_points)

    @classmethod
    def benchmark(cls, gpx: Gpx, name: str) -> None:
        console = Console()

        # TODO: Update this to return a new Gpx object with fewer points
        points_before = cls.to_points(gpx)
        n_before = len(points_before)
        dist_before = cls.path_dist(points_before)

        points_after = cls.simplify_route(points_before)
        n_after = len(points_after)
        dist_after = cls.path_dist(points_after)

        n_reduction = 1.0 - n_after / n_before
        dist_reduction = 1.0 - dist_after / dist_before

        console.print(f"\n[blue]{name}")
        console.print("  {:.0f}% fewer points ({:d} -> {:d})".format(n_reduction * 100, n_before, n_after))
        console.print(
            "  {:.3f}% shorter distance ({:.3f} -> {:.3f})".format(dist_reduction * 100, dist_before, dist_after)
        )
