import { Simulator } from "@/app/models/models";
import { endpoints } from "./endpoints";

export class Http {
  openSocketStream(url: string): WebSocket {
    const ws = new WebSocket(url);

    return ws;
  }

  async getSimulatorList(): Promise<Simulator[]> {
    const response = await this.httpRequest(
      endpoints.http.simulatorsInfo,
      "GET"
    );

    return response["data"];
  }

  private async httpRequest(url: string, method: string, payload?: unknown) {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: payload ? JSON.stringify(payload) : undefined,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error("Error while fetching data", error);
    }
  }
}
