import Button from "@/components/ui/Button";
import img from "./image.png";

const AppCard = ({
    item,
}: {
    item: {
        id: number;
        name: string;
        version: string;
    };
}) => {
    return (
        <div className="rounded-lg">
            <div className="grid grid-cols-10 gap-4">
                <div className="col-span-2">
                    <img src={img} alt="" />
                </div>

                <div className="col-span-5">
                    <div className="text-lg font-semibold">{item.name}</div>
                    <div className="text-xs font-normal text-[#818181]">
                        {item.version}
                    </div>
                </div>
                <div className="col-span-3">
                    <Button size="md" className="ml-auto">
                        Download
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AppCard;
