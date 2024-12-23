import { useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
    const error: unknown = useRouteError();

    return (
        <div
            id="error-page"
            className="flex flex-col gap-8 justify-center items-center h-screen bg-primary"
        >
            <h1 className="text-4xl font-bold font-excluded">Error</h1>
            <p className="font-excluded">Something_went_wrong</p>
            <p className="text-slate-400 font-excluded">
                <i>
                    {(error as Error)?.message ||
                        (error as { statusText?: string })?.statusText}
                </i>
            </p>
        </div>
    );
};

export default ErrorPage;
