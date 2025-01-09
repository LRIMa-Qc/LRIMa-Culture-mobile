import Grass from "../assets/Grass2.svg";
import { Input } from "../components/forms/input/Input";
import { useUserApi } from "@alivecode/core/api";
import { SubmitButton } from "../components/button/SubmitButton";
import { SignPage } from "../components/templates/SignPage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER_TYPE } from "@alivecode/core/api/models/User";
import { toast } from "react-toastify";

import { TbAt as EmailIcon } from "react-icons/tb";
import { TbLock as PasswordIcon } from "react-icons/tb";
import { TbUserScan as NamesIcon } from "react-icons/tb";

export default function SignUp() {
    const { createAccount } = useUserApi();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    function resetForm() {
        setEmail("");
        setPassword("");
    }    

    // function signUp() {}

    function handleFormSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!email) return toast.error('Vous devez fournir un email');
        if (!password) return toast.error('Vous devez fournir un mot de passe');
        if (!firstName) return toast.error('Vous devez fournir un prénom');
        if (!lastName) return toast.error('Vous devez fournir un nom de famille');
        
        
        createAccount(USER_TYPE.FARMER, { email, password, firstName, lastName }).match(
            () => {
                toast.success("Création de compte réussi!")
                navigate("/");
            },
            (err) => {
                toast.error(err.error.message);
                resetForm();
            }
        );
    }

    return (
        <SignPage
            instruction="Veuillez vous créer un compte"
            decoration={(
                <img src={Grass} alt="Grass" className="p-5" />
            )}
            form={(
                <form className="mx-5 space-y-4" onSubmit={handleFormSubmit}>
                    <div className="space-y-2">
                        <Input value={firstName} setValue={setFirstName} Icon={NamesIcon} name="firstName" type="text" placeholder="Entrez votre prénom" />
                        <Input value={lastName} setValue={setLastName} Icon={NamesIcon} name="lastName" type="text" placeholder="Entrez votre nom de famille" />
                        <Input value={email} setValue={setEmail} Icon={EmailIcon} name="email" type="email" placeholder="Entrez votre adresse courriel" />
                        <Input value={password} setValue={setPassword} Icon={PasswordIcon} name="password" type="password" placeholder="Entrez votre mot de passe" />

                    </div>

                    <SubmitButton submitLabel="S'inscrire" />
                </form>
            )}
            footer={(
                <p className="text-center p-5">Déjà inscrit? <a href="/signin" className="underline text-[#96E072]">Se connecter</a></p>
            )}
        />
    )
}
