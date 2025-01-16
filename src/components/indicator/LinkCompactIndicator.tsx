import { Link } from "react-router-dom";
import { IndicatorType } from "./Indicator";

export function LinkCompactIndicator({ Icon, color, label, children, className, href, ...others }: IndicatorType) {
    return (
        <Link to={href!} className={`flex items-center p-3 gap-10 w-full justify-between ${className}`} {...others}>
            <div className={`flex items-center gap-2`}>
                <Icon className={`bg-gradient-to-b from-white to-${color}-100 text-5xl text-${color}-500 rounded-xl p-2 background-black`} />
                <p className="line-clamp-1">{label}</p>
            </div>
            <div className="">
                {children}
            </div>
        </Link>
    )
}