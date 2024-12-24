import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Loading from "@/components/Loading";

const buttonVariants = cva(
    "flex items-center justify-center transition-all whitespace-nowrap",
    {
        variants: {
            variant: {
                primary:
                    "bg-[#0B82FF] hover:bg-[#0a75e0] hover:text-gray-200 active:bg-[#0969c7] active:text-gray-300",
                secondary:
                    "bg-[#141414] hover:bg-[#1a1a1a] hover:text-gray-200 active:bg-[#0f0f0f] active:text-gray-300",
                text: "bg-opacity-80 text-[#0A84FF] bg-transparent hover:bg-gray-900 active:bg-gray-800",
            },
            size: {
                lg: "px-7 h-[52px] text-lg",
                md: "px-5 h-[48px] text-2xl",
                sm: "px-3 h-[27px] text-xs",
            },
            border: {
                "10px": "rounded-[10px]",
                xl: "rounded-xl",
                full: "rounded-full",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
            border: "full",
        },
    }
);

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    fullWidth?: boolean;
    isActive?: boolean;
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className, variant, size, fullWidth, isLoading, border, ...props },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={`${buttonVariants({
                    variant,
                    size,
                    className,
                    border,
                })} ${fullWidth && "w-full"} ${isLoading && "opacity-50"}`}
                type={props.type || "button"}
                disabled={isLoading}
                {...props}
            >
                {isLoading ? <Loading /> : <>{props.children}</>}
            </button>
        );
    }
);

export default Button;
