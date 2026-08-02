import { cn } from "../lib/utilities/style-utils";
import { CommonIcon, IconName } from "./common-icon";
import {
  BUTTON_BASE,
  ButtonVariant,
  VARIANT_CLASSES,
  VARIANT_ICON_CLASSES,
} from "./button-styles";

type ButtonTypes = "button" | "submit" | "reset";

interface ButtonProps {
  text: string;
  type?: ButtonTypes;
  onClick?: () => void;
  iconName?: IconName;
  /** Puts the icon after the text, for anything that moves you forward. */
  iconSide?: "left" | "right";
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
}

export function Button({
  text,
  type,
  onClick,
  iconName,
  iconSide = "left",
  variant = "quiet",
  disabled,
  className,
}: ButtonProps) {
  const icon = iconName && (
    <CommonIcon
      name={iconName}
      size={16}
      className={VARIANT_ICON_CLASSES[variant]}
      weight="duotone"
    />
  );

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(
        BUTTON_BASE,
        VARIANT_CLASSES[variant],
        "cursor-pointer disabled:pointer-events-none disabled:opacity-40",
        className,
      )}
    >
      {iconSide === "left" && icon}
      <span>{text}</span>
      {iconSide === "right" && icon}
    </button>
  );
}
