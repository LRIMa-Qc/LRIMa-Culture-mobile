export interface ChangeIndicationType {
    /** La valeur de l'indicateur. */
    value: string;
    /** Le changement de la valeur lors d'un quelconque interval. */
    // change: string;
}

export function ChangeIndication({ value }: ChangeIndicationType) {
    return (
        <div className="flex gap-2 items-baseline">
            <p className="font-medium text-lg line-clamp-1">{value}</p>
            {/* <p className="">{change}</p> */}
        </div>
    )
}