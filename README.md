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

This is a [Next.js](https://nextjs.org) app using [Tailwind CSS](https://tailwindcss.com) for styles and deployed on a free tier of [Vercel](https://vercel.com). A free tier of [Formspree](https://formspree.io) is used for collecting edits and new run submissions. The email <tuxc.org@gmail.com> is used to collect submissions. The same email was used to create the Formspree account. The Vercel account is owned by [Chris Gregory](mailto:christopher.b.gregory@gmail.com). [GoatCounter](https://www.goatcounter.com) is used for site analytics. Finally, the domain is registered with [GoDaddy](https://www.godaddy.com/) and owned by [Chris Gregory](mailto:christopher.b.gregory@gmail.com).

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

This command will put your converted map file in the [app/db/jpx](app/db/jpx) folder.

> Note: This command also attempts to "simplify" the route by removing collinear points. The route length is reduced by less than 0.01% and the number of points is reduced by 20-40%. This makes the payloads over web requests smaller and decreases load time. You can run the `tuxc test` command to check what the reduction factors are.

### 4. Update runs.json

Add your run details in [runs.json](app/db/runs.json). Try to include as much information as possible and make sure your entry conforms to the schema at [run.ts](app/lib/models/run.ts). Remember to avoid including easily personally identifiable information and prefer initials over real names.

### 5. Update maps.ts

[maps.ts](app/db/maps.ts) contains a list of all runs in the archive. Add your run there and it will get picked up by all API calls from the app frontend to the Next.js API. Try to keep the same structure as existing routes.

## Editing a run

### 1. Update runs.json

Edit run details in [runs.json](app/db/runs.json). Try to include as much information as possible and make sure your entry conforms to the schema at [run.ts](app/lib/models/run.ts). Remember to avoid including easily personally identifiable information and prefer initials over real names.
