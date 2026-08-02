import { Run } from "@/lib/models/run";

function allMatchSearch(searchText?: string, ...args: string[]): boolean {
  if (!searchText) return true;

  const search = searchText.toLowerCase();
  for (const arg of args) {
    if (arg.toLowerCase().includes(search)) return true;
  }
  return false;
}

export function runMatchesSearch(run: Run, searchText?: string): boolean {
  return allMatchSearch(searchText, run.name);
}
