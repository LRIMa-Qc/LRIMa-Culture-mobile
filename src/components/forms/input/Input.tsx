import { Dispatch, InputHTMLAttributes, JSX, SetStateAction, useId } from "react"
import { twMerge as tw } from 'tailwind-merge'

export interface InputType extends InputHTMLAttributes<HTMLInputElement> {
    Icon: JSX.ElementType;
    setValue?: Dispatch<SetStateAction<string>>;
    inputClass?: string
}

export function Input({ Icon, className, setValue, inputClass, ...inputProps }: InputType) {
    const inputId = useId();

    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        if (!setValue) return;
        setValue(e.currentTarget.value)
    }

    return (
        <div className={tw("flex flex-row-reverse bg-white items-center rounded-xl overflow-hidden ring-1 ring-slate-200 text-zinc-500 gap-3 px-4 has-[:focus]:ring-emerald-500 w-full", className)}>
            <input onChange={handleChange} className={tw("py-4 w-full outline-none peer focus:text-emerald-500", inputClass)} id={inputId} {...inputProps} />
            <label htmlFor={inputId} className="py-4 peer-focus:text-emerald-500">
                <Icon />
            </label>
        </div>

    )
}