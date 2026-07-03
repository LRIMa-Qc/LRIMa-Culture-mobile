import { AppBar } from "../components/appbar/AppBar";
import { ChangeIndicatorList } from "../components/indicator-list/ChangeInidicatorList";
import { Widget } from "../components/dashboard/widget/Widget";
import { LogsList } from "../components/loggings/LogsList";
import { CultureCapteur } from "./Capteurs/Capteurs";
import { CAPTEUR_BATTERY_VOLTAGE, CapteurInfo } from "./Capteurs/Capteur";


import { TbTemperature as Temperature } from "react-icons/tb";
import { TbDroplet as Humidity } from "react-icons/tb";
import { TbBulb as Luminosity } from "react-icons/tb";
import { TbBolt as Battery } from "react-icons/tb";
import { MdCo2 as CO2 } from "react-icons/md";

import { useTranslation } from "react-i18next";

import { useSerreStore } from "../stores/serreStore";
import { useProject } from "../setup/AppDecorator/getProject";

export default function Overview() {
    // const { project } = useIoTProject();

    const { serreId } = useSerreStore();
    const { project } = useProject(serreId);

    const { t } = useTranslation();

    const capteurs = (project?.layout as unknown as { capteurs: CultureCapteur[] })?.capteurs;
    const capteursInfo = capteurs?.map(capteur => project?.document[capteur.no]);

    console.log(project);

    const average =
        capteursInfo?.length
            ? (() => {
                const result = capteursInfo.reduce(
                    (acc: any, curr: any) => {
                        acc.temperature += curr.temperature;
                        acc.batterie += curr.batterie;
                        acc.gnd_humidity += curr.gnd_humidity;
                        acc.gnd_temperature += curr.gnd_temperature;
                        acc.humidity += curr.humidity;
                        acc.luminosite += curr.luminosite;

                        if (curr.co2 != null && curr.co2 !== 0) {
                            acc.co2 += curr.co2;
                            acc.co2Count++;
                        }


                        return acc;
                    },
                    {
                        temperature: 0,
                        batterie: 0,
                        gnd_humidity: 0,
                        gnd_temperature: 0,
                        humidity: 0,
                        luminosite: 0,
                        co2: 0,
                        co2Count: 0,
                    }
                );

                return {
                    temperature: result.temperature / capteursInfo.length,
                    batterie: result.batterie / capteursInfo.length,
                    gnd_humidity: result.gnd_humidity / capteursInfo.length,
                    gnd_temperature: result.gnd_temperature / capteursInfo.length,
                    humidity: result.humidity / capteursInfo.length,
                    luminosite: result.luminosite / capteursInfo.length,
                    co2: result.co2Count > 0 ? result.co2 / result.co2Count : 0,
                };
            })()
            : undefined;

    const {
        batterie = t('datasets.noData'),
        gnd_humidity = t('datasets.noData'),
        gnd_temperature = t('datasets.noData'),
        humidity = t('datasets.noData'),
        luminosite = t('datasets.noData'),
        temperature = t('datasets.noData'),
        co2 = t('datasets.noData')
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
            <AppBar label={t('iot.object.overview.name')} />
            <div className="mx-5 space-y-10">
                <Widget label={t('module.settings.stats.title')}>
                    <ChangeIndicatorList
                        indicators={[
                            {
                                Icon: Temperature,
                                color: 'sky',
                                label: `${t('culture.sensor.temperature')} (${t('culture.sensor.air')})`,
                                value: Number(temperature).toFixed(2) + '°C'
                            },
                            {
                                Icon: Temperature,
                                color: 'sky',
                                label: `${t('culture.sensor.temperature')} (${t('culture.sensor.ground')})`,
                                value: Number(gnd_temperature).toFixed(2) + '°C'
                            },
                            {
                                Icon: Luminosity,
                                color: 'emerald',
                                label: t('culture.sensor.luminosity'),
                                value: Number(luminosite).toFixed(2) + '%'
                            },
                            {
                                Icon: CO2,
                                color: 'emerald',
                                label: 'CO2',
                                value: Number(co2).toFixed(0) + ' ppm',
                            },
                            {
                                Icon: Humidity,
                                color: 'indigo',
                                label: `${t('culture.sensor.humidity')} (${t('culture.sensor.air')})`,
                                value: Number(humidity).toFixed(2) + '%',
                            },
                            {
                                Icon: Humidity,
                                color: 'indigo',
                                label: `${t('culture.sensor.humidity')} (${t('culture.sensor.ground')})`,
                                value: Number(gnd_humidity).toFixed(2) + '%'
                            },
                            {
                                Icon: Battery,
                                color: 'red',
                                label: t('culture.sensor.battery'),
                                value: (100 * (Number(batterie) / CAPTEUR_BATTERY_VOLTAGE)).toFixed(2) + '%',
                            },
                        ]}
                    />
                </Widget>
                {/* <Widget label="Log">
                    <LogsList logs={[]} />
                </Widget> */}
            </div>
        </div>
    );
}
