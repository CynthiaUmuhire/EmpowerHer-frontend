import { Group } from "@/types";
import generateImageUrl from "@/utils/generateImageUrl";


export const transformGroupsData = (data: { data: { map: (arg0: (group: { coverImage: { url: string | null; }; }) => { coverImage: string | null; }) => Group[]; }; }): Group[] => {

    if (!data?.data) return [];

    return data.data.map((group: { coverImage: { url: string | null; }; }) => ({
        ...group,
        coverImage: generateImageUrl(group.coverImage?.url)
    }));
};
