import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

const types = [
    { label: "Create new app", value: "new" },
    { label: "Upgrade app", value: "apps" },
];

export default function TypeChoice() {
    const navigate = useNavigate();

    return (
        <>
            <div className="w-[60%] mx-auto text-[18px] font-normal text-center my-8">
                What do you want to do?
            </div>
            <div className="flex flex-col space-y-6">
                {types.map((type) => (
                    <Button
                        key={type.value}
                        border="10px"
                        className="text-[18px] font-semibold"
                        onClick={() => navigate(type.value)}
                    >
                        {type.label}
                    </Button>
                ))}
            </div>
        </>
    );
}
