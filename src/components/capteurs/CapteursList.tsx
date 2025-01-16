import { IndicatorList } from "../indicator-list/InidicatorList";
import { IndicatorType } from "../indicator/Indicator";
import { CultureCapteur } from "../../pages/Capteurs/Capteurs";
import { Link } from "react-router-dom";
import { CULTURE_TYPE, IconFromCateogry } from "../capteur/IconFromCategory";
import {TbArrowNarrowRight as RightArrow} from 'react-icons/tb';

export interface CapteursType {
    capteurs: CultureCapteur[]
}

export default function CapteursList({ capteurs }: CapteursType) {

    console.log(capteurs);

    return (
        <IndicatorList
            indicators={capteurs.map(capteur => {
                return {
                    color: 'sky',
                    Icon: IconFromCateogry(capteur.category as CULTURE_TYPE),
                    href: capteur.no,
                    children: <Link to={capteur.no}><RightArrow className="ltr:scale-100 rtl:-scale-100"/></Link>,
                    label: capteur.name || capteur.no
                } satisfies IndicatorType

            })}
        />
    );
}
