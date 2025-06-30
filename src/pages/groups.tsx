import CenteredContent from "@/components/ui/CenteredContent";
import Spinner from "@/components/ui/spinner";
import SupportGroup from "@/components/ui/supportGroup";
import useGroups from "@/hooks/useGroups";

export default function Groups() {
    const { groups, isLoading, isError } = useGroups();
    return (
        <section >
            <CenteredContent>
                {isLoading && (
                    <section className="flex items-center justify-center h-screen">
                        <Spinner />
                    </section>
                )}
                {!isLoading && !isError && (
                    <>
                        <div>
                            <h2 className="text-2xl font-bold text-center w-full my-10">Your Current Groups</h2>
                            <p className="text-center text-sm md:text-base text-slate-500 p-2 my-6">
                                You are not a member of any group yet. Join a group to start connecting with others.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-center w-full mb-10">Discover Groups</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {groups.map(group =>
                                    <SupportGroup
                                        title={group.name}
                                        description={group.description}
                                        members={group.members}
                                        coverImage={group.coverImage}
                                        groupId={group.documentId}
                                        key={group.id}
                                    />
                                )}
                            </div>
                        </div>
                    </>
                )}
            </CenteredContent>
        </section>
    )
}