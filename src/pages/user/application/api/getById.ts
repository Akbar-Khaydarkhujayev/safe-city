import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/config/axios";
import { IApp } from "@/api/app/getAll";

interface IResponse extends IApp {
    versions: IApp[];
}

const getOldVersionById = (id: string): Promise<IResponse> =>
    axiosInstance.get(`/version/${id}`).then((res) => res.data.data);

export const useGetOldVersionById = (id?: string) => {
    return useQuery({
        queryKey: ["old-version", id],
        queryFn: () => getOldVersionById(id!),
        enabled: !!id,
    });
};
