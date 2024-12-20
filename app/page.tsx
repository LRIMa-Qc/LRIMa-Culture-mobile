import { AppBar } from "@/components/appbar/AppBar";
import { Widget } from "@/components/dashboard/widget/Widget";
import { IndicatorList } from "@/components/indicator-list/InidicatorList";

import { TbTemperature as Temperature } from "react-icons/tb";

export default function Home() {
  return (
    <div className="">
      <AppBar label="Vue d'ensemble" />
      <div className="mx-5">
        <Widget label="Statistiques">
          <IndicatorList
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
