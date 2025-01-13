import logo from "/public/logo.png";
import { useGetApps } from "../api/getAll";
import AppsLoader from "@/components/ui/App/Loaders";
import AppCard from "@/components/ui/App/Card";
import Error from "@/components/ui/Feedback/Error";
import NotFound from "@/components/ui/Feedback/NotFound";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { useState } from "react";
import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
} from "@headlessui/react";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useUser } from "@/context/user";
import useResize from "@/hooks/use-resize";

const platforms = [
    { label: "All", value: "all" },
    { label: "Android", value: "ANDROID" },
    { label: "IOS", value: "IOS" },
    { label: "Desktop", value: "DESKTOP" },
];

export default function AdminAppsPage() {
    const [platform, setPlatform] = useState<string>("all");
    const navigate = useNavigate();
    const { dispatch } = useUser();
    const { lg } = useResize();

    const { data, isLoading, isSuccess, isError, isFetchingNextPage } =
        useGetApps(platform !== "all" ? platform : undefined);

    return (
        <div className="w-[85%] mx-auto">
            <div className="flex justify-between items-end mt-10">
                <div
                    className="w-[74px] h-[44px] mb-2 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <img src={logo} />
                </div>
                <div className="flex items-center gap-4">
                    {!lg && (
                        <TabGroup
                            selectedIndex={platforms.findIndex(
                                (item) => item.value === platform
                            )}
                            className="rounded-lg bg-[#7676803D] h-[48px] p-[6px]"
                            onChange={(index) =>
                                setPlatform(platforms[index].value)
                            }
                        >
                            <TabList className="flex gap-1">
                                {platforms.map(({ value, label }) => (
                                    <Tab
                                        key={value}
                                        className="w-[120px] h-[36px] rounded-[7px] py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-[#636366] data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/20 data-[focus]:outline-1 data-[focus]:outline-white"
                                    >
                                        {label}
                                    </Tab>
                                ))}
                            </TabList>
                        </TabGroup>
                    )}
                    <Popover>
                        {({ open }) => (
                            <div className="flex gap-4">
                                {(!lg || (lg && !open)) && (
                                    <Button
                                        className="rounded-md text-sm/6 font-semibold"
                                        onClick={() => navigate("/new")}
                                    >
                                        Create new
                                    </Button>
                                )}
                                <PopoverButton className="block text-sm/6 font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white data-[focus]:outline-1 data-[focus]:outline-white">
                                    <HiOutlineUserCircle className="w-12 h-12 bg-[#1B1B1B] rounded-full text-[#3D3D3D]" />
                                </PopoverButton>
                                <PopoverPanel
                                    transition
                                    anchor={
                                        lg
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
                                            onClick={() =>
                                                dispatch({
                                                    type: "CLEAR_USER",
                                                })
                                            }
                                        >
                                            Log out
                                        </Button>
                                    </div>
                                </PopoverPanel>
                            </div>
                        )}
                    </Popover>
                </div>
            </div>

            <div className="w-full mt-4">
                {lg && (
                    <TabGroup
                        selectedIndex={platforms.findIndex(
                            (item) => item.value === platform
                        )}
                        className="rounded-lg bg-[#7676803D] w-full h-[44px] p-[6px]"
                        onChange={(index) =>
                            setPlatform(platforms[index].value)
                        }
                    >
                        <TabList className="flex gap-1">
                            {platforms.map(({ value, label }) => (
                                <Tab
                                    key={value}
                                    className=" w-full rounded-[7px] py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-[#636366] data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/20 data-[focus]:outline-1 data-[focus]:outline-white"
                                >
                                    {label}
                                </Tab>
                            ))}
                        </TabList>
                    </TabGroup>
                )}
            </div>

            <div className="font-normal text-lg text-white mt-6 mb-8">
                Which app do you want to update?
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {isLoading && <AppsLoader />}
                {isSuccess &&
                    data?.pages.map((page) =>
                        page.map((app) => (
                            <AppCard key={app.appId} app={app} update />
                        ))
                    )}
            </div>

            {isError && <Error />}

            {isSuccess && data.pages[0].length < 1 && <NotFound />}

            {/* <div ref={ref} className="w-full h-1" /> */}
            {isFetchingNextPage && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AppsLoader />
                </div>
            )}
        </div>
    );
}
