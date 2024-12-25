import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/config/axios";

export interface IApp {
    appId: number;
    name: string;
    type: string;
    version: string;
    url: string;
    logo: string;
    description: string;
    news: string;
    createdAt: string;
    updatedAt: string;
}

const getApp = ({
    queryKey,
}: {
    queryKey: [string, number];
}): Promise<IApp[]> => {
    const [, id] = queryKey;
    return axiosInstance.get(`/app/${id}`).then((res) => res.data.data);
};

export const useGetApp = (id: number) =>
    useQuery({
        queryKey: ["app", id],
        queryFn: getApp,
    });
