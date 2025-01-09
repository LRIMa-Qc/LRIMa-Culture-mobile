import { TbHome as HomeIcon } from "react-icons/tb";
import { TbBuildingBroadcastTower as CapteursIcon } from "react-icons/tb";

import { TbDoorEnter as SignIn } from "react-icons/tb";
import { TbDoorEnter as SignUp } from "react-icons/tb";
import { TbObjectScan as Detection } from "react-icons/tb";

import { NavItemType } from "./components/nav/NavItem";


export const AUTH_NAV_ELEMENTS = [
    {
        label: "Vue d'ensemble",
        href: "/overview",
        Icon: HomeIcon
    },
    {
        label: "Capteurs",
        href: "/capteurs",
        Icon: CapteursIcon,
    },
    {
        label: "Detection",
        href: "/detection",
        Icon: Detection
    }
] satisfies NavItemType[]

export const NON_AUTH_NAV_ELEMENTS = [
    {
        label: "Se connecter",
        href: "/signin",
        Icon: SignIn,
        reload: true,
    },
    {
        label: "S'inscrire",
        href: "/signup",
        Icon: SignUp,
        reload: true,
    }
] satisfies NavItemType[]