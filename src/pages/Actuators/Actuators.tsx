import { AppBar } from "../../components/appbar/AppBar";
import { Widget } from "../../components/dashboard/widget/Widget";
import { useTranslation } from "react-i18next";
import { useSerreStore } from "../../stores/serreStore";
import { useProject } from "../../setup/AppDecorator/getProject";
import { ApiContext } from "@alivecode/core/api";
import { useContext, useEffect, useState } from "react";
import ActuatorList from "../../components/actuators/ActuatorList";
import { useActuatorStore } from "../../stores/actuatorStore";

export interface ActuatorComponent {
  actionData: string;
  actionId: string;
  gce: number;
  gcs: number;
  gre: number;
  grs: number;
  id: string;
  name: string;
  targetId: string;
  type: number;
  uid: string;
  value: string;
}

export type FullActuatorComponent = ActuatorComponent & {
  isOn: boolean;
}

export default function IoTActuators() {

  const actuators = useActuatorStore((state) => state.actuators);

  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <AppBar label={t('iot.project.sandbox.categories.actuator')} />
      <div className="mx-5 space-y-10">
        <Widget label={t('iot.project.sandbox.categories.actuator')}>
          {actuators && actuators.length !== 0 ? (
            <ActuatorList actuators={actuators} />
          ) : (
            <p>{t('datasets.noData')}</p>
          )}
        </Widget>
      </div>
    </div>
  );
}
