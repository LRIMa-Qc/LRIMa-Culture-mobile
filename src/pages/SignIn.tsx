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
import { useTranslation } from "react-i18next";

export default function SignIn() {
    const { login } = useUserApi();
    const navigate = useNavigate();
    const {t} = useTranslation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(false);

    function resetForm() {
        setEmail("");
        setPassword("");
    }

    function handleFormSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!email) return toast.error(t('form.email.required'));
        if (!password) return toast.error(t('form.pwd.required'));

        login({ email, password }).match(
            () => {
                toast.success(t('msg.auth.signin_success'))
                navigate("/");
            },
            () => {
                setError(true);
                toast.error(t('error.signin'));
                // toast.error(err.error.message);
                resetForm();
            }
        );
    }

    return (
        <SignPage
            instruction={t('msg.auth.signin_instruction')}
            form={(
                <form className="mx-5 space-y-4" onSubmit={handleFormSubmit}>
                    {error && <p className="text-red-500 text-center">{t('error.signin')}</p>}
                    <div className="space-y-2">
                        <Input
                            setValue={setEmail}
                            value={email}
                            Icon={EmailIcon}
                            name="email"
                            type="email"
                            placeholder={t('form.email.label')}
                        />
                        <Input
                            setValue={setPassword}
                            value={password}
                            Icon={PasswordIcon}
                            name="password"
                            type="password"
                            placeholder={t('form.pwd.label')}
                        />
                    </div>

                    <SubmitButton submitLabel={t('form.title.signin')} />
                </form>
            )}
            footer={(
                <p className="text-center p-5">{t('msg.auth.not_registered')} <a href="/signup" className="underline text-[#96E072]">{t('form.title.signup')}</a></p>
            )}
            decoration={(
                <img src={Grass1} alt="Grass" />
            )}
        />
    )
}
