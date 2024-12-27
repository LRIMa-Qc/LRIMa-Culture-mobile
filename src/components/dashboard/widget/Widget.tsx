export interface WidgetType extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    label: string;
}

export function Widget({ label, children, className, ...others }: WidgetType) {
    return (
        <div className={`space-y-2 ${className}`} {...others}>
            <p className="font-medium">{label}</p>
            <div>
                {children}
            </div>
        </div>
    )
}