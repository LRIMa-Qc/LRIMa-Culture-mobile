import { ChangeIndicator, ChangeIndicatorType } from "../change-indicator/ChangeIndicator"

export interface ChangeIndicatorListType {
    indicators: ChangeIndicatorType[]
}

export function ChangeIndicatorList({ indicators }: ChangeIndicatorListType) {
    return (
        <div className={`bg-white rounded-2xl ring-1 ring-slate-200 ring-inset divide-y w-full`}>
            {indicators.map(indicator => <ChangeIndicator key={indicator.label} {...indicator} />)}
        </div>
    )
}