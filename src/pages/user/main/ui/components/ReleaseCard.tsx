import Button from "@/components/ui/Button";
import bgImg from "./bg-img.png";
import { IApp } from "../../api/getAll";
import { baseUrl } from "@/config/axios";

const ReleaseCard = ({ app }: { app: IApp }) => {
    return (
        <div
            className="rounded-lg flex p-6 flex-col h-64 border border-[#545458A6] bg-no-repeat bg-cover bg-center"
            style={{
                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url(${bgImg})`,
            }}
        >
            <div className="flex-grow" />
            <div className="grid grid-cols-10 gap-4">
                <div className="w-[70px] h-[70px] col-span-2 rounded-xl flex justify-center items-center overflow-hidden">
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
                <div className="col-span-2 py-1">
                    <a
                        href={`${baseUrl}/apk/${app?.url}`}
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
