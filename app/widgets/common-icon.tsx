"use client";
import {
  IconWeight,
  PersonSimpleRun,
  SneakerMove,
} from "@phosphor-icons/react";

import { HouseLine, QuestionMark } from "@phosphor-icons/react";

interface PageIconProps {
  name: string;
  size: number;
  color: string;
  weight: IconWeight;
}

export function CommonIcon({ name, size, color, weight }: PageIconProps) {
  switch (name) {
    case "home": {
      return <HouseLine size={size} color={color} weight={weight} />;
    }
    case "rpp": {
      return <PersonSimpleRun size={size} color={color} weight={weight} />;
    }
    case "runs": {
      return <SneakerMove size={size} color={color} weight={weight} />;
    }
    default: {
      return <QuestionMark size={size} color={color} weight={weight} />;
    }
  }
}
