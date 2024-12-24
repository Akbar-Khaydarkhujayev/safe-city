import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/config/axios";
import toast from "react-hot-toast";

export const upload = (data: FormData) =>
    axiosInstance
        .post("upload", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => res.data);

export const useUpload = () => {
    return useMutation({
        mutationFn: upload,
        onSuccess: () => {
            toast.success("Uploaded successfully!");
        },
        onError: () => {
            toast.error("Error! Try again!");
        },
    });
};
