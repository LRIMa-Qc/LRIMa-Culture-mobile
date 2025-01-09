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

export function Nav({ onCloseClick, elements }: { onCloseClick: () => void, elements: NavItemType[] }) {
    const { logout } = useUserApi();
    const { user } = useContext(UserContext);

    function handleButtonClick() {
        logout();
    }

    const { project } = useIoTProject();
    const { serreId } = useSerreStore();

    return (
        <nav className={"h-screen absolute top-0 left-0 w-full max-w-xs border border-l-0 rounded-r-xl border-slate-200 p-5  bg-white/80 backdrop-blur flex flex-col justify-between"}>
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
                {/* TODO: Change for Serre Name */}
                <div className="">
                    <Link to="/serres" className="flex items-center justify-between p-5 bg-emerald-300 rounded-t-xl">
                        <p>Serre</p>
                        <SerreIcon/>
                    </Link>
                    <div className="flex items-center justify-between p-5 bg-emerald-200 rounded-b-xl line-clamp-1">
                        <p>{project ? project.name : serreId}</p>
                    </div>
                </div>
                {user &&
                    <button onClick={handleButtonClick} className="bg-emerald-100 text-emerald-500 rounded-xl p-3 hover:underline w-full">
                        Se déconnecter
                    </button>
                }
            </div>
            
        </nav>
    )
}