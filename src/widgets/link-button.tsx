import { Link } from "react-router-dom";
import { cn } from "../lib/utilities/style-utils";
import {
  BUTTON_BASE,
  ButtonVariant,
  VARIANT_CLASSES,
  VARIANT_ICON_COLORS,
} from "./button-styles";
import { CommonIcon, IconName } from "./common-icon";

interface LinkButtonProps {
  text: string;
  href: string;
  iconName?: IconName;
  variant?: ButtonVariant;
  target?: string;
  className?: string;
}

export function LinkButton({
  text,
  href,
  iconName,
  variant = "quiet",
  target,
  className,
}: LinkButtonProps) {
  return (
    <Link
      to={href}
      target={target}
      className={cn(BUTTON_BASE, VARIANT_CLASSES[variant], className)}
    >
      {iconName && (
        <CommonIcon
          name={iconName}
          size={16}
          color={VARIANT_ICON_COLORS[variant]}
          weight="duotone"
        />
      )}
      <span>{text}</span>
    </Link>
  );
}
