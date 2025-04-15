import { AppBar } from "../../components/appbar/AppBar";
import CapteursList from "../../components/capteurs/CapteursList";
import { Widget } from "../../components/dashboard/widget/Widget";
import { useTranslation } from "react-i18next";
import { useSerreStore } from "../../stores/serreStore";
import { useProject } from "../../setup/AppDecorator/getProject";
import { ApiContext } from "@alivecode/core/api";
import { useContext, useEffect, useState } from "react";
import ActuatorList from "../../components/actuators/ActuatorList";

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

export default function IoTActuators() {

  const { serreId } = useSerreStore();
  const { project } = useProject(serreId);

  const [actuators, setActuators] = useState<ActuatorComponent[]>([]);

  const { axios } = useContext(ApiContext);

  useEffect(() => {

    axios.get(`/iot/projects/${serreId}`)
      .then(({ data }) => {
        console.log(data);


        const c = (project?.layout as unknown as { components: ActuatorComponent[] })?.components;
        setActuators(c);

      });


  }, [project, axios, serreId])

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
