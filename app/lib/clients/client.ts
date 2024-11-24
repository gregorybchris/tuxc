import {
  GetRunsResponse,
  PostRunRequest,
  PostRunResponse,
} from "@/app/api/runs/route";

import { GetRunResponse } from "@/app/api/runs/[id]/route";
import { Run } from "../models/run";
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
}
