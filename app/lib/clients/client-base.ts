import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

export class ClientBase {
  apiBaseUrl: string;
  convertServerToCamel: boolean;
  convertClientToSnake: boolean;

  constructor(
    apiBaseUrl?: string,
    convertServerToCamel: boolean = false,
    convertClientToSnake: boolean = false,
  ) {
    this.apiBaseUrl = apiBaseUrl || this.apiBaseUrlFromEnv();
    this.convertServerToCamel = convertServerToCamel;
    this.convertClientToSnake = convertClientToSnake;
  }

  apiBaseUrlFromEnv(): string {
    if (process.env.NEXT_PUBLIC_API_BASE_URL === undefined) {
      console.error("NEXT_PUBLIC_API_BASE_URL is not set");
    }
    return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  }

  async get<ResT>(path: string): Promise<ResT> {
    const response = await fetch(`${this.apiBaseUrl}${path}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    await this.throwOnError(response);
    const responseJson = await response.json();
    return this.convertServerToCamel
      ? this.toCamel(responseJson)
      : responseJson;
  }

  async post<ReqT, ResT>(path: string, body: ReqT): Promise<ResT> {
    const snakeBody = this.convertClientToSnake ? this.toSnake(body) : body;
    const response = await fetch(`${this.apiBaseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(snakeBody),
    });
    await this.throwOnError(response);
    const responseJson = await response.json();
    return this.convertServerToCamel
      ? this.toCamel(responseJson)
      : responseJson;
  }

  async delete<ResT>(path: string): Promise<ResT> {
    const response = await fetch(`${this.apiBaseUrl}${path}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    await this.throwOnError(response);
    const responseJson = await response.json();
    return this.convertServerToCamel
      ? this.toCamel(responseJson)
      : responseJson;
  }

  async patch<ReqT, ResT>(path: string, body: ReqT): Promise<ResT> {
    const snakeBody = this.convertClientToSnake ? this.toSnake(body) : body;
    const response = await fetch(`${this.apiBaseUrl}${path}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(snakeBody),
    });
    await this.throwOnError(response);
    const responseJson = await response.json();
    return this.convertServerToCamel
      ? this.toCamel(responseJson)
      : responseJson;
  }

  async throwOnError(response: Response): Promise<void> {
    if (!response.ok) {
      const responseText = await response.text();
      try {
        const responseJson = await response.json();
        console.error(responseJson);
        throw Error(responseText);
      } catch (e) {
        console.error(responseText);
      }
    }
  }

  toSnake(obj: any): any {
    return snakecaseKeys(obj, { deep: true });
  }

  toCamel(obj: any): any {
    return camelcaseKeys(obj, { deep: true });
  }
}
