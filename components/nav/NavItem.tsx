import { usePathname } from "next/navigation";
import { JSX } from "react";

export interface NavItemType {
    Icon: JSX.ElementType,
    label: string,
    href: string
}

export function NavItem({ Icon, label, href }: NavItemType) {
    const active = usePathname()?.endsWith(href);

    return (
        <a href={href} className={`flex gap-2 text-lg p-4 text-stone-500 rounded-2xl ${active && 'bg-white ring-1 ring-inset ring-emerald-500 !text-emerald-500'}`}>
            <Icon className="text-2xl" />
            <p>{label}</p>
        </a>
    )
}