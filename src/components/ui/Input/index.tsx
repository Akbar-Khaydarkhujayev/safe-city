import React from "react";
import {
    Field,
    Input as HeadlessUiInput,
    Label,
    InputProps as HeadlessUiInputProps,
    Textarea,
} from "@headlessui/react";

export interface InputProps extends HeadlessUiInputProps {
    label?: React.ReactNode;
    error?: string;
    textarea?: boolean;
}

const Input = ({ error, label, textarea = false, ...props }: InputProps) => {
    return (
        <Field>
            {!!label && (
                <Label className="text-base font-semibold">{label}</Label>
            )}
            {!textarea ? (
                <HeadlessUiInput
                    {...props}
                    autoComplete="off"
                    className={`h-[51px] mt-3 block w-full rounded-lg border-none bg-black py-1.5 px-3 text-sm/6 text-white
                        focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25
                        placeholder:text-sm placeholder:font-normal placeholder:text-[#FFFFFF] placeholder:opacity-40 ${props.className}`}
                />
            ) : (
                <Textarea
                    {...props}
                    className={`mt-3 block w-full resize-none rounded-lg border-none bg-black py-3 px-3 text-sm/6 text-white
                        focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25
                        placeholder:text-sm/6 placeholder:font-normal placeholder:text-[#FFFFFF] placeholder:opacity-40 ${props.className}`}
                />
            )}
            {!!error && <div className="text-error text-base">{error}</div>}
        </Field>
    );
};

export default Input;
