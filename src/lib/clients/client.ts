import { getRunMap, getRunMaps, hasRunMap } from "@/db/maps";
import { Run } from "../models/run";
import { RunMap } from "../models/runMap";
import { getVisibleRuns } from "../utilities/api-utils";

/** Runs are addressed by slug, which is what the URLs carry. */
export class Client {
  async getRuns(): Promise<Run[]> {
    return getVisibleRuns().filter((run) => hasRunMap(run.slug));
  }

  async getRun(slug: string): Promise<Run> {
    const run = (await this.getRuns()).find((run) => run.slug === slug);
    if (!run) {
      throw new Error(`Run not found: ${slug}`);
    }
    return run;
  }

  /**
   * Find a run by slug, falling back to its numeric id.
   *
   * Runs used to be linked by id, and those links are out in the world.
   */
  async findRun(slugOrId: string): Promise<Run | undefined> {
    const runs = await this.getRuns();
    const bySlug = runs.find((run) => run.slug === slugOrId);
    if (bySlug) return bySlug;
    const id = Number(slugOrId);
    return Number.isInteger(id) ? runs.find((run) => run.id === id) : undefined;
  }

  async getRunMaps(): Promise<RunMap[]> {
    return getRunMaps((await this.getRuns()).map((run) => run.slug));
  }

  async getRunMap(slug: string): Promise<RunMap> {
    const runMap = getRunMap(slug);
    if (!runMap) {
      throw new Error(`Run map not found: ${slug}`);
    }
    return runMap;
  }
}
