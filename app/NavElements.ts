import { NavItemType } from "@/components/nav/NavItem";
import { TbHome as HomeIcon } from "react-icons/tb";
import { TbBuildingBroadcastTower as CapteursIcon } from "react-icons/tb";


export const NAV_ELEMENTS = [
    {
        label: "Vue d'ensemble",
        href: "overview",
        Icon: HomeIcon
    },
    {
        label: "Capteurs",
        href: "capteurs",
        Icon: CapteursIcon
    }
] satisfies NavItemType[]