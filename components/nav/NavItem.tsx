import { JSX } from "react";

export function NavItem({ icon, label, active = false }: { icon: JSX.Element, label: string, active?: boolean }) {
    return (
        <div className={`flex gap-2 text-lg p-4 text-stone-500 rounded-2xl ${active && 'bg-white ring-1 ring-inset ring-emerald-500 !text-emerald-500'}`}>
            <i className="text-2xl">{icon}</i>
            <p>{label}</p>
        </div>
    )
}