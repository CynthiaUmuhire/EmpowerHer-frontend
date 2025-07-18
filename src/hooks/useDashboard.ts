import api from "@/api/api";
import { Group, User } from "@/types";
import { useQuery } from "@tanstack/react-query";

import rwandaGeoJson from '../rwandaDistrict.json';

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

            // Build a mapping of district => { features, coordinates }
            const geoDistrictMap = new Map();
            rwandaGeoJson.features.forEach(feature => {
                const districtName = feature.properties.NAME_2?.trim();

                if (districtName) {
                    geoDistrictMap.set(districtName, {
                        feature,
                        groups: [],
                        users: [],
                        coordinates: feature.geometry
                    });
                }
            });

            // Group mothers by district
            const mothersByDistrict = mothers.reduce((acc, user) => {
                if (user.district) {
                    if (!acc[user.district]) acc[user.district] = [];
                    acc[user.district].push(user);
                } else {
                    acc['Unknown'] = acc['Unknown'] || [];
                    acc['Unknown'].push(user);
                }
                return acc;
            }, {} as Record<string, User[]>);

            // Group groups by district
            const groupsByDistrict = groups.reduce((acc, group) => {
                const dist = group.district || 'Unknown';
                if (!acc[dist]) acc[dist] = [];
                acc[dist].push({
                    groupId: group.documentId,
                    groupName: group.name,
                    memberCount: group.members || 0,
                    members: mothersByDistrict[dist] || []
                });
                return acc;
            }, {} as Record<string, any[]>);

            const districtFeatures = Object.entries(groupsByDistrict).map(([district, groupList]) => {
                const geo = geoDistrictMap.get(district);
                return {
                    district,
                    coordinates: geo?.coordinates || null,
                    groups: groupList
                };
            });
            const groupMembership = districtFeatures.flatMap(district => {
                return district.groups.map(group => ({
                    groupId: group.groupId,
                    groupName: group.groupName,
                    memberCount: group.memberCount,
                    district: district.district
                }));
            });
            const districtDistribution = districtFeatures.map(district => ({
                district: district.district,
                count: district.groups.reduce((sum, group) => sum + group.memberCount, 0)
            }));

            return {
                districtFeatures,
                totalMothers: mothers.length,
                totalGroups: groups.length,
                groupMembership,
                districtDistribution,
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
