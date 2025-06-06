"use client";

import hurdlesImage from "@/app/assets/images/tufts-hurdles.jpg";
import { EditRunForm } from "@/app/components/edit-run-form";
import { Client } from "@/app/lib/clients/client";
import { Run } from "@/app/lib/models/run";
import { LinkText } from "@/app/widgets/link-text";
import { LoadingBox } from "@/app/widgets/loading-box";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function EditRunPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [currentRun, setCurrentRun] = useState<Run>();
  const client = useRef(new Client());

  useEffect(() => {
    fetchRuns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchRuns() {
    const idNumber = parseInt(params.id, 10);
    setLoading(true);
    client.current.getRuns().then((runs) => {
      const run = runs.find((run) => run.id === idNumber);
      if (run) {
        setCurrentRun(run);
      }
      setLoading(false);
    });
  }

  return (
    <div className="h-full w-full px-5 py-10 md:px-20 md:py-12">
      <div className="flex w-full flex-col items-center gap-5 md:items-start">
        <div className="flex w-full flex-col items-center text-xl">
          <div className="text-xl font-bold text-black/60">Edit a Run</div>
        </div>

        {loading && (
          <div className="flex w-full flex-col items-center">
            <div className="flex w-full flex-col gap-3 px-2 md:w-[400px] md:px-2">
              <LoadingBox className="h-12 w-full" />
              <LoadingBox className="h-40 w-full" />
            </div>
          </div>
        )}

        {!loading && !currentRun && (
          <div className="relative flex w-full flex-col items-center justify-center">
            <div className="relative flex w-full flex-row justify-center py-8 text-lg">
              Run not found
            </div>
            <div className="relative h-20 w-full bg-tufts-blue">
              <Image
                src={hurdlesImage}
                fill
                className="object-contain"
                alt="Tufts hurdles"
              />
            </div>
          </div>
        )}

        {!loading && currentRun && (
          <div className="flex w-full flex-col items-center gap-6">
            <div className="w-full md:w-[500px]">
              <div className="pb-5 text-center indent-4">
                You are editing{" "}
                <LinkText
                  text={currentRun.name}
                  href={`/runs/${currentRun.id}`}
                />
              </div>
              <div className="text-justify indent-4">
                When you edit a run, site maintainers will review your request
                and update the run archive. If your edits are not visible on the
                site within a few days, send an email to{" "}
                <LinkText
                  text="tuxc.org@gmail.com"
                  href={`mailto:tuxc.org@gmail.com`}
                />{" "}
                .
              </div>
            </div>

            <EditRunForm run={currentRun} />
          </div>
        )}
      </div>
    </div>
  );
}
