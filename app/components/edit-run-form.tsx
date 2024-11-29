import { useState } from "react";

import { Textbox } from "@/app/widgets/textbox";
import { cn } from "../lib/utilities/style-utils";
import { SubmitButton } from "../widgets/submit-button";

interface RunFormProps {
  editMode: boolean;
  className?: string;
}

export function EditRunForm({ editMode, className }: RunFormProps) {
  const [editorNameText, setEditorNameText] = useState("");
  const [editorEmailText, setEditorEmailText] = useState("");
  const [messageText, setMessageText] = useState("");

  const required = !editMode;

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
        required={required}
      />
      <Textbox
        name="editorEmail"
        value={editorEmailText}
        onChange={setEditorEmailText}
        placeholder="Your email"
      />
      <Textbox
        name="message"
        value={messageText}
        onChange={setMessageText}
        placeholder="Describe what you want to edit"
        autoComplete="false"
      />
      <div className="flex flex-col items-center">
        <SubmitButton>Submit</SubmitButton>
      </div>
    </form>
  );
}
