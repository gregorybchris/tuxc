import { EditRunForm } from "@/components/edit-run-form";
import { Client } from "@/lib/clients/client";
import { Run } from "@/lib/models/run";
import { LinkButton } from "@/widgets/link-button";
import { LinkText } from "@/widgets/link-text";
import { LoadingBox } from "@/widgets/loading-box";
import { Page, PageHeader } from "@/widgets/page";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditRunPage() {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [currentRun, setCurrentRun] = useState<Run>();
  const client = useRef(new Client());

  useEffect(() => {
    setLoading(true);
    client.current.findRun(slug ?? "").then((run) => {
      setCurrentRun(run);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <Page width="measure" className="flex flex-col gap-5">
        <LoadingBox className="h-8 w-2/3 max-w-xs" />
        <LoadingBox className="h-16 w-full" />
        <LoadingBox className="h-64 w-full" />
      </Page>
    );
  }

  if (!currentRun) {
    return (
      <Page
        width="measure"
        className="flex flex-col items-center gap-5 py-24 text-center"
      >
        <h1 className="text-2xl font-bold tracking-tight text-black/80">
          That route is not in the archive
        </h1>
        <p className="text-black/60">
          You can only edit a run that has already been mapped.
        </p>
        <LinkButton
          text="Browse all runs"
          href="/runs"
          iconName="shoe"
          variant="primary"
          className="px-4 py-2.5"
        />
      </Page>
    );
  }

  return (
    <Page width="measure" className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Edit a Run"
        title={currentRun.name}
        lede={
          <>
            When you edit{" "}
            <LinkText
              text={currentRun.name}
              href={`/runs/${currentRun.slug}`}
            />
            , site maintainers will review your request and update the run
            archive. If your edits are not visible on the site within a few
            days, send an email to{" "}
            <LinkText
              text="tuxc.org@gmail.com"
              href="mailto:tuxc.org@gmail.com"
            />
            .
          </>
        }
      />

      <EditRunForm run={currentRun} />
    </Page>
  );
}
