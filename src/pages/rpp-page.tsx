import { LinkButton } from "@/widgets/link-button";
import { LinkText } from "@/widgets/link-text";
import { Page, PageHeader, Section } from "@/widgets/page";

export default function RppPage() {
  return (
    <Page width="measure" className="flex flex-col gap-10">
      <PageHeader title="About the Project" />

      <Section>
        <p className="leading-relaxed text-ink/70">
          Welcome to the Run Preservation Project! This initiative was started
          in 2020 by TW with the goal of ensuring the preservation of our
          team&apos;s running routes. New runs have been added to the RPP
          archive each year since. Anyone can add a run as long as it&apos;s
          repeatable, well mapped, and there is some sort of reason to do it.
          Before adding a run, think &quot;Would I do this run again?&quot; if
          the answer is yes, <LinkText href="/edit" text="run it up" />. All
          names must be initials when talking about lore etc. Go Jumbos Go RPP
          let&apos;s record some runs!
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          <LinkButton
            text="Submit a run"
            href="/edit"
            iconName="pin-plus"
            variant="primary"
            className="px-4 py-2.5"
          />
          <LinkButton
            text="View all runs"
            href="/runs"
            iconName="shoe"
            variant="outline"
            className="px-4 py-2.5"
          />
        </div>
      </Section>

      <Section heading="Helping out">
        <p className="leading-relaxed text-ink/70">
          This site cannot function without volunteers to review run submissions
          and edits. If you want to volunteer to help out please shoot an email
          to{" "}
          <LinkText
            text="tuxc.org@gmail.com"
            href="mailto:tuxc.org@gmail.com"
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
            href="mailto:tuxc.org@gmail.com"
          />
          . If you have any questions about the project, feel free to reach out!
        </p>
      </Section>
    </Page>
  );
}
