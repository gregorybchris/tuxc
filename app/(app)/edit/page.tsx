"use client";

import { useEffect, useRef, useState } from "react";

import { EditForm } from "@/app/components/edit-form";
import { LoadingBox } from "@/app/components/loading-box";
import { Client } from "@/app/lib/clients/client";
import { Run } from "@/app/lib/models/run";

export default function EditPage() {
  const [loading, setLoading] = useState(true);
  const [runs, setRuns] = useState<Run[]>([]);
  const client = useRef(new Client());

  useEffect(() => {
    fetchRuns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchRuns() {
    setLoading(true);
    setRuns([]);
    client.current.getRuns().then((runs) => {
      setRuns(runs);
      setLoading(false);
    });
  }

  return (
    <div className="h-full w-full px-5 py-10 md:px-20 md:py-20">
      <div className="flex w-full flex-col items-center gap-5 md:items-start">
        <div className="flex w-full flex-col items-center text-xl">
          <div className="text-xl font-bold text-black/60">Submit a Run</div>
        </div>
        {loading && (
          <div className="flex w-full flex-col items-center">
            <div className="flex w-full flex-col gap-3 px-2 md:w-[400px] md:px-2">
              <LoadingBox className="h-12 w-full" />
              <LoadingBox className="h-40 w-full" />
            </div>
          </div>
        )}

        {!loading && (
          <div className="flex w-full flex-col items-center gap-6">
            <div className="w-full md:w-[500px]">
              <div className="text-justify indent-4">
                When you submit a run, site maintainers will review your request
                and update the run archive. If you would like expedite future
                edits you can send an email to{" "}
                <EmailLink email="tuxc.org@gmail.com" /> with your GitHub
                account name to become a site maintainer.
              </div>
            </div>

            <EditForm />
          </div>
        )}
      </div>
    </div>
  );
}

interface EmailLinkProps {
  email: string;
}

function EmailLink({ email }: EmailLinkProps) {
  return (
    <a
      href={`mailto:${email}`}
      className="text-tufts-blue transition-all hover:text-tufts-brown"
    >
      {email}
    </a>
  );
}
