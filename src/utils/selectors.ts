import { Group } from "@/types";
import generateImageUrl from "@/utils/generateImageUrl";


export const transformGroupsData = (data: { data: { map: (arg0: (group: { coverImage: { url: string | null; }; }) => { coverImage: string | null; }) => Group[]; }; }): Group[] => {

    if (!data?.data) return [];

    return data.data.map((group: { coverImage: { url: string | null; }; }) => ({
        ...group,
        coverImage: generateImageUrl(group.coverImage?.url)
    }));
};

export const groupByRegion = (groups: Group[] | undefined) => {
    if (!groups || !Array.isArray(groups)) {
        return {};
    }
    const grouped = groups.reduce((acc, group) => {
        const region = group.region || 'Other';
        if (!acc[region]) {
            acc[region] = [];
        }
        acc[region].push(group);
        return acc;
    }, {} as Record<string, Group[]>);

    // Sort regions alphabetically
    return Object.fromEntries(
        Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b))
    );
};