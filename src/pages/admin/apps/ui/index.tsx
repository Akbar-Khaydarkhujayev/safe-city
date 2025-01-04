import logo from "/public/logo.png";
import { useGetApps } from "../api/getAll";
import AppsLoader from "@/components/ui/App/Loaders";
import AppCard from "@/components/ui/App/Card";
import Error from "@/components/ui/Feedback/Error";
import NotFound from "@/components/ui/Feedback/NotFound";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";

export default function AdminAppsPage() {
    const navigate = useNavigate();

    const { data, isLoading, isSuccess, isError, isFetchingNextPage } =
        useGetApps();

    return (
        <div className="w-[85%] mx-auto">
            <div className="flex justify-between items-end mt-10">
                <div
                    className="w-[88px] h-[52px] cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <img src={logo} />
                </div>
                <div className="flex items-center">
                    <Button
                        className="h-9 rounded-md text-sm/6 font-semibold"
                        onClick={() => navigate("/new")}
                    >
                        Create new
                    </Button>
                </div>
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
