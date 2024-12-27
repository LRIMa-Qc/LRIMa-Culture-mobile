import { IndicatorList } from "@/components/indicator-list/InidicatorList";
import { type IndicatorType } from "@/components/indicator/Indicator";

import { TbBuildingBroadcastTower as CapteursIcon } from "react-icons/tb";

export interface Capteur {
    name: string;
    state: 'working' | 'stopped';
    // id: string; TODO
}

export interface CapteursType {
    capteurs: Capteur[]
}

export default function CapteursList({ capteurs }: CapteursType) {
    return (
        <IndicatorList
            indicators={capteurs.map(capteur => (
                {
                    color: capteur.state === 'working' ? 'emerald' : 'red',
                    Icon: CapteursIcon,
                    children: <p>{capteur.state === 'working' ? 'En marche' : 'En arrêt'}</p>,
                    label: capteur.name
                } satisfies IndicatorType
            ))}
        />
    );
}
