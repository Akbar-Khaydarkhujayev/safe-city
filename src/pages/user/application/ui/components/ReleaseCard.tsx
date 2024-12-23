import Button from "@/components/ui/Button";
import img from "./image.png";
import img2 from "./image2.png";

const ReleaseCard = ({
    item,
}: {
    item: {
        id: number;
        name: string;
        version: string;
    };
}) => {
    return (
        <div
            className="rounded-lg flex p-6 flex-col h-64 border border-[#545458A6] bg-no-repeat bg-cover bg-center"
            style={{
                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url(${img2})`,
            }}
        >
            <div className="flex-grow" />
            <div className="grid grid-cols-10 gap-4">
                <div className="col-span-2">
                    <img src={img} alt="" />
                </div>

                <div className="col-span-6">
                    <div className="text-lg font-semibold">{item.name}</div>
                    <div className="text-xs font-normal text-[#818181]">
                        {item.version}
                    </div>
                </div>
                <div className="col-span-2 py-1">
                    <Button size="sm" className="mr-0 ml-auto">
                        Download
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ReleaseCard;
