import { TbBuildingBroadcastTower as CapteursIcon } from "react-icons/tb";
import { IndicatorList } from "../indicator-list/InidicatorList";
import { IndicatorType } from "../indicator/Indicator";
import { CultureCapteur } from "../../pages/Capteurs/IoTProjet";

export interface CapteursType {
    capteurs: CultureCapteur[]
}

export default function CapteursList({ capteurs }: CapteursType) {

    return (
        <IndicatorList
            indicators={capteurs.map(capteur => (
                {
                    // TODO: State
                    color: capteur.category === 'working' ? 'emerald' : 'red',
                    Icon: CapteursIcon,
                    // TODO: State
                    children: <p>{capteur.category === 'working' ? 'En marche' : 'En arrêt'}</p>,
                    label: capteur.name
                } satisfies IndicatorType
            ))}
        />
    );
}
