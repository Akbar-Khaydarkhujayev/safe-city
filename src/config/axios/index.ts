import axios from "axios";
import toast from "react-hot-toast";

export const baseUrl =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEV_API_URL
        : import.meta.env.VITE_PROD_API_URL;

export const socketBaseUrl =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_DEV_API_URL
        : import.meta.env.VITE_PROD_SOCKET_URL;

export const axiosInstance = axios.create({
    baseURL: `${baseUrl}/`,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (axios.isCancel(error)) {
            toast.error("Canceled!");
            return Promise.reject(error);
        }
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.reload();
        }
        if (error.config.suppressErrorToast !== false) {
            toast.error(`${error.response?.data?.message || error.message}`);
        }
        return Promise.reject(error);
    }
);
