import { LinkButton } from "./widgets/link-button";

export default function SplashPage() {
  return (
    <div className="h-full w-full px-5 py-10 md:px-[20%] md:py-16">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="text-xl font-bold text-black/60">
          TUXC Digital Run Preservation Project
        </div>

        <span className="text-justify indent-4">
          <a
            className="font-bold text-neutral-600 hover:text-neutral-400"
            href="https://www.gojumbos.com"
            target="_blank"
          >
            Gojumbos
          </a>{" "}
          has been an incredible athlete-run homepage for the team for many
          years. Unfortunately some links to original running routes have broken
          over time. The TUXC Run Preservation Project was started in 2020 as an
          initiative to document and preserve the rich history of the
          team&apos;s running routes over the years.
        </span>

        <LinkButton
          text="Explore the Archive"
          href="/runs"
          iconName="shoe"
          className="px-6"
        />
        <LinkButton
          text="Town Lines Map"
          href="/town-lines"
          iconName="map"
          className="px-6"
        />
      </div>
    </div>
  );
}
