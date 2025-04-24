import { IndicatorList } from "../indicator-list/InidicatorList";
import { IndicatorType } from "../indicator/Indicator";
import { FullActuatorComponent } from "../../pages/Actuators/Actuators";
import { TbSatellite as ActuatorOnline } from "react-icons/tb";
import { TbSatelliteOff as ActuatorOffline } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import ActuatorItem from "./ActuatorItem";
import { useProject } from "../../setup/AppDecorator/getProject";
import { useSerreStore } from "../../stores/serreStore";

export interface ActuatorsType {
  actuators: FullActuatorComponent[]
}

export default function ActuatorList({ actuators }: ActuatorsType) {

  const { serreId } = useSerreStore();
  const { project } = useProject(serreId);

  return (
    <IndicatorList
      indicators={actuators.map(a => {
        // const isOn = project?.document[a.actionId];
        const isOn = true;
        return {
          color: isOn ? 'emerald' : 'red',
          Icon: isOn ? ActuatorOnline : ActuatorOffline,
          // TODO: Add arabic to translation
          children: <ActuatorItem key={a.targetId} {...a} />,
          label: a.name || a.uid || "unknown"
        } satisfies IndicatorType

      })}
    />
  );
}

