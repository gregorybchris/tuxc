import { Run } from "@/app/lib/models/run";
import { NextResponse } from "next/server";
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

  // TODO: Accept more params to create run
  const run = {
    id: 1,
    name: requestBody.name,
    description: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return NextResponse.json({ run });
}

export type GetRunsResponse = {
  runs: Run[];
};

export async function GET(
  req: Request,
): Promise<NextResponse<GetRunsResponse>> {
  return NextResponse.json({ runs });
}
