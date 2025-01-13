import Button from "@/components/ui/Button";
import { baseUrl } from "@/config/axios";
import { useNavigate } from "react-router-dom";
import { useDownloadFile } from "@/hooks/useDownload";
import { IApp } from "@/api/app/getAll";

const ReleaseCard = ({ app }: { app: IApp }) => {
    const navigate = useNavigate();
    const { handleDownload, handleCancel, loadingButtonContent, loading } =
        useDownloadFile();

    return (
        <div
            onClick={() => {
                navigate(`${app.appId}/${app.type}`);
            }}
            className="rounded-lg flex p-4 flex-col h-64 border border-[#545458A6] bg-no-repeat bg-cover bg-center cursor-pointer"
            style={{
                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url(/public/release-bg.png)`,
            }}
        >
            <div className="flex-grow" />
            <div className="flex justify-between">
                <div className="w-[70px] h-[70px] rounded-xl flex justify-center items-center overflow-hidden">
                    <img src={`${baseUrl}/img/${app?.logo}`} alt="" />
                </div>

                <div className="max-w-[50%] text-lg font-semibold overflow-hidden text-ellipsis">
                    <div className="line-clamp-1">
                        {app.name} - {app.description}
                    </div>
                    <div className="text-xs font-normal text-[#818181] mt-[3px]">
                        Version {app.version}
                    </div>
                    <div className="text-xs font-normal text-[#818181] mt-[3px]">
                        Donwloaded: {app.count}{" "}
                        {app?.count ?? 0 > 1 ? "times" : "time"}
                    </div>
                </div>
                <div className="py-1 w-[81px]">
                    <Button
                        size="sm"
                        className="mr-0 ml-auto w-full"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (loading) handleCancel();
                            else handleDownload(app.versionId);
                        }}
                        variant={loading ? "error" : "primary"}
                    >
                        {loadingButtonContent}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ReleaseCard;
