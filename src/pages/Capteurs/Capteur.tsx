import { ChangeIndicatorList } from "../../components/indicator-list/ChangeInidicatorList";
import { Widget } from "../../components/dashboard/widget/Widget";
import { AppBar } from "../../components/appbar/AppBar";
import { useNavigate, useParams } from "react-router-dom";

import { TbTemperature as Temperature } from "react-icons/tb";
import { TbDroplet as Humidity } from "react-icons/tb";
import { TbBulb as Luminosity } from "react-icons/tb";
import { TbBolt as Battery } from "react-icons/tb";
import { CultureCapteur } from "./Capteurs";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "@alivecode/core/api";

import { LineChart } from '@mui/x-charts/LineChart';

import _ from "lodash";
import { LineSeriesType } from "@mui/x-charts";
import { useTranslation } from "react-i18next";
import { useSerreStore } from "../../stores/serreStore";
import { ThemeProvider } from "@mui/material";

const NUMBER_OF_ELEMENTS = 30;

export const CAPTEUR_BATTERY_VOLTAGE = 3.3;

export interface CapteurInfo {
    batterie: number,
    gnd_humidity: number,
    gnd_temperature: number,
    humidity: number,
    luminosite: number,
    temperature: number
}

import { createTheme } from '@mui/material/styles';
import { transformDate } from "../../utils/date";

const getTheme = (language: string) => createTheme({
    direction: language === 'ar' ? 'rtl' : 'ltr',
});

function isIOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

export interface CapteurDataset {
    cols: any[],
    createDate: string;
    description: string;
    id: string;
    insertOnUpdate: boolean;
    lastInsert: string;
    name: string;
    nbGraphsCreated: number;
    noCapteur: string;
    order: number[];
    originalId: never;
    updateDate: string;
    userId: string;
}

export default function Capteur() {
    const { t, i18n } = useTranslation();

    const { capteurId } = useParams();
    const { serreId } = useSerreStore();

    const navigate = useNavigate();


    // TODO: Use AliveCore Abstraction.
    const { axios } = useContext(ApiContext);

    const [series, setSeries] = useState<LineSeriesType[]>([]);
    const [capteurInfo, setCapteurInfo] = useState<CapteurInfo>()
    const [capteur, setCapteur] = useState<CultureCapteur>();
    const [capteurDataset, setCapteurDataset] = useState<CapteurDataset | undefined>(undefined);

    useEffect(() => {
        function reverse(label: string) {
            return isIOS() && i18n.language === "ar" ? label.split("").reverse().join("") : label;
        }

        axios.get(
            `iot/projects/${serreId}`,
        ).then(
            (data) => {
                const project = data.data;
                const capteur = (project.layout as unknown as { capteurs: CultureCapteur[] }).capteurs.find(cap => cap.no === capteurId);
                const capteurInfo = project.document[capteurId!];
                setCapteurInfo(capteurInfo);
                setCapteur(capteur);

                axios.get(`/iot/projects/${serreId}/datasets`)
                    .then(({ data }) => {
                        const capteurs = data as unknown as any[];
                        const c = capteurs.find(c => c.noCapteur === capteurId);
                        setCapteurDataset(c);
                        if (!c) {
                            return navigate("/404");
                        }

                        axios.get(`datasets/${c.id}/rows/all`).then(data => {
                            const rows = data.data as any[];

                            const processed = _.unzip(
                                rows
                                    .sort((a, b) => {
                                        const bDate = new Date(b.createDate);
                                        const aDate = new Date(a.createDate);

                                        return bDate.getTime() - aDate.getTime();
                                    })
                                    .slice(0, NUMBER_OF_ELEMENTS)
                                    .map(c => c.data)
                            );

                            const series: LineSeriesType[] = [
                                {
                                    label: reverse(`${t('culture.sensor.temperature')} (${t('culture.sensor.air')})`),
                                    data: processed[0] as number[],
                                    type: "line"
                                },
                                {
                                    label: reverse(`${t('culture.sensor.temperature')} (${t('culture.sensor.ground')})`),
                                    data: processed[1] as number[],
                                    type: "line"
                                },
                                {
                                    label: reverse(`${t('culture.sensor.humidity')} (${t('culture.sensor.ground')})`),
                                    data: processed[2] as number[],
                                    type: "line"
                                },
                                {
                                    label: reverse(t('culture.sensor.luminosity')),
                                    data: processed[3] as number[],
                                    type: "line"
                                }

                            ]

                            setSeries(series);
                        })
                    })
            }
        )
    }, [capteurId, serreId, axios, t, navigate])

    if (!capteurInfo) {
        return "Wait..."
    }

    const { batterie, gnd_humidity, gnd_temperature, humidity, luminosite, temperature } = capteurInfo;

    return (
        <div className="space-y-5">
            <AppBar label={`${t('iot.project.interface.name')}: ${capteur!.name || capteur!.no}`} />
            <div className="mx-5 space-y-10">
                <Widget label={t('module.settings.stats.title')}>
                    <time className="block py-2">
                        {t('culture.sensor.timesince')} {transformDate(new Date(capteurDataset?.lastInsert || ""))}
                    </time>
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
                                value: (100 * (Number(batterie) / CAPTEUR_BATTERY_VOLTAGE)).toFixed(2) + '%',
                            },
                        ]}
                    />
                </Widget>
                <Widget label={t('iot.project.interface.components.graph.name')}>

                    {
                        series && series[0]?.data ? (
                            <ThemeProvider theme={getTheme(i18n.language)}>
                                {series.map(serie => (
                                    <LineChart
                                        key={serie.id}
                                        // xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16] }]}
                                        series={[serie]}
                                        sx={{
                                            '& *': {
                                                //   unicodeBidi: 'plaintext',
                                                //   direction: 'rtl',
                                                //   textAlign: 'start',
                                            },
                                        }}
                                        height={300}
                                        margin={{ top: 100, bottom: 50 }}
                                        className="[&>*]:-z-10"
                                    />

                                ))}
                            </ThemeProvider>
                        ) : (
                            <p>{t('datasets.noData')}</p>
                        )
                    }

                </Widget>
            </div>
        </div>
    );
}
