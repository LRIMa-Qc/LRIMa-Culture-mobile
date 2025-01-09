import { IndicatorList } from "../indicator-list/InidicatorList";
import { IndicatorType } from "../indicator/Indicator";
import { CultureCapteur } from "../../pages/Capteurs/Capteurs";
import { Link } from "react-router-dom";
import { CULTURE_TYPE, IconFromCateogry } from "../capteur/IconFromCategory";

export interface CapteursType {
    capteurs: CultureCapteur[]
}

export default function CapteursList({ capteurs }: CapteursType) {

    return (
        <IndicatorList
            indicators={capteurs.map(capteur => {

                return {
                    // TODO: State
                    color: 'sky',
                    Icon: IconFromCateogry(capteur.category as CULTURE_TYPE),
                    // TODO: State
                    children: <Link to={capteur.no}>Voir</Link>,
                    label: capteur.name
                } satisfies IndicatorType

            })}
        />
    );
}
