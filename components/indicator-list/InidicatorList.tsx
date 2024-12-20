import { IndicatorType } from "../indicator/Indicator";
import { IndicatorListItem } from "./IndicatorListItem";

export interface IndicatorListType {
    indicators: IndicatorType[]
}

export function IndicatorList({ indicators }: IndicatorListType) {
    return (
        <div className={`bg-white rounded-2xl ring-1 ring-slate-200 ring-inset divide-y w-full`}>
            {indicators.map(indicator => <IndicatorListItem key={indicator.label} {...indicator} />)}
        </div>
    )
}