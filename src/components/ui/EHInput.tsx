import { InputHTMLAttributes } from "react";


interface EHInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    ref?: React.Ref<HTMLInputElement>;
};

export default function EHInput({ type, placeholder, className, label, ref, ...props }: EHInputProps) {
    return (
        <div className="text-primary-800 flex gap-2 flex-col">
            {label && <span className="">{label}</span>}
            <input
                type={type}
                placeholder={placeholder}
                className={`border border-primary-100 rounded-md p-2 w-full focus:outline-secondary-200 ${className}`}
                {...props}
                ref={ref}
            />
        </div>
    )
}