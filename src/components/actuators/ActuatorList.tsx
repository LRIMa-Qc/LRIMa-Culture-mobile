import { IndicatorList } from "../indicator-list/InidicatorList";
import { IndicatorType } from "../indicator/Indicator";
import { ActuatorComponent } from "../../pages/Actuators/Actuators";
import { TbSatellite as ActuatorOnline } from "react-icons/tb";
import { TbSatelliteOff as ActuatorOffline } from "react-icons/tb";
import { useTranslation } from "react-i18next";

export interface ActuatorsType {
  actuators: ActuatorComponent[]
}

export default function ActuatorList({ actuators }: ActuatorsType) {


  const { t } = useTranslation();

  return (
    <IndicatorList
      indicators={actuators.map(a => {
        return {
          color: a.value === "true" ? 'emerald' : 'red',
          Icon: a.value === "true" ? ActuatorOnline : ActuatorOffline,
          // TODO: Add arabic to translation
          children: (
            <div>
              <button className="p-3 bg-red-500 text-white rounded-2xl">
                {a.value === "true" ? t('iot.project.actuators.turn_on') : t('iot.project.actuators.turn_off')}
              </button>
            </div>
          ),
          label: a.name || a.uid || "unknown"
        } satisfies IndicatorType

      })}
    />
  );
}

