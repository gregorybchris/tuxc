import { cn } from "../lib/utilities/style-utils";
import { CommonIcon, IconName } from "../widgets/common-icon";

export type TrailsToggle = "trails" | "no trails" | undefined;

interface TrailsToggleGroupProps {
  value: TrailsToggle;
  onChange: (value: TrailsToggle) => void;
}

export function TrailsToggleGroup({ value, onChange }: TrailsToggleGroupProps) {
  function update(newValue: TrailsToggle) {
    if (newValue === "trails") {
      onChange(newValue == value ? undefined : newValue);
    } else if (newValue === "no trails") {
      onChange(newValue == value ? undefined : newValue);
    } else {
      console.error("Invalid value", newValue);
    }
  }

  return (
    <div className="inline-flex space-x-px rounded">
      <TrailsToggleItem
        onClick={() => update("trails")}
        iconName="tree"
        selected={value === "trails"}
      />
      <TrailsToggleItem
        onClick={() => update("no trails")}
        iconName="road"
        selected={value === "no trails"}
      />
    </div>
  );
}

interface TrailsToggleItemProps {
  onClick: () => void;
  selected: boolean;
  iconName: IconName;
}

export function TrailsToggleItem({
  onClick,
  selected,
  iconName,
}: TrailsToggleItemProps) {
  return (
    <div
      className={cn(
        "flex size-[35px] cursor-pointer items-center justify-center border border-black/10 transition-all first:rounded-l last:rounded-r hover:bg-black/5 focus:z-10 focus:outline-none",
        selected && "bg-black/15 hover:bg-black/20",
      )}
      onClick={onClick}
    >
      <CommonIcon name={iconName} size={16} color="#3172AE" weight="duotone" />
    </div>
  );
}
