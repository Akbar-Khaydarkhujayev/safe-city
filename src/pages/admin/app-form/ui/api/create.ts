import { useMutation } from "@tanstack/react-query";
import { FormSchemaType } from "../components/formSchema";
import { axiosInstance } from "@/config/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const createApp = (data: FormSchemaType) =>
    axiosInstance.post("app", data).then((res) => res.data);

export const useCreateApp = () => {
    const navigate = useNavigate();
    const [loadingToastId, setLoadingToastId] = useState("");

    return useMutation({
        mutationFn: createApp,
        onMutate: () => {
            setLoadingToastId(toast.loading("Creating app..."));
        },
        onSuccess: () => {
            toast.success("App created successfully", {
                id: loadingToastId,
            });
            navigate("/");
        },
        onError: () => {
            toast.dismiss(loadingToastId);
        },
    });
};
