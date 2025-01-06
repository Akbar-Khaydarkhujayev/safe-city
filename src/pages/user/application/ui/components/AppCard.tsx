import { useDownloadFile } from "@/hooks/useDownload";
import { IApp } from "@/api/app/getAll";
import Button from "@/components/ui/Button";
import { baseUrl } from "@/config/axios";
import useResize from "@/hooks/use-resize";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const AppCard = ({
    app,
    update = false,
    old = false,
}: {
    app: IApp;
    update?: boolean;
    old?: boolean;
}) => {
    const navigate = useNavigate();
    const { sm } = useResize();
    const { handleDownload, loadingButtonContent, loading } = useDownloadFile({
        loadingSize: sm ? 14 : 28,
    });

    return (
        <div
            className="flex gap-4 rounded-lg cursor-pointer"
            onClick={() =>
                old
                    ? navigate(`/${app.appId}/old/${app.versionId}`)
                    : navigate(`${app.appId}`)
            }
        >
            <div className="min-w-[70px] w-[70px] min-h-[70px] h-[70px] sm:min-w-[100px] sm:w-[100px] sm:min-h-[100px] sm:h-[100px] col-span-2 rounded-xl flex justify-center items-center overflow-hidden">
                <img
                    src={`${baseUrl}/img/${app?.logo}`}
                    alt=""
                    className="object-contain object-center"
                />
            </div>

            <div className="col-span-6 w-full text-lg sm:text-2xl font-semibold overflow-hidden text-ellipsis -mt-1">
                <div className="line-clamp-1">
                    {app.name} - {app.description}
                </div>
                <div className="text-xs sm:text-base font-normal text-[#818181]">
                    Version {app.version}
                </div>
                <div className="text-xs sm:text-base font-normal text-[#818181] text-ellipsis line-clamp-1">
                    Donwloaded: {app.count}{" "}
                    {app?.count ?? 0 > 1 ? "times" : "time"}
                </div>
                <div className="text-xs sm:text-base font-normal text-[#818181] text-ellipsis line-clamp-1">
                    {dayjs(app?.createdAt).format("MMMM D, YYYY h:mm A")}
                </div>
            </div>
            {!update && (
                <div className="col-span-2">
                    <Button
                        size={sm ? "sm" : "md"}
                        className="mr-0 ml-auto h-[37px] text-base w-full"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(app.versionId);
                        }}
                        disabled={loading}
                    >
                        {loadingButtonContent}
                    </Button>
                    <div className="text-xs sm:text-base font-normal text-[#818181] h-full text-center mt-3">
                        {app.size} MB
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppCard;
