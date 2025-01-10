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
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "@alivecode/core/api";

import { LineChart } from '@mui/x-charts/LineChart';

import _ from "lodash";
import { LineSeriesType } from "@mui/x-charts";

const NUMBER_OF_ELEMENTS = 15;


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

    // TODO: Use AliveCore Abstraction.
    const {axios} = useContext(ApiContext);

    const [series, setSeries] = useState<LineSeriesType[]>([]);

    useEffect(() => {
        axios.get(`/iot/projects/${project.id}/datasets`)
            .then(({data}) => {
                const capteurs = data as unknown as any[];
                const c = capteurs.find(c => c.noCapteur === capteurId);

                axios.get(`datasets/${c.id}/rows/all`).then(data => {
                    const rows = data.data as any[];

                    console.log(c);

                    const processed = _.unzip(
                        rows
                        .sort((a, b) => {
                            const bDate = new Date(b.createDate);
                            const aDate = new Date(a.createDate);

                            return bDate.getTime() - aDate.getTime();
                        })
                        .slice(0, NUMBER_OF_ELEMENTS)
                        .map(c => {
                            console.log(c);
                            
                            return c.data
                        })
                    );

                    const series: LineSeriesType[] = [
                        {
                            label: "Température",
                            data: processed[0] as number[],
                            type: "line"
                        },
                        {
                            label: "Température (sol)",
                            data: processed[1] as number[],
                            type: "line"
                        },
                        {
                            label: "Humidité (sol)",
                            data: processed[2] as number[],
                            type: "line"
                        },
                        {
                            label: "Luminosité",
                            data: processed[3] as number[],
                            type: "line"
                        }
                    ]

                    console.log("Rows", rows);
                    console.log("Series", series);

                    setSeries(series);
                })
            })
    }, [])

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
                <Widget label="Graphique">
                    {
                        series && series[0]?.data ? (
                            <LineChart
                                // xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16] }]}
                                series={series}
                                height={300}
                                margin={{ top: 100, bottom: 50 }}
                                className="[&>*]:-z-10"
                            /> 
                        ) : (
                            <p>No Data</p>
                        )
                    }
                                                    
                </Widget>
            </div>
        </div>
    );
}
