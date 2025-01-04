import { useMutation } from "@tanstack/react-query";
import { UpgradeFormSchemaType } from "../components/formSchema";
import { axiosInstance } from "@/config/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const upgradeApp = (data: UpgradeFormSchemaType) =>
    axiosInstance.post("version", data).then((res) => res.data);

export const useUgradeApp = () => {
    const navigate = useNavigate();
    const [loadingToastId, setLoadingToastId] = useState("");

    return useMutation({
        mutationFn: upgradeApp,
        onMutate: () => {
            setLoadingToastId(toast.loading("Creating new version..."));
        },
        onSuccess: () => {
            toast.success("New version created successfully", {
                id: loadingToastId,
            });
            navigate("/");
        },
        onError: () => {
            toast.dismiss(loadingToastId);
        },
    });
};
