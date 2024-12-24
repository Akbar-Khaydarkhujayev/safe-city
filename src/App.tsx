import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./context/user";
import useAuth from "./hooks/useAuth";
import createRoutes from "./config/router";

const queryClient = new QueryClient();

function App() {
    const auth = useAuth();

    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <RouterProvider router={createRoutes(auth)} />
            </UserProvider>
        </QueryClientProvider>
    );
}

export default App;
