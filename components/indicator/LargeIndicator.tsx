import { IndicatorType } from "./Indicator";

export function LargeIndicator({ Icon, label, color, children }: IndicatorType) {
    // TODO: Dynamic width (instead of hardcoding w-80)
    return (
        <div className={`bg-${color}-100 rounded-2xl p-8 w-80 space-y-8`}>
            <div className="space-y-2">
                <Icon className={`bg-gradient-to-b from-white to-${color}-100 text-6xl text-${color}-500 rounded-xl p-2`} />
                <p className="">{label}</p>
            </div>
            <div className="flex gap-2 items-baseline">
                {children}
            </div>
        </div>
    )
}