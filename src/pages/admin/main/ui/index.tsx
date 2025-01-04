import { useNavigate } from "react-router-dom";
import PlatformChoice from "./components/PlatformChoice";
import logo from "/public/logo.png";

export default function AdminMainPage() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="w-[400px] shadow-xl p-4">
                <div
                    className="w-[141px] h-[84px] mx-auto cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <img src={logo} />
                </div>
                <PlatformChoice />
            </div>
        </div>
    );
}
