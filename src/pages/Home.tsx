// import { useContext, useState } from "react";
// import { AppBar } from "../components/appbar/AppBar";
// import { UserContext } from "@alivecode/core";
import { Navigate } from "react-router-dom";
import { useSerreStore } from "../stores/serreStore";
import { useIoTProject } from "@alivecode/core/iot";
import { useIoTProjectApi } from "@alivecode/core/api/iot";

export default function Home() {
    const { project } = useIoTProject();

    const {getProjectsOfCurrentUser} = useIoTProjectApi();

    getProjectsOfCurrentUser().then(console.log)
    // const { user } = useContext(UserContext);

    return <Navigate to={project ? "/overview" : "/serres"} replace/>

    // return (
    //     <div className="space-y-5">
    //         <AppBar label="Home" />

    //         {user?.email ?? '...'}
    //     </div>
    // );
}
