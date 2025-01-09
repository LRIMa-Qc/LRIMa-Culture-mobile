import { AppBar } from "../components/appbar/AppBar";
import { Widget } from "../components/dashboard/widget/Widget";
import { IndicatorList } from "../components/indicator-list/InidicatorList";

import { TbPlant2 as Icon } from "react-icons/tb";
import { useSerreStore } from "../stores/serreStore";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "@alivecode/core/api";

export interface Project {
    id: string;
    name: string;
}

export default function Serres() {
    const serre = useSerreStore();
    const navigate = useNavigate();

    const [projects, setProjects] = useState<Project[]>([])

    const {axios} = useContext(ApiContext);

    useEffect(() => {
        axios.get(
            `users/iot/projects`,
        ).then(
            (data) => {
                setProjects(data.data)
            }
        )
    }, [])

    // TODO: Connect
    return (
        <div className="space-y-5">
            <AppBar label="Serres" />
            <div className="mx-5 space-y-10">
                <Widget label="Mes serres">
                <IndicatorList indicators={
                        projects.map((project) => ({
                            label: project.name,
                            color: 'sky',
                            Icon,
                            children: <button onClick={() => {serre.updateSerreId(project.id); navigate('/')}}>Choisir</button>
                        }))
                    }
                />
                </Widget>
            </div>
        </div>
    );
}