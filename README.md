<div align="center">
    <h1>tuxc.org</h1>
    <p>
        <strong>Tufts cross country run archive</strong>
    </p>
</div>

## About

tuxc.org is not officially affiliated with the university.

This site is not intended as a replacement for [gojumbos.com](https://www.gojumbos.com), which has a ton of team history as well as a [great archive of runs](https://www.gojumbos.com/maps.php). Unfortunately, over time some links to original running routes have broken. This site directly embeds maps and this repository hosts route files in GPX format for safe-keeping.

## Goals

### Maintainability

This project is comprised of a small backend, no external storage, and a relatively simple frontend. Project maintainers should think carefully before adding larger features or tools that might be difficult for future maintainers to learn and develop on.

### Map ownership

Previous route archives have relied on 3rd party mapping providers, which has obvious downsides. This project makes the decision to own the storage and presentation of maps.

### Privacy

This project aims to be respectful of privacy by refraining from publishing lore that could be harmful or hurtful to those involved. Some lore is not even worth posting publicly, but if it is, initials should be used.

### Aesthetics

This site is not going for a bootleg 90's internet look (as cool as that would have been). Updates should strive to be aesthetic and intuitive. Responsiveness and mobile-first design is desired.

## Tech stack

This is a [Vite](https://vitejs.dev) + [React](https://react.dev) single-page app using [Tailwind CSS](https://tailwindcss.com) for styles and deployed on a free tier of [Vercel](https://vercel.com). A free tier of [Formspree](https://formspree.io) is used for collecting edits and new run submissions. The email <tuxc.org@gmail.com> is used to collect submissions. The same email was used to create the Formspree account. The Vercel account is owned by [Chris Gregory](mailto:christopher.b.gregory@gmail.com). [GoatCounter](https://www.goatcounter.com) is used for site analytics. Finally, the domain is registered with [GoDaddy](https://www.godaddy.com/) and owned by [Chris Gregory](mailto:christopher.b.gregory@gmail.com).

## App development

[pnpm](https://pnpm.io/installation) is a requirement for developing on the tuxc.org app.

### 1. Create an environment file with a MapBox API key

You can create an account on [mapbox.com](https://www.mapbox.com) and get your own API key for development. Then create a file called `.env.local` in the root of this repository.

```env
VITE_MAPBOX_TOKEN=<your-key>
```

> Remember to replace `<your-key>` with the key copied from the Mapbox website

### 2. Startup the dev server

```bash
pnpm install
pnpm dev
```

The site should be available at [localhost:5173](http://localhost:5173)

### 3. Run the checks

The app is linted with [ESLint](https://eslint.org), formatted with [Prettier](https://prettier.io), and type checked with `tsc`.

```bash
pnpm lint
pnpm format:check
pnpm typecheck
```

`pnpm format` writes the formatting fixes rather than just reporting them.

The Python package in [analysis](analysis) has the same four checks behind a Makefile, run from that folder.

```bash
cd analysis
make lint
make typecheck
make test
```

### 4. Enable the git hooks (optional)

A pre-commit hook runs the checks for whichever half of the repo you touched, so a broken commit is caught before CI.

```bash
git config core.hooksPath .githooks
```

## Adding a run

### 1. Download the GPX file for your route

If your run is on onthegomap.com you can use the download button to get the GPX file.

If your run is on Strava you can use the Export GPX button.

Name this file with a kebab case name and put it in the [gpx](gpx) folder at the root of the repo.

### 2. Install the tuxc Python package

[uv](https://docs.astral.sh/uv) is a requirement for installing the tuxc Python package.

```bash
cd analysis
uv sync
```

### 3. Convert your GPX file to JSON

Run the `convert` command to convert all GPX files into JSON

```bash
uv run tuxc convert
```

This command will put your converted map file in the [src/db/jpx](src/db/jpx) folder.

> Note: This command also attempts to "simplify" the route by removing collinear points. The route length is reduced by less than 0.01% and the number of points is reduced by 20-40%. This makes the payloads over web requests smaller and decreases load time. You can run the `tuxc benchmark` command to check what the reduction factors are, and pass `--threshold` to either command to trade more length for fewer points.

### 4. Update runs.json

Add your run details in [runs.json](src/db/runs.json). Try to include as much information as possible and make sure your entry conforms to the schema at [run.ts](src/lib/models/run.ts). Remember to avoid including easily personally identifiable information and prefer initials over real names.

Give your run the same `slug` as its GPX and JSON files. That slug is what ties the three together, and it is what appears in the URL: a run with the slug `fresh-pond` lives at `/runs/fresh-pond`.

That is the whole checklist. [maps.ts](src/db/maps.ts) picks up every file in [src/db/jpx](src/db/jpx) automatically, so there is no list of routes to maintain by hand.

## Editing a run

### 1. Update runs.json

Edit run details in [runs.json](src/db/runs.json). Try to include as much information as possible and make sure your entry conforms to the schema at [run.ts](src/lib/models/run.ts). Remember to avoid including easily personally identifiable information and prefer initials over real names.
