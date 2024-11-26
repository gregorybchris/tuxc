import * as Select from "@radix-ui/react-select";

import { CaretDown, CaretUp, Check } from "@phosphor-icons/react";
import { ReactNode } from "react";

import { cn } from "../lib/utilities/style-utils";

interface SortDropdownProps {
  value: string;
  setValue: (value: string) => void;
  choices: string[];
}

export function SortDropdown({ value, setValue, choices }: SortDropdownProps) {
  return (
    <Select.Root value={value} onValueChange={setValue}>
      <Select.Trigger className="text-near-white data-[placeholder]:text-near-white inline-flex h-9 items-center justify-center gap-2 rounded px-4 text-sm leading-none outline-none transition-all focus:shadow-black">
        <Select.Value placeholder={value} />

        <Select.Icon className="text-near-white">
          <CaretDown size={16} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-md bg-black/5">
          <Select.ScrollUpButton className="flex h-6 cursor-default items-center justify-center bg-white text-black/20">
            <CaretUp size={16} />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-1">
            <Select.Group>
              {choices.map((choice) => (
                <SelectItem key={choice} value={choice} disabled={false}>
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
        "relative flex h-6 select-none items-center rounded pl-6 pr-9 font-manrope text-sm leading-none text-black/90 data-[disabled]:pointer-events-none data-[highlighted]:bg-tufts-blue data-[disabled]:text-stone-800 data-[highlighted]:text-white data-[highlighted]:outline-none",
        className,
      )}
      value={value}
      disabled={disabled ?? false}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 inline-flex w-6 items-center justify-center">
        <Check size={16} />
      </Select.ItemIndicator>
    </Select.Item>
  );
}
