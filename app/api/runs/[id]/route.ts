import { Run } from "@/app/lib/models/run";
import { NextResponse } from "next/server";

type GetRunParams = {
  params: { id: number };
};

export type GetRunResponse = {
  run: Run;
};

export async function GET(
  req: Request,
  { params: { id } }: GetRunParams,
): Promise<NextResponse<GetRunResponse>> {
  // TODO: Pull from JSON file
  const run = {
    id: 1,
    name: "Glamopee",
    description: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return NextResponse.json({ run });
}
