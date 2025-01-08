import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/config/axios";
import { IApp } from "@/api/app/getAll";

const getAppById = (id: string): Promise<IApp> =>
    axiosInstance.get(`/app/${id}`).then((res) => res.data.data);

export const useGetAppById = (id?: string) => {
    return useQuery({
        queryKey: ["app-by-id", id],
        queryFn: () => getAppById(id!),
        enabled: !!id,
    });
};
