import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Button from "../Button";
import { useUser } from "@/context/user";
import { useNavigate } from "react-router-dom";

export default function Dropdown() {
    const [top, setTop] = useState("-top-10");
    const { dispatch } = useUser();
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("token");

    return (
        <div
            className={`absolute left-1 shadow-lg z-10 transition-all -top-10 ${top}`}
        >
            <div className="mb-2 rounded z-10 text-white">
                {!!isAuthenticated ? (
                    <Button
                        variant="error"
                        className="px-4 h-[36px] text-base font-normal"
                        onClick={() => {
                            setTop("-top-10");
                            navigate("/");
                            dispatch({
                                type: "CLEAR_USER",
                            });
                        }}
                    >
                        Log out
                    </Button>
                ) : (
                    <Button
                        className="px-8 h-[36px] text-base font-normal"
                        onClick={() => {
                            setTop("-top-10");
                            navigate("/login");
                        }}
                    >
                        Login
                    </Button>
                )}
            </div>
            <button
                onClick={() => setTop(top === "-top-10" ? "top-2" : "-top-10")}
                className="flex items-center gap-2 p-2 bg-gray-800 text-white rounded"
            >
                <IoIosArrowDown
                    className={`transition-transform ${
                        top === "-top-10" ? "" : "rotate-180"
                    }`}
                />
            </button>
        </div>
    );
}
