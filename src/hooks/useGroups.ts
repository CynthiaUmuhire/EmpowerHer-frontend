import api from "@/api/api";
import { GROUPS_QUERY_KEY } from "@/constants/queryKeys";
import { Group } from "@/types";
import { transformGroupsData } from "@/utils/selectors";
import { useQuery } from "@tanstack/react-query";

export default function useGroups() {
    const { data, isLoading, isError } = useQuery({
        queryKey: GROUPS_QUERY_KEY,
        queryFn: async () => {
            const response = await api.getAllSupportGroups();
            return response;
        },
        select: transformGroupsData,
        refetchOnWindowFocus: false,
        gcTime: 1000 * 60 * 5, // 5 minutes
        staleTime: 1000 * 60 * 5, // 5 minutes

    })
    return {
        groups: data as Group[],
        isLoading,
        isError
    }
}