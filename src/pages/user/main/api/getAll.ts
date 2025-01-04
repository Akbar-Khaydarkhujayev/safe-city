import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "@/config/axios";
import { useDebounce } from "@/hooks/use-debounce";
import { IApp } from "@/api/app/getAll";

interface IParams {
    search?: string;
    page?: number;
    limit?: number;
    type?: string;
}

const getApps = (params: IParams): Promise<IApp[]> =>
    axiosInstance.get("/apps", { params }).then((res) => res.data.data);

export const useGetApps = () => {
    const [search, setSearch] = useState("");

    const debouncedQuery = useDebounce(search, 300);

    const query = useInfiniteQuery({
        queryKey: ["apps", debouncedQuery],
        queryFn: ({ pageParam }) =>
            getApps({ search: debouncedQuery, page: pageParam, limit: 9 }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 9 ? allPages.length + 1 : undefined;
        },
        initialPageParam: 1,
    });

    return {
        ...query,
        search,
        setSearch,
    };
};

export const useGetReleases = () =>
    useQuery({
        queryKey: ["releases"],
        queryFn: () =>
            getApps({
                page: 1,
                limit: 6,
                type: "release",
            }),
    });
