"use client";
import {
  ArrowArcLeft,
  BookOpenText,
  CalendarPlus,
  GlobeHemisphereWest,
  IconWeight,
  PersonSimpleRun,
  SneakerMove,
  TextAa,
} from "@phosphor-icons/react";

import { HouseLine, QuestionMark } from "@phosphor-icons/react";
import { Ruler } from "@phosphor-icons/react/dist/ssr";

export type IconName =
  | "home"
  | "runner"
  | "shoe"
  | "back"
  | "ruler"
  | "globe"
  | "book"
  | "calendar-plus"
  | "letters";

interface CommonIconProps {
  name: IconName;
  size: number;
  color: string;
  weight: IconWeight;
  className?: string;
}

export function CommonIcon({
  name,
  size,
  color,
  weight,
  className,
}: CommonIconProps) {
  const props = { size, color, weight, className };
  switch (name) {
    case "home": {
      return <HouseLine {...props} />;
    }
    case "runner": {
      return <PersonSimpleRun {...props} />;
    }
    case "shoe": {
      return <SneakerMove {...props} />;
    }
    case "back": {
      return <ArrowArcLeft {...props} />;
    }
    case "ruler": {
      return <Ruler {...props} />;
    }
    case "globe": {
      return <GlobeHemisphereWest {...props} />;
    }
    case "book": {
      return <BookOpenText {...props} />;
    }
    case "calendar-plus": {
      return <CalendarPlus {...props} />;
    }
    case "letters": {
      return <TextAa {...props} />;
    }
    default: {
      return <QuestionMark {...props} />;
    }
  }
}
