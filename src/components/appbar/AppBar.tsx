import { useContext, useState } from "react";
import { Nav } from "../nav/Nav";

import { TbAlignLeft as MenuIcon } from "react-icons/tb";
import { AUTH_NAV_ELEMENTS, NON_AUTH_NAV_ELEMENTS } from "../../Constants";
import { UserContext } from "@alivecode/core";

export function AppBar({ label }: { label: string }) {

    const { user } = useContext(UserContext);

    const [isOpen, setIsOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsOpen((isOpen) => !isOpen);
    }

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