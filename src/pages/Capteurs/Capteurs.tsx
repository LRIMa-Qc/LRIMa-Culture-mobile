import { AppBar } from "../../components/appbar/AppBar";
import CapteursList from "../../components/capteurs/CapteursList";
import { Widget } from "../../components/dashboard/widget/Widget";
import { useTranslation } from "react-i18next";
import { useSerreStore } from "../../stores/serreStore";
import { useProject } from "../../setup/AppDecorator/getProject";
import { ApiContext } from "@alivecode/core/api";
import { useContext, useEffect, useMemo, useState } from "react";

export interface CultureCapteur {
    batteryRef: string;
    category: string;
    gndHumidRef: string;
    gndTempRef: string;
    humidRef: string;
    id: string;
    lumiRef: string;
    name: string;
    no: string;
    tempRef: string;
    hasCo2: boolean;
}

interface DisplayCapteur extends CultureCapteur {
    last_insert?: string;
}

type SortType = "number" | "last_insert";
type CO2Filter = "all" | "with" | "without";

export default function IoTCapteurs() {

    const { serreId } = useSerreStore();
    const { project } = useProject(serreId);
    const { axios } = useContext(ApiContext);
    const { t } = useTranslation();

    const [capteurs, setCapteurs] = useState<DisplayCapteur[]>([]);

    const [sortType, setSortType] = useState<SortType>(
        (localStorage.getItem("sortType") as SortType) || "last_insert"
    );

    const [co2Filter, setCO2Filter] = useState<CO2Filter>("all");

    useEffect(() => {
        localStorage.setItem("sortType", sortType);
    }, [sortType]);

    useEffect(() => {

        axios.get(`/iot/projects/${serreId}/datasets`)
            .then(({ data }) => {
                const datasets = data as any[];
                const layoutCapteurs =
                    (project?.layout as { capteurs: CultureCapteur[] } | undefined)?.capteurs ?? [];

                setCapteurs(
                    layoutCapteurs.map(c => ({
                        ...c,
                        last_insert: datasets.find(d => d.noCapteur === c.no)?.lastInsert
                    }))
                );
            });

    }, [project, axios, serreId]);

    const displayedCapteurs = useMemo(() => {
        return capteurs
            .filter(c => {
                switch (co2Filter) {
                    case "with":
                        return c.hasCo2 === true;

                    case "without":
                        return c.hasCo2 === false;

                    default:
                        return true;
                }
            })
            .sort((a, b) => {
                switch (sortType) {
                    case "last_insert":
                        return (
                            new Date(b.last_insert ?? 0).getTime() -
                            new Date(a.last_insert ?? 0).getTime()
                        );

                    case "number":
                        return Number(a.no) - Number(b.no);
                }
            });
    }, [capteurs, sortType, co2Filter]);

    const activeClass = "bg-emerald-200 text-emerald-900";

    return (
        <div className="space-y-5">
            <AppBar label={t("iot.project.interface.name")} />

            <div className="mx-5 space-y-10">
                <Widget label={t("iot.project.interface.name")}>

                    <div className="flex w-full bg-white rounded-2xl p-2 ring-1 ring-slate-200 ring-inset gap-1 mb-2">
                        <button
                            onClick={() => setSortType("last_insert")}
                            className={`${sortType === "last_insert" ? activeClass : ""} w-full px-4 py-3 rounded-2xl`}
                        >
                            {t("iot.project.interface.sort.last_insert")}
                        </button>

                        <button
                            onClick={() => setSortType("number")}
                            className={`${sortType === "number" ? activeClass : ""} w-full px-4 py-3 rounded-2xl`}
                        >
                            {t("iot.project.interface.sort.number")}
                        </button>
                    </div>

                    <div className="flex w-full bg-white rounded-2xl p-2 ring-1 ring-slate-200 ring-inset gap-1 mb-4">
                        <button
                            onClick={() => setCO2Filter("all")}
                            className={`${co2Filter === "all" ? activeClass : ""} w-full px-4 py-3 rounded-2xl`}
                        >
                            {t("iot.project.interface.filter.all")}
                        </button>

                        <button
                            onClick={() => setCO2Filter("with")}
                            className={`${co2Filter === "with" ? activeClass : ""} w-full px-4 py-3 rounded-2xl`}
                        >

                            {t("iot.project.interface.filter.CO2")}
                        </button>

                        <button
                            onClick={() => setCO2Filter("without")}
                            className={`${co2Filter === "without" ? activeClass : ""} w-full px-4 py-3 rounded-2xl`}
                        >
                            {t("iot.project.interface.filter.NoCO2")}
                        </button>
                    </div>

                    {displayedCapteurs.length !== 0 ? (
                        <CapteursList capteurs={displayedCapteurs} />
                    ) : (
                        <p>{t("datasets.noData")}</p>
                    )}
                </Widget>
            </div>
        </div>
    );
}
