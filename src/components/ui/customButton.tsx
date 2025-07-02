import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { Button } from "./button";
import { VariantProps } from "class-variance-authority";
import clsx from "clsx";

interface CustomButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
    disabled?: boolean;
    variant?: VariantProps<typeof Button>["variant"];
}

export default function CustomButton({ children, disabled, variant = 'default', onClick }: CustomButtonProps) {
    return (
        <Button variant={variant} disabled={disabled} onClick={onClick}
            className={
                clsx(
                    "text-xs sm:text-sm md:text-normal font-normal",
                    { "bg-primary-800 text-secondary-50 hover:bg-primary-700": variant === 'default' },
                    { "bg-secondary-400 text-accent-50 hover:bg-secondary-100": variant === 'secondary' },
                    { "bg-accent-50 text-secondary-400 border border-secondary-400 hover:bg-accent-100 hover:text-secondary-400": variant === 'outline' },
                )
            }
        >
            {children}
        </Button>
    )
}