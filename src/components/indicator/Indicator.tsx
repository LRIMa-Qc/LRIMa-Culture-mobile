import { JSX } from "react";
import { CompactIndicator } from "./CompactIndicator";
import { LargeIndicator } from "./LargeIndicator";

// NOTE: These colors have been safelisted in tailwind.config.ts for bg, text at 100, 200 only
// TODO: Add more colors
type Color = "sky" | "red" | "emerald";

export interface IndicatorType extends React.HTMLAttributes<HTMLDivElement> {
    Icon: JSX.ElementType;
    /** Le nom de l'indicateur. */
    label: string;
    /** La couleur de l'indicateur. Idéallement, nous utilserons toujours la même couleur pour un même indicateur de sorte à créer une association chez l'utilisateur. */
    color: Color;
    children: React.ReactNode,
    variant?: "large" | "compact"
}

export function Indicator({ variant = "compact", ...props }: IndicatorType) {
    if (variant === "compact") return <CompactIndicator {...props} />
    return <LargeIndicator {...props} />
}