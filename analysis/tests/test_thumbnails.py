from typing import TYPE_CHECKING

import pytest

from tests.conftest import make_points
from tuxc.gpx_compressor import GpxCompressor
from tuxc.thumbnails import MAX_POINTS, MAX_URL_LENGTH, THEMES, ThumbnailBuilder

if TYPE_CHECKING:
    from collections.abc import Callable

    from tuxc.gpx import Gpx

TOKEN = "pk.test"  # noqa: S105 — a stand-in, never sent anywhere.


class TestSimplifyToCount:
    def test_simplify_to_count_leaves_a_short_route_alone(self) -> None:
        points = make_points([(42.0, -71.0), (42.5, -70.5), (43.0, -71.0)])

        assert GpxCompressor.simplify_to_count(points, 10) == points

    def test_simplify_to_count_hits_the_count_it_is_given(self, load_route: Callable[[str], Gpx]) -> None:
        points = GpxCompressor.to_points(load_route("fresh-pond"))

        assert len(GpxCompressor.simplify_to_count(points, 50)) == 50

    def test_simplify_to_count_keeps_the_start_and_finish(self, load_route: Callable[[str], Gpx]) -> None:
        points = GpxCompressor.to_points(load_route("fresh-pond"))

        simplified = GpxCompressor.simplify_to_count(points, 50)

        assert simplified[0] == points[0]
        assert simplified[-1] == points[-1]

    def test_simplify_to_count_drops_the_straight_line_before_the_corner(self) -> None:
        """Of a point running straight on and a point turning hard, the straight one goes."""
        points = make_points([(42.0, -71.0), (42.1, -71.0), (42.2, -71.0), (42.2, -70.5), (42.0, -70.5)])

        simplified = GpxCompressor.simplify_to_count(points, 4)

        assert make_points([(42.1, -71.0)])[0] not in simplified
        assert make_points([(42.2, -70.5)])[0] in simplified

    def test_simplify_to_count_leaves_the_route_it_was_given_alone(self) -> None:
        points = make_points([(42.0, -71.0), (42.1, -71.0), (42.2, -71.0), (42.3, -71.0)])

        GpxCompressor.simplify_to_count(points, 2)

        assert len(points) == 4

    def test_a_smaller_count_drops_more_points(self, load_route: Callable[[str], Gpx]) -> None:
        points = GpxCompressor.to_points(load_route("fresh-pond"))

        loose = GpxCompressor.simplify_to_count(points, 200)
        tight = GpxCompressor.simplify_to_count(points, 20)

        assert len(tight) < len(loose) < len(points)


class TestBuildUrl:
    @pytest.mark.parametrize("theme", THEMES)
    def test_build_url_fits_the_longest_route_in_the_archive(
        self, theme: str, load_route: Callable[[str], Gpx]
    ) -> None:
        points = GpxCompressor.to_points(load_route("son-of-a-beach"))

        url = ThumbnailBuilder.build_url(points, theme, TOKEN)

        assert len(url) < MAX_URL_LENGTH

    def test_build_url_refuses_a_route_too_long_for_a_url(self) -> None:
        """A route that somehow survives simplification has to fail loudly, not render wrong."""
        points = make_points([(42.0 + index / 1e4, -71.0 - index / 1e4) for index in range(MAX_POINTS)])

        with pytest.raises(ValueError, match="over the"):
            ThumbnailBuilder.build_url(points, "light", "X" * MAX_URL_LENGTH)

    def test_build_url_draws_each_theme_on_its_own_map(self, load_route: Callable[[str], Gpx]) -> None:
        points = GpxCompressor.to_points(load_route("fresh-pond"))

        light = ThumbnailBuilder.build_url(points, "light", TOKEN)
        dark = ThumbnailBuilder.build_url(points, "dark", TOKEN)

        assert "outdoors" in light
        assert "dark-v11" in dark

    def test_build_url_asks_for_webp(self, load_route: Callable[[str], Gpx]) -> None:
        points = GpxCompressor.to_points(load_route("fresh-pond"))

        assert ".webp?" in ThumbnailBuilder.build_url(points, "light", TOKEN)


class TestFilename:
    def test_filename_names_a_route_by_slug_and_theme(self) -> None:
        assert ThumbnailBuilder.filename("fresh-pond", "dark") == "fresh-pond-dark.webp"
