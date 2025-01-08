import { useMutation } from "@tanstack/react-query";
import { EditFormSchemaType } from "../components/formSchema";
import { axiosInstance } from "@/config/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const editApp = (data: EditFormSchemaType) =>
    axiosInstance.put("app", data).then((res) => res.data);

export const useEditApp = () => {
    const navigate = useNavigate();
    const [loadingToastId, setLoadingToastId] = useState("");

    return useMutation({
        mutationFn: editApp,
        onMutate: () => {
            setLoadingToastId(toast.loading("Editing app..."));
        },
        onSuccess: () => {
            toast.success("App edited successfully", {
                id: loadingToastId,
            });
            navigate("/");
        },
        onError: () => {
            toast.dismiss(loadingToastId);
        },
    });
};
