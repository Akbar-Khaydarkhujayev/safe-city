import Button from "@/components/ui/Button";
import { IApp } from "../../api/getAll";
import { baseUrl } from "@/config/axios";

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
                <a
                    href={`${baseUrl}/application/${app?.url}`}
                    target="_blank"
                    download
                    rel="noopener noreferrer"
                >
                    <Button size="sm" className="mr-0 ml-auto">
                        Download
                    </Button>
                </a>
            </div>
        </div>
    );
};

export default AppCard;
