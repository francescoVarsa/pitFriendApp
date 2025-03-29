"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Http } from "@/services/http";
import { CircleCheck, CircleX } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Simulator } from "./models/models";

type SimulatorCardProps = {
  sim: Simulator & { active: boolean };
};

export default function Home() {
  const [games, setGames] = useState<
    {
      simName: string;
      simNameTag: string;
      executablePath: string;
      active: boolean;
    }[]
  >([]);
  const http = useMemo(() => new Http(), []);

  const getGamesList = useCallback(async () => {
    const simultaors = await http.getSimulatorList();
    setGames(simultaors.map((d) => ({ ...d, active: false })));
  }, [http]);

  useEffect(() => {
    // const socket = new WebSocket(
    //   "ws://192.168.1.104:8080"
    // );
    // if (socket !== null) {
    //   socket.onmessage = (event: MessageEvent) => {
    //     console.log(event.data);
    //   };
    // }
    getGamesList();
  }, [getGamesList, http]);

  return (
    <div className="flex flex-col p-2 w-full">
      <h3 className="font-bold mb-2">Simulators</h3>
      <hr></hr>
      <div className="grid grid-cols-1 gap-4 w-full md:grid-cols-2 lg:grid-cols-3 mt-4">
        {games.map((sim) => (
          <SimulatorCard key={sim.simNameTag} sim={sim} />
        ))}
      </div>
    </div>
  );
}

const SimulatorCard = ({ sim }: SimulatorCardProps) => {
  return (
    <Card className="pt-0 hover:bg-black" key={sim.simNameTag}>
      <CardHeader className="bg-stone-100 py-4">
        <CardTitle
          title={sim.simName}
          className="text-nowrap text-ellipsis overflow-hidden"
        >
          {sim.simName}
        </CardTitle>
        <CardDescription>
          <div className="flex flex-1 gap-2 items-center">
            {sim.active ? (
              <>
                <p>Active</p>
                <CircleCheck color="#47f915" />
              </>
            ) : (
              <>
                <p>Not active</p>
                <CircleX color="#f91543" />
              </>
            )}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};
