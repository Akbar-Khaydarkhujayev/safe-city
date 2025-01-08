import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../../layouts";
import ErrorPage from "@/pages/common/error-page";
import LoginPage from "@/pages/common/login-page";
import NotFoundPage from "@/pages/common/not-found";
import UserMainPage from "@/pages/user/main";
import UserApplicationPage from "@/pages/user/application";
import AdminMainPage from "@/pages/admin/main";
import AdminAppFromPage from "@/pages/admin/app-form";
import AdminAppsPage from "@/pages/admin/apps";
import OldVersionPage from "@/pages/user/application/ui/oldVersion";
import AdminUpdateFromPage from "@/pages/admin/app-form/ui/update";

const UserRoutes = [
    {
        index: true,
        element: <UserMainPage />,
    },
    {
        path: "/:id/:choosenType",
        element: <UserApplicationPage />,
    },
    {
        path: "/:id/old/:versionId",
        element: <OldVersionPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
];

const AdminRoutes = [
    {
        index: true,
        element: <AdminAppsPage />,
    },
    {
        path: "/login",
        element: <Navigate to="/" />,
    },
    {
        path: "/:id/:choosenType",
        element: <UserApplicationPage />,
    },
    {
        path: "/:id/old/:versionId",
        element: <OldVersionPage />,
    },
    {
        path: "/new/:platform",
        element: <AdminAppFromPage />,
    },
    {
        path: "/new",
        element: <AdminMainPage />,
    },
    {
        path: "/update/:appId",
        element: <AdminAppFromPage />,
    },
    {
        path: "edit/:appId",
        element: <AdminUpdateFromPage />,
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
