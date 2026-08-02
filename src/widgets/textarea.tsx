import { cn } from "../lib/utilities/style-utils";

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  id?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
  rows?: number;
  className?: string;
}

/** A Textbox for answers that run longer than a line. */
export function Textarea({
  value,
  onChange,
  onBlur,
  id,
  name,
  placeholder,
  required,
  autoFocus,
  rows = 4,
  className,
}: TextareaProps) {
  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      className={cn(
        "w-full resize-y rounded border border-black/20 px-3 py-2 text-sm leading-relaxed text-black/70 outline-none placeholder:text-black/45 focus-visible:border-black/30 focus-visible:ring-2 focus-visible:ring-tufts-blue/40",
        className,
      )}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur && (() => onBlur())}
      required={required}
      autoFocus={autoFocus}
    />
  );
}
