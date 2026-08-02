import json
from typing import TYPE_CHECKING

import pytest

from tests.conftest import make_points
from tuxc.gpx import Gpx, Point, Segment, Track
from tuxc.gpx_compressor import GpxCompressor

if TYPE_CHECKING:
    from collections.abc import Callable
    from pathlib import Path

# A degree of latitude is about 69 miles anywhere on earth.
MILES_PER_DEGREE_LATITUDE = 69.0


class TestDistance:
    def test_dist_between_a_point_and_itself_is_zero(self) -> None:
        point = Point(latitude=42.4, longitude=-71.1, elevation=0.0)

        assert GpxCompressor.dist(point, point) == pytest.approx(0.0)

    def test_dist_measures_a_degree_of_latitude(self) -> None:
        point_a, point_b = make_points([(42.0, -71.0), (43.0, -71.0)])

        assert GpxCompressor.dist(point_a, point_b) == pytest.approx(MILES_PER_DEGREE_LATITUDE, rel=0.01)

    def test_dist_does_not_care_which_way_round(self) -> None:
        point_a, point_b = make_points([(42.0, -71.0), (42.5, -71.5)])

        assert GpxCompressor.dist(point_a, point_b) == pytest.approx(GpxCompressor.dist(point_b, point_a))

    def test_path_dist_adds_up_the_legs(self) -> None:
        points = make_points([(42.0, -71.0), (42.5, -71.0), (43.0, -71.0)])

        assert GpxCompressor.path_dist(points) == pytest.approx(MILES_PER_DEGREE_LATITUDE, rel=0.01)

    @pytest.mark.parametrize("n_points", [0, 1])
    def test_path_dist_of_a_route_going_nowhere_is_zero(self, n_points: int) -> None:
        points = make_points([(42.0, -71.0)] * n_points)

        assert GpxCompressor.path_dist(points) == 0.0


class TestSimplify:
    def test_simplify_drops_a_point_in_a_straight_line(self) -> None:
        points = make_points([(42.0, -71.0), (42.5, -71.0), (43.0, -71.0)])

        assert len(GpxCompressor.simplify_route(points)) == 2

    def test_simplify_keeps_a_point_that_turns_a_corner(self) -> None:
        points = make_points([(42.0, -71.0), (42.5, -71.0), (42.5, -70.5)])

        assert len(GpxCompressor.simplify_route(points)) == 3

    def test_simplify_keeps_the_start_and_finish(self) -> None:
        points = make_points([(42.0, -71.0), (42.2, -71.0), (42.4, -71.0), (42.6, -71.0)])

        simplified = GpxCompressor.simplify_route(points)

        assert simplified[0] == points[0]
        assert simplified[-1] == points[-1]

    def test_simplify_leaves_the_route_it_was_given_alone(self) -> None:
        """Callers measure the route before and after, so simplifying must not edit in place."""
        points = make_points([(42.0, -71.0), (42.5, -71.0), (43.0, -71.0)])

        GpxCompressor.simplify_route(points)

        assert len(points) == 3

    def test_simplify_gives_up_length_within_the_threshold(self, load_route: Callable[[str], Gpx]) -> None:
        points = GpxCompressor.to_points(load_route("fresh-pond"))
        before = GpxCompressor.path_dist(points)

        after = GpxCompressor.path_dist(GpxCompressor.simplify_route(points, 0.0001))

        assert after <= before
        assert (before - after) / before < 0.0001

    def test_a_larger_threshold_drops_more_points(self, load_route: Callable[[str], Gpx]) -> None:
        points = GpxCompressor.to_points(load_route("fresh-pond"))

        loose = GpxCompressor.simplify_route(points, 0.001)
        tight = GpxCompressor.simplify_route(points, 0.0000001)

        assert len(loose) < len(tight) <= len(points)


class TestCompress:
    def test_to_points_flattens_tracks_and_segments(self) -> None:
        first, second, third = make_points([(42.0, -71.0), (42.1, -71.0), (42.2, -71.0)])
        gpx = Gpx(tracks=[Track(segments=[Segment(points=[first, second])]), Track(segments=[Segment(points=[third])])])

        assert GpxCompressor.to_points(gpx) == [first, second, third]

    def test_compress_carries_every_coordinate_across(self) -> None:
        points = make_points([(42.0, -71.0), (42.5, -70.5), (43.0, -71.0)])
        points[1].elevation = 12.5
        gpx = Gpx(tracks=[Track(segments=[Segment(points=points)])])

        jpx = GpxCompressor.compress(gpx)

        assert len(jpx.points) == 3
        assert jpx.points[1].latitude == pytest.approx(42.5)
        assert jpx.points[1].longitude == pytest.approx(-70.5)
        assert jpx.points[1].elevation == pytest.approx(12.5)

    def test_compress_writes_a_route_the_app_can_read(self, load_route: Callable[[str], Gpx], tmp_path: Path) -> None:
        jpx = GpxCompressor.compress(load_route("fresh-pond"))
        filepath = tmp_path / "fresh-pond.json"

        jpx.to_file(filepath)
        written = json.loads(filepath.read_text())

        assert len(written["points"]) == len(jpx.points)
        assert set(written["points"][0]) == {"latitude", "longitude", "elevation"}
