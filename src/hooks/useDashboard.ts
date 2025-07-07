import api from "@/api/api";
import { DashboardStats, DistrictStats, GroupStats } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useDashboard() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: async () => {

            const [usersResponse, groupsResponse] = await Promise.all([
                api.getAllUsers(),
                api.getAllSupportGroups()
            ]);

            const groups = groupsResponse.data || [];

            const mothers = usersResponse.filter((user: { role?: { type: string }; district?: string }) => user.role?.type === 'mother');
            const districtMap = new Map<string, number>();
            mothers.forEach((mother: { district?: string }) => {
                if (mother.district) {
                    districtMap.set(mother.district, (districtMap.get(mother.district) || 0) + 1);
                }
            });

            const districtDistribution: DistrictStats[] = Array.from(districtMap.entries())
                .map(([district, count]) => ({ district, count }))
                .sort((a: DistrictStats, b: DistrictStats) => b.count - a.count);


            const groupMembership: GroupStats[] = groups.map((group: { documentId: string; name: string; members?: number; district?: string }) => ({
                groupId: group.documentId,
                groupName: group.name,
                memberCount: group.members || 0,
                district: group.district || 'Unknown'
            })).sort((a: GroupStats, b: GroupStats) => b.memberCount - a.memberCount);

            const stats: DashboardStats = {
                totalMothers: mothers.length,
                totalGroups: groups.length,
                districtDistribution,
                groupMembership
            };

            return stats;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes
    });

    return {
        stats: data as DashboardStats,
        isLoading,
        isError
    };
} 