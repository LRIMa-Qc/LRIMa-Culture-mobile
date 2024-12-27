import { AppBar } from "@/components/appbar/AppBar";
import CapteursList, { Capteur } from "@/components/capteurs/CapteursList";
import { Widget } from "@/components/dashboard/widget/Widget";

export default function Capteurs() {

    const DUMMY_CAPTEURS = [
        {
            name: "Capteur 1",
            state: "working"
        },
        {
            name: "Capteur 2",
            state: "working"
        },
        {
            name: "Capteur 3",
            state: "working"
        },
        {
            name: "Capteur 4",
            state: "stopped"
        },
        {
            name: "Capteur 5",
            state: "stopped"
        },
        {
            name: "Capteur 6",
            state: "working"
        },
        {
            name: "Capteur 7",
            state: "stopped"
        },
        {
            name: "Capteur 8",
            state: "working"
        },
        {
            name: "Capteur 9",
            state: "stopped"
        },

    ] satisfies Capteur[];

    return (
        <div className="space-y-5">
            <AppBar label="Capteurs" />
            <div className="mx-5 space-y-10">
                <Widget label="Capteurs">
                    <CapteursList capteurs={DUMMY_CAPTEURS} />
                </Widget>
            </div>
        </div>
    );
}
