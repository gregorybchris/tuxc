import runs from "../../db/runs.json";
import { Run } from "../models/run";

export function getVisibleRuns(): Run[] {
  return runs.filter((run: Run) => run.visible);
}
