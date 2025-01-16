import { AppBar } from "../components/appbar/AppBar";
import { Widget } from "../components/dashboard/widget/Widget";
import { IndicatorList } from "../components/indicator-list/InidicatorList";

import { TbPlant2 as Icon } from "react-icons/tb";
import { useSerreStore } from "../stores/serreStore";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "@alivecode/core/api";
import { useTranslation } from "react-i18next";

import {TbArrowNarrowRight as RightArrow} from 'react-icons/tb';

export interface Project {
    id: string;
    name: string;
}

export default function Serres() {
    const serre = useSerreStore();
    const navigate = useNavigate();
    const {t} = useTranslation();

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

    const changeGreehouse = (id: string) => {
        serre.updateSerreId(id); 
        navigate('/overview');
    }

    // TODO: Connect
    return (
        <div className="space-y-5">
            <AppBar label={t('dashboard.culture.title')} />
            <div className="mx-5 space-y-10">
                <Widget label={t('dashboard.culture.title')}>
                <IndicatorList indicators={
                        projects.map((project) => ({
                            label: project.name,
                            color: 'sky',
                            Icon,
                            onClick: () => changeGreehouse(project.id),
                            children: (
                                <button onClick={() => {changeGreehouse(project.id)}}>
                                    <RightArrow className="ltr:scale-100 rtl:-scale-100"/>
                                </button>
                            )
                        }))
                    }
                />
                </Widget>
            </div>
        </div>
    );
}