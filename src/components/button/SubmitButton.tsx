import { TbCaretRightFilled as RightIcon } from "react-icons/tb";

export interface SubmitButtonType {
    submitLabel: string
}

export function SubmitButton({ submitLabel }: SubmitButtonType) {
    return (
        <button type="submit" className="text-white w-full bg-gradient-to-b from-[#96E072] to-[#5DC37D] p-4 rounded-xl flex items-center justify-center">
            <p>{submitLabel}</p>
            <RightIcon className="text-xl" />
        </button>
    )
}