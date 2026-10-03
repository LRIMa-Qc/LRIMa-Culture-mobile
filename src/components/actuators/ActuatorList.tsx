import { IndicatorList } from "../indicator-list/InidicatorList";
import { IndicatorType } from "../indicator/Indicator";
import { FullActuatorComponent } from "../../pages/Actuators/Actuators";
import { TbSatellite as ActuatorOnline } from "react-icons/tb";
import { TbSatelliteOff as ActuatorOffline } from "react-icons/tb";
import ActuatorItem from "./ActuatorItem";
import { useProject } from "../../setup/AppDecorator/getProject";
import { useSerreStore } from "../../stores/serreStore";
import { useIoTSocket } from "./useIoTSocket";
import { IOT_EVENT } from "@alivecode/core/iot";

export interface ActuatorsType {
  actuators: FullActuatorComponent[]
}

export default function ActuatorList({ actuators }: ActuatorsType) {

  const { serreId } = useSerreStore();
  const { project, fetchProject } = useProject(serreId);
  const { send, ready } = useIoTSocket(serreId, project?.name);

  const onToggle = async (a: FullActuatorComponent) => {
    const p = await fetchProject();
    const value = !p?.document[a.actionId];
    const sent = send(IOT_EVENT.SEND_ACTION, { targetId: a.targetId, actionId: a.actionId, value });
    return sent ? value : undefined;
  }

  return (
    <IndicatorList
      indicators={actuators.map(a => {
        const isOn = Boolean(project?.document[a.actionId] ?? a.isOn);
        return {
          color: isOn ? 'emerald' : 'red',
          Icon: isOn ? ActuatorOnline : ActuatorOffline,
          // TODO: Add arabic to translation
          children: <ActuatorItem key={a.targetId} {...a} state={isOn} disabled={!ready} onToggle={onToggle} />,
          label: a.name || a.uid || "unknown"
        } satisfies IndicatorType

      })}
    />
  );
}
