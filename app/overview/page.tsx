import { AppBar } from "@/components/appbar/AppBar";
import { Widget } from "@/components/dashboard/widget/Widget";
import { ChangeIndicatorList } from "@/components/indicator-list/ChangeInidicatorList";
import { LogsList } from "@/components/logs/LogsList";

import { TbTemperature as Temperature } from "react-icons/tb";

export default function Overview() {
    return (
        <div className="space-y-5">
            <AppBar label="Vue d'ensemble" />
            <div className="mx-5 space-y-10">
                <Widget label="Statistiques">
                    <ChangeIndicatorList
                        indicators={[
                            {
                                Icon: Temperature,
                                change: '+2%',
                                color: 'sky',
                                label: 'Température',
                                value: '25.7 °C'
                            },
                            {
                                Icon: Temperature,
                                change: '-12%',
                                color: 'emerald',
                                label: 'Luminosité',
                                value: '2643 lumens'
                            },
                            {
                                Icon: Temperature,
                                change: '+2%',
                                color: 'red',
                                label: 'Humidité',
                                value: '26%'
                            },
                            {
                                Icon: Temperature,
                                change: '+2%',
                                color: 'sky',
                                label: 'Temperature',
                                value: '25.7 °C'
                            }
                        ]}
                    />
                </Widget>
                <Widget label="Log">
                    <LogsList logs={[
                        {
                            message: "Relais 1 déconnecté",
                            timestamp: new Date(2024, 12, 10, 5, 29)
                        },
                        {
                            message: "Relais 2 déconnecté",
                            timestamp: new Date(2024, 12, 10, 5, 24)
                        },
                        {
                            message: "Relais 4 déconnecté",
                            timestamp: new Date(2024, 12, 10, 5, 23)
                        },
                        {
                            message: "Relais 5 déconnecté",
                            timestamp: new Date(2024, 12, 10, 5, 22)
                        },

                        {
                            message: "Relais 1 déconnecté",
                            timestamp: new Date(2024, 12, 10, 4, 29)
                        },
                        {
                            message: "Relais 2 déconnecté",
                            timestamp: new Date(2024, 12, 10, 4, 24)
                        },
                        {
                            message: "Relais 4 déconnecté",
                            timestamp: new Date(2024, 12, 10, 3, 23)
                        },
                        {
                            message: "Relais 5 déconnecté",
                            timestamp: new Date(2024, 12, 10, 2, 22)
                        },
                    ]} />
                </Widget>
            </div>
        </div>
    );
}
