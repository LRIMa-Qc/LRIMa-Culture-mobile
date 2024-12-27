import { AliveCultureLogo } from "../aliveculture-logo/AliveCultureLogo";
import { TbX as CloseIcon } from "react-icons/tb";
import { NavItem, NavItemType } from "./NavItem";

export function Nav({ onCloseClick, elements }: { onCloseClick: () => void, elements: NavItemType[] }) {
    return (
        <nav className={"h-screen absolute top-0 left-0 w-full max-w-xs border border-l-0 rounded-r-xl border-slate-200 p-5 space-y-10 z-10 bg-white/80 backdrop-blur"}>
            <div className="flex items-center justify-between text-xl text-slate-900">
                <AliveCultureLogo />
                <CloseIcon onClick={onCloseClick} />
            </div>
            <div className="flex flex-col gap-3">
                {elements.map(el => <NavItem key={el.label} {...el} />)}
            </div>
        </nav>
    )
}