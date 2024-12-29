"use client";
import { useUserApi } from "@alivecode/core/api";
import Grass from "../assets/Grass2.svg";
import { Input } from "../components/forms/input/Input";
import { ErrorBoundary } from "react-error-boundary";

import { TbAt as EmailIcon } from "react-icons/tb";
import { TbLock as PasswordIcon } from "react-icons/tb";
import { SubmitButton } from "../components/button/SubmitButton";

export default function SignUp() {
    const { login } = useUserApi();

    function signUp(formData: FormData) {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        console.log("Signin Up");

    }

    return (
        <div className="flex flex-col justify-between h-screen">
            <div className="space-y-10">
                <div className="m-5">
                    <img src={Grass} alt="Grass" />
                </div>

                <div className="mx-5">
                    <p className="font-semibold text-2xl">Bienvenue!</p>
                    <p className="text-slate-600">Veuillez vous créer un compte</p>
                </div>

                <ErrorBoundary
                    fallback={<p>There was an error while submitting the form</p>}
                    onError={console.log}
                >
                    <form className="mx-5 space-y-4" action={signUp}>
                        <div className="space-y-2">
                            <Input Icon={EmailIcon} name="email" type="email" placeholder="Entrez votre adresse courriel" />
                            <Input Icon={PasswordIcon} name="password" type="password" placeholder="Entrez votre mot de passe" />
                        </div>

                        <SubmitButton pendingLabel="Soumission..." submitLabel="S'inscrire" />
                    </form>
                </ErrorBoundary>
            </div>

            <p className="text-center p-5">Déjà inscrit? <a href="/signin" className="underline text-[#96E072]">Se connecter</a></p>
        </div>
    );
}
