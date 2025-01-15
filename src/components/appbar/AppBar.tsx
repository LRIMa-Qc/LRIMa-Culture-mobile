import { useContext, useState } from "react";
import { Nav } from "../nav/Nav";

import { TbAlignLeft as MenuIconLtr } from "react-icons/tb";
import { TbAlignRight as MenuIconRtl } from "react-icons/tb";
import { UserContext } from "@alivecode/core";

import { TbHome as HomeIcon } from "react-icons/tb";
import { TbBuildingBroadcastTower as CapteursIcon } from "react-icons/tb";

import { TbDoorEnter as SignIn } from "react-icons/tb";
import { TbDoorEnter as SignUp } from "react-icons/tb";
import { TbObjectScan as Detection } from "react-icons/tb";
import { NavItemType } from "../nav/NavItem";
import { useTranslation } from "react-i18next";

import Wave from 'react-wavify';

export function AppBar({ label }: { label: string }) {

    const { user } = useContext(UserContext);

    const [isOpen, setIsOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsOpen((isOpen) => !isOpen);
    }

    const {t} = useTranslation();

    const AUTH_NAV_ELEMENTS = [
        {
            label: t('iot.object.overview.name'),
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
        <header className="p-5 relative">
             <Wave fill='#6ee7b7'
                paused={false}
                className="rotate-180 absolute top-0 right-0 -z-10 h-52"
                style={{ display: 'flex' }}
                options={{
                amplitude: 20,
                speed: 0.15,
                points: 3
                }}
            />
            <div className={`${isOpen ? 'translate-x-0' : 'ltr:-translate-x-full rtl:translate-x-full'} fixed w-full h-full top-0 ltr:left-0 rtl:right-0 transition-transform z-50`}>
                <Nav elements={user ? AUTH_NAV_ELEMENTS : NON_AUTH_NAV_ELEMENTS} onCloseClick={toggleMenu} />
            </div>
            <div className="flex gap-2 font-medium text-stone-900">
                <MenuIconLtr onClick={toggleMenu} className="text-2xl rtl:hidden" />    
                <MenuIconRtl onClick={toggleMenu} className="text-2xl ltr:hidden" />
                <p>{label}</p>
            </div>
        </header>
    )
}