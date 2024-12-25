import PlatformChoice from "./components/PlatformChoice";
import TypeChoice from "./components/UploadType";
import logo from "@/assets/logo.png";

interface IProps {
    platform?: boolean;
}

export default function AdminMainPage({ platform = false }: IProps) {
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="w-[450px] shadow-xl p-4">
                <div className="w-[141px] h-[84px] mx-auto">
                    <img src={logo} />
                </div>
                {platform ? <PlatformChoice /> : <TypeChoice />}
            </div>
        </div>
    );
}
