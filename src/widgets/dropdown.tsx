import * as Select from "@radix-ui/react-select";

import { CaretDown, CaretUp, Check } from "@phosphor-icons/react";
import { ReactNode } from "react";

import { cn } from "../lib/utilities/style-utils";

interface DropdownProps {
  value: string;
  setValue: (value: string) => void;
  choices: string[];
  label?: string;
}

export function Dropdown({ value, setValue, choices, label }: DropdownProps) {
  return (
    <Select.Root value={value} onValueChange={setValue}>
      <Select.Trigger
        aria-label={label}
        className="inline-flex h-9 items-center justify-center gap-2 rounded px-1 text-sm leading-none text-black/70 outline-none transition-colors hover:text-black/90 focus-visible:ring-2 focus-visible:ring-tufts-blue"
      >
        <Select.Value />
        <Select.Icon>
          <CaretDown size={16} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        {/* The filter bar this sits in is sticky and stacked, so the menu needs
            to outrank it or it opens behind the page. */}
        <Select.Content
          position="popper"
          sideOffset={6}
          align="end"
          className="z-50 overflow-hidden rounded-md border border-black/10 bg-white shadow-lg"
        >
          <Select.ScrollUpButton className="flex h-6 cursor-default items-center justify-center bg-white text-black/30">
            <CaretUp size={16} />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-1">
            <Select.Group>
              {choices.map((choice) => (
                <SelectItem key={choice} value={choice}>
                  {choice}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>

          <Select.ScrollDownButton className="flex h-6 cursor-default items-center justify-center bg-white text-black/30">
            <CaretDown size={16} />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

interface SelectItemProps {
  children: ReactNode;
  className?: string;
  value: string;
  disabled?: boolean;
}

function SelectItem({
  children,
  className,
  value,
  disabled = false,
}: SelectItemProps) {
  return (
    <Select.Item
      className={cn(
        "relative flex h-8 cursor-pointer select-none items-center rounded pl-7 pr-4 font-manrope text-sm leading-none text-black/80 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-black/5 data-[disabled]:text-black/30 data-[highlighted]:text-black",
        className,
      )}
      value={value}
      disabled={disabled}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-1.5 inline-flex w-4 items-center justify-center">
        <Check size={14} />
      </Select.ItemIndicator>
    </Select.Item>
  );
}
