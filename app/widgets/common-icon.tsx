"use client";
import {
  ArrowArcLeft,
  ArrowRight,
  BookOpenText,
  CalendarPlus,
  Envelope,
  GithubLogo,
  GlobeHemisphereWest,
  IconWeight,
  Info,
  MapPinPlus,
  MapTrifold,
  Medal,
  Pencil,
  PersonSimpleRun,
  RoadHorizon,
  SneakerMove,
  SquaresFour,
  Star,
  TextAa,
  Tree,
  UserPlus,
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
  | "letters"
  | "medal"
  | "info"
  | "user-plus"
  | "pencil"
  | "tree"
  | "road"
  | "pin-plus"
  | "github"
  | "mail"
  | "map"
  | "grid"
  | "star"
  | "next";

interface CommonIconProps {
  name: IconName;
  size: number;
  color: string;
  weight?: IconWeight;
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
    case "medal": {
      return <Medal {...props} />;
    }
    case "info": {
      return <Info {...props} />;
    }
    case "user-plus": {
      return <UserPlus {...props} />;
    }
    case "pencil": {
      return <Pencil {...props} />;
    }
    case "tree": {
      return <Tree {...props} />;
    }
    case "road": {
      return <RoadHorizon {...props} />;
    }
    case "pin-plus": {
      return <MapPinPlus {...props} />;
    }
    case "github": {
      return <GithubLogo {...props} />;
    }
    case "mail": {
      return <Envelope {...props} />;
    }
    case "map": {
      return <MapTrifold {...props} />;
    }
    case "grid": {
      return <SquaresFour {...props} />;
    }
    case "star": {
      return <Star {...props} />;
    }
    case "next": {
      return <ArrowRight {...props} />;
    }
    default: {
      return <QuestionMark {...props} />;
    }
  }
}
