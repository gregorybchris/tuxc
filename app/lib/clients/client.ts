import {
  GetRunsResponse,
  PostRunRequest,
  PostRunResponse,
} from "@/app/api/runs/route";

import { GetRunMapResponse } from "@/app/api/runs/[id]/map/route";
import { GetRunResponse } from "@/app/api/runs/[id]/route";
import { GetRunMapsResponse } from "@/app/api/runs/maps/route";
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
    return responseJson;
  }

  async getRuns(): Promise<Run[]> {
    const responseJson: GetRunsResponse = await this.get("/runs");
    return responseJson;
  }

  async getRun(id: number): Promise<Run> {
    const responseJson: GetRunResponse = await this.get(`/runs/${id}`);
    return responseJson;
  }

  async getRunMaps(): Promise<RunMap[]> {
    const responseJson: GetRunMapsResponse = await this.get(`/runs/maps`);
    return responseJson;
  }
  async getRunMap(id: number): Promise<RunMap> {
    const responseJson: GetRunMapResponse = await this.get(`/runs/${id}/map`);
    return responseJson;
  }
}
