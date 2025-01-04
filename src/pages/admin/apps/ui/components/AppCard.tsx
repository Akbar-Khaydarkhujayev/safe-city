import Button from "@/components/ui/Button";
import { baseUrl } from "@/config/axios";
import { useDownloadFile } from "@/hooks/useDownload";
import { IApp } from "@/api/app/getAll";

const AppCard = ({ app }: { app: IApp }) => {
    const { handleDownload, loadingButtonContent, loading } = useDownloadFile();

    return (
        <div className="grid grid-cols-10 gap-4 rounded-lg">
            <div className="col-span-2 rounded-xl overflow-hidden">
                <img src={`${baseUrl}/img/${app?.logo}`} alt="" />
            </div>

            <div className="col-span-6">
                <div className="text-lg font-semibold">
                    {app.name} - {app.description}
                </div>
                <div className="text-xs font-normal text-[#818181]">
                    {app.version}
                </div>
            </div>
            <div className="col-span-2">
                <Button
                    size="sm"
                    className="mr-0 ml-auto w-full"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (app?.versionId) handleDownload(app.versionId);
                    }}
                    disabled={loading}
                >
                    {loadingButtonContent}
                </Button>
            </div>
        </div>
    );
};

export default AppCard;
