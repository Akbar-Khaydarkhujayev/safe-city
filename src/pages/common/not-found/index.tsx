import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <>
            <div className="w-screen h-screen bg-primary flex flex-col items-center justify-center">
                <h1 className="text-7xl font-excluded font-bold mb-14">404</h1>
                <div className="text-5xl font-excluded mb-16">
                    Page not found
                </div>
                <Link to={"/"}>
                    <Button size="lg">Back to main page</Button>
                </Link>
            </div>
        </>
    );
};

export default NotFoundPage;
