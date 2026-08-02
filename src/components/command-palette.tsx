import { hasRunMap } from "@/db/maps";
import { Run } from "@/lib/models/run";
import { getVisibleRuns } from "@/lib/utilities/api-utils";
import { getRunsByName } from "@/lib/utilities/sort-utils";
import { CommonIcon, IconName } from "@/widgets/common-icon";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Command } from "cmdk";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Destination {
  text: string;
  href: string;
  iconName: IconName;
}

const PAGES: Destination[] = [
  { text: "Home", href: "/", iconName: "home" },
  { text: "Runs", href: "/runs", iconName: "shoe" },
  { text: "Heatmap", href: "/runs/map", iconName: "map" },
  { text: "Town Lines", href: "/town-lines", iconName: "globe" },
  { text: "About", href: "/rpp", iconName: "info" },
  { text: "Submit a Run", href: "/edit", iconName: "pin-plus" },
];

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Search the whole archive from anywhere, with ⌘K.
 *
 * Every run is in here by name and area, alongside the handful of pages, so
 * getting to a route never costs more than a few keystrokes.
 */
export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Alphabetical, so an unfiltered list is something you can actually scan.
  const runs = useMemo(
    () => getRunsByName(getVisibleRuns().filter((run) => hasRunMap(run.slug))),
    [],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "k" && event.key !== "K") return;
      if (!event.metaKey && !event.ctrlKey) return;
      event.preventDefault();
      onOpenChange(!open);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  // A stale query would filter the next visit before the reader has typed.
  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  function go(href: string) {
    onOpenChange(false);
    navigate(href);
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Search the archive"
      shouldFilter
      overlayClassName="fixed inset-0 z-40 bg-black/40"
      contentClassName="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-measure -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-white shadow-xl focus:outline-none"
    >
      <div className="flex flex-row items-center gap-2 border-b border-black/10 px-4">
        <MagnifyingGlass size={18} color="#3172AE" weight="bold" />
        <Command.Input
          value={search}
          onValueChange={setSearch}
          placeholder="Search runs and pages"
          className="h-12 w-full bg-transparent text-sm text-black/80 outline-none placeholder:text-black/45"
        />
        <kbd className="hidden rounded border border-black/15 px-1.5 py-0.5 text-[11px] text-black/40 sm:block">
          esc
        </kbd>
      </div>

      <Command.List className="max-h-[min(24rem,60vh)] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-8 text-center text-sm text-black/50">
          Nothing matches that.
        </Command.Empty>

        <Command.Group heading="Pages" className={GROUP_CLASS}>
          {PAGES.map((page) => (
            <Command.Item
              key={page.href}
              value={`${page.text} ${page.href}`}
              onSelect={() => go(page.href)}
              className={ITEM_CLASS}
            >
              <CommonIcon
                name={page.iconName}
                size={16}
                color="#3172AE"
                weight="duotone"
              />
              <span className="text-black/80">{page.text}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Runs" className={GROUP_CLASS}>
          {runs.map((run) => (
            <RunItem
              key={run.id}
              run={run}
              onSelect={() => go(`/runs/${run.slug}`)}
            />
          ))}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}

const GROUP_CLASS =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.14em] [&_[cmdk-group-heading]]:text-black/40";

const ITEM_CLASS =
  "flex cursor-pointer flex-row items-center gap-3 rounded px-3 py-2 text-sm data-[selected=true]:bg-black/5";

interface RunItemProps {
  run: Run;
  onSelect: () => void;
}

function RunItem({ run, onSelect }: RunItemProps) {
  return (
    <Command.Item
      // Searchable by everything shown, so "fells" or "medford" both land.
      value={`${run.name} ${run.area} ${run.distance} mi`}
      onSelect={onSelect}
      className={ITEM_CLASS}
    >
      <CommonIcon name="shoe" size={16} color="#3172AE" weight="duotone" />
      <span className="min-w-0 flex-1 truncate text-black/80">{run.name}</span>
      {/* Capped, so a route that crosses six towns does not squeeze its name. */}
      <span className="hidden min-w-0 max-w-[40%] truncate text-xs text-black/40 sm:block">
        {run.area}
      </span>
      <span className="shrink-0 text-xs text-black/50">{run.distance} mi</span>
    </Command.Item>
  );
}
