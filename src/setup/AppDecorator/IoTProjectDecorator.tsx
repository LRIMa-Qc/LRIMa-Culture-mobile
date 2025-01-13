import { IoTProject } from "@alivecode/core/iot"
import { useSerreStore } from "../../stores/serreStore"
import { Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

export interface IoTProjectDecoratorProps {
    children: React.ReactNode
}

export function IoTProjectDecorator({children}: IoTProjectDecoratorProps) {
    const {serreId} = useSerreStore();
    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <IoTProject
                projectId={serreId}
                onLoadError={<Navigate to="/serres"/>}
            >
                {children}
            </IoTProject>
        </ErrorBoundary>
    )
}