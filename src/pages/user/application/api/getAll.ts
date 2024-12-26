import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/config/axios";
import { IApp } from "@/api/app/getAll";

interface IResponse extends IApp {
    versions: IApp[];
}

const getOldVersions = (id: string, type: string): Promise<IResponse> =>
    axiosInstance
        .get(`/app/get-versions/${id}/${type}`)
        .then((res) => res.data.data);

export const useGetOldVersions = (id?: string, type?: string) => {
    return useQuery({
        queryKey: ["old-versions", id, type],
        queryFn: () => getOldVersions(id!, type!),
        enabled: !!id && !!type,
    });
};
