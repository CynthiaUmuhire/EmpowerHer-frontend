import api from "@/api/api";
import { Group } from "@/types";
import { useQuery } from "@tanstack/react-query";
import generateImageUrl from "@/utils/generateImageUrl";
import queryClient from "@/api/queryClient";
import { transformGroupsData } from "@/utils/selectors";
import { GROUPS_QUERY_KEY } from "@/constants/queryKeys";

export default function useGroupDetails(groupId: string | undefined) {
    const { data, isLoading, isError } = useQuery<Group>({
        queryKey: ['group', groupId],
        queryFn: async () => {
            if (!groupId) throw new Error("Group ID is required");
            const response = await api.getSupportGroupById(groupId);
            return {
                ...response.data,
                coverImage: generateImageUrl(response.data.coverImage?.url)
            };
        },
        initialData: () => {
            const rawData = queryClient.getQueryData(GROUPS_QUERY_KEY);
            if (!rawData) return undefined;
            const groups = transformGroupsData({ data: rawData.data ?? [] });
            if (!groupId) return undefined;
            const group = groups?.find(group => group.documentId === groupId);
            return group;
        },
        enabled: !!groupId,
        staleTime: 1000 * 60 * 1
    });

    return {
        group: data,
        isLoading,
        isError,
    };
}