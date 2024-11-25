import {
  GetRunsResponse,
  PostRunRequest,
  PostRunResponse,
} from "@/app/api/runs/route";

import { GetRunMapResponse } from "@/app/api/runs/[id]/map/route";
import { GetRunResponse } from "@/app/api/runs/[id]/route";
import { Run } from "../models/run";
import { RunMap } from "../models/runMap";
import { ClientBase } from "./client-base";

export class Client extends ClientBase {
  constructor() {
    super("/api");
  }

  async createRun(name: string): Promise<Run> {
    const requestBody: PostRunRequest = {
      name: name,
    };
    const responseJson: PostRunResponse = await this.post("/runs", requestBody);
    return responseJson.run;
  }

  async getRuns(): Promise<Run[]> {
    const responseJson: GetRunsResponse = await this.get("/runs");
    return responseJson.runs;
  }

  async getRun(id: number): Promise<Run> {
    const responseJson: GetRunResponse = await this.get(`/runs/${id}`);
    return responseJson.run;
  }

  async getRunMap(id: number): Promise<RunMap> {
    const responseJson: GetRunMapResponse = await this.get(`/runs/${id}/map`);
    return responseJson.runMap;
  }
}
