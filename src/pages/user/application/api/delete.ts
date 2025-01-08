import { axiosInstance } from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const deleteVersion = (id: number) => {
    return axiosInstance.delete(`version/${id}`).then((res) => res.data);
};

export const useDeleteVersion = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteVersion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["old-versions"] });
            toast.success("Successfully deleted");
            if (onSuccess) onSuccess();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};
