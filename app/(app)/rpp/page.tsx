import { LinkButton } from "@/app/widgets/link-button";

export default function RppPage() {
  return (
    <div className="flex flex-row justify-center gap-10 px-5 py-20 md:px-32">
      <div className="flex flex-col items-center justify-center gap-10">
        <span className="text-xl">TUXC Run Preservation Project</span>
        <span>
          Welcome to the RPP! A collection of runs created in April 2020 by TW
          and added to every year since. Anyone can add a run as long as
          it&apos;s repeatable, well mapped, and there is some sort of reason to
          do it. Before adding a run, think &quot;Would I do this run
          again?&quot; if the answer is yes, run it up. Make sure to fill out
          every column if possible. All names must be initials when talking
          about lore etc. Go Jumbos Go RPP let&apos;s record some runs!
        </span>
        <LinkButton text="Runs" href="/runs" iconName="runs" />
      </div>
    </div>
  );
}
