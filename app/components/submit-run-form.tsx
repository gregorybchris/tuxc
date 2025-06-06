import { useState } from "react";

import { Textbox } from "@/app/widgets/textbox";
import { cn } from "../lib/utilities/style-utils";
import { SubmitButton } from "../widgets/submit-button";

interface RunFormProps {
  className?: string;
}

export function SubmitRunForm({ className }: RunFormProps) {
  const [editorNameText, setEditorNameText] = useState("");
  const [editorEmailText, setEditorEmailText] = useState("");
  const [runNameText, setRunNameText] = useState("");
  const [distanceText, setDistanceText] = useState("");
  const [mapLinkText, setMapLinkText] = useState("");
  const [descriptionText, setDescriptionText] = useState("");
  const [loreText, setLoreText] = useState("");
  const [areaText, setAreaText] = useState("");
  const [trailText, setTrailText] = useState("");
  const [firstRunByText, setFirstRunByText] = useState("");
  const [firstRunYearText, setFirstRunYearText] = useState("");
  const [somethingElseText, setSomethingElseText] = useState("");

  return (
    <form
      action="https://formspree.io/f/mldepjqk"
      method="POST"
      className={cn("flex w-full flex-col gap-3 md:w-[400px]", className)}
    >
      <Textbox
        name="editorName"
        value={editorNameText}
        onChange={setEditorNameText}
        placeholder="Your full name"
        autoFocus
        required
      />
      <Textbox
        name="editorEmail"
        value={editorEmailText}
        onChange={setEditorEmailText}
        placeholder="Your email"
        required
      />
      <Textbox
        name="runName"
        value={runNameText}
        onChange={setRunNameText}
        placeholder="Run name"
        autoComplete="false"
        required
      />
      <Textbox
        name="distance"
        value={distanceText}
        onChange={setDistanceText}
        placeholder="Distance (in miles)"
        autoComplete="false"
        required
      />
      <Textbox
        name="mapLink"
        value={mapLinkText}
        onChange={setMapLinkText}
        placeholder="Map link (e.g. Strava or onthegomap.com)"
        autoComplete="false"
        required
      />
      <Textbox
        name="description"
        value={descriptionText}
        onChange={setDescriptionText}
        placeholder="Description (what is the run like)"
        autoComplete="false"
        required
      />
      <Textbox
        name="lore"
        value={loreText}
        onChange={setLoreText}
        placeholder="Lore"
        autoComplete="false"
      />
      <Textbox
        name="area"
        value={areaText}
        onChange={setAreaText}
        placeholder="Area (e.g. Medford, Cambridge, Fells)"
        required
      />
      <Textbox
        name="trail"
        value={trailText}
        onChange={setTrailText}
        placeholder="Does part of this run happen on a trail? (yes or no)"
        autoComplete="false"
        required
      />
      <Textbox
        name="firstRunBy"
        value={firstRunByText}
        onChange={setFirstRunByText}
        placeholder="Who ran it first? (initials or name) (optional)"
        autoComplete="false"
      />
      <Textbox
        name="firstRunYear"
        value={firstRunYearText}
        onChange={setFirstRunYearText}
        placeholder="When was the run created? (year or date) (optional)"
        autoComplete="false"
      />
      <Textbox
        name="other"
        value={somethingElseText}
        onChange={setSomethingElseText}
        placeholder="Anything else? (optional)"
        autoComplete="false"
      />
      <div className="flex flex-col items-center">
        <SubmitButton>Submit</SubmitButton>
      </div>
    </form>
  );
}
