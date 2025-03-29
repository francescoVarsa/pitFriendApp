import { useCallback, useEffect, useMemo, useRef } from "react";
import { Http } from "@/services/http";
type Options = {
  startOnMount?: boolean;
};

type UseWebSocketFn = (url: string, options: Options) => { open: () => void };

export const useWebsocket: UseWebSocketFn = (url, options) => {
  const ws = useRef<WebSocket>(undefined);
  const http = useMemo(() => new Http(), []);

  // If has to start immediatly open a ws connection
  useEffect(() => {
    if ("startOnMount" in options && options.startOnMount) {
      startStream();
    }
  });

  // Loop through the options and attach events to the ws
  const registerEvents = useCallback(() => {}, []);

  const startStream = useCallback(() => {
    ws.current = http.openSocketStream(url);
    registerEvents();
  }, [http, registerEvents, url]);

  // If is not started immediatly provide a method to open the ws connection
  const open = useCallback(() => {
    startStream();
  }, [startStream]);

  return { open };
};
