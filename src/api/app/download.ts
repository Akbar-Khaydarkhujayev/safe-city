import { axiosInstance } from "@/config/axios";
import toast from "react-hot-toast";

export function downloadFile(id: number, finallyCallback?: () => void) {
    toast.loading("Downloading...", { id: "download-toast" });

    axiosInstance
        .get(`app/download/${id}`, {
            responseType: "blob",
            onDownloadProgress: (progressEvent) => {
                const total = progressEvent.total || 1;
                const current = progressEvent.loaded;
                const percentage = Math.floor((current / total) * 100);
                toast.loading(`Downloading... ${percentage}%`, {
                    id: "download-toast",
                });
            },
        })
        .then((response) => {
            const contentDisposition = response.headers["content-disposition"];
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
            if (finallyCallback) finallyCallback();
        });
}
