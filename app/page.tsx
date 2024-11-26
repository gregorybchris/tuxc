import { LinkButton } from "./widgets/link-button";

export default function SplashPage() {
  return (
    <div className="h-full w-full px-5 py-10 md:px-20 md:py-16">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="text-xl font-bold text-black/60">
          Tufts University Cross Country
        </div>

        <span>
          tuxc.org is an athlete-run site for cross country at Tufts. Currently
          this site is just the home of the TUXC Run Preservation Project, an
          initiative to document and preserve the history of running routes on
          the team over the years. Click the link below to explore the archive.
        </span>

        <LinkButton
          text="Run Preservation Project"
          href="/runs"
          iconName="shoe"
          className="px-6"
        />
      </div>
    </div>
  );
}
