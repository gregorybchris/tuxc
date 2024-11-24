import { Run } from "@/app/lib/models/run";

function allMatchSearch(searchText?: string, ...args: string[]): boolean {
  if (!searchText) return true;

  const search = searchText.toLowerCase();
  for (let arg of args) {
    if (arg.toLowerCase().includes(search)) return true;
  }
  return false;
}

export function runMatchesSearch(run: Run, searchText?: string): boolean {
  return allMatchSearch(searchText, run.name);
}
