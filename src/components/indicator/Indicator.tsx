import { JSX } from "react";
import { CompactIndicator } from "./CompactIndicator";
import { LargeIndicator } from "./LargeIndicator";
import { LinkCompactIndicator } from "./LinkCompactIndicator";

// NOTE: These colors have been safelisted in tailwind.config.ts for bg, text at 100, 200 only
// TODO: Add more colors
type Color = "sky" | "red" | "emerald" | "indigo";

export interface IndicatorType extends React.HTMLAttributes<HTMLElement> {
    Icon: JSX.ElementType;
    /** Le nom de l'indicateur. */
    label: string;
    /** La couleur de l'indicateur. Idéallement, nous utilserons toujours la même couleur pour un même indicateur de sorte à créer une association chez l'utilisateur. */
    color: Color;
    children: React.ReactNode,
    variant?: "large" | "compact" | "link",
    href?: string
}

export function Indicator({ variant = "compact", ...props }: IndicatorType) {
    if (variant === "compact") return props.href ? <LinkCompactIndicator {...props}/> : <CompactIndicator {...props} />
    return <LargeIndicator {...props} />
}