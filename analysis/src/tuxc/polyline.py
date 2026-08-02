from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from collections.abc import Sequence

    from tuxc.coordinate import Coordinate

# Coordinates are rounded to five decimal places, which is about a metre.
PRECISION = 1e5

# Values go over five bits at a time, in ASCII, with the sixth bit set on every
# chunk that is not the last.
CHUNK_BITS = 5
CHUNK_MASK = 0x1F
CONTINUATION = 0x20
ASCII_OFFSET = 63


def encode_value(value: int) -> str:
    """Encode one coordinate delta."""
    remaining = ~(value << 1) if value < 0 else value << 1
    chunks: list[str] = []
    while remaining >= CONTINUATION:
        chunks.append(chr((CONTINUATION | (remaining & CHUNK_MASK)) + ASCII_OFFSET))
        remaining >>= CHUNK_BITS
    chunks.append(chr(remaining + ASCII_OFFSET))
    return "".join(chunks)


def encode_polyline(points: Sequence[Coordinate]) -> str:
    """Pack a route into an encoded polyline.

    Mapbox takes the route to draw in the request URL, and a URL cannot run past
    8192 characters, so coordinates go over as deltas from the point before
    rather than as full numbers.
    """
    encoded: list[str] = []
    previous_latitude = 0
    previous_longitude = 0

    for point in points:
        latitude = round(point.latitude * PRECISION)
        longitude = round(point.longitude * PRECISION)
        encoded.append(encode_value(latitude - previous_latitude))
        encoded.append(encode_value(longitude - previous_longitude))
        previous_latitude = latitude
        previous_longitude = longitude

    return "".join(encoded)
