import { ChangeIndicatorType } from "../change-indicator/ChangeIndicator"
import { ChangeIndicator } from "../change-indicator/ChangeIndicator"

export interface IndicatorListType {
    indicators: ChangeIndicatorType[]
}

export function IndicatorList({ indicators }: IndicatorListType) {
    return (
        <div className={`bg-white rounded-2xl ring-1 ring-slate-200 ring-inset divide-y w-full`}>
            {indicators.map(indicator => <ChangeIndicator key={indicator.label} {...indicator} />)}
        </div>
    )
}