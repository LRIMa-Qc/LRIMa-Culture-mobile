import { ChangeIndicatorList } from "../../components/indicator-list/ChangeInidicatorList";
import { Widget } from "../../components/dashboard/widget/Widget";
import { AppBar } from "../../components/appbar/AppBar";
import { Navigate, useParams } from "react-router-dom";
import { useIoTProject } from "@alivecode/core/iot";

import { TbTemperature as Temperature } from "react-icons/tb";
import { TbDroplet as Humidity } from "react-icons/tb";
import { TbBulb as Luminosity } from "react-icons/tb";
import { TbBolt as Battery } from "react-icons/tb";
import { CultureCapteur } from "./Capteurs";

export const CAPTEUR_BATTERY_VOLTAGE = 3.3;

export interface CapteurInfo {
    batterie: number,
    gnd_humidity: number,
    gnd_temperature: number,
    humidity: number,
    luminosite: number,
    temperature: number
}

export default function Capteur() {
    const {capteurId} = useParams();

    const {project} = useIoTProject();

    const capteurInfo = project.document[capteurId!];

    if (!capteurInfo) {
        return <Navigate to="/404" replace/>
    }

    const capteur = (project.layout as unknown as {capteurs: CultureCapteur[]}).capteurs.find(cap => cap.no === capteurId);

    const {batterie, gnd_humidity, gnd_temperature, humidity, luminosite, temperature} = capteurInfo as unknown as CapteurInfo;

    return (
        <div className="space-y-5">
            <AppBar label={"Capteur: " + capteur!.name} />
            <div className="mx-5 space-y-10">
                <Widget label="Statistiques">
                    <ChangeIndicatorList
                        indicators={[
                            {
                                Icon: Temperature,
                                color: 'sky',
                                label: 'Température',
                                value: temperature + '°C'
                            },
                            {
                                Icon: Temperature,
                                color: 'sky',
                                label: 'Temperature du sol',
                                value: gnd_temperature + '°C'
                            },
                            {
                                Icon: Luminosity,
                                color: 'emerald',
                                label: 'Luminosité',
                                value: luminosite + '%'
                            },
                            {
                                Icon: Humidity,
                                color: 'indigo',
                                label: 'Humidité',
                                value: humidity + '%',
                            },
                            {
                                Icon: Humidity,
                                color: 'indigo',
                                label: 'Humidité du sol',
                                value: gnd_humidity + '%'
                            },
                            {
                                Icon: Battery,
                                color: 'red',
                                label: 'Batterie',
                                value: (100*(batterie / CAPTEUR_BATTERY_VOLTAGE)).toFixed(2) + '%',
                            },
                        ]}
                    />
                </Widget>
            </div>
        </div>
    );
}
