// import { useContext, useState } from "react";
// import { AppBar } from "../components/appbar/AppBar";
// import { UserContext } from "@alivecode/core";
import { Navigate } from "react-router-dom";
import { useSerreStore } from "../stores/serreStore";

export default function Home() {
    const {serreId} = useSerreStore();
    // const { user } = useContext(UserContext);

    return <Navigate to={serreId ? "/overview" : "/serres"} replace/>

    // return (
    //     <div className="space-y-5">
    //         <AppBar label="Home" />

    //         {user?.email ?? '...'}
    //     </div>
    // );
}
