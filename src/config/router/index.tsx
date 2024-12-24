import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../../layouts";
import ErrorPage from "@/pages/common/error-page";
import LoginPage from "@/pages/common/login-page";
import NotFoundPage from "@/pages/common/not-found";
import UserMainPage from "@/pages/user/main";
import UserApplicationPage from "@/pages/user/application";
import AdminMainPage from "@/pages/admin/main";
import AdminAppFromPage from "@/pages/admin/app-form";
// import AdminMainPage from "@/pages/admin/main";
// import AdminMainPage2 from "@/pages/admin/main2";
// import AdminAddAppPage from "@/pages/admin/newApp";

const UserRoutes = [
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
];

const AdminRoutes = [
    {
        index: true,
        element: <AdminMainPage />,
    },
    {
        path: "/new",
        element: <AdminMainPage platform />,
    },
    {
        path: "/new/:platform",
        element: <AdminAppFromPage />,
    },
];

export default function createRoutes(
    auth: boolean
): ReturnType<typeof createBrowserRouter> {
    return createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            errorElement: <ErrorPage />,
            children: auth ? AdminRoutes : UserRoutes,
        },
        {
            path: "*",
            element: <NotFoundPage />,
        },
    ]);
}
