import CenteredContent from "@/components/ui/CenteredContent";
import EventsCard from "@/components/ui/eventsCard";
import Spinner from "@/components/ui/spinner";
import useEvents from "@/hooks/useEvents";

export default function Events() {
    const { events, isLoading } = useEvents();

    return (
        <section>
            <CenteredContent>
                <div>
                    <h2 className="text-2xl font-bold text-center w-full mb-10">Your Current Groups</h2>
                    <p className="text-center text-sm md:text-base text-slate-500 p-2 my-6">
                        You are not participating in any events yet. Find all available events here bellow
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-center w-full mb-10">Discover Events</h2>
                    <div>
                        <div className="grid grid-cols-1 gap-6">
                            {isLoading && (
                                <section>
                                    <Spinner />
                                </section>
                            )}
                            {!isLoading && events && events.map((event) => (
                                <EventsCard
                                    key={event.id}
                                    title={event.title}
                                    description={event.description}
                                    date={new Date(event.date).toLocaleDateString()}
                                    location={event.location}
                                    time={new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    image={event.image}
                                    groupName={event.group?.name}
                                    status={event.eventStatus}

                                />
                            ))}
                        </div>
                    </div>
                </div>
            </CenteredContent>
        </section>
    )
}