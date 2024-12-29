import { InputHTMLAttributes, useId } from "react"
import { twMerge } from 'tailwind-merge'

export interface InputType extends InputHTMLAttributes<HTMLInputElement> {
    Icon: JSX.ElementType
}

export function Input({ Icon, className, ...inputProps }: InputType) {
    const inputId = useId();
    return (
        <div className="flex flex-row-reverse items-center rounded-xl ring-1 ring-slate-200 text-zinc-500 gap-3 px-4 has-[:focus]:ring-emerald-500 w-full">
            <input className={twMerge("py-4 outline-none peer focus:text-emerald-500", className)} id={inputId} {...inputProps} />
            <label htmlFor={inputId} className="py-4 peer-focus:text-emerald-500">
                <Icon />
            </label>
        </div>

    )
}