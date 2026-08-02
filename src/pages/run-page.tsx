import { EditRunDialog } from "@/components/edit-run-dialog";
import { RunMapView } from "@/components/run-map-view";
import { Client } from "@/lib/clients/client";
import { useFavorites } from "@/lib/hooks/favorites-storage";
import { Run } from "@/lib/models/run";
import { RunMap } from "@/lib/models/runMap";
import { getGpxUrl } from "@/lib/utilities/gpx-utils";
import { cn } from "@/lib/utilities/style-utils";
import { Button } from "@/widgets/button";
import { CommonIcon, IconName } from "@/widgets/common-icon";
import { FavoriteStar } from "@/widgets/favorite-star";
import { InitialsBadge } from "@/widgets/initials";
import { LinkButton } from "@/widgets/link-button";
import { LoadingBox } from "@/widgets/loading-box";
import { Page } from "@/widgets/page";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function RunPage() {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [run, setRun] = useState<Run>();
  const [runMap, setRunMap] = useState<RunMap>();
  const [editOpen, setEditOpen] = useState(false);
  const [favorites, saveFavorites] = useFavorites();
  const navigate = useNavigate();
  const client = useRef(new Client());

  useEffect(() => {
    setLoading(true);
    setRun(undefined);
    setRunMap(undefined);

    client.current.findRun(slug ?? "").then((found) => {
      if (!found) {
        setLoading(false);
        return;
      }
      // An old link carrying the numeric id: swap the address for the slug.
      if (found.slug !== slug) {
        navigate(`/runs/${found.slug}`, { replace: true });
        return;
      }
      setRun(found);
      client.current
        .getRunMap(found.slug)
        .then((runMap) => setRunMap(runMap))
        .finally(() => setLoading(false));
    });
  }, [slug, navigate]);

  const onStepRun = useCallback(
    (step: number) => {
      if (!run) return;
      client.current.getRuns().then((runs) => {
        const index = runs.findIndex((r) => r.slug === run.slug);
        const nextIndex = (index + step + runs.length) % runs.length;
        navigate(`/runs/${runs[nextIndex].slug}`);
      });
    },
    [run, navigate],
  );

  // Arrow keys walk the archive, the same as the Previous and Next buttons.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      // Not while the reader is typing, or while the edit dialog has the page.
      if (editOpen) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable=true]")) {
        return;
      }
      event.preventDefault();
      onStepRun(event.key === "ArrowRight" ? 1 : -1);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onStepRun, editOpen]);

  const isFavorite = run
    ? favorites.some((favorite) => favorite.id === run.id)
    : false;

  if (loading) {
    return (
      <Page className="flex flex-col gap-6">
        <LoadingBox className="h-4 w-24" />
        <LoadingBox className="h-8 w-2/3 max-w-sm" />
        <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
          <LoadingBox className="h-[24rem] w-full lg:h-[34rem]" />
          <LoadingBox className="h-64 w-full" />
        </div>
      </Page>
    );
  }

  if (!run || !runMap) {
    return (
      <Page
        width="measure"
        className="flex flex-col items-center gap-5 py-24 text-center"
      >
        <h1 className="text-2xl font-bold tracking-tight text-ink/80">
          That route is not in the archive
        </h1>
        <p className="text-ink/60">
          The link may be old, or the run may not have been mapped yet.
        </p>
        <LinkButton
          text="Browse all runs"
          href="/runs"
          iconName="shoe"
          variant="primary"
          className="px-4 py-2.5"
        />
      </Page>
    );
  }

  return (
    <Page className="flex flex-col gap-5">
      <LinkButton
        text="All runs"
        href="/runs"
        iconName="back"
        className="-ml-3 self-start"
      />

      <div className="flex flex-col gap-4 border-b border-ink/10 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-row items-center gap-1">
          <h1 className="text-balance text-2xl font-bold tracking-tight text-ink/80 md:text-3xl">
            {run.name}
          </h1>
          <FavoriteStar
            isFavorite={isFavorite}
            size={20}
            onToggle={() =>
              saveFavorites(
                isFavorite
                  ? favorites.filter((favorite) => favorite.id !== run.id)
                  : [...favorites, { id: run.id }],
              )
            }
          />
        </div>

        <div className="flex shrink-0 flex-row items-center gap-1">
          <Button
            text="Previous"
            iconName="back"
            onClick={() => onStepRun(-1)}
          />
          <Button
            text="Next"
            iconName="next"
            iconSide="right"
            onClick={() => onStepRun(1)}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:gap-8">
        <div className="h-[24rem] w-full overflow-hidden rounded-xl border border-ink/10 sm:h-[28rem] lg:h-[34rem]">
          <RunMapView runMap={runMap} />
        </div>

        <RunFacts run={run} editOpen={editOpen} setEditOpen={setEditOpen} />
      </div>
    </Page>
  );
}

// The three things you can do with a run, all reading as one list.
const ACTION_CLASS =
  "flex flex-row items-center gap-2 rounded text-accent outline-none transition-colors hover:text-link-hover focus-visible:ring-2 focus-visible:ring-accent";

function ActionIcon({ name }: { name: IconName }) {
  return (
    <CommonIcon
      name={name}
      className="shrink-0 text-accent"
      size={16}
      weight="duotone"
    />
  );
}

interface RunFactsProps {
  run: Run;
  editOpen: boolean;
  setEditOpen: (open: boolean) => void;
}

function RunFacts({ run, editOpen, setEditOpen }: RunFactsProps) {
  const gpxUrl = getGpxUrl(run.slug);

  return (
    <aside className="flex h-fit flex-col gap-4 rounded-xl border border-ink/10 p-5">
      <dl className="flex flex-col gap-3">
        <Fact iconName="ruler" term="Distance">
          <span className="rounded-md bg-chip px-2 py-0.5 text-sm text-chip-ink">
            {run.distance} mi
          </span>
        </Fact>

        <Fact iconName="globe" term="Area">
          {run.area}
        </Fact>

        <Fact iconName={run.includesTrail ? "tree" : "road"} term="Surface">
          {run.includesTrail ? "Includes trail" : "Road only"}
        </Fact>

        <Fact iconName="calendar-plus" term="First run">
          {run.firstRunYear ?? "Year unknown"}
        </Fact>

        {run.firstRunBy && (
          <Fact iconName="medal" term="First run by">
            <InitialsList initialsList={run.firstRunBy} />
          </Fact>
        )}

        {run.editors && (
          <Fact iconName="user-plus" term="Editors">
            <InitialsList initialsList={run.editors} />
          </Fact>
        )}
      </dl>

      {run.description && (
        <Note iconName="letters" heading="Description">
          {run.description}
        </Note>
      )}

      {run.lore && (
        <Note iconName="book" heading="Lore">
          {run.lore}
        </Note>
      )}

      <div className="flex flex-col items-start gap-2 border-t border-ink/10 pt-4 text-sm">
        {run.mapLink && (
          <a href={run.mapLink} target="_blank" className={ACTION_CLASS}>
            <ActionIcon name="map" />
            Original map
          </a>
        )}

        {gpxUrl && (
          // A plain anchor rather than LinkText: this points at a file, so it
          // must not be handled as an in-app route.
          <a
            href={gpxUrl}
            download={`${run.slug}.gpx`}
            className={ACTION_CLASS}
          >
            <ActionIcon name="download" />
            Download GPX
          </a>
        )}

        <EditRunDialog run={run} open={editOpen} onOpenChange={setEditOpen}>
          <button type="button" className={ACTION_CLASS}>
            <ActionIcon name="pencil" />
            Suggest an edit
          </button>
        </EditRunDialog>
      </div>
    </aside>
  );
}

interface NoteProps {
  heading: string;
  iconName: IconName;
  children: React.ReactNode;
}

/** A paragraph of writing about the run, sitting under the facts it belongs to. */
function Note({ heading, iconName, children }: NoteProps) {
  return (
    <div className="flex flex-col gap-1.5 border-t border-ink/10 pt-4">
      <h2 className="flex flex-row items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ink/40">
        <CommonIcon
          name={iconName}
          className="shrink-0 text-accent"
          size={16}
          weight="duotone"
        />
        {heading}
      </h2>
      <p className="text-sm leading-relaxed text-ink/70">{children}</p>
    </div>
  );
}

interface InitialsListProps {
  initialsList: string[];
}

function InitialsList({ initialsList }: InitialsListProps) {
  return (
    <div className="flex flex-row flex-wrap gap-1">
      {initialsList.map((initials) => (
        <InitialsBadge initials={initials} key={initials} />
      ))}
    </div>
  );
}

interface FactProps {
  term: string;
  iconName: IconName;
  children: React.ReactNode;
  className?: string;
}

function Fact({ term, iconName, children, className }: FactProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[7.5rem_1fr] items-center gap-2 text-sm",
        className,
      )}
    >
      <dt className="flex flex-row items-center gap-2 text-ink/50">
        <CommonIcon
          name={iconName}
          className="shrink-0 text-accent"
          size={16}
          weight="duotone"
        />
        {term}
      </dt>
      <dd className="text-ink/80">{children}</dd>
    </div>
  );
}
