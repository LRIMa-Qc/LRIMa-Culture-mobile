import { ErrorBoundary } from "react-error-boundary";

export interface ISignPage {
    form: React.ReactNode,
    decoration: React.ReactNode,
    footer: React.ReactNode,
    instruction: string
}

export function SignPage({ form, decoration, footer, instruction }: ISignPage) {
    return (
        <div className="flex flex-col justify-between h-screen">
            <div className="space-y-8">
                <div className="w-full flex items-center justify-center">
                    {decoration}
                </div>

                <div className="mx-5">
                    <p className="font-semibold text-2xl">Bienvenue!</p>
                    <p className="text-slate-600">{instruction}</p>
                </div>


                <ErrorBoundary
                    fallback={<p>Une erreur c'est produite</p>}
                >
                    {form}
                </ErrorBoundary>
            </div>

            {footer}
        </div>
    )
}