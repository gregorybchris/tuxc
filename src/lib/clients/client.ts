import { MAPS } from "@/db/maps";
import { getVisibleRuns } from "../utilities/api-utils";
import { Run } from "../models/run";
import { RunMap } from "../models/runMap";

export class Client {
  async getRuns(): Promise<Run[]> {
    return getVisibleRuns().filter((run) =>
      MAPS.some((map) => map.id === run.id),
    );
  }

  async getRun(id: number): Promise<Run> {
    const run = getVisibleRuns().find((run) => run.id === id);
    if (!run) {
      throw new Error(`Run not found: ${id}`);
    }
    return run;
  }

  async getRunMaps(): Promise<RunMap[]> {
    const runs = getVisibleRuns();
    return MAPS.filter((map) => runs.some((run) => run.id === map.id));
  }

  async getRunMap(id: number): Promise<RunMap> {
    const run = getVisibleRuns().find((run) => run.id === id);
    if (!run) {
      throw new Error(`Run metadata not found: ${id}`);
    }
    const runMap = MAPS.find((map) => map.id === id);
    if (!runMap) {
      throw new Error(`Run map not found: ${run.slug}`);
    }
    return runMap;
  }
}
