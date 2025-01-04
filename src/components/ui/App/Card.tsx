import { downloadFile } from "@/api/app/download";
import { IApp } from "@/api/app/getAll";
import Button from "@/components/ui/Button";
import { baseUrl } from "@/config/axios";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const AppCard = ({ app, update = false }: { app: IApp; update?: boolean }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return (
        <div
            className="flex gap-4 rounded-lg cursor-pointer"
            onClick={() => navigate(`${app.appId}`)}
        >
            <div className="min-w-[70px] w-[70px] h-[70px] col-span-2 rounded-xl flex justify-center items-center overflow-hidden">
                <img
                    src={`${baseUrl}/img/${app?.logo}`}
                    alt=""
                    className="object-contain object-center"
                />
            </div>

            <div className="w-full text-lg font-semibold overflow-hidden text-ellipsis">
                <div className="line-clamp-1">
                    {app.name} - {app.description}
                </div>
                <div className="text-xs font-normal text-[#818181] mt-[3px]">
                    Version {app.version}
                </div>
                <div className="text-xs font-normal text-[#818181] mt-[3px]">
                    Donwloaded: {app.count} time(s)
                </div>
            </div>
            {!update ? (
                <div className="w-[81px]">
                    <Button
                        size="sm"
                        className="mr-0 ml-auto"
                        onClick={(e) => {
                            e.stopPropagation();
                            downloadFile(app.versionId, () =>
                                queryClient.invalidateQueries({
                                    queryKey: ["apps"],
                                })
                            );
                        }}
                    >
                        Download
                    </Button>
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
                </div>
            )}
        </div>
    );
};

export default AppCard;
