# ruff: noqa: T201
import logging

import click

logger = logging.getLogger(__name__)


@click.group()
def main() -> None:
    """Run main CLI entrypoint."""


@main.command(name="route")
@click.argument("route_id", type=str)
@click.option("--debug", type=bool, default=False, is_flag=True)
def get_route(route_id: str, debug: bool) -> None:
    """Get route information.

    Args:
        route_id (str): The ID of the route to get information for.
        debug (bool): Whether to enable debug logging.
    """
    if debug:
        logging.basicConfig(level=logging.INFO)

    # TODO: Implement route fetching
    logger.info("Fetching route information for route %s", route_id)
