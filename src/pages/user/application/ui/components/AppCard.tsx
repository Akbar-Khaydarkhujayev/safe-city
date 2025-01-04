import { downloadFile } from "@/api/app/download";
import { IApp } from "@/api/app/getAll";
import Button from "@/components/ui/Button";
import { baseUrl } from "@/config/axios";
import useResize from "@/hooks/use-resize";
import { useNavigate, useParams } from "react-router-dom";

const AppCard = ({ app, update = false }: { app: IApp; update?: boolean }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { sm } = useResize();

    return (
        <div
            className="flex gap-4 rounded-lg cursor-pointer"
            onClick={() => (id ? null : navigate(`${app.appId}`))}
        >
            <div className="min-w-[70px] w-[70px] min-h-[70px] h-[70px] sm:min-w-[100px] sm:w-[100px] sm:min-h-[100px] sm:h-[100px] col-span-2 rounded-xl flex justify-center items-center overflow-hidden">
                <img
                    src={`${baseUrl}/img/${app?.logo}`}
                    alt=""
                    className="object-contain object-center"
                />
            </div>

            <div className="col-span-6 w-full text-lg sm:text-2xl font-semibold overflow-hidden text-ellipsis">
                <div className="line-clamp-2">
                    {app.name} - {app.description}
                </div>
                <div className="text-xs sm:text-base font-normal text-[#818181]">
                    Version {app.version}
                </div>
            </div>
            {!update && (
                <div className="col-span-2">
                    <Button
                        size={sm ? "sm" : "md"}
                        className="mr-0 ml-auto h-[37px] text-base"
                        onClick={(e) => {
                            e.stopPropagation();
                            downloadFile(app.versionId);
                        }}
                    >
                        Download
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AppCard;
