"use client";

import { useEffect, useRef, useState } from "react";

import { LoadingRunViews } from "@/app/components/loading-run-views";
import { Client } from "@/app/lib/clients/client";
import { Run } from "@/app/lib/models/run";
import { Button } from "@/app/widgets/button";
import { Textbox } from "@/app/widgets/textbox";

export default function EditPage() {
  const [loading, setLoading] = useState(true);
  const [runs, setRuns] = useState<Run[]>([]);
  const client = useRef(new Client());
  const [descriptionText, setDescriptionText] = useState("");
  const [loreText, setLoreText] = useState("");
  const [somethingElseText, setSomethingElseText] = useState("");

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

  function onSubmit() {
    // Do something with the text values
  }

  return (
    <div className="h-full w-full px-5 py-10 md:px-20 md:py-20">
      <div className="flex w-full flex-col items-center gap-5 md:items-start">
        <div className="flex w-full flex-col items-center text-xl">
          <div className="text-xl font-bold text-black/60">Edit</div>
        </div>
        {loading && <LoadingRunViews numLoading={10} />}

        {!loading && (
          <div className="flex w-full flex-col items-center gap-6">
            <div>To edit a run, fill out some or all of the fields below.</div>
            <div className="flex w-full flex-col gap-3 md:w-[400px]">
              <Textbox
                value={descriptionText}
                onChange={setDescriptionText}
                placeholder="Description"
              />
              <Textbox
                value={loreText}
                onChange={setLoreText}
                placeholder="Lore"
              />
              <Textbox
                value={somethingElseText}
                onChange={setSomethingElseText}
                placeholder="Something else?"
              />
              <Button onClick={onSubmit} text="Submit" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
