.PHONY: lint format typecheck test

lint:
	uv run ruff check .
	uv run ruff format . --check

format:
	uv run ruff format .
	uv run ruff check . --fix

typecheck:
	uv run ty check

test:
	uv run pytest tests
