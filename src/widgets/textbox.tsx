import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { cn } from "../lib/utilities/style-utils";

export type TextboxIcon = "search" | "password";

interface TextboxProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  id?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  clearable?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  type?: string;
  icon?: TextboxIcon;
  className?: string;
}

export function Textbox({
  value,
  onChange,
  onBlur,
  id,
  name,
  placeholder,
  required,
  clearable,
  autoFocus,
  autoComplete,
  type,
  icon,
  className,
}: TextboxProps) {
  const fieldType = type || "text";
  const xVisible = value.length > 0 && clearable !== false;

  return (
    <div
      className={cn("relative flex w-full flex-row items-center", className)}
    >
      {icon === "search" && (
        <div className="absolute left-2.5 text-ink/45">
          <MagnifyingGlass size={16} weight="bold" />
        </div>
      )}
      <input
        id={id}
        name={name}
        type={fieldType}
        className={cn(
          "w-full rounded border border-ink/20 bg-transparent px-3 py-2 text-sm text-ink/70 outline-none placeholder:text-ink/45 focus-visible:border-ink/30 focus-visible:ring-2 focus-visible:ring-accent/40",
          xVisible && "pr-9",
          icon && "pl-8",
        )}
        placeholder={` ${placeholder}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur && (() => onBlur())}
        required={required}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
      />
      <div
        className={cn(
          "visible absolute right-2.5 cursor-pointer rounded-full p-0.5 text-ink/45 transition-all hover:bg-ink/5 md:hidden",
          !xVisible && "hidden",
        )}
        onClick={() => onChange("")}
      >
        <X size={16} weight="bold" />
      </div>
    </div>
  );
}
