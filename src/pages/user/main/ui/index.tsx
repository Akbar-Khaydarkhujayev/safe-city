import { useEffect, useState } from "react";
import { useGetApps, useGetReleases } from "../api/getAll";
import Header from "./components/Header";
import ReleasesLoader from "./components/ReleasesLoader";
import ReleaseCard from "./components/ReleaseCard";
import { useInView } from "react-intersection-observer";
import NotFound from "@/components/ui/Feedback/NotFound";
import Error from "@/components/ui/Feedback/Error";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import AppCard from "@/components/ui/App/Card";
import AppsLoader from "@/components/ui/App/Loaders";
import { Tab, TabGroup, TabList } from "@headlessui/react";

const platforms = [
    { label: "All", value: "all" },
    { label: "Android", value: "ANDROID" },
    { label: "IOS", value: "IOS" },
    { label: "Desktop", value: "DESKTOP" },
];

const MainPage: React.FC = () => {
    const { ref, inView } = useInView();
    const [platform, setPlatform] = useState<string>("all");
    const [key, setKey] = useState(Date.now());

    const {
        data: apps,
        isError: isAppsError,
        isSuccess: isAppsSuccess,
        isLoading: isAppsLoading,
        search,
        setSearch,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useGetApps(platform !== "all" ? platform : undefined);

    const {
        data: releases,
        isLoading: isReleasesLoading,
        isSuccess: isReleasesSuccess,
        isError: isReleasesError,
    } = useGetReleases();

    useEffect(() => {
        setKey(Date.now());
    }, [releases]);

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    return (
        <div className="w-full">
            <div className="w-[85%] mx-auto scroll-auto">
                <Header search={search} setSearch={setSearch} />

                <div className="flex justify-end items-center mt-4">
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
                                    className="w-[70px] sm:w-[80px] md:w-[120px] h-[36px] rounded-[7px] py-1 px-3 text-xs/6 sm:text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-[#636366] data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/20 data-[focus]:outline-1 data-[focus]:outline-white"
                                >
                                    {label}
                                </Tab>
                            ))}
                        </TabList>
                    </TabGroup>
                </div>

                <div className="font-semibold text-2xl text-white my-6">
                    Releases
                </div>
            </div>

            <div className="select-none w-[100%] md:w-[85%] mx-auto">
                {isReleasesSuccess && (
                    <Flicking
                        key={key}
                        circular={true}
                        align="0%"
                        circularFallback="bound"
                        moveType="strict"
                    >
                        {[...releases].reverse().map((app) => (
                            <div key={app.appId} className="w-[400px] mr-3">
                                <ReleaseCard app={app} />
                            </div>
                        ))}
                    </Flicking>
                )}
            </div>

            <div className="w-[85%] mx-auto scroll-auto">
                {isReleasesLoading && <ReleasesLoader />}

                {isReleasesError && <Error />}

                {isReleasesSuccess && releases.length < 1 && <NotFound />}

                <div className="font-semibold text-2xl text-white my-6">
                    Apps
                </div>

                {isAppsError && <Error />}

                {isAppsSuccess && apps.pages[0].length < 1 && <NotFound />}

                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10 mb-10">
                    {isAppsLoading && <AppsLoader />}
                    {isAppsSuccess &&
                        apps?.pages.map((page) =>
                            page.map((app) => <AppCard app={app} />)
                        )}
                </div>

                <div ref={ref} className="w-full h-1" />

                {isFetchingNextPage && (
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10 mb-10">
                        <AppsLoader />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainPage;
