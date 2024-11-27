import { LinkButton } from "@/app/widgets/link-button";
import { LinkText } from "@/app/widgets/link-text";

export default function RppPage() {
  return (
    <div className="flex flex-row justify-center gap-10 px-5 py-14 md:px-[20%] md:py-20">
      <div className="flex flex-col items-center justify-center gap-7">
        <div className="text-xl font-bold text-black/60">About the Project</div>
        <span className="text-justify indent-4">
          Welcome to the Run Preservation Project! This initiative was started
          in 2020 by TW with the goal of ensuring the preservation of our
          team&apos;s running routes. New runs have been added to the RPP
          archive each year since. Anyone can add a run as long as it&apos;s
          repeatable, well mapped, and there is some sort of reason to do it.
          Before adding a run, think &quot;Would I do this run again?&quot; if
          the answer is yes, <LinkText href="/edit" text="run it up" />. All
          names must be initials when talking about lore etc. Go Jumbos Go RPP
          let&apos;s record some runs!
        </span>
        <LinkButton text="View all runs" href="/runs" iconName="shoe" />
        <span className="text-justify indent-4">
          This site cannot function without volunteers to review run submissions
          and edits. If you want to volunteer to help out please shoot an email
          to{" "}
          <LinkText
            text="tuxc.org@gmail.com"
            href={`mailto:tuxc.org@gmail.com`}
          />
          . You will need to create GitHub account to make edits, but you do not
          need to know how to code. Bug reports and feature requests can either
          be filed on the{" "}
          <LinkText
            text="GitHub repository"
            href="https://github.com/gregorybchris/tuxc"
            target="_blank"
          />{" "}
          or by sending an email to{" "}
          <LinkText
            text="tuxc.org@gmail.com"
            href={`mailto:tuxc.org@gmail.com`}
          />
          . If you have any questions about the project, feel free to reach out!
        </span>
      </div>
    </div>
  );
}
