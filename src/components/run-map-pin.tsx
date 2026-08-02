import { PIN_PATH } from "../lib/utilities/pin-utils";

interface PinProps {
  color?: string;
  size?: number;
}

export function Pin({ color = "#DD0000", size = 20 }: PinProps) {
  const pinStyle = {
    fill: color,
    stroke: "none",
  };

  return (
    <svg height={size} viewBox="0 0 24 24" style={pinStyle}>
      <path d={PIN_PATH} />
    </svg>
  );
}
