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
import { useTranslation } from "react-i18next";

export default function SignUp() {
    const { createAccount } = useUserApi();
    const navigate = useNavigate();

    const {t} = useTranslation();

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

        if (!email) return toast.error(t('form.email.required'));
        if (!password) return toast.error(t('form.pwd.required'));
        if (!firstName) return toast.error(t('form.firstName.required'));
        if (!lastName) return toast.error(t('form.lastName.required'));
        
        
        createAccount(USER_TYPE.FARMER, { email, password, firstName, lastName }).match(
            () => {
                toast.success(t('msg.auth.signup_success'))
                navigate("/");
            },
            () => {
                // toast.error(err.error.message);
                resetForm();
            }
        );
    }

    return (
        <SignPage
            instruction={t('msg.auth.signup_instruction')}
            decoration={(
                <img src={Grass} alt="Grass" className="p-5" />
            )}
            form={(
                <form className="mx-5 space-y-4" onSubmit={handleFormSubmit}>
                    <div className="space-y-2">
                        <Input value={firstName} setValue={setFirstName} Icon={NamesIcon} name="firstName" type="text" placeholder={t('form.firstName.label')} />
                        <Input value={lastName} setValue={setLastName} Icon={NamesIcon} name="lastName" type="text" placeholder={t('form.lastName.label')} />
                        <Input value={email} setValue={setEmail} Icon={EmailIcon} name="email" type="email" placeholder={t('form.email.label')} />
                        <Input value={password} setValue={setPassword} Icon={PasswordIcon} name="password" type="password" placeholder={t('form.pwd.label')} />

                    </div>

                    <SubmitButton submitLabel={t('form.title.signup')} />
                </form>
            )}
            footer={(
                <p className="text-center p-5">{t('msg.auth.already_registered')} <a href="/signin" className="underline text-[#96E072]">{t('form.title.signin')}</a></p>
            )}
        />
    )
}
