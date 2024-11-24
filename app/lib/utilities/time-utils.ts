import { DateTime } from "luxon";

/**
 * Example: "Oct 2023"
 */
export function formatDatetimeWithMonthAndYear(date: Date): string {
  return DateTime.fromJSDate(date).toLocaleString({
    year: "numeric",
    month: "short",
  });
}

/**
 * Example: "2 days ago"
 */
export function formatDateDiff(date: Date): string {
  return DateTime.fromJSDate(date).toRelative(DateTime.now())!;
}
