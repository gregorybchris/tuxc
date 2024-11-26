import { useState } from "react";

import { Textbox } from "@/app/widgets/textbox";
import { cn } from "../lib/utilities/style-utils";
import { SubmitButton } from "../widgets/submit-button";

interface EditFormProps {
  className?: string;
}

export function EditForm({ className }: EditFormProps) {
  const [editorNameText, setEditorNameText] = useState("");
  const [runNameText, setRunNameText] = useState("");
  const [distanceText, setDistanceText] = useState("");
  const [mapLinkText, setMapLinkText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [loreText, setLoreText] = useState("");
  const [areaText, setAreaText] = useState("");
  const [firstRunByText, setFirstRunByText] = useState("");
  const [firstRunYearText, setFirstRunYearText] = useState("");
  const [somethingElseText, setSomethingElseText] = useState("");

  return (
    <form action="https://formspree.io/f/mldepjqk" method="POST">
      <div className={cn("flex w-full flex-col gap-3 md:w-[400px]", className)}>
        <Textbox
          name="editorName"
          value={editorNameText}
          onChange={setEditorNameText}
          placeholder="Your full name"
          autoFocus
          // required
        />
        <Textbox
          name="runName"
          value={runNameText}
          onChange={setRunNameText}
          placeholder="Run name"
          autoComplete="false"
          // required
        />
        <Textbox
          name="distance"
          value={distanceText}
          onChange={setDistanceText}
          placeholder="Distance (in miles)"
          autoComplete="false"
          // required
        />
        <Textbox
          name="mapLink"
          value={mapLinkText}
          onChange={setMapLinkText}
          placeholder="Map link (e.g. Strava or onthegomap.com)"
          autoComplete="false"
          // required
        />
        <Textbox
          name="description"
          value={descriptionText}
          onChange={setDescriptionText}
          placeholder="Description (what is the run like)"
          autoComplete="false"
          // required
        />
        <Textbox
          name="lore"
          value={loreText}
          onChange={setLoreText}
          placeholder="Lore"
          autoComplete="false"
          // required
        />
        <Textbox
          name="area"
          value={areaText}
          onChange={setAreaText}
          placeholder="Area (e.g. Medford, Cambridge, Fells)"
          // required
        />
        <Textbox
          name="firstRunBy"
          value={firstRunByText}
          onChange={setFirstRunByText}
          placeholder="Who ran it first? (initials or name)"
        />
        <Textbox
          name="firstRunYear"
          value={firstRunYearText}
          onChange={setFirstRunYearText}
          placeholder="When was the run created? (year or date)"
        />
        <Textbox
          name="other"
          value={somethingElseText}
          onChange={setSomethingElseText}
          placeholder="Anything else?"
          autoComplete="false"
        />
        <div className="flex flex-col items-center">
          <SubmitButton>Submit</SubmitButton>
        </div>
      </div>
    </form>
  );
}
