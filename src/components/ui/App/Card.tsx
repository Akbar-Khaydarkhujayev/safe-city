import { IApp } from "@/api/app/getAll";
import Button from "@/components/ui/Button";
import { baseUrl } from "@/config/axios";
import { useNavigate } from "react-router-dom";

const AppCard = ({ app, update = false }: { app: IApp; update?: boolean }) => {
    const navigate = useNavigate();

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
                <div className="line-clamp-2">
                    {app.name} - {app.description}
                </div>
                <div className="text-xs font-normal text-[#818181]">
                    Version {app.version}
                </div>
            </div>
            {!update && (
                <div className="w-[81px]">
                    <a
                        href={`${baseUrl}/application/${app?.url}`}
                        target="_blank"
                        download
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Button size="sm" className="mr-0 ml-auto">
                            Download
                        </Button>
                    </a>
                </div>
            )}
        </div>
    );
};

export default AppCard;
