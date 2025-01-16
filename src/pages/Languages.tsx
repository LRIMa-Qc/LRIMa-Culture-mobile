import { AppBar } from "../components/appbar/AppBar";
import { Widget } from "../components/dashboard/widget/Widget";
import { IndicatorList } from "../components/indicator-list/InidicatorList";

import { TbLanguage as Icon } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {TbArrowNarrowRight as RightArrow} from 'react-icons/tb';

export interface Project {
    id: string;
    name: string;
}

export default function Languages() {
    const navigate = useNavigate();
    const {t} = useTranslation();

    const {i18n} = useTranslation();

    function changeLanguage(lng: string) {
        i18n.changeLanguage(lng);
        navigate('/');
    }

    const languages = ['ar', 'fr', 'en']
    return (
        <div className="space-y-5">
            <AppBar label={t('msg.change_langauge')} />
            <div className="mx-5 space-y-10">
                <Widget label={t('msg.language')}>
                <IndicatorList indicators={
                        languages.map((language) => ({
                            label: language,
                            color: 'sky',
                            Icon,
                            onClick: () => changeLanguage(language),
                            children: <button onClick={() => {changeLanguage(language)}}><RightArrow className="ltr:scale-100 rtl:-scale-100"/></button>
                        }))
                    }
                />
                </Widget>
            </div>
        </div>
    );
}