"use client";

import { useEffect, useRef, useState } from "react";

import { RunMapView } from "@/app/components/run-map-view";
import { Client } from "@/app/lib/clients/client";
import { useFavorites } from "@/app/lib/hooks/favorites-storage";
import { Run } from "@/app/lib/models/run";
import { RunMap } from "@/app/lib/models/runMap";
import { cn } from "@/app/lib/utilities/style-utils";
import { Button } from "@/app/widgets/button";
import { CommonIcon, IconName } from "@/app/widgets/common-icon";
import { InitialsBadge } from "@/app/widgets/initials";
import { LinkButton } from "@/app/widgets/link-button";
import { LoadingBox } from "@/app/widgets/loading-box";
import { useRouter } from "next/navigation";

export default function RunPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [run, setRun] = useState<Run>();
  const [runMap, setRunMap] = useState<RunMap>();
  const [favorites, saveFavorites] = useFavorites();
  const { push } = useRouter();
  const client = useRef(new Client());

  useEffect(() => {
    fetchRun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchRun() {
    const idNumber = parseInt(params.id, 10);
    setLoading(true);
    client.current.getRun(idNumber).then((run) => {
      setRun(run);
      client.current.getRunMap(idNumber).then((runMap) => {
        setRunMap(runMap);
        setLoading(false);
      });
    });
  }

  function onNextRun() {
    if (!run) return;
    client.current.getRuns().then((runs) => {
      const currentRunIndex = runs.findIndex((r) => r.id === run.id);
      const nextRunIndex = (currentRunIndex + 1) % runs.length;
      const nextRun = runs[nextRunIndex];
      push(`/runs/${nextRun.id}`);
    });
  }

  const isFavorite = run
    ? favorites.some((favorite) => favorite.id === run.id)
    : false;

  return (
    <div className="bg-background flex h-full w-full flex-row">
      <div className="flex h-full w-full flex-col py-5 md:py-8">
        {loading && (
          <div className="flex w-full flex-col items-center">
            <div className="flex w-full flex-col gap-3 px-2 md:w-[80%] md:px-2">
              <LoadingBox className="h-12 w-full" />
              <LoadingBox className="h-40 w-full" />
              <LoadingBox className="h-[400px] w-full" />
            </div>
          </div>
        )}

        {!loading && (!run || !runMap) && <div>Run not found</div>}

        {!loading && run && runMap && (
          <div className="flex w-full flex-col items-center">
            <div className="flex w-full flex-col gap-4 md:w-[80%]">
              <div className="flex flex-col gap-3 px-5 md:px-0">
                <div className="flex flex-row items-center justify-between">
                  <LinkButton href="/runs" text="All Runs" iconName="back" />
                  <Button
                    text="Next"
                    iconName="next"
                    onClick={onNextRun}
                    className="px-2"
                  />
                </div>

                <RunDetails
                  run={run}
                  favorites={favorites}
                  isFavorite={isFavorite}
                  saveFavorites={saveFavorites}
                />
              </div>

              <div className="flex flex-col items-center">
                <div className="h-[500px] w-full">
                  <RunMapView runMap={runMap} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface RunDetailsProps {
  run: Run;
  isFavorite: boolean;
  favorites: Favorite[];
  saveFavorites: (favorites: Favorite[]) => void;
}

function RunDetails({
  run,
  isFavorite,
  favorites,
  saveFavorites,
}: RunDetailsProps) {
  const firstRunYear = run.firstRunYear ? `${run.firstRunYear}` : "Unknown";

  function onClickFavorite() {
    if (isFavorite) {
      saveFavorites(favorites.filter((favorite) => favorite.id !== run.id));
    } else {
      saveFavorites([...favorites, { id: run.id }]);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-row items-center justify-between gap-3">
        <div className="flex w-full flex-row items-center gap-2">
          <a href={run.mapLink} target="_blank">
            <div className="text-lg font-bold">{run.name}</div>
          </a>
          <div onClick={onClickFavorite} className="cursor-pointer p-1">
            <CommonIcon
              name="star"
              size={16}
              color={isFavorite ? "#3172AE" : "#3172AE"}
              weight={isFavorite ? "fill" : "regular"}
            />
          </div>
        </div>
        <LinkButton text="Edit" href={`/edit/${run.id}`} iconName="pencil" />
      </div>

      <div className="flex flex-col gap-2">
        <RunDetail
          name="Distance"
          detail={
            <span className="rounded-md bg-tufts-brown px-2 py-0.5 text-white">{`${run.distance} mi`}</span>
          }
          iconName="ruler"
        />
        <RunDetail name="Area" detail={run.area} iconName="globe" />
        <RunDetail
          name={run.includesTrail ? "Includes trail" : "No trail"}
          iconName={run.includesTrail ? "tree" : "road"}
          className="items-center"
        />
        <RunDetail
          name="First run year"
          detail={firstRunYear}
          iconName="calendar-plus"
        />
        {run.firstRunBy && (
          <RunDetail
            name="First run by"
            detail={<InitialsList initialsList={run.firstRunBy} />}
            iconName="medal"
          />
        )}
        {run.editors && (
          <RunDetail
            name="Editors"
            detail={<InitialsList initialsList={run.editors} />}
            iconName="user-plus"
          />
        )}
        {run.description && (
          <RunDetail
            name="Description"
            detail={run.description}
            iconName="letters"
            blockDetail={true}
            className="items-start"
          />
        )}
        {run.lore && (
          <RunDetail
            name="Lore"
            detail={run.lore}
            iconName="book"
            blockDetail={true}
            className="items-start"
          />
        )}
      </div>
    </div>
  );
}

interface InitialsListProps {
  initialsList: string[];
}

function InitialsList({ initialsList }: InitialsListProps) {
  return (
    <div className="flex flex-row gap-1">
      {initialsList.map((initials) => (
        <InitialsBadge initials={initials} key={initials} />
      ))}
    </div>
  );
}

interface RunDetailProps {
  name?: string;
  detail?: string | React.ReactNode;
  iconName?: IconName;
  blockDetail?: boolean;
  className?: string;
}

function RunDetail({
  name,
  detail,
  iconName,
  blockDetail,
  className,
}: RunDetailProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center gap-2 text-sm",
        blockDetail && "flex-col",
        className,
      )}
    >
      <div className="flex flex-row items-center gap-2">
        {iconName && (
          <CommonIcon
            name={iconName}
            className="h-4 w-4 shrink-0"
            size={16}
            color="#3172AE"
            weight="duotone"
          />
        )}
        {name && <span className="font-bold text-black/60">{name}</span>}
      </div>
      {detail && (
        <div className="flex flex-row gap-2">
          {!blockDetail && <span className="text-black/20">•</span>}
          <span className={cn(blockDetail && "pl-[24px]")}>{detail}</span>
        </div>
      )}
    </div>
  );
}
