import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

const platforms = [
    { label: "IOS", value: "ios" },
    { label: "Android", value: "android" },
    { label: "Desktop", value: "desktop" },
];

export default function PlatformChoice() {
    const navigate = useNavigate();

    return (
        <>
            <div className="w-[60%] mx-auto text-[18px] font-normal text-center my-8">
                Which platform do you want to access?
            </div>
            <div className="flex flex-col space-y-6">
                {platforms.map((platform) => (
                    <Button
                        key={platform.value}
                        border="10px"
                        className="text-[18px] font-semibold"
                        onClick={() => navigate(platform.value)}
                    >
                        {platform.label}
                    </Button>
                ))}
            </div>
        </>
    );
}
