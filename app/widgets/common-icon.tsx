"use client";
import {
  IconWeight,
  PersonSimpleRun,
  SneakerMove,
} from "@phosphor-icons/react";

import { HouseLine, QuestionMark } from "@phosphor-icons/react";

export type IconName = "home" | "runner" | "shoe";

interface PageIconProps {
  name: IconName;
  size: number;
  color: string;
  weight: IconWeight;
}

export function CommonIcon({ name, size, color, weight }: PageIconProps) {
  switch (name) {
    case "home": {
      return <HouseLine size={size} color={color} weight={weight} />;
    }
    case "runner": {
      return <PersonSimpleRun size={size} color={color} weight={weight} />;
    }
    case "shoe": {
      return <SneakerMove size={size} color={color} weight={weight} />;
    }
    default: {
      return <QuestionMark size={size} color={color} weight={weight} />;
    }
  }
}
