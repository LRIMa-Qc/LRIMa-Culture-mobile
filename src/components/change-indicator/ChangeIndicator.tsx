import { Indicator, IndicatorType } from "../indicator/Indicator";
import { ChangeIndication, ChangeIndicationType } from "./ChangeIndication";

export interface ChangeIndicatorType extends ChangeIndicationType, Omit<IndicatorType, "children"> { }

export function ChangeIndicator({ value, ...indicatorProps }: ChangeIndicatorType) {
    return (
        <Indicator {...indicatorProps}>
            <ChangeIndication value={value} />
        </Indicator>
    )
}