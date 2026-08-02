from tuxc.jpx import Point
from tuxc.polyline import encode_polyline, encode_value


def make_points(coords: list[tuple[float, float]]) -> list[Point]:
    """Build a route from (latitude, longitude) pairs."""
    return [Point(latitude=latitude, longitude=longitude, elevation=0.0) for latitude, longitude in coords]


class TestEncodeValue:
    def test_encode_value_of_zero_is_one_character(self) -> None:
        assert encode_value(0) == "?"

    def test_encode_value_encodes_a_step_forwards(self) -> None:
        """A latitude of 38.5, from the worked example for the format."""
        assert encode_value(3850000) == "_p~iF"

    def test_encode_value_encodes_a_step_backwards(self) -> None:
        """A longitude of -120.2, from the same example."""
        assert encode_value(-12020000) == "~ps|U"


class TestEncodePolyline:
    def test_encode_polyline_of_no_points_is_empty(self) -> None:
        assert encode_polyline([]) == ""

    def test_encode_polyline_encodes_the_worked_example(self) -> None:
        """The three points the format's own documentation encodes."""
        points = make_points([(38.5, -120.2), (40.7, -120.95), (43.252, -126.453)])

        assert encode_polyline(points) == "_p~iF~ps|U_ulLnnqC_mqNvxq`@"

    def test_encode_polyline_sends_each_point_as_a_step_from_the_last(self) -> None:
        """A route that goes nowhere costs nothing after its first point."""
        repeated = make_points([(42.4, -71.1)] * 3)
        once = make_points([(42.4, -71.1)])

        assert encode_polyline(repeated) == encode_polyline(once) + "??" * 2

    def test_encode_polyline_grows_with_the_route(self) -> None:
        short = make_points([(42.0, -71.0), (42.1, -71.0)])
        long = make_points([(42.0, -71.0), (42.1, -71.0), (42.2, -71.0)])

        assert len(encode_polyline(long)) > len(encode_polyline(short))
