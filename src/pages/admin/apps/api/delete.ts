import { axiosInstance } from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const deleteApp = (id: number) => {
    return axiosInstance.delete(`app/${id}`).then((res) => res.data);
};

export const useDeleteApp = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteApp,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["apps"] });
            toast.success("Successfully deleted");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};
