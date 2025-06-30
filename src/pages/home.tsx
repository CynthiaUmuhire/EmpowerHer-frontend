import { } from "sonner"
import CenteredContent from "@/components/ui/CenteredContent"
import SupportGroup from "@/components/ui/supportGroup"
import useGroups from "@/hooks/useGroups"
import Spinner from "@/components/ui/spinner"

export default function Home() {
  const { groups, isLoading, isError } = useGroups()
  return (
    <section className="flex flex-col gap-20 py-20">
      <section className=" bg-secondary-50 py-20">
        <h2 className="text-2xl font-bold text-center w-full mb-10 ">Featured Support Groups</h2>
        <CenteredContent>
          <div className="flex overflow-scroll gap-6">
            {isLoading && <div className="w-full h-full"><Spinner /></div>}
            {isError && <p className="text-red-500">Failed to load groups. Please try again later.</p>}
            {groups && groups.map((group) => (
              <SupportGroup
                key={group.id}
                title={group.name}
                description={group.description}
                members={group.members}
                coverImage={group.coverImage}
                groupId={group.documentId}
              />
            ))}
          </div>
        </CenteredContent>
      </section>
    </section>

  )
}
