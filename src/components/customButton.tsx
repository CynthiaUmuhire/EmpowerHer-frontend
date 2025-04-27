import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { Button } from "./ui/button";
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
                    { "bg-red-800 ": variant === 'secondary' }
                )
            }
        >
            {children}
        </Button>
    )
}