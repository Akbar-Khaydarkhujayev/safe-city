import React from "react";
import { Input } from "@headlessui/react";
import { IoSearchSharp } from "react-icons/io5";
import { InputProps as HeadlessInputProps } from "@headlessui/react";

export interface InputProps extends HeadlessInputProps {
    placeholder?: string;
    className?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ placeholder, className, ...props }, ref) => {
        return (
            <div className="relative w-full">
                <Input
                    className={`pl-4 pr-10 py-2 placeholder:text-[#EBEBF599] rounded-xl text-lg placeholder:text-lg block w-full border-none bg-white/5 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 ${className}`}
                    ref={ref}
                    placeholder={placeholder}
                    autoComplete="off"
                    {...props}
                />
                <IoSearchSharp className="text-2xl text-[#EBEBF599] absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
        );
    }
);

export default SearchInput;
