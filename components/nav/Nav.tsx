import { AliveCultureLogo } from "../aliveculture-logo/AliveCultureLogo";
import { TbX as CloseIcon } from "react-icons/tb";
import { NavItem } from "./NavItem";

import { TbHome as HomeIcon } from "react-icons/tb";
import { TbBuildingBroadcastTower as CapteursIcon } from "react-icons/tb";
import { TbHeartBolt as HeartBolt } from "react-icons/tb";
import { TbDeviceDesktop as GraphIcon } from "react-icons/tb";
import { TbSandbox as SandboxIcon } from "react-icons/tb";
import { TbCpu as CPUIcon } from "react-icons/tb";
import { TbBellMinus as AlertIcon } from "react-icons/tb";
import { TbDatabase as DBIcon } from "react-icons/tb";
import { TbRouter as RouterIcon } from "react-icons/tb";

export function Nav({ onCloseClick }: { onCloseClick: () => void }) {
    return (
        <nav className={"h-screen absolute top-0 left-0 w-full max-w-xs border border-l-0 rounded-r-xl border-slate-200 p-5 space-y-5 z-10 bg-white/80 backdrop-blur"}>
            <div className="flex items-center justify-between text-xl text-slate-900">
                <AliveCultureLogo />
                <CloseIcon onClick={onCloseClick} />
            </div>
            <div className="flex flex-col gap-1">
                <NavItem label="Vue d'ensemble" icon={<HomeIcon />} />
                <NavItem label="Capteurs" icon={<CapteursIcon />} active />
                <NavItem label="Actionneurs" icon={<HeartBolt />} />
                <NavItem label="Graphiques" icon={<GraphIcon />} />
                <NavItem label="Bac à sable" icon={<SandboxIcon />} />
                <NavItem label="Procédures" icon={<CPUIcon />} />
                <NavItem label="Alertes" icon={<AlertIcon />} />
                <NavItem label="Données" icon={<DBIcon />} />
                <NavItem label="Appareils" icon={<RouterIcon />} />
            </div>
        </nav>
    )
}