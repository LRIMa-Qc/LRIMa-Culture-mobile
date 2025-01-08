import { JSX } from "react";
import { Link, useLocation } from "react-router-dom";

export interface NavItemType {
    Icon: JSX.ElementType,
    label: string,
    href: string,
    reload?: boolean,
}

export function NavItem({ Icon, label, href, reload }: NavItemType) {
    const { pathname } = useLocation();;
    const active = pathname?.endsWith(href);

    return (
        <Link
            to={{
                pathname: href,
            }}
            reloadDocument={reload}
            className={`flex gap-2 text-lg p-4 text-stone-500 rounded-2xl ${active && 'bg-white ring-1 ring-inset ring-emerald-500 !text-emerald-500'}`}
        >
            <Icon className="text-2xl" />
            <p>{label}</p>
        </Link>

    )
}