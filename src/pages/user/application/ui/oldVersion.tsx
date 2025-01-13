import Button from "@/components/ui/Button";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "@/config/axios";
import logo from "/public/logo.png";
import useResize from "@/hooks/use-resize";
import { useDownloadFile } from "@/hooks/useDownload";
import dayjs from "dayjs";
import { useGetOldVersionById } from "../api/getById";

export default function OldVersionPage() {
    const { versionId } = useParams();
    const navigate = useNavigate();
    const { handleDownload, handleCancel, loadingButtonContent, loading } =
        useDownloadFile();

    const { sm } = useResize();

    const { data: app } = useGetOldVersionById(versionId);

    return (
        <div className="w-[85%] mx-auto mb-8">
            <div
                className="w-[74px] h-[44px] mt-10 cursor-pointer"
                onClick={() => navigate("/")}
            >
                <img src={logo} />
            </div>

            <div className="flex justify-between items-center mb-8 mt-10">
                <Button variant="text" onClick={() => navigate(-1)}>
                    <div className="flex items-center gap-2 pr-3 text-[17px]">
                        <IoIosArrowBack className="text-2xl" />
                        Back
                    </div>
                </Button>
            </div>

            <div className="flex justify-between flex-row-reverse sm:flex-row mb-8 sm:mb-12 mt-6 gap-2">
                <div className="grid gap-1 sm:gap-4">
                    <div className="font-semibold sm:font-bold text-2xl sm:text-5xl">
                        {app?.name}{" "}
                        <span className="block sm:inline font-normal text-sm sm:font-normal md:text-2xl text-[#0B82FF] align-text-top sm:ml-1">
                            {app?.type.toUpperCase()}{" "}
                            <span className="font-normal text-sm sm:font-normal md:text-2xl align-text-top sm:ml-1 text-orange-600">
                                | OLD VERSION
                            </span>
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
                    <Button
                        size={sm ? "sm" : "md"}
                        className="w-[200px] font-medium text-[22px] mt-4"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (loading) handleCancel();
                            else {
                                if (app?.versionId)
                                    handleDownload(app.versionId);
                            }
                        }}
                        variant={loading ? "error" : "primary"}
                    >
                        {loadingButtonContent}
                    </Button>
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
                    <div className="font-normal text-lg mt-6">
                        {app?.news ? app?.news : "-"}
                    </div>
                </div>
            </div>
        </div>
    );
}
