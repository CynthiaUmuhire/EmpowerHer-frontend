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
            const districtFeatures = shapeDashboardData({
                users: mothers,
                supportGroups: groups
            });
            const groupMembership = Object.values(districtFeatures)
                .flatMap(district =>
                    (district.supportGroups || []).map(group => ({
                        groupId: group.id,
                        groupName: group.name,
                        memberCount: group.memberCount,
                        district: group.district,
                        contacts: group.contacts
                    }))
                ).sort((a, b) => b.memberCount - a.memberCount).filter(item => item.memberCount > 0);
            const districtDistribution = Object.entries(districtFeatures).map(([districtName, district]) => ({
                district: districtName,
                supportGroupCount: district.supportGroups.length
            })).sort((a, b) => b.supportGroupCount - a.supportGroupCount);


            return {
                districtFeatures,
                totalMothers: mothers.length,
                totalGroups: groups.length,
                groupMembership,
                districtDistribution
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
