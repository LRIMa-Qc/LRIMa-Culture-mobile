import { JSX } from "react"

// NOTE: These colors have been safelisted in tailwind.config.ts for bg, text at 100, 200 only
// TODO: Add more colors
type Color = "sky" | "red" | "emerald";

export interface IndicatorType {
    Icon: JSX.ElementType;
    /** Le nom de l'indicateur. */
    label: string;
    /** La valeur de l'indicateur. */
    value: string;
    /** Le changement de la valeur lors d'un quelconque interval. */
    change: string;
    /** La couleur de l'indicateur. Idéallement, nous utilserons toujours la même couleur pour un même indicateur de sorte à créer une association chez l'utilisateur. */
    color: Color;
}

export function Indicator({ Icon, label, value, change, color }: IndicatorType) {
    // TODO: Dynamic width (instead of hardcoding w-80)
    // TODO: Mobile version
    return (
        <div className={`bg-${color}-100 rounded-2xl p-8 w-80 space-y-8`}>
            <div className="space-y-2">
                <Icon className={`bg-gradient-to-b from-white to-${color}-100 text-6xl text-${color}-500 rounded-xl p-2`} />
                <p className="">{label}</p>
            </div>
            <div className="flex gap-2 items-baseline">
                <p className="font-medium text-xl">{value}</p>
                <p className="">{change}</p>
            </div>
        </div>
    )
}