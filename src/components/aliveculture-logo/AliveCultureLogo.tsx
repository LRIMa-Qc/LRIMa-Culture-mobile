import Logo from "./Logo.png";

export function AliveCultureLogo() {
    return (
        <div className="flex items-center h-8 gap-2">
            <img src={Logo} alt="AliveCulture" className="object-contain h-full w-fit" />
            <p className="font-medium text-xl text-slate-900">AliveCulture</p>
        </div>
    )
}