import { useNavigate } from "react-router-dom";
import PlatformChoice from "./components/PlatformChoice";
import TypeChoice from "./components/UploadType";
import logo from "/public/logo.png";

interface IProps {
    platform?: boolean;
}

export default function AdminMainPage({ platform = false }: IProps) {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="w-[400px] shadow-xl p-4">
                <div
                    className="w-[141px] h-[84px] mx-auto"
                    onClick={() => navigate("/")}
                >
                    <img src={logo} />
                </div>
                {platform ? <PlatformChoice /> : <TypeChoice />}
            </div>
        </div>
    );
}
