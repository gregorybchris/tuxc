import { useState } from "react";

import { Textbox } from "@/app/widgets/textbox";
import { Run } from "../lib/models/run";
import { cn } from "../lib/utilities/style-utils";
import { SubmitButton } from "../widgets/submit-button";

interface RunFormProps {
  run: Run;
  className?: string;
}

export function EditRunForm({ run, className }: RunFormProps) {
  const [editorNameText, setEditorNameText] = useState("");
  const [editorEmailText, setEditorEmailText] = useState("");
  const [messageText, setMessageText] = useState("");

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
        name="message"
        value={messageText}
        onChange={setMessageText}
        placeholder="Describe what you want to edit"
        autoComplete="false"
        required
      />
      <Textbox
        name="runId"
        value={`${run.id}`}
        onChange={() => {}}
        className="hidden"
      />
      <Textbox
        name="runName"
        value={run.name}
        onChange={() => {}}
        className="hidden"
      />
      <div className="flex flex-col items-center">
        <SubmitButton>Submit</SubmitButton>
      </div>
    </form>
  );
}
