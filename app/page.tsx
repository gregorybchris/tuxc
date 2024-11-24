import { LinkButton } from "./widgets/link-button";

export default function SplashPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-10">
        <span>Tufts University Cross Country</span>
        <LinkButton
          text="Run Preservation Project"
          href="/rpp"
          iconName="rpp"
        />
      </div>
    </div>
  );
}
