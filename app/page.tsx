import { LinkButton } from "./widgets/link-button";

export default function SplashPage() {
  return (
    <div className="h-full w-full px-5 py-20 md:px-20 md:py-28">
      <div className="flex flex-col items-center justify-center gap-6">
        <span className="text-xl">Tufts University Cross Country</span>

        <span>
          tuxc.org is the athlete-run home for cross country at Tufts. The site
          is not affiliated with the university.
        </span>

        <LinkButton
          text="Run Preservation Project"
          href="/runs"
          iconName="shoe"
        />
      </div>
    </div>
  );
}
