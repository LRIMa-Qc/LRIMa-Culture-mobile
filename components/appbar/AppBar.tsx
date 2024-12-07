"use client";

import { useState } from "react";
import { Nav } from "../nav/Nav";

import { TbAlignLeft as MenuIcon } from "react-icons/tb";

export function AppBar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen((isOpen) => !isOpen);
    }

    return (
        <header className="p-5">
            <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} absolute w-full h-full top-0 left-0 transition-transform`}>
                <Nav onCloseClick={toggleMenu} />
            </div>
            <div className="flex gap-2 font-medium text-stone-900">
                <MenuIcon onClick={toggleMenu} className="text-2xl" />
                <p>Vue d'ensemble</p>
            </div>
        </header>
    )
}