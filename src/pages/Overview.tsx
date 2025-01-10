import { AppBar } from "../components/appbar/AppBar";
import { ChangeIndicatorList } from "../components/indicator-list/ChangeInidicatorList";
import { Widget } from "../components/dashboard/widget/Widget";
import { LogsList } from "../components/loggings/LogsList";
import { CultureCapteur } from "./Capteurs/Capteurs";
import { useIoTProject } from "@alivecode/core/iot";
import { CAPTEUR_BATTERY_VOLTAGE, CapteurInfo } from "./Capteurs/Capteur";


import { TbTemperature as Temperature } from "react-icons/tb";
import { TbDroplet as Humidity } from "react-icons/tb";
import { TbBulb as Luminosity } from "react-icons/tb";
import { TbBolt as Battery } from "react-icons/tb";
import { useTranslation } from "react-i18next";

export default function Overview() {
    const { project } = useIoTProject();

    const {t} = useTranslation();

    const capteurs = (project.layout as unknown as {capteurs: CultureCapteur[]}).capteurs;
    const capteursInfo = capteurs.map(capteur => project.document[capteur.no]);

    const average = (capteursInfo.length !== 0 ? capteursInfo.reduce((prev: any, curr: any) => ({
        temperature: prev.temperature || 0 + curr.temperature / capteursInfo.length,
        batterie: prev.batterie || 0 + curr.batterie / capteursInfo.length,
        gnd_humidity: prev.gnd_humidity || 0 + curr.gnd_humidity / capteursInfo.length,
        gnd_temperature: prev.gnd_temperature || 0 + curr.gnd_temperature / capteursInfo.length,
        humidity: prev.humidity || 0 + curr.humidity / capteursInfo.length,
        luminosite: prev.luminosite || 0 + curr.luminosite / capteursInfo.length,
    })) : undefined) as unknown as CapteurInfo | undefined;

    const {
        batterie = t('datasets.noData'),
        gnd_humidity = t('datasets.noData'),
        gnd_temperature = t('datasets.noData'),
        humidity = t('datasets.noData'),
        luminosite = t('datasets.noData'),
        temperature = t('datasets.noData')
    } = average || {};

    // const DUMMY_LOGS = [
    //     {
    //         message: "Relais 1 déconnecté",
    //         timestamp: new Date(2024, 12, 10, 5, 29)
    //     },
    //     {
    //         message: "Relais 2 déconnecté",
    //         timestamp: new Date(2024, 12, 10, 5, 24)
    //     },
    //     {
    //         message: "Relais 4 déconnecté",
    //         timestamp: new Date(2024, 12, 10, 5, 23)
    //     },
    //     {
    //         message: "Relais 5 déconnecté",
    //         timestamp: new Date(2024, 12, 10, 5, 22)
    //     },

    //     {
    //         message: "Relais 1 déconnecté",
    //         timestamp: new Date(2024, 12, 10, 4, 29)
    //     },
    //     {
    //         message: "Relais 2 déconnecté",
    //         timestamp: new Date(2024, 12, 10, 4, 24)
    //     },
    //     {
    //         message: "Relais 4 déconnecté",
    //         timestamp: new Date(2024, 12, 10, 3, 23)
    //     },
    //     {
    //         message: "Relais 5 déconnecté",
    //         timestamp: new Date(2024, 12, 10, 2, 22)
    //     },
    // ];


    return (
        <div className="space-y-5">
            <AppBar label={t('iot.project.summary.name')} />
            <div className="mx-5 space-y-10">
                <Widget label={t('module.settings.stats.title')}>
                    <ChangeIndicatorList
                        indicators={[
                            {
                                Icon: Temperature,
                                color: 'sky',
                                label: `${t('culture.sensor.temperature')} (${t('culture.sensor.air')})`,
                                value: temperature + '°C'
                            },
                            {
                                Icon: Temperature,
                                color: 'sky',
                                label: `${t('culture.sensor.temperature')} (${t('culture.sensor.ground')})`,
                                value: gnd_temperature + '°C'
                            },
                            {
                                Icon: Luminosity,
                                color: 'emerald',
                                label: t('culture.sensor.luminosity'),
                                value: luminosite + '%'
                            },
                            {
                                Icon: Humidity,
                                color: 'indigo',
                                label: `${t('culture.sensor.humidity')} (${t('culture.sensor.air')})`,
                                value: humidity + '%',
                            },
                            {
                                Icon: Humidity,
                                color: 'indigo',
                                label: `${t('culture.sensor.humidity')} (${t('culture.sensor.ground')})`,
                                value: gnd_humidity + '%'
                            },
                            {
                                Icon: Battery,
                                color: 'red',
                                label: t('culture.sensor.battery'),
                                value: (100*(Number(batterie) / CAPTEUR_BATTERY_VOLTAGE)).toFixed(2) + '%',
                            },                            
                        ]}
                    />
                </Widget>
                <Widget label="Log">
                    <LogsList logs={[]} />
                </Widget>
            </div>
        </div>
    );
}
