import { IoTProject } from "@alivecode/core/iot"
import { useSerreStore } from "../../stores/serreStore"
import { useNavigate } from "react-router-dom";

export interface IoTProjectDecoratorProps {
    children: React.ReactNode
}

export function IoTProjectDecorator({children}: IoTProjectDecoratorProps) {
    const {serreId} = useSerreStore();
    const navigate = useNavigate();
    return (
        <IoTProject
        projectId={serreId}
        onLoadError={() => {
            navigate('/serres')
        }}
    >
        {children}
    </IoTProject>
    )
}