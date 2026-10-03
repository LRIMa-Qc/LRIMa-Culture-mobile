import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { FullActuatorComponent } from "../../pages/Actuators/Actuators";

export type ActuatorItemProps = FullActuatorComponent & {
  state: boolean;
  disabled?: boolean;
  onToggle: (actuator: FullActuatorComponent) => Promise<boolean | undefined>;
}

export default function ActuatorItem({ state: remoteState, disabled, onToggle, ...actuator }: ActuatorItemProps) {

  const { t } = useTranslation();
  const [state, setState] = useState(remoteState);

  useEffect(() => setState(remoteState), [remoteState]);

  const onClick = async () => {
    const value = await onToggle(actuator as FullActuatorComponent);
    if (value !== undefined) setState(value);
  }

  return (
    <button className={`p-3 text-white rounded-2xl disabled:opacity-50 ${state ? "bg-emerald-500" : "bg-red-500"}`} disabled={disabled} onClick={onClick}>
      {!state ? t('iot.project.actuators.turn_on') : t('iot.project.actuators.turn_off')}
    </button>
  )
}
