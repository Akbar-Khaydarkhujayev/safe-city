import { axiosInstance } from "@/config/axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export function useUpload() {
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("Upload");
    const abortControllerRef = useRef<AbortController | null>(null);

    const loadingInputContent = loading ? (
        <div className="flex items-center justify-center">
            Cancel: {progress}%
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
        abortControllerRef.current = new AbortController();

        axiosInstance
            .post("upload", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                signal: abortControllerRef.current.signal,
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
                console.error(error.message);
            })
            .finally(() => {
                setLoading(false);
                setLoadingText("Upload");
            });
    };

    const handleCancel = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            setLoading(false);
            setLoadingText("Upload");
            setProgress(0);
        }
    };

    return { handleUpload, handleCancel, loadingInputContent, loading };
}
