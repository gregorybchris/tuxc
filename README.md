<div align="center">
    <h1>tuxc.org</h1>
    <p>
        <strong>Athlete-run home of Tufts cross country</strong>
    </p>
</div>

## About

tuxc.org is an athlete run site and is not officially affiliated with the university. This site is created and maintained by the athletes of TUXC.

## Tech stack

This is a [Next.js](https://nextjs.org) app using [Tailwind CSS](https://tailwindcss.com) for styles and deployed on a free tier of [Vercel](https://vercel.com). A free tier of [Formspree](https://formspree.io) is used for collecting edits and new run submissions. The email <tuxc.org@gmail.com> is used to collect submissions.

## App development

[pnpm](https://pnpm.io/installation) is a requirement for developing on the tuxc.org app.

```bash
pnpm install
pnpm dev
```

The site should be available at [localhost:3000](http://localhost:3000)

## Adding a run

### 1. Download the GPX file for your route

If your run is on onthegomap.com you can use the download button to get the GPX file.

If your run is on Strava you can use the Export GPX button.

Name this file with a kebab case name and put it in the [gpx](gpx) folder at the root of the repo.

### 2. Install the tuxc Python package

[Poetry](https://python-poetry.org/docs/#installation) is a requirement for installing the tuxc Python package.

```bash
cd analysis
poetry install
```

### 3. Convert your GPX file to JSON

Run the `convert` command to convert all GPX files into JSON

```bash
poetry run tuxc convert
```

This command will put your converted map file in the [app/api/runs/jpx](app/api/runs/jpx) folder.

### 4. Update runs.json

Add your run details in [runs.json](app/api/runs/runs.json). Try to include as much information as possible and make sure your entry conforms to the schema at [run.ts](app/lib/models/run.ts). Remember to avoid including easily personally identifiable information and prefer initials over real names.

### 5. Update maps.ts

[maps.ts](app/api/runs/maps.ts) contains a list of all runs in the archive. Add your run there and it will get picked up by all API calls from the app frontend to the Next.js API. Try to keep the same structure as existing routes.

## Editing a run

### 1. Update runs.json

Edit run details in [runs.json](app/api/runs/runs.json). Try to include as much information as possible and make sure your entry conforms to the schema at [run.ts](app/lib/models/run.ts). Remember to avoid including easily personally identifiable information and prefer initials over real names.
