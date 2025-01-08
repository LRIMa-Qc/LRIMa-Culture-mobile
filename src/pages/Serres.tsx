import { AppBar } from "../components/appbar/AppBar";
import { Widget } from "../components/dashboard/widget/Widget";
import { IndicatorList } from "../components/indicator-list/InidicatorList";

import { TbPlant2 as Icon } from "react-icons/tb";
import { useSerreStore } from "../stores/serreStore";
import { useNavigate } from "react-router-dom";

export default function Serres() {
    const serre = useSerreStore();
    const navigate = useNavigate();
    // TODO: Connect
    return (
        <div className="space-y-5">
            <AppBar label="Serres" />
            <div className="mx-5 space-y-10">
                <Widget label="Mes serres">
                <IndicatorList indicators={[
                    {
                        label: "Not working",
                        children: <button onClick={() => serre.updateSerreId("unknown")}>Choisir</button>,
                        color: "red",
                        Icon,
                    },
                    {
                        label: "Temporary",
                        children: <button onClick={() => {serre.updateSerreId("79816ee1-23e8-4f91-bc12-fcf85b0b47d9"); navigate('/')}}>Choisir</button>,
                        color: "emerald",
                        Icon,
                    }
                ]}/>
                </Widget>
            </div>
        </div>
    );
}
