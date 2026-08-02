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
          <h1 className="animate-rise text-balance text-3xl font-bold leading-tight tracking-tight text-ink/80 md:text-5xl">
            TUXC Digital Run Preservation Project
          </h1>

          <p className="animate-rise max-w-measure text-pretty leading-relaxed text-ink/60 [animation-delay:90ms] md:text-lg">
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

          <p className="animate-rise text-sm text-ink/50 [animation-delay:180ms]">
            <span className="font-bold text-ink/70">{count} routes</span> mapped
            · <span className="font-bold text-ink/70">{miles} mi</span> of
            Boston covered
          </p>

          <div className="animate-rise flex flex-wrap items-center gap-3 pt-1 [animation-delay:270ms]">
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
