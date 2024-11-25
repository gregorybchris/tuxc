import math
from dataclasses import dataclass

from tuxc.gpx import Gpx, Point


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
    def dist(cls, point_a: Point, point_b: Point) -> float:
        """Haversine formula"""
        lat_a, lon_a = point_a.latitude, point_a.longitude
        lat_b, lon_b = point_b.latitude, point_b.longitude

        r = 6371  # Radius of earth
        p = math.pi / 180  # Degrees to radians
        d = (
            2
            * r
            * math.asin(
                math.sqrt(
                    0.5
                    - math.cos((lat_b - lat_a) * p) / 2
                    + math.cos(lat_a * p) * math.cos(lat_b * p) * (1 - math.cos((lon_b - lon_a) * p)) / 2
                )
            )
        )
        k = 0.62137119  # Kilometers to miles
        return d * k

    @classmethod
    def path_dist(cls, points: list[Point]) -> float:
        total_dist = 0.0
        for i in range(1, len(points)):
            point_a, point_b = points[i - 1], points[i]
            total_dist += cls.dist(point_a, point_b)
        return total_dist

    @classmethod
    def simplify_route(cls, points: list[Point]) -> list[Point]:
        # TODO: Update to iteratively remove the most redundant points, use a heap
        percent_threshold = 0.0001
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
    def compress(cls, gpx: Gpx, name: str) -> None:
        # TODO: Update this to return a new Gpx object with fewer points
        points_before = GpxCompressor.to_points(gpx)
        n_before = len(points_before)
        dist_before = GpxCompressor.path_dist(points_before)

        points_after = GpxCompressor.simplify_route(points_before)
        n_after = len(points_after)
        dist_after = GpxCompressor.path_dist(points_after)

        n_reduction = n_after / n_before
        dist_reduction = 1.0 - dist_after / dist_before

        print(f"{name}")
        print("  {:.0f}% fewer points ({:d} -> {:d})".format(n_reduction * 100, n_before, n_after))
        print("  {:.3f}% shorter distance ({:.3f} -> {:.3f})".format(dist_reduction * 100, dist_before, dist_after))
