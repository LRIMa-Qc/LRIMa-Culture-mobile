import { useTranslation } from "react-i18next";
import { ActuatorComponent, FullActuatorComponent } from "../../pages/Actuators/Actuators";
import { useContext, useEffect, useReducer, useState } from "react";
import { IOT_EVENT, IoTSocket, useIoTProject } from "@alivecode/core/iot";
import { useSerreStore } from "../../stores/serreStore";
import { useProject } from "../../setup/AppDecorator/getProject";
import { ApiContext } from "@alivecode/core/api";
import { APP_SOCKET_URL, IOT_SOCKET_URL } from "../../setup/api";
import { toast } from "react-toastify";


export default function ActuatorItem(actuator: FullActuatorComponent) {

  const { t } = useTranslation();
  const { serreId } = useSerreStore();
  const { axios } = useContext(ApiContext);
  const { project, fetchProject, refech } = useProject(serreId);
  const [state, setState] = useState(false);

  const [socket, setSocket] = useState<WebSocket | null>(null);

  const sendEvent = (event: IOT_EVENT, data: any) => {
    socket?.send(
      JSON.stringify({
        event,
        data,
      }),
    );
  }

  useEffect(() => {
    if (!project?.name) return;

    let closed = false;
    let s: WebSocket | null = null;

    const openSocket = () => {
      s = new WebSocket(IOT_SOCKET_URL);

      s.onopen = async () => {
        const ticket = (
          await axios.get(
            `users/socket/iotTicket?projectId=${serreId}&projectName=${project.name}`,
          )
        ).data;

        s?.send(
          JSON.stringify({
            event: IOT_EVENT.CONNECT_FRONTEND,
            data: {
              ticket,
            },
          }),
        );

        setSocket(s);
      };

      s.onerror = (ev: Event) => {
        console.error("error", ev);
      };

      s.onclose = () => {
        setSocket(null);
        if (!closed) setTimeout(openSocket, 1000);
      };
    };

    openSocket();

    return () => {
      closed = true;
      s?.close();
    };
  }, [axios, serreId, project?.name]);

  useEffect(() => {
    fetchProject().then(p => {
      const s = p?.document[actuator.actionId];
      setState(s);
    })
  }, [serreId]);


  const onClick = () => {
    if (socket?.readyState === WebSocket.OPEN) {
      fetchProject().then(p => {
        const value = !p?.document[actuator.actionId];
        setState(state => !state);
        sendEvent(IOT_EVENT.SEND_ACTION, { targetId: actuator.targetId, actionId: actuator.actionId, value });
      })

    }
  }

  return (
    <button className="p-3 bg-red-500 text-white rounded-2xl" onClick={onClick}>
      {!state ? t('iot.project.actuators.turn_on') : t('iot.project.actuators.turn_off')}
    </button>


  )
}
