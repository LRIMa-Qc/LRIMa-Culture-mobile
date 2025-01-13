import { ErrorBoundary } from "react-error-boundary";
import { Trans, useTranslation } from "react-i18next";

export interface ISignPage {
    form: React.ReactNode,
    decoration: React.ReactNode,
    footer: React.ReactNode,
    instruction: string
}

export function SignPage({ form, decoration, footer, instruction }: ISignPage) {
    const {t} = useTranslation();
    return (
        <div className="flex flex-col justify-between h-svh">
            <div className="space-y-8">
                <div className="w-full flex items-center justify-center">
                    {decoration}
                </div>

                <div className="mx-5">
                    <p className="font-semibold text-2xl">
                        <Trans
                            components={{ accent: <span className="text-emerald-500" /> }}
                            i18nKey="home.header.msg"
                        />
                    </p>
                    <p className="text-slate-600">{instruction}</p>
                </div>


                <ErrorBoundary
                    fallback={<p>{t('error.unknown')}</p>}
                >
                    {form}
                </ErrorBoundary>
            </div>

            {footer}
        </div>
    )
}