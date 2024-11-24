import { Run } from "../models/run";

export function getRunsByCreated(runs: Run[]): Run[] {
  return [...runs].sort((a, b) => (b.createdAt < a.createdAt ? -1 : 1));
}

export function getRunsByUpdated(runs: Run[]): Run[] {
  return [...runs].sort((a, b) => (b.updatedAt < a.updatedAt ? -1 : 1));
}
