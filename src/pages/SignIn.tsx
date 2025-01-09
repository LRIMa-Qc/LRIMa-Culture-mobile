"use client";
import { useUserApi } from "@alivecode/core/api";
import Grass1 from "../assets/Grass1.svg";
import { Input } from "../components/forms/input/Input";

import { TbAt as EmailIcon } from "react-icons/tb";
import { TbLock as PasswordIcon } from "react-icons/tb";
import { SubmitButton } from "../components/button/SubmitButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { SignPage } from "../components/templates/SignPage";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const { login } = useUserApi();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(false);

    function resetForm() {
        setEmail("");
        setPassword("");
    }

    function handleFormSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!email) toast.error('Vous devez fournir un email');
        if (!password) toast.error('Vous devez fournir un mot de passe');

        login({ email, password }).match(
            () => {
                toast.success("Identification réussi!")
                navigate("/");
            },
            (err) => {
                setError(true);
                toast.error('Mauvais identifiants');
                toast.error(err.error.message);
                resetForm();
            }
        );
    }

    return (
        <SignPage
            instruction="Veuillez vous connecter à votre compte"
            form={(
                <form className="mx-5 space-y-4" onSubmit={handleFormSubmit}>
                    {error && <p className="text-red-500 text-center">Courriel ou mot de passe invalid</p>}
                    <div className="space-y-2">
                        <Input
                            setValue={setEmail}
                            value={email}
                            Icon={EmailIcon}
                            name="email"
                            type="email"
                            placeholder="Entrez votre adresse courriel"
                        />
                        <Input
                            setValue={setPassword}
                            value={password}
                            Icon={PasswordIcon}
                            name="password"
                            type="password"
                            placeholder="Entrez votre mot de passe"
                        />
                    </div>

                    <SubmitButton submitLabel="Se connecter" />
                </form>
            )}
            footer={(
                <p className="text-center p-5">Pas de compte? <a href="/signup" className="underline text-[#96E072]">S’inscrire</a></p>
            )}
            decoration={(
                <img src={Grass1} alt="Grass" />
            )}
        />
    )
}
