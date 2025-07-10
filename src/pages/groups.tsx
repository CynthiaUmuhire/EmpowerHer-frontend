import CenteredContent from "@/components/ui/CenteredContent";
import Spinner from "@/components/ui/spinner";
import SupportGroup from "@/components/ui/supportGroup";
import useGroups from "@/hooks/useGroups";
import FilteringCard from "@/components/ui/filteringCard";
import { useState, useMemo } from "react";
import { Group } from "lucide-react";
import useUserInfo from "@/hooks/useUserInfo";
import { Registration } from "@/types";

export default function Groups() {
    const { groups, isLoading, isError } = useGroups();
    const { user, isLoading: userLoading } = useUserInfo();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("all");
    const [selectedOption, setSelectedOption] = useState("all");

    // Get all unique regions from groups
    const regionOptions = useMemo(() => {
        if (!groups) return [];
        const regions = Array.from(new Set(groups.map(g => g.region || "Other")));
        return regions;
    }, [groups]);

    // Get group documentIds for approved registrations
    const approvedGroupIds = useMemo(() => {
        if (!user || !user.approvedRegistrations) return [];
        console.log(user.approvedRegistrations, 'approvedRegistrations');
        return user.approvedRegistrations
            .map(reg => (reg as Registration & { group?: { documentId: string } }).group?.documentId)
            .filter(Boolean);
    }, [user]);

    // Filter groups by search, region, and "your groups" option
    const filteredGroups = useMemo(() => {
        if (!groups) return [];
        return groups.filter(group => {
            const matchesRegion = selectedRegion === "all" || (group.region || "Other") === selectedRegion;
            const matchesSearch =
                group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                group.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesOption =
                selectedOption === "all" ||
                (selectedOption === "your" && approvedGroupIds.includes(group.documentId));
            return matchesRegion && matchesSearch && matchesOption;
        });
    }, [groups, searchTerm, selectedRegion, selectedOption, approvedGroupIds]);

    // Options for FilteringCard
    const groupOptions = [
        { value: "your", label: "Your Groups" }
    ];

    return (
        <section className="h-full mb-10">
            <div className="h-64 bg-gradient-to-r from-secondary-400 to-secondary-200 text-secondary-50">
                <CenteredContent>
                    <div className=" h-full gap-5 flex flex-col items-start justify-center">
                        <h1 className="font-bold text-2xl md:text-7xl">Support groups</h1>
                        <p>Find the perfect support group for your needs. Connect with other mothers, access resources, and build lasting relationships.</p>
                    </div>
                </CenteredContent>
            </div>
            <CenteredContent>
                <FilteringCard
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    categories={regionOptions}
                    selectedCategory={selectedRegion}
                    onCategoryChange={setSelectedRegion}
                    categoryLabel="Regions"
                    options={groupOptions}
                    selectedOption={selectedOption}
                    optionLabel="All Groups"
                    onOptionChange={setSelectedOption}
                    handleOnClick={() => { }}
                    optionIcon={<Group className="w-4 h-4 mr-2" />}
                />
                {(isLoading || userLoading) && (
                    <section className="flex items-center justify-center h-screen">
                        <Spinner />
                    </section>
                )}
                {!isLoading && !userLoading && !isError && (
                    <div className="pb-10">
                        {filteredGroups.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No groups found for your filters.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {filteredGroups.map(group => (
                                    <SupportGroup
                                        title={group.name}
                                        description={group.description}
                                        members={group.members}
                                        coverImage={group.coverImage}
                                        groupId={group.documentId}
                                        key={group.id}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </CenteredContent>
        </section>
    )
}