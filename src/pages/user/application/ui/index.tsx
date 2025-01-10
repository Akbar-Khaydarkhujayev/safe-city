import Button from "@/components/ui/Button";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOldVersions } from "../api/getAll";
import { baseUrl } from "@/config/axios";
import AppCard from "./components/AppCard";
import logo from "/public/logo.png";
import useResize from "@/hooks/use-resize";
import { useDownloadFile } from "@/hooks/useDownload";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConfirmDialog from "@/components/ui/Dialog/Confirm";
import { useDeleteVersion } from "../api/delete";

const categories = [
    {
        value: "release",
        label: "Release",
    },
    {
        value: "beta",
        label: "Beta",
    },
];

export default function UserApplicationPage() {
    const [confirm, setConfirm] = useState<number | null>(null);
    const { id, choosenType } = useParams();
    const navigate = useNavigate();

    const { sm } = useResize();

    const { handleDownload, handleCancel, loadingButtonContent, loading } =
        useDownloadFile();

    const token = localStorage.getItem("token");

    const { data: app, isSuccess } = useGetOldVersions(id, choosenType);
    const { mutate } = useDeleteVersion(() => navigate("/"));

    useEffect(() => {
        if (isSuccess && !app?.appId) {
            toast.error(`No ${choosenType} version of this app`);
            navigate(-1);
        }
    }, [app, choosenType, isSuccess, navigate]);

    return (
        <div className="w-[85%] mx-auto mb-8">
            <div
                className="w-[74px] h-[44px] mt-10 cursor-pointer"
                onClick={() => navigate("/")}
            >
                <img src={logo} />
            </div>

            <div className="flex justify-between items-center mb-8 mt-10">
                <Button variant="text" onClick={() => navigate("/")}>
                    <div className="flex items-center gap-2 pr-3 text-[17px]">
                        <IoIosArrowBack className="text-2xl" />
                        Back
                    </div>
                </Button>
                <TabGroup
                    selectedIndex={categories.findIndex(
                        (category) => category.value === choosenType
                    )}
                    className="rounded-lg bg-[#7676803D] h-[42px] p-1"
                    onChange={(index) =>
                        navigate(`/${id}/${categories[index].value}`)
                    }
                >
                    <TabList className="flex gap-1">
                        {categories.map(({ value, label }) => (
                            <Tab
                                key={value}
                                className="w-[80px] md:w-[120px] h-[34px] rounded-[7px] py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-[#636366] data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/20 data-[focus]:outline-1 data-[focus]:outline-white"
                            >
                                {label}
                            </Tab>
                        ))}
                    </TabList>
                </TabGroup>
            </div>

            <div className="flex justify-between flex-row-reverse sm:flex-row mb-8 sm:mb-12 mt-6">
                <div className="grid gap-1 sm:gap-4">
                    <div className="font-semibold sm:font-bold text-2xl sm:text-5xl">
                        {app?.name}{" "}
                        <span className="font-normal text-base sm:font-normal sm:text-3xl text-[#0B82FF] align-text-top sm:ml-1">
                            {app?.type}
                        </span>
                    </div>
                    <div className="font-normal text-base sm:font-normal sm:text-xl text-[#0B82FF]">
                        For {app?.platform}
                    </div>
                    <div className="font-normal text-base sm:font-normal sm:text-xl text-[#EBEBF599]">
                        Version {app?.version}
                    </div>
                    <div className="font-normal text-base sm:font-normal sm:text-xl text-[#EBEBF599]">
                        {app?.count} Downloads
                    </div>
                    <div className="font-normal text-base sm:font-normal sm:text-xl text-[#EBEBF599]">
                        {dayjs(app?.createdAt).format("MMMM D, YYYY h:mm A")}
                    </div>
                    <div className="font-normal text-base sm:font-normal sm:text-xl text-[#EBEBF599]">
                        {app?.size} MB
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 sm:mt-0 mt-1">
                        <Button
                            size={sm ? "sm" : "md"}
                            className="w-[200px] font-medium text-[22px]"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (loading) {
                                    handleCancel();
                                } else {
                                    if (app?.versionId)
                                        handleDownload(app.versionId);
                                }
                            }}
                            variant={loading ? "error" : "primary"}
                        >
                            {loadingButtonContent}
                        </Button>
                        {!!token && (
                            <Button
                                size={sm ? "sm" : "md"}
                                className="w-[200px] font-medium text-[22px]"
                                variant="error"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setConfirm(app?.versionId ?? 0);
                                }}
                                disabled={loading}
                            >
                                Delete
                            </Button>
                        )}
                    </div>
                </div>

                <div className="min-w-28 min-h-28 h-28 w-28 sm:min-w-40 sm:min-h-40 sm:h-40 sm:w-40 rounded-xl flex justify-center items-center overflow-hidden">
                    <img src={`${baseUrl}/img/${app?.logo}`} alt="" />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-16">
                <div>
                    <div className="font-bold text-2xl sm:text-3xl">
                        Description
                    </div>
                    <div className="font-normal text-base sm:text-lg mt-4">
                        {app?.description ? app?.description : "-"}
                    </div>
                </div>
                <div>
                    <div className="font-bold text-2xl sm:text-3xl">
                        What’s New
                    </div>
                    <div className="font-bold text-base sm:text-lg text-[#EBEBF599] mt-3">
                        Version {app?.version}
                    </div>
                    <div className="font-normal text-lg mt-4">
                        {app?.news ? app?.news : "-"}
                    </div>
                </div>
            </div>

            <ConfirmDialog
                title="Delete version"
                message="Are you sure you want delete this version?"
                open={!!confirm}
                onConfirm={() => {
                    if (confirm) mutate(confirm);
                }}
                onCancel={() => setConfirm(null)}
            />

            {isSuccess && app?.versions.length > 0 && (
                <>
                    <div className="font-semibold text-2xl text-white my-6">
                        Apps
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-10 mb-10">
                        {app?.versions.map((app) => (
                            <AppCard app={app} old={true} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
