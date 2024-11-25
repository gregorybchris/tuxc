import { Run } from "@/app/lib/models/run";
import { NextResponse } from "next/server";
import { MAPS } from "./maps";
import runs from "./runs.json";

export type PostRunRequest = {
  name: string;
};

export type PostRunResponse = {
  run: Run;
};

export async function POST(
  req: Request,
): Promise<NextResponse<PostRunResponse>> {
  const requestBody: PostRunRequest = await req.json();

  // TODO: Use request to create a new run
  const run = runs[0];

  return NextResponse.json({ run });
}

export type GetRunsResponse = {
  runs: Run[];
};

export async function GET(
  req: Request,
): Promise<NextResponse<GetRunsResponse>> {
  const runsWithMaps: Run[] = [];
  for (const run of runs) {
    const runMap = MAPS.get(run.slug);
    if (runMap) {
      runsWithMaps.push(run);
    }
  }
  return NextResponse.json({ runs: runsWithMaps });
}
