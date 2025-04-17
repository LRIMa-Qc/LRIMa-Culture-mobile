import { useTranslation } from "react-i18next";
import { ActuatorComponent, FullActuatorComponent } from "../../pages/Actuators/Actuators";
import { useContext, useEffect, useReducer, useState } from "react";
import { IOT_EVENT, IoTSocket, useIoTProject } from "@alivecode/core/iot";
import { useSerreStore } from "../../stores/serreStore";
import { useProject } from "../../setup/AppDecorator/getProject";
import { useAppSocketWithScopedEvents, UserContext } from "@alivecode/core";
import { ApiContext } from "@alivecode/core/api";
import { APP_SOCKET_URL, IOT_SOCKET_URL } from "../../setup/api";
import { toast } from "react-toastify";


export default function ActuatorItem(actuator: FullActuatorComponent) {

  const { t } = useTranslation();
  const { serreId } = useSerreStore();
  const { axios } = useContext(ApiContext);
  const { project, fetchProject, refech } = useProject(serreId);

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
    const s = new WebSocket(IOT_SOCKET_URL);

    s.onopen = async (ev) => {

      const ticket = (
        await axios.get(
          `users/socket/iotTicket?projectId=${serreId}&projectName=${project?.name}`,
        )
      ).data;

      s.send(
        JSON.stringify({
          event: IOT_EVENT.CONNECT_FRONTEND,
          data: {
            ticket,
          },
        }),
      );

      setSocket(s);
      console.log("open", ev);
    };

    s.onerror = (ev: Event) => {
      console.error("error", ev);
    };

    s.onclose = console.log;

  }, [axios, project, serreId]);


  const onClick = () => {
    if (socket?.OPEN) {
      fetchProject().then(p => {
        const value = !p?.document[actuator.actionId];
        sendEvent(IOT_EVENT.SEND_ACTION, { targetId: actuator.targetId, actionId: actuator.actionId, value });
      })

    }
  }

  return (
    <button className="p-3 bg-red-500 text-white rounded-2xl" onClick={onClick}>
      {!actuator.isOn ? t('iot.project.actuators.turn_on') : t('iot.project.actuators.turn_off')}
    </button>


  )
}
