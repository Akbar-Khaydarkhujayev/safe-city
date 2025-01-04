import Button from "@/components/ui/Button";
import { baseUrl } from "@/config/axios";
import { downloadFile } from "@/api/app/download";
import { IApp } from "@/api/app/getAll";

const AppCard = ({ app }: { app: IApp }) => {
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
                    className="mr-0 ml-auto"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (app?.versionId) downloadFile(app.versionId);
                    }}
                >
                    Download
                </Button>
            </div>
        </div>
    );
};

export default AppCard;
