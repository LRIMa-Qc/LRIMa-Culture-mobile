import { useIoTProject } from "@alivecode/core/iot";
import { AppBar } from "../../components/appbar/AppBar";
import CapteursList from "../../components/capteurs/CapteursList";
import { Widget } from "../../components/dashboard/widget/Widget";
export interface CultureCapteur {
    batteryRef: string;
    category: string;
    gndHumidRef: string;
    gndTempRef: string;
    humidRef: string;
    id: string;
    lumiRef: string;
    name: string;
    no: string;
    tempRef: string; 
}

export default function IoTCapteurs() {

    const { project } = useIoTProject();

    return (
        <div className="space-y-5">
            <AppBar label="Capteurs" />
            <div className="mx-5 space-y-10">
                <Widget label="Capteurs">
                    <CapteursList capteurs={(project.layout as unknown as {capteurs: CultureCapteur[]}).capteurs} />
                </Widget>
            </div>
        </div>
    );
}