import { useContext } from "react";
import { AppBar } from "../components/appbar/AppBar";
import { UserContext } from "@alivecode/core";

export default function Home() {
    const { user } = useContext(UserContext);


    return (
        <div className="space-y-5">
            <AppBar label="Home" />

            <a href="/signin">Sign In</a>
            <a href="/singup">Sign Up</a>

            {user?.email ?? '...'}
        </div>
    );
}
