import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <>
            <div className="w-screen h-screen bg-primary flex flex-col items-center justify-center">
                <h1 className="text-[100px] font-excluded font-bold mb-7">
                    404
                </h1>
                <div className="text-6xl font-excluded mb-6">
                    Page not found
                </div>
                <Link to={"/"}>
                    <Button>Back to main page</Button>
                </Link>
            </div>
        </>
    );
};

export default NotFoundPage;
