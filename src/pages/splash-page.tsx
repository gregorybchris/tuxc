import { FeaturedRoute } from "@/components/featured-route";
import { hasRunMap } from "@/db/maps";
import { getVisibleRuns } from "@/lib/utilities/api-utils";
import { LinkButton } from "@/widgets/link-button";
import { LinkText } from "@/widgets/link-text";
import { Page } from "@/widgets/page";

function getArchiveFacts() {
  const runs = getVisibleRuns().filter((run) => hasRunMap(run.slug));
  const miles = runs.reduce((total, run) => total + run.distance, 0);
  return { count: runs.length, miles: Math.round(miles) };
}

export default function SplashPage() {
  const { count, miles } = getArchiveFacts();

  return (
    <Page className="flex flex-1 flex-col justify-center md:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-5">
          <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-black/80 md:text-5xl">
            TUXC Digital Run Preservation Project
          </h1>

          <p className="max-w-measure text-pretty leading-relaxed text-black/60 md:text-lg">
            <LinkText
              text="Gojumbos"
              href="https://www.gojumbos.com"
              target="_blank"
            />{" "}
            has been an incredible athlete-run homepage for the team for many
            years. Unfortunately, some links to original running routes have
            broken over time. The TUXC Run Preservation Project was started in
            2020 as an initiative to document and preserve the rich history of
            the team&apos;s running routes over the years.
          </p>

          <p className="text-sm text-black/50">
            <span className="font-bold text-black/70">{count} routes</span>{" "}
            mapped · <span className="font-bold text-black/70">{miles} mi</span>{" "}
            of Boston covered
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <LinkButton
              text="Explore the Archive"
              href="/runs"
              iconName="shoe"
              variant="primary"
              className="px-4 py-2.5"
            />
            <LinkButton
              text="Town Lines Map"
              href="/town-lines"
              iconName="map"
              variant="outline"
              className="px-4 py-2.5"
            />
          </div>
        </div>

        <FeaturedRoute />
      </div>
    </Page>
  );
}
