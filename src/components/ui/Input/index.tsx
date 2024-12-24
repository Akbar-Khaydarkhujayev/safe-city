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
                <Label className="text-base font-semibold flex gap-1">
                    {label}
                    {!!error && (
                        <div className="text-red-600 text-base ml-1 -mb-2 font-semibold">
                            ({error})
                        </div>
                    )}
                </Label>
            )}
            {!textarea ? (
                <HeadlessUiInput
                    {...props}
                    autoComplete="off"
                    className={`h-[51px] mt-3 block w-full rounded-lg bg-black py-1.5 px-4 text-sm/6 text-white
                        focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25
                        placeholder:text-sm placeholder:font-normal placeholder:text-[#FFFFFF] placeholder:opacity-40 ${
                            props.className
                        } ${!!error ? "border border-red-600" : "border-none"}`}
                />
            ) : (
                <Textarea
                    {...props}
                    className={`mt-3 block w-full resize-none rounded-lg bg-black py-3 px-4 text-sm/6 text-white
                        focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25
                        placeholder:text-sm/6 placeholder:font-normal placeholder:text-[#FFFFFF] placeholder:opacity-40 ${
                            props.className
                        }  ${
                        !!error ? "border border-red-600" : "border-none"
                    }`}
                />
            )}
        </Field>
    );
};

export default Input;
