import { Group, User } from '@/types';
import { geoDistrictMap } from './geoDstrictMap';
export function shapeDashboardData({ users, supportGroups }: { users: User[], supportGroups: Group[] }) {
    const groupedData: Record<string, {
        supportGroups: {
            id: number;
            name: string;
            district: string;
            memberCount: number;
            coordinates: number[];
            contacts: string;
        }[];
        totalPeople: number;
    }> = {};

    // Group users by district
    const usersByDistrict = users.reduce((acc: Record<string, User[]>, user: User) => {
        const district = user.district || 'No District';
        if (!acc[district]) acc[district] = [];
        acc[district].push(user);
        return acc;
    }, {});

    // Group support groups by district
    const groupsByDistrict = supportGroups.reduce((acc: Record<string, Group[]>, group: Group) => {
        const district = group.district || 'No District';
        if (!acc[district]) acc[district] = [];
        acc[district].push(group);
        return acc;
    }, {});

    // Build the result structure
    const allDistricts = new Set([
        ...Object.keys(usersByDistrict),
        ...Object.keys(groupsByDistrict),
    ]);

    allDistricts.forEach((district) => {
        const mapEntry = geoDistrictMap.get(district);
        const coordinates = mapEntry?.supportGroups?.[0]?.coordinates[0][0] || [0, 0];

        const supportGroups = (groupsByDistrict[district] || []).map((group) => {
            return {
                id: group.id,
                name: group.name,
                district: district,
                memberCount: group.members || 0,
                coordinates,
                contacts: group.assistantContact
            };
        });

        groupedData[district] = {
            supportGroups,
            totalPeople: usersByDistrict[district]?.length || 0,
        };
    });

    return groupedData;
}