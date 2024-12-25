import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./context/user";
import useAuth from "./hooks/useAuth";
import createRoutes from "./config/router";
import { Toaster } from "react-hot-toast";
import Loading from "./components/Loading";

const queryClient = new QueryClient();

function App() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading)
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <Loading size={75} type="tailChase" />
            </div>
        );

    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <RouterProvider router={createRoutes(isAuthenticated)} />
                <Toaster position="top-right" />
            </UserProvider>
        </QueryClientProvider>
    );
}

export default App;
