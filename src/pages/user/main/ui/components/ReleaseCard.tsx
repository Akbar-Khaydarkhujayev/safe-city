import Button from "@/components/ui/Button";
import bgImg from "./bg-img.png";
import { IApp } from "../../api/getAll";
import { baseUrl } from "@/config/axios";

const ReleaseCard = ({ app }: { app: IApp }) => {
    return (
        <div
            className="rounded-lg flex p-4 flex-col h-64 border border-[#545458A6] bg-no-repeat bg-cover bg-center"
            style={{
                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url(${bgImg})`,
            }}
        >
            <div className="flex-grow" />
            <div className="flex justify-between">
                <div className="w-[70px] h-[70px] rounded-xl flex justify-center items-center overflow-hidden">
                    <img src={`${baseUrl}/img/${app?.logo}`} alt="" />
                </div>

                <div className="max-w-[50%] text-lg font-semibold overflow-hidden text-ellipsis">
                    <div className="line-clamp-2">
                        {app.name} - {app.description}
                    </div>
                    <div className="text-xs font-normal text-[#818181]">
                        {app.version}
                    </div>
                </div>
                <div className="py-1 w-[81px]">
                    <a
                        href={`${baseUrl}/download/application/${app?.url}`}
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
        </div>
    );
};

export default ReleaseCard;
