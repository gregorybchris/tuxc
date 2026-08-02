import { SubmitRunForm } from "@/components/submit-run-form";
import { LinkText } from "@/widgets/link-text";
import { Page, PageHeader } from "@/widgets/page";

export default function SubmitRunPage() {
  return (
    <Page width="measure" className="flex flex-col gap-8">
      <PageHeader
        title="Submit a Run"
        lede={
          <>
            When you submit a run, site maintainers will review your request and
            update the run archive. If your run is not visible on the site
            within a few days, send an email to{" "}
            <LinkText
              text="tuxc.org@gmail.com"
              href="mailto:tuxc.org@gmail.com"
            />
            .
          </>
        }
      />

      <SubmitRunForm />
    </Page>
  );
}
