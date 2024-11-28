import { Run } from "@/app/lib/models/run";
import { ErrorResponse } from "@/app/lib/utilities/response-utils";
import { NextResponse } from "next/server";
import { MAPS } from "./maps";
import runs from "./runs.json";

export type PostRunRequest = {
  name: string;
};

export type PostRunResponse = Run;

export async function POST(
  req: Request,
): Promise<NextResponse<PostRunResponse> | NextResponse<ErrorResponse>> {
  const requestBody: PostRunRequest = await req.json();
  return NextResponse.json({ error: "Not supported" }, { status: 500 });
}

export type GetRunsResponse = Run[];

export async function GET(
  req: Request,
): Promise<NextResponse<GetRunsResponse>> {
  const runsWithMaps: Run[] = [];
  for (const run of runs) {
    const runMap = MAPS.find((map) => map.id === run.id);
    if (runMap) {
      runsWithMaps.push(run);
    }
  }
  return NextResponse.json(runsWithMaps);
}
