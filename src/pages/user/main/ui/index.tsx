import { useEffect } from "react";
import { useGetApps, useGetReleases } from "../api/getAll";
import AppCard from "./components/AppCard";
import Header from "./components/Header";
import { AppsLoader, ReleasesLoader } from "./components/Loaders";
import ReleaseCard from "./components/ReleaseCard";
import { useInView } from "react-intersection-observer";
import NotFound from "@/components/ui/Feedback/NotFound";
import Error from "@/components/ui/Feedback/Error";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";

const MainPage: React.FC = () => {
    const { ref, inView } = useInView();

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
    } = useGetApps();

    const {
        data: releases,
        isLoading: isReleasesLoading,
        isSuccess: isReleasesSuccess,
        isError: isReleasesError,
    } = useGetReleases();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    return (
        <div className="w-[80%] mx-auto scroll-auto">
            <Header search={search} setSearch={setSearch} />

            <div className="font-semibold text-2xl text-white my-6">
                Releases
            </div>

            <div className="select-none">
                {isReleasesSuccess && (
                    <Flicking circular moveType="strict">
                        {releases?.map((app) => (
                            <div key={app.appId} className="w-[31%] mr-6">
                                <ReleaseCard app={app} />
                            </div>
                        ))}
                    </Flicking>
                )}
            </div>

            {isReleasesLoading && <ReleasesLoader />}

            {isReleasesError && <Error />}

            {isReleasesSuccess && releases.length < 1 && <NotFound />}

            <div className="font-semibold text-2xl text-white my-6">Apps</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {isAppsLoading && <AppsLoader />}
                {isAppsSuccess &&
                    apps?.pages.map((page) =>
                        page.map((app) => <AppCard app={app} />)
                    )}
            </div>

            {isAppsError && <Error />}

            {isAppsSuccess && apps.pages.length < 1 && <NotFound />}

            <div ref={ref} className="w-full h-1" />
            {isFetchingNextPage && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AppsLoader />
                </div>
            )}
        </div>
    );
};

export default MainPage;