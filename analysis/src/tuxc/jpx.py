from typing import TYPE_CHECKING

from pydantic import BaseModel

if TYPE_CHECKING:
    from pathlib import Path


class Point(BaseModel):
    latitude: float
    longitude: float
    elevation: float


class Jpx(BaseModel):
    points: list[Point]

    def to_file(self, filepath: Path) -> None:
        with filepath.open("w") as fp:
            jpx_json = self.model_dump_json(indent=2)
            fp.write(jpx_json)
