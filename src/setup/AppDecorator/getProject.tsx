import { ApiContext } from "@alivecode/core/api";
import { IoTProject } from "@alivecode/core/api/models/Iot";
import { IoTComponent } from "@alivecode/core/iot";
import { useContext, useEffect, useState } from "react";
import { useActuatorStore } from "../../stores/actuatorStore";
import { ActuatorComponent, FullActuatorComponent } from "../../pages/Actuators/Actuators";

export function useProject(id: string) {
    const [project, setProject] = useState<IoTProject<IoTComponent>>();
    const [shouldRefresh, refresh] = useState({});
    const { axios } = useContext(ApiContext);

    const { updateActuators } = useActuatorStore();

    const fetchProject = async () => {
        const data = await axios.get(
            `iot/projects/${id}`,
        );


        const actuators = (data.data?.layout.components as unknown as ActuatorComponent[] || [])
            .map(ac => ({
                ...ac,
                isOn: data.data?.document[ac.actionId],
            })) as unknown as FullActuatorComponent[];


        console.log("updated?");
        updateActuators(actuators);


        return data.data;
    }

    useEffect(() => {
        console.log("Fetching...");
        fetchProject().then(data => setProject(data));
    }, [axios, id, shouldRefresh])

    return { project, fetchProject, refresh };
}
