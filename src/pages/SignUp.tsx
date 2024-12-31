import Grass from "../assets/Grass2.svg";
import { Input } from "../components/forms/input/Input";

import { TbAt as EmailIcon } from "react-icons/tb";
import { TbLock as PasswordIcon } from "react-icons/tb";
import { SubmitButton } from "../components/button/SubmitButton";
import { SignPage } from "../components/templates/SignPage";

export default function SignUp() {
    // const { login } = useUserApi();

    // function signUp() {}

    function handleFormSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
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
                        <Input Icon={EmailIcon} name="email" type="email" placeholder="Entrez votre adresse courriel" />
                        <Input Icon={PasswordIcon} name="password" type="password" placeholder="Entrez votre mot de passe" />
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
