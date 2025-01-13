import { useDownloadFile } from "@/hooks/useDownload";
import { IApp } from "@/api/app/getAll";
import Button from "@/components/ui/Button";
import { baseUrl } from "@/config/axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../Dialog/Confirm";
import { useState } from "react";
import { useDeleteApp } from "@/pages/admin/apps/api/delete";

const AppCard = ({ app, update = false }: { app: IApp; update?: boolean }) => {
    const navigate = useNavigate();

    const [confirm, setConfirm] = useState<number | null>(null);

    const { handleDownload, handleCancel, loadingButtonContent, loading } =
        useDownloadFile();
    const { mutate } = useDeleteApp();

    return (
        <div
            className="flex gap-4 rounded-lg cursor-pointer items-center"
            onClick={() => navigate(`${app.appId}/${app.type}`)}
        >
            <div className="min-w-[93px] w-[93px] h-[93px] col-span-2 rounded-xl flex justify-center items-center overflow-hidden">
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
                {!!update && (
                    <div className="text-xs font-normal text-[#818181] text-ellipsis line-clamp-1">
                        {app.size} MB
                    </div>
                )}
                <div className="text-xs font-normal text-[#818181] text-ellipsis line-clamp-1">
                    {dayjs(app?.createdAt).format("MMMM D, YYYY h:mm A")}
                </div>
                <div className="text-xs font-normal text-[#818181] text-ellipsis line-clamp-1">
                    {app?.platform}
                </div>
            </div>
            {!update ? (
                <div className="w-[81px]">
                    <Button
                        size="sm"
                        className="mr-0 ml-auto w-[81px]"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (loading) {
                                handleCancel();
                            } else {
                                handleDownload(app.versionId);
                            }
                        }}
                        variant={loading ? "error" : "primary"}
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
                        Upgrade
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`edit/${app.appId}`);
                        }}
                        size="sm"
                        className="mr-0 ml-auto mt-1 w-full"
                    >
                        Edit
                    </Button>
                    <Button
                        variant="error"
                        onClick={(e) => {
                            e.stopPropagation();
                            setConfirm(app.appId);
                        }}
                        size="sm"
                        className="mr-0 ml-auto mt-1 w-full"
                    >
                        Delete
                    </Button>
                </div>
            )}

            <ConfirmDialog
                title="Delete Application"
                message="Are you sure you want delete application?"
                open={!!confirm}
                onConfirm={() => {
                    if (confirm) mutate(confirm);
                }}
                onCancel={() => setConfirm(null)}
            />
        </div>
    );
};

export default AppCard;
