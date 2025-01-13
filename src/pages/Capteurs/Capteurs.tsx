import { AppBar } from "../../components/appbar/AppBar";
import CapteursList from "../../components/capteurs/CapteursList";
import { Widget } from "../../components/dashboard/widget/Widget";
import { useTranslation } from "react-i18next";
import { useSerreStore } from "../../stores/serreStore";
import { useProject } from "../../setup/AppDecorator/getProject";
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

    const {serreId} = useSerreStore();
    const {project} = useProject(serreId);

    const {t} = useTranslation();

    const capteurs = (project?.layout as unknown as {capteurs: CultureCapteur[]})?.capteurs;

    return (
        <div className="space-y-5">
            <AppBar label={t('iot.project.interface.name')} />
            <div className="mx-5 space-y-10">
                <Widget label={t('iot.project.interface.name')}>
                    {capteurs && capteurs.length !== 0 ? (
                        <CapteursList capteurs={capteurs} />
                    ): (
                        <p>{t('datasets.noData')}</p>
                    )}
                </Widget>
            </div>
        </div>
    );
}