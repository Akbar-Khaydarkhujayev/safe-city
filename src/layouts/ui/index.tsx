import Dropdown from "@/components/ui/Dropdown";
import { Outlet } from "react-router-dom";

const RootLayout = () => (
    <>
        <Dropdown />
        <Outlet />
    </>
);

export default RootLayout;
