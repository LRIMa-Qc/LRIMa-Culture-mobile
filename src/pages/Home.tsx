// import { useContext, useState } from "react";
// import { AppBar } from "../components/appbar/AppBar";
// import { UserContext } from "@alivecode/core";
import { Navigate } from "react-router-dom";

export default function Home() {
    // const { user } = useContext(UserContext);

    return <Navigate to="/overview" replace/>

    // return (
    //     <div className="space-y-5">
    //         <AppBar label="Home" />

    //         {user?.email ?? '...'}
    //     </div>
    // );
}
