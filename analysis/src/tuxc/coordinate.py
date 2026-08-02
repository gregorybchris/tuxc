from typing import Protocol


class Coordinate(Protocol):
    """Anything that knows where it is on the map.

    A point read out of a GPX file and a point stored in a JPX file are separate
    types with separate jobs, but the geometry does not care which it is handed.
    """

    latitude: float
    longitude: float
