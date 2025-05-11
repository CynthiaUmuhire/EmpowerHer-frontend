import { InputHTMLAttributes } from "react";


interface EHInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
};

export default function EHInput({ type, placeholder, className, label, ...props }: EHInputProps) {
    return (
        <div className="text-primary-800 flex gap-2 flex-col">
            <span className="">{label}</span>
            <input
                type={type}
                placeholder={placeholder}
                className={`border border-primary-100 rounded-md p-2 w-full focus:outline-secondary-200 ${className}`}
                {...props}
            />
        </div>
    )
}