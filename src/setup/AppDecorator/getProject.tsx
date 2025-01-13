import { ApiContext } from "@alivecode/core/api";
import { IoTProject } from "@alivecode/core/api/models/Iot";
import { IoTComponent } from "@alivecode/core/iot";
import { useContext, useEffect, useState } from "react";

export function useProject(id: string) {
    const [project, setProject] = useState<IoTProject<IoTComponent>>();
    const {axios} = useContext(ApiContext);

    console.log("id:", id);
    
    useEffect(() => {
        axios.get(
            `iot/projects/${id}`,
        ).then(
            (data) => {
                console.log(data)
                setProject(data.data)
            }
        )
    }, [axios, id])

    return {project};
}