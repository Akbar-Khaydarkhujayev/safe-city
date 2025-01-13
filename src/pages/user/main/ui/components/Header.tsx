import SearchInput from "@/components/ui/Input/SearchInput";
import logo from "/public/logo.png";
import { useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi2";
import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
} from "@headlessui/react";
import Button from "@/components/ui/Button";
import useResize from "@/hooks/use-resize";

const platforms = [
    { label: "Android", value: "ANDROID" },
    { label: "IOS", value: "IOS" },
    { label: "Desktop", value: "DESKTOP" },
];

interface IProps {
    search: string;
    setSearch: (search: string) => void;
    platform: string;
    setPlatform: (platform: string) => void;
}

const Header = ({ search, setSearch, platform, setPlatform }: IProps) => {
    const navigate = useNavigate();
    const { md } = useResize();

    return (
        <div>
            <div className="flex justify-between items-center mt-10">
                <div
                    className="w-[74px] h-[44px]"
                    onClick={() => navigate("/")}
                >
                    <img src={logo} />
                </div>

                <div className="w-[60%] md:w-[80%] lg:w-[70%] xl:w-[60%] flex justify-end gap-2">
                    {!md && (
                        <>
                            <SearchInput
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <div className="w-[320px]">
                                <TabGroup
                                    selectedIndex={platforms.findIndex(
                                        (item) => item.value === platform
                                    )}
                                    className="rounded-lg bg-[#7676803D] h-[44px] p-[4px] w-[320px]"
                                    onChange={(index) =>
                                        setPlatform(platforms[index].value)
                                    }
                                >
                                    <TabList className="flex gap-1 w-full">
                                        {platforms.map(({ value, label }) => (
                                            <Tab
                                                key={value}
                                                className="w-full h-[36px] rounded-[7px] py-1 px-3 text-xs/6 sm:text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-[#636366] data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/20 data-[focus]:outline-1 data-[focus]:outline-white"
                                            >
                                                {label}
                                            </Tab>
                                        ))}
                                    </TabList>
                                </TabGroup>
                            </div>
                        </>
                    )}
                    <Popover>
                        <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
                            <HiOutlineUserCircle className="min-w-[44px] h-[44px] bg-[#1B1B1B] rounded-full text-[#3D3D3D]" />
                        </PopoverButton>
                        <PopoverPanel
                            transition
                            anchor={
                                md
                                    ? { to: "left", gap: "4px" }
                                    : { to: "bottom end", gap: "4px" }
                            }
                            className="divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                        >
                            <div className="p-[6px]">
                                <Button
                                    variant="text"
                                    size="custom"
                                    className="rounded-[8px]"
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </Button>
                            </div>
                        </PopoverPanel>
                    </Popover>
                </div>
            </div>

            {md && (
                <div className="w-full mt-4 flex justify-between gap-2 flex-col sm:flex-row">
                    <SearchInput
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <TabGroup
                        selectedIndex={platforms.findIndex(
                            (item) => item.value === platform
                        )}
                        className="rounded-lg bg-[#7676803D] h-[44px] p-[4px] w-full mt-2 sm:mt-0"
                        onChange={(index) =>
                            setPlatform(platforms[index].value)
                        }
                    >
                        <TabList className="flex gap-1 w-full">
                            {platforms.map(({ value, label }) => (
                                <Tab
                                    key={value}
                                    className="w-full h-[36px] rounded-[7px] py-1 px-3 text-xs/6 sm:text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-[#636366] data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/20 data-[focus]:outline-1 data-[focus]:outline-white"
                                >
                                    {label}
                                </Tab>
                            ))}
                        </TabList>
                    </TabGroup>
                </div>
            )}
        </div>
    );
};

export default Header;
