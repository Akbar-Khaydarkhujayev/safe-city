import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/config/axios";
import toast from "react-hot-toast";
import { useState } from "react";

export const upload = (data: FormData) =>
    axiosInstance
        .post("upload", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => res.data);

export const useUpload = () => {
    const [loadingToastId, setLoadingToastId] = useState("");

    return useMutation({
        mutationFn: upload,
        onMutate: () => {
            setLoadingToastId(toast.loading("Uploading file..."));
        },
        onSuccess: () => {
            toast.success("Uploaded successfully!", {
                id: loadingToastId,
            });
        },
        onError: () => {
            toast.dismiss(loadingToastId);
        },
    });
};
