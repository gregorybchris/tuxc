from typing import TYPE_CHECKING

import pytest

from tuxc.gpx import Gpx

if TYPE_CHECKING:
    from collections.abc import Callable
    from pathlib import Path

NAMESPACED_GPX = """<?xml version="1.0" encoding="UTF-8"?>
<gpx xmlns="http://www.topografix.com/GPX/1/1" creator="StravaGPX" version="1.1">
 <trk>
  <name>Afternoon Run</name>
  <trkseg>
   <trkpt lat="42.4089700" lon="-71.1149120"><ele>16.2</ele></trkpt>
   <trkpt lat="42.4089570" lon="-71.1149230"></trkpt>
  </trkseg>
  <trkseg>
   <trkpt lat="42.4088000" lon="-71.1148000"><ele>15.1</ele></trkpt>
  </trkseg>
 </trk>
</gpx>
"""


@pytest.fixture
def namespaced_gpx(tmp_path: Path) -> Path:
    filepath = tmp_path / "namespaced.gpx"
    filepath.write_text(NAMESPACED_GPX)
    return filepath


class TestGpx:
    def test_parse_reads_every_track_and_segment(self, namespaced_gpx: Path) -> None:
        gpx = Gpx.parse(namespaced_gpx)

        assert len(gpx.tracks) == 1
        assert [len(segment.points) for segment in gpx.tracks[0].segments] == [2, 1]

    def test_parse_reads_coordinates(self, namespaced_gpx: Path) -> None:
        point = Gpx.parse(namespaced_gpx).tracks[0].segments[0].points[0]

        assert point.latitude == pytest.approx(42.40897)
        assert point.longitude == pytest.approx(-71.114912)
        assert point.elevation == pytest.approx(16.2)

    def test_parse_defaults_missing_elevation_to_zero(self, namespaced_gpx: Path) -> None:
        """Not every route file carries elevation, and a missing one is not a crash."""
        point = Gpx.parse(namespaced_gpx).tracks[0].segments[0].points[1]

        assert point.elevation == 0.0

    def test_parse_reads_a_real_route(self, load_route: Callable[[str], Gpx]) -> None:
        """Route files are namespaced by whatever exported them, so tags match by suffix."""
        gpx = load_route("fresh-pond")
        points = [point for track in gpx.tracks for segment in track.segments for point in segment.points]

        assert len(points) > 100
        # Fresh Pond is in Cambridge, Massachusetts.
        assert all(42 < point.latitude < 43 for point in points)
        assert all(-72 < point.longitude < -71 for point in points)
