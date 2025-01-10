import { useIoTProject } from "@alivecode/core/iot";
import { AppBar } from "../../components/appbar/AppBar";
import CapteursList from "../../components/capteurs/CapteursList";
import { Widget } from "../../components/dashboard/widget/Widget";
import { useTranslation } from "react-i18next";
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

    const { project } = useIoTProject();

    const {t} = useTranslation();

    const capteurs = (project.layout as unknown as {capteurs: CultureCapteur[]}).capteurs;

    return (
        <div className="space-y-5">
            <AppBar label={t('iot.project.interface.name')} />
            <div className="mx-5 space-y-10">
                <Widget label={t('iot.project.interface.name')}>
                    {capteurs.length === 0 ? (
                         <p>{t('datasets.noData')}</p>
                    ): (
                        <CapteursList capteurs={capteurs} />
                    )}
                </Widget>
            </div>
        </div>
    );
}