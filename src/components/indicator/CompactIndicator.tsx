import { IndicatorType } from "./Indicator";

export function CompactIndicator({ Icon, color, label, children, className, ...others }: IndicatorType) {
    return (
        <div className={`flex items-center p-3 gap-10 w-full justify-between ${className}`} {...others}>
            <div className={`flex items-center gap-2`}>
                <Icon className={`bg-gradient-to-b from-white to-${color}-100 text-5xl text-${color}-500 rounded-xl p-2 background-black`} />
                <p className="line-clamp-1">{label}</p>
            </div>
            <div className="">
                {children}
            </div>
        </div>
    )
}