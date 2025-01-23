import { AppBar } from "../../components/appbar/AppBar";
import CapteursList from "../../components/capteurs/CapteursList";
import { Widget } from "../../components/dashboard/widget/Widget";
import { useTranslation } from "react-i18next";
import { useSerreStore } from "../../stores/serreStore";
import { useProject } from "../../setup/AppDecorator/getProject";
import { ApiContext } from "@alivecode/core/api";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@alivecode/core";
import { IoTSocket } from "../../setup/IoTSocket";
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
}

export default function IoTCapteurs() {

    const { serreId } = useSerreStore();
    const { project } = useProject(serreId);

    const [iotSocket, setIoTSocket] = useState<IoTSocket | null>();

    const [capteurs, setCapteurs] = useState<CultureCapteur[]>([]);
    const [sortType, setSortType] = useState<'number' | 'last_insert'>('number');

    const { axios } = useContext(ApiContext);


    useEffect(() => {

        axios.get(`/iot/projects/${serreId}/datasets`)
            .then(({ data }) => {
                const datasets = data as unknown as any[];
                const capteurs = (project?.layout as unknown as { capteurs: CultureCapteur[] })?.capteurs;
                setCapteurs(
                    capteurs?.map(c => ({
                        last_insert: datasets.find(d => d.noCapteur === c.no).last_insert,
                        ...c
                    })).sort((a, b) => {
                        switch (sortType) {
                            case 'last_insert': {
                                const c = new Date(a.last_insert);
                                const d = new Date(b.last_insert);
                                return c.getTime() - d.getTime();
                            }

                            case "number": {
                                return Number(a.no) - Number(b.no)
                            }
                        }
                    })
                );
            });


    }, [project, axios, serreId, sortType])

    const { t } = useTranslation();

    const activeClass = "bg-emerald-200 text-emerald-900";

    return (
        <div className="space-y-5">
            <AppBar label={t('iot.project.interface.name')} />
            <div className="mx-5 space-y-10">
                <Widget label={t('iot.project.interface.name')}>
                    <div className="flex w-full bg-white rounded-2xl p-2 ring-1 ring-slate-200 ring-inset gap-1 mb-1">
                        <button onClick={() => setSortType('last_insert')} className={`${sortType === 'last_insert' && activeClass} w-full px-4 py-3 rounded-2xl`}>{t('iot.project.interface.sort.number')}</button>
                        <button onClick={() => setSortType('number')} className={`${sortType === 'number' && activeClass} w-full px-4 py-3 rounded-2xl`}>{t('iot.project.interface.sort.last_insert')}</button>
                    </div>
                    {capteurs && capteurs.length !== 0 ? (
                        <CapteursList capteurs={capteurs} />
                    ) : (
                        <p>{t('datasets.noData')}</p>
                    )}
                </Widget>
            </div>
        </div>
    );
}