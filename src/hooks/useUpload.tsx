import { axiosInstance } from "@/config/axios";
import Loading from "@/components/Loading";
import { useState } from "react";
import toast from "react-hot-toast";

interface IProps {
    loadingSize?: number;
}

export function useUpload({ loadingSize = 16 }: IProps = {}) {
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("Upload");

    const loadingInputContent = loading ? (
        <div className="flex items-center justify-center gap-2">
            <Loading size={loadingSize} />
            <span>{progress}%</span>
        </div>
    ) : (
        loadingText
    );

    const handleUpload = (
        data: FormData,
        onSuccess: (data: string) => void
    ) => {
        setLoading(true);
        setLoadingText("Uploading...");

        axiosInstance
            .post("upload", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: (progressEvent) => {
                    const total = progressEvent.total || 1;
                    const current = progressEvent.loaded;
                    const percentage = Math.floor((current / total) * 100);
                    setProgress(percentage);
                },
            })
            .then((response) => {
                onSuccess(response.data.data);
                toast.success("Uploaded successfully!");
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => {
                setLoading(false);
                setLoadingText("Upload");
            });
    };

    return { handleUpload, loadingInputContent, loading };
}
