import { axiosInstance } from "@/config/axios";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { useState } from "react";
import toast from "react-hot-toast";

interface IProps {
    loadingSize?: number;
}

export function useDownloadFile({ loadingSize = 28 }: IProps = {}) {
    const queryClient = useQueryClient();
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("Download");

    const loadingButtonContent = loading ? (
        <div className="flex items-center justify-center gap-2">
            <Loading size={loadingSize} />
            <span>{progress}%</span>
        </div>
    ) : (
        loadingText
    );

    const handleDownload = (id: number) => {
        setLoading(true);
        setLoadingText("Downloading...");
        toast.loading("Downloading...", { id: "download-toast" });

        axiosInstance
            .get(`app/download/${id}`, {
                responseType: "blob",
                onDownloadProgress: (progressEvent) => {
                    const total = progressEvent.total || 1;
                    const current = progressEvent.loaded;
                    const percentage = Math.floor((current / total) * 100);
                    setProgress(percentage);
                    toast.loading(`Downloading... ${percentage}%`, {
                        id: "download-toast",
                    });
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
            })
            .catch((error) => {
                toast.error("Download failed!");
                console.error("Download error:", error);
            })
            .finally(() => {
                toast.dismiss("download-toast");
                toast.success("Download completed!");
                setLoading(false);
                queryClient.invalidateQueries({
                    queryKey: ["apps"],
                });
                queryClient.invalidateQueries({
                    queryKey: ["releases"],
                });
                setLoadingText("Download");
            });
    };

    return { handleDownload, loadingButtonContent, loading };
}
