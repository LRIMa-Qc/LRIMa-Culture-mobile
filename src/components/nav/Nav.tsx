import { AliveCultureLogo } from "../aliveculture-logo/AliveCultureLogo";
import { TbX as CloseIcon } from "react-icons/tb";
import { NavItem, NavItemType } from "./NavItem";
import { useUserApi } from "@alivecode/core/api";
import { useContext } from "react";
import { UserContext } from "@alivecode/core";

import { TbArrowNarrowRight as SerreIcon } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useIoTProject } from "@alivecode/core/iot";
import { useSerreStore } from "../../stores/serreStore";
import { useTranslation } from "react-i18next";

export function Nav({ onCloseClick, elements }: { onCloseClick: () => void, elements: NavItemType[] }) {
    const { logout } = useUserApi();
    const { user } = useContext(UserContext);

    const {t, i18n} = useTranslation();

    function handleButtonClick() {
        logout();
    }

    const { project } = useIoTProject();
    const { serreId } = useSerreStore();

    return (
        <nav className={"h-svh fixed top-0 ltr:left-0 rtl:right-0 w-full max-w-xs border ltr:border-l-0 rtl:border-r-0 ltr:rounded-r-xl rtl:rounded-l-xl border-slate-200 p-5 bg-white/80 backdrop-blur flex flex-col justify-between z-50"}>
            <div className="space-y-10 z-10">
                <div className="flex items-center justify-between text-xl text-slate-900">
                    <AliveCultureLogo />
                    <CloseIcon onClick={onCloseClick} />
                </div>
                <div className="flex flex-col gap-3">
                    {elements.map(el => <NavItem key={el.label} {...el} />)}
                </div>
            </div>
            <div className="space-y-5">
                <div className="">
                    <Link to="/serres" className="flex items-center justify-between p-5 bg-emerald-300 rounded-t-xl">
                        <p>{t('msg.change_serre')}</p>
                        <SerreIcon className="ltr:scale-100 rtl:-scale-100"/>
                    </Link>
                    <div className="flex items-center justify-between p-5 bg-emerald-200 rounded-b-xl line-clamp-1">
                        <p>{project ? project.name : serreId}</p>
                    </div>
                </div>
                <div className="">
                    <Link to="/languages" className="flex items-center justify-between p-5 bg-emerald-300 rounded-t-xl">
                        <p>{t('msg.change_langauge')}</p>
                        <SerreIcon className="ltr:scale-100 rtl:-scale-100"/>
                    </Link>
                    <div className="flex items-center justify-between p-5 bg-emerald-200 rounded-b-xl line-clamp-1">
                        <p>{i18n.language}</p>
                    </div>
                </div>
                {user &&
                    <button onClick={handleButtonClick} className="bg-emerald-100 text-emerald-500 rounded-xl p-3 hover:underline w-full">
                        {t('msg.auth.signout')}
                    </button>
                }
            </div>
            
        </nav>
    )
}