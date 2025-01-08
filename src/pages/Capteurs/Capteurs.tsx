import { IoTProject } from "@alivecode/core/iot";
import IoTCapteurs from "./IoTProjet";
import { Navigate, useNavigate } from "react-router-dom";
import { useSerreStore } from "../../stores/serreStore";

export default function Capteurs() {

    const navigate = useNavigate();
    const {serreId} = useSerreStore();

    console.log("serreid1 ", serreId)

    if (typeof serreId === 'undefined') return <Navigate to="/serres" replace/>
    console.log("serreid2 ", serreId)
    return (
        <IoTProject
        projectId={serreId}
        onLoadError={() => {
            navigate('/serres')
        }}
      >
        <IoTCapteurs />
      </IoTProject>
    );
}
