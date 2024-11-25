import { LinkButton } from "./widgets/link-button";

export default function SplashPage() {
  return (
    <div className="h-full w-full px-5 py-20 md:px-20 md:py-28">
      <div className="flex flex-col items-center justify-center gap-6">
        <span className="text-xl">Tufts University Cross Country</span>
        <LinkButton
          text="Run Preservation Project"
          href="/rpp"
          iconName="runner"
        />
      </div>
    </div>
  );
}
