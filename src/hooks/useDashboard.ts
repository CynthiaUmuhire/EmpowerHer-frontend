import api from "@/api/api";
import { Group, User } from "@/types";
import { useQuery } from "@tanstack/react-query";

import { shapeDashboardData } from "@/utils/shapeDashboardData";

export default function useDashboard() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: async () => {
            const [usersResponse, groupsResponse] = await Promise.all([
                api.getAllUsers(),
                api.getAllSupportGroups()
            ]);
            const mothers: User[] = usersResponse.filter((user: User) => typeof user.role !== 'string' && user.role.type === 'mother'
            );
            const groups: Group[] = groupsResponse.data || [];
            // console.log(mothers, 'mothers', groups, 'groups');
            const districtFeatures = shapeDashboardData({
                users: mothers,
                supportGroups: groups
            });
            console.log(districtFeatures, 'districtFeatures');
            // const groupMembership = districtFeatures.supportGroups.supportGroups.map(group => ({
            //     groupId: group.id,
            //     groupName: group.name,
            //     memberCount: group.memberCount,
            //     district: group.district,
            //     contacts: group.contacts
            // }))

            // const districtDistribution = districtFeatures.supportGroups.supportGroups.map(group => ({
            //     district: group.district,
            //     count: group.memberCount
            // }));

            return {
                districtFeatures,
                totalMothers: mothers.length,
                totalGroups: groups.length,
                // groupMembership,
                // districtDistribution,
            };
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10
    });

    return {
        stats: data,
        isLoading,
        isError
    };
}
