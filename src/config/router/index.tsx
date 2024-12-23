import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../../layouts";
import ErrorPage from "@/pages/common/error-page";
import LoginPage from "@/pages/common/login-page";
import NotFoundPage from "@/pages/common/not-found";
import UserMainPage from "@/pages/user/main";
import AdminMainPage from "@/pages/admin/main";
import UserApplicationPage from "@/pages/user/application";
import AdminMainPage2 from "@/pages/admin/main2";
import AdminAddAppPage from "@/pages/admin/newApp";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <UserMainPage />,
            },
            {
                path: "/app",
                element: <UserApplicationPage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/admin",
                element: <AdminMainPage />,
            },
            {
                path: "/admin/next",
                element: <AdminMainPage2 />,
            },
            {
                path: "/admin/add",
                element: <AdminAddAppPage />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);
