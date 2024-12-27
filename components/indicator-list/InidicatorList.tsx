import { Indicator, IndicatorType } from "../indicator/Indicator"

export interface IndicatorListType {
    indicators: IndicatorType[]
}

export function IndicatorList({ indicators }: IndicatorListType) {
    return (
        <div className={`bg-white rounded-2xl ring-1 ring-slate-200 ring-inset divide-y w-full`}>
            {indicators.map(indicator => <Indicator key={indicator.label} {...indicator} />)}
        </div>
    )
}