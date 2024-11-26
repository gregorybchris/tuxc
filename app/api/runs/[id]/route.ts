import { Run } from "@/app/lib/models/run";
import { ErrorResponse } from "@/app/lib/utilities/response-utils";
import { NextResponse } from "next/server";
import runs from "../runs.json";

type GetRunParams = {
  params: { id: string };
};

export type GetRunResponse = Run;

export async function GET(
  req: Request,
  { params: { id } }: GetRunParams,
): Promise<NextResponse<GetRunResponse> | NextResponse<ErrorResponse>> {
  const idNumber = parseInt(id, 10);
  const run = runs.find((run) => run.id === idNumber);
  if (!run) {
    return NextResponse.json({ error: "Run not found" }, { status: 404 });
  }
  return NextResponse.json(run);
}
