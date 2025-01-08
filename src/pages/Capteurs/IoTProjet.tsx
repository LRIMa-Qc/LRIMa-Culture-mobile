import { useIoTProject } from "@alivecode/core/iot";
import { useIoTProjectApi } from "@alivecode/core/api/iot";
import { AppBar } from "../../components/appbar/AppBar";
import CapteursList, { Capteur } from "../../components/capteurs/CapteursList";
import { Widget } from "../../components/dashboard/widget/Widget";
import { useEffect, useState } from "react";
import { plainToClass } from 'class-transformer';

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
    const [capteurs, setCapteurs] = useState<CultureCapteur[]>([]);
    // const {getRoutes, getObjects} = useIoTProjectApi(project);

    useEffect(() => {
      const layout = project.layout as unknown as {capteurs: CultureCapteur[]};

    //   const parsedCapteurs: CultureCapteur[] = [];

    //   // Parsing capteurs
    //   if (layout.capteurs === undefined) layout.capteurs = [];
    //   layout.capteurs.forEach((capt: CultureCapteur) => {
    //       capt = plainToClass(CultureCapteur, capt);
    //       capt && parsedCapteurs.push(capt);
    //   });

    const test =layout.capteurs[0];
    test.batteryRef;

    console.log(layout.capteurs)
      setCapteurs(layout.capteurs);
    }, []);


    return (
        <div className="space-y-5">
            <AppBar label="Capteurs" />
            <div className="mx-5 space-y-10">
                <Widget label="Capteurs">
                    <CapteursList capteurs={capteurs} />
                </Widget>
            </div>
        </div>
    );
}