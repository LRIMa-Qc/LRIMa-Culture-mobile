"use client";
import { useUserApi } from "@alivecode/core/api";
import Grass2 from "../assets/Grass2.svg";
import { Input } from "../components/forms/input/Input";
import { ErrorBoundary } from "react-error-boundary";

import { TbAt as EmailIcon } from "react-icons/tb";
import { TbLock as PasswordIcon } from "react-icons/tb";
import { SubmitButton } from "../components/button/SubmitButton";
import { CapteurCanvas } from "../components/capteur/CapteurCanvas";

export default function SignIn() {
    const { login } = useUserApi();

    function signIn(formData: FormData) {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        console.log("Signin In");

        login({ email, password }).match(
            (str) => console.log("Success!", str.email),
            (err) => console.log("Error :(", err)
        );
    }

    return (
        <div className="flex flex-col justify-between h-screen">
            <div className="space-y-12">

                <div className="w-full relative">
                    <CapteurCanvas />
                    <div className="absolute inset-0 -z-10 w-full flex items-center justify-center">
                        <img src={Grass2} alt="Grass" />
                    </div>

                </div>

                <div className="mx-5">
                    <p className="font-semibold text-2xl">Bienvenue!</p>
                    <p className="text-slate-600">Veuillez vous connecter à votre compte</p>
                </div>


                <ErrorBoundary
                    fallback={<p>There was an error while submitting the form</p>}
                    onError={console.log}
                >
                    <form className="mx-5 space-y-4" action={signIn}>
                        <div className="space-y-2">
                            <Input Icon={EmailIcon} name="email" type="email" placeholder="Entrez votre adresse courriel" />
                            <Input Icon={PasswordIcon} name="password" type="password" placeholder="Entrez votre mot de passe" />
                        </div>

                        <SubmitButton pendingLabel="Soumission..." submitLabel="Se connecter" />
                    </form>
                </ErrorBoundary>
            </div>

            <p className="text-center p-5">Pas de compte? <a href="/signup" className="underline text-[#96E072]">S’inscrire</a></p>
        </div>
    );
}
