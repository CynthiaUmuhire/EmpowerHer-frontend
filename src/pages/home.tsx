import { } from "sonner"
import CenteredContent from "@/components/ui/CenteredContent"
import SupportGroup from "@/components/ui/supportGroup"
import EventsCard from "@/components/ui/eventsCard"
import useGroups from "@/hooks/useGroups"
import Spinner from "@/components/ui/spinner"

export default function Home() {
  const { groups, isLoading, isError } = useGroups()
  return (
    <section className="flex flex-col gap-20 py-20">
      <section className=" bg-secondary-50 py-20">
        <h2 className="text-2xl font-bold text-center w-full mb-10">Featured Support Groups</h2>
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
      <section className=" bg-secondary-50 py-20">
        <CenteredContent>
          <h2 className="text-2xl font-bold  text-center mb-10 w-full"> Upcoming Events</h2>
          <div className="flex overflow-scroll gap-6">
            <EventsCard title="Self-care Workshop" description="Learn practical techniques for maintaining mental and emotional well-being." date="Mar 15, 2025" time='12PM - 16PM' location='workshop' />
            <EventsCard title="Self-care Workshop" description="Learn practical techniques for maintaining mental and emotional well-being." date="Mar 15, 2025" time='12PM - 16PM' location='workshop' />
            <EventsCard title="Self-care Workshop" description="Learn practical techniques for maintaining mental and emotional well-being." date="Mar 15, 2025" time='12PM - 16PM' location='workshop' />
            <EventsCard title="Self-care Workshop" description="Learn practical techniques for maintaining mental and emotional well-being." date="Mar 15, 2025" time='12PM - 16PM' location='workshop' />
            <EventsCard title="Self-care Workshop" description="Learn practical techniques for maintaining mental and emotional well-being." date="Mar 15, 2025" time='12PM - 16PM' location='workshop' />
          </div>
        </CenteredContent>
      </section>
    </section>

  )
}
