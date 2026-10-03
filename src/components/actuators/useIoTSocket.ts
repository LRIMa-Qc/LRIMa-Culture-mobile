import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { IOT_EVENT } from "@alivecode/core/iot";
import { ApiContext } from "@alivecode/core/api";
import { IOT_SOCKET_URL } from "../../setup/api";

export function useIoTSocket(serreId: string, projectName?: string) {
  const { axios } = useContext(ApiContext);
  const socketRef = useRef<WebSocket | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!serreId || !projectName) return;

    let closed = false;
    let timeout: ReturnType<typeof setTimeout>;

    const open = () => {
      const s = new WebSocket(IOT_SOCKET_URL);

      s.onopen = async () => {
        try {
          const ticket = (
            await axios.get(
              `users/socket/iotTicket?projectId=${serreId}&projectName=${projectName}`,
            )
          ).data;

          if (closed || s.readyState !== WebSocket.OPEN) return;

          s.send(
            JSON.stringify({
              event: IOT_EVENT.CONNECT_FRONTEND,
              data: { ticket },
            }),
          );

          socketRef.current = s;
          setReady(true);
        } catch (e) {
          console.error("iotTicket error", e);
          s.close();
        }
      };

      s.onerror = (ev) => console.error("error", ev);

      s.onclose = () => {
        if (socketRef.current === s) {
          socketRef.current = null;
          setReady(false);
        }
        if (!closed) timeout = setTimeout(open, 2000);
      };

      return s;
    };

    const s = open();

    return () => {
      closed = true;
      clearTimeout(timeout);
      s.close();
      socketRef.current = null;
      setReady(false);
    };
  }, [axios, serreId, projectName]);

  const send = useCallback((event: IOT_EVENT, data: any) => {
    const s = socketRef.current;
    if (s?.readyState !== WebSocket.OPEN) return false;
    s.send(JSON.stringify({ event, data }));
    return true;
  }, []);

  return { send, ready };
}
