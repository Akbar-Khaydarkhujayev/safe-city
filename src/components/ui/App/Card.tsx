import { useDownloadFile } from "@/hooks/useDownload";
import { IApp } from "@/api/app/getAll";
import Button from "@/components/ui/Button";
import { baseUrl } from "@/config/axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const AppCard = ({ app, update = false }: { app: IApp; update?: boolean }) => {
    const navigate = useNavigate();
    const { handleDownload, loadingButtonContent, loading } = useDownloadFile({
        loadingSize: 14,
    });

    return (
        <div
            className="flex gap-4 rounded-lg cursor-pointer"
            onClick={() => navigate(`${app.appId}/${app.type}`)}
        >
            <div className="min-w-[75px] w-[75px] h-[75px] col-span-2 rounded-xl flex justify-center items-center overflow-hidden">
                <img
                    src={`${baseUrl}/img/${app?.logo}`}
                    alt=""
                    className="object-contain object-center"
                />
            </div>

            <div className="w-full text-lg font-semibold overflow-hidden text-ellipsis -mt-[2px]">
                <div className="line-clamp-1">
                    {app.name} - {app.description}
                </div>
                <div className="text-xs font-normal text-[#818181] text-ellipsis line-clamp-1">
                    Version {app.version}
                </div>
                <div className="text-xs font-normal text-[#818181] text-ellipsis line-clamp-1">
                    {app?.count} downloads
                </div>
                <div className="text-xs font-normal text-[#818181] text-ellipsis line-clamp-1">
                    {dayjs(app?.createdAt).format("MMMM D, YYYY h:mm A")}
                </div>
            </div>
            {!update ? (
                <div className="w-[81px]">
                    <Button
                        size="sm"
                        className="mr-0 ml-auto w-[81px]"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(app.versionId);
                        }}
                        disabled={loading}
                    >
                        {loadingButtonContent}
                    </Button>
                    <div className="text-xs font-normal text-[#818181] text-center text-ellipsis line-clamp-1 mt-3">
                        {app.size} MB
                    </div>
                </div>
            ) : (
                <div className="w-[81px]">
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`update/${app.appId}`);
                        }}
                        size="sm"
                        className="mr-0 ml-auto mt-1 w-full"
                    >
                        Update
                    </Button>
                    <div className="text-xs font-normal text-[#818181] text-ellipsis line-clamp-1 text-center mt-3">
                        {app.size} MB
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppCard;
