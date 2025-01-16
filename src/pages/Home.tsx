// import { useContext, useState } from "react";
// import { AppBar } from "../components/appbar/AppBar";
// import { UserContext } from "@alivecode/core";
import { Navigate } from "react-router-dom";
import { useIoTProject } from "@alivecode/core/iot";

export default function Home() {
    const { project } = useIoTProject();

    return <Navigate to={project ? "/overview" : "/serres"} replace/>

    // return (
    //     <div className="space-y-5">
    //         <AppBar label="Home" />

    //         {user?.email ?? '...'}
    //     </div>
    // );
}
