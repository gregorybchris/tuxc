import re

from tuxc import __version__

SEMVER = re.compile(r"^\d+\.\d+\.\d+")


class TestVersion:
    def test_version_is_readable(self) -> None:
        """The version is read from installed package metadata, so this also proves it installed."""
        assert SEMVER.match(__version__)
