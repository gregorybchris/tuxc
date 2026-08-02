from dataclasses import dataclass
from typing import TYPE_CHECKING, Self
from xml.etree import ElementTree as ET

if TYPE_CHECKING:
    from pathlib import Path


@dataclass
class Point:
    latitude: float
    longitude: float
    elevation: float


@dataclass
class Segment:
    points: list[Point]


@dataclass
class Track:
    segments: list[Segment]


@dataclass
class Gpx:
    tracks: list[Track]

    @classmethod
    def parse(cls, filepath: Path) -> Self:
        xml_gpx = ET.parse(filepath).getroot()
        tracks = []
        for xml_track in cls.find_all(xml_gpx, "trk"):
            segments = []
            for xml_segment in cls.find_all(xml_track, "trkseg"):
                points = []
                for xml_point in cls.find_all(xml_segment, "trkpt"):
                    ele = cls.find(xml_point, "ele")
                    elevation = 0.0
                    if ele is not None and ele.text is not None:
                        elevation = float(ele.text)
                    latitude = float(xml_point.attrib["lat"])
                    longitude = float(xml_point.attrib["lon"])
                    point = Point(latitude=latitude, longitude=longitude, elevation=elevation)
                    points.append(point)
                segment = Segment(points=points)
                segments.append(segment)
            track = Track(segments=segments)
            tracks.append(track)
        return cls(tracks=tracks)

    @classmethod
    def tag_match(cls, element: ET.Element, tag: str) -> bool:
        """Whether an element carries the given tag, ignoring any XML namespace on it."""
        return element.tag.endswith(tag)

    @classmethod
    def find(cls, element: ET.Element, tag: str) -> ET.Element | None:
        for child in element:
            if cls.tag_match(child, tag):
                return child
        return None

    @classmethod
    def find_all(cls, element: ET.Element, tag: str) -> list[ET.Element]:
        return [child for child in element if cls.tag_match(child, tag)]
