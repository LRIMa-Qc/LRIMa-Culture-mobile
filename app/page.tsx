import { AppBar } from "@/components/appbar/AppBar";
import { Widget } from "@/components/dashboard/widget/Widget";
import { ChangeIndicatorList } from "@/components/indicator-list/ChangeInidicatorList";

import { TbTemperature as Temperature } from "react-icons/tb";

export default function Home() {
  return (
    <div className="space-y-5">
      <AppBar label="Vue d'ensemble" />
      <div className="mx-5">
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
      </div>
    </div>
  );
}
