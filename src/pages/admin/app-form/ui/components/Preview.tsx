import Button from "@/components/ui/Button";
import { IoIosArrowBack } from "react-icons/io";
import { FormSchemaType } from "./formSchema";
import { baseUrl } from "@/config/axios";

interface IProps {
    app: FormSchemaType;
    closePreview: () => void;
}

export default function Preview({ app, closePreview }: IProps) {
    return (
        <div>
            <div className="my-6">
                <Button variant="text" onClick={closePreview}>
                    <div className="flex items-center gap-2 pr-3 text-[17px]">
                        <IoIosArrowBack className="text-2xl" />
                        Back
                    </div>
                </Button>
            </div>
            <div className="flex justify-between my-12">
                <div className="grid gap-6">
                    <div className="font-bold text-5xl">
                        {app.name}{" "}
                        <span className="font-normal text-3xl text-[#0B82FF] align-text-top ml-1">
                            {app.type}
                        </span>
                    </div>
                    <div className="font-normal text-xl text-[#EBEBF599]">
                        Version {app.version}
                    </div>
                    <Button className="w-[200px] font-medium text-[22px]">
                        Download
                    </Button>
                </div>

                <div className="h-40 w-40 rounded-xl flex justify-center items-center overflow-hidden">
                    <img src={`${baseUrl}/img/${app.logo}`} alt="" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
                <div>
                    <div className="font-bold text-3xl">Description</div>
                    <div className="font-normal text-lg mt-6">
                        - {app.description}
                    </div>
                </div>
                <div>
                    <div className="font-bold text-3xl">What’s New</div>
                    <div className="font-bold text-lg text-[#EBEBF599] mt-3">
                        Version {app.version}
                    </div>
                    <div className="font-normal text-lg mt-6">
                        {" "}
                        - {app.news}
                    </div>
                </div>
            </div>
        </div>
    );
}
