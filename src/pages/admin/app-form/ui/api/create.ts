import { useMutation } from "@tanstack/react-query";
import { FormSchemaType } from "../components/formSchema";
import { axiosInstance } from "@/config/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const createApp = (data: FormSchemaType) =>
    axiosInstance.post("app", data).then((res) => res.data);

export const useCreateApp = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: createApp,
        onSuccess: () => {
            toast.success("App created successfully");
            navigate("/");
        },
    });
};
