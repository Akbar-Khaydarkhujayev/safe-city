import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IoIosArrowDown } from "react-icons/io";

interface IProps {
    data: {
        label: string;
        value: string;
    }[];
    value: string;
    onChange: (value: string) => void;
}

export default function DropdownMenu({ data, value, onChange }: IProps) {
    return (
        <div className="text-right">
            <Menu>
                <MenuButton className="inline-flex items-center gap-2 rounded-md bg-[#0B82FF] py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:opacity-95 data-[open]:opacity-90 data-[focus]:outline-1 data-[focus]:outline-white">
                    {data.find((item) => item.value === value)?.label}
                    <IoIosArrowDown className="size-4 fill-white/60" />
                </MenuButton>

                <MenuItems
                    transition
                    anchor="bottom end"
                    className="mt-1 w-52 origin-top-right rounded-xl border border-white/5 bg-[#0B82FF]/80 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    {data.map((item) => (
                        <MenuItem key={item.value}>
                            <button
                                onClick={() => onChange(item.value)}
                                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                            >
                                {item.label}
                            </button>
                        </MenuItem>
                    ))}
                </MenuItems>
            </Menu>
        </div>
    );
}
