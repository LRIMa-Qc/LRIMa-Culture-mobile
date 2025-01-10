import { useContext, useState } from "react";
import { Nav } from "../nav/Nav";

import { TbAlignLeft as MenuIcon } from "react-icons/tb";
import { UserContext } from "@alivecode/core";

import { TbHome as HomeIcon } from "react-icons/tb";
import { TbBuildingBroadcastTower as CapteursIcon } from "react-icons/tb";

import { TbDoorEnter as SignIn } from "react-icons/tb";
import { TbDoorEnter as SignUp } from "react-icons/tb";
import { TbObjectScan as Detection } from "react-icons/tb";
import { NavItemType } from "../nav/NavItem";
import { useTranslation } from "react-i18next";

export function AppBar({ label }: { label: string }) {

    const { user } = useContext(UserContext);

    const [isOpen, setIsOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsOpen((isOpen) => !isOpen);
    }

    const {t} = useTranslation();

    const AUTH_NAV_ELEMENTS = [
        {
            label: t('iot.project.summary.name'),
            href: "/overview",
            Icon: HomeIcon
        },
        {
            label: t('iot.project.interface.name'),
            href: "/capteurs",
            Icon: CapteursIcon,
        },
        {
            label: t('iot.project.camera.name'),
            href: "/detection",
            Icon: Detection
        }
    ] satisfies NavItemType[]
    
    const NON_AUTH_NAV_ELEMENTS = [
        {
            label: t('msg.auth.signin'),
            href: "/signin",
            Icon: SignIn,
            reload: true,
        },
        {
            label: t('msg.auth.signup'),
            href: "/signup",
            Icon: SignUp,
            reload: true,
        }
    ] satisfies NavItemType[]

    return (
        <header className="p-5">
            <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} absolute w-full h-full top-0 left-0 transition-transform`}>
                <Nav elements={user ? AUTH_NAV_ELEMENTS : NON_AUTH_NAV_ELEMENTS} onCloseClick={toggleMenu} />
            </div>
            <div className="flex gap-2 font-medium text-stone-900">
                <MenuIcon onClick={toggleMenu} className="text-2xl" />
                <p>{label}</p>
            </div>
        </header>
    )
}