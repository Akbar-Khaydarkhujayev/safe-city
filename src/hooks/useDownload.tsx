import { axiosInstance } from "@/config/axios";
import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export function useDownloadFile() {
    const queryClient = useQueryClient();
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("Download");
    const abortControllerRef = useRef<AbortController | null>(null);

    const loadingButtonContent = loading ? (
        <div className="flex items-center justify-center gap-2">
            Cancel: {progress}%
        </div>
    ) : (
        loadingText
    );

    const handleDownload = (id: number) => {
        setLoading(true);
        setLoadingText("Downloading...");
        abortControllerRef.current = new AbortController();

        axiosInstance
            .get(`app/download/${id}`, {
                responseType: "blob",
                signal: abortControllerRef.current.signal,
                onDownloadProgress: (progressEvent) => {
                    const total = progressEvent.total || 1;
                    const current = progressEvent.loaded;
                    const percentage = Math.floor((current / total) * 100);
                    setProgress(percentage);
                },
            })
            .then((response) => {
                const contentDisposition =
                    response.headers["content-disposition"];
                let fileName = "downloaded_file";

                if (contentDisposition) {
                    const fileNameMatch =
                        contentDisposition.match(/filename="(.+)"/);
                    if (fileNameMatch.length === 2) {
                        fileName = fileNameMatch[1];
                    }
                }

                const urlBlob = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                const link = document.createElement("a");
                link.href = urlBlob;
                link.setAttribute("download", fileName);
                document.body.appendChild(link);
                link.click();
                link.remove();
                toast.success("Download completed!");
            })
            .catch((error) => {
                console.error(error.message);
            })
            .finally(() => {
                setLoading(false);
                queryClient.invalidateQueries({
                    queryKey: ["apps"],
                });
                queryClient.invalidateQueries({
                    queryKey: ["releases"],
                });
                queryClient.invalidateQueries({
                    queryKey: ["old-versions"],
                });
                queryClient.invalidateQueries({
                    queryKey: ["old-version"],
                });
                setLoadingText("Download");
            });
    };

    const handleCancel = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            setLoading(false);
            setLoadingText("Download");
            setProgress(0);
        }
    };

    return { handleDownload, handleCancel, loadingButtonContent, loading };
}
