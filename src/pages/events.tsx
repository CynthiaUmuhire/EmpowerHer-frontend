import CenteredContent from "@/components/ui/CenteredContent";
import EventsCard from "@/components/ui/eventsCard";
import FilteringCard from "@/components/ui/filteringCard";
import Spinner from "@/components/ui/spinner";
import useEvents from "@/hooks/useEvents";
import { Settings } from "lucide-react";
import { useState } from "react";

export default function Events() {
    const { events, isLoading } = useEvents();
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const categories = ["Cancelled", "Completed", "Upcoming"]
    const options = ['Reserved', "Declined", "Not sure", "All"]

    return (
        <section className="h-full mb-10 ">
            <div className="h-64 bg-gradient-to-r from-secondary-400 to-secondary-200 text-secondary-50">
                <CenteredContent>
                    <div className=" h-full gap-5 flex flex-col items-start justify-center">
                        <h1 className="font-bold text-2xl md:text-7xl">Events</h1>
                        <p>Discover workshops, support meetings, and activities designed to help you grow, learn, and connect with other mothers in your community.</p>
                    </div>
                </CenteredContent>
            </div>
            <CenteredContent>
                <FilteringCard
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    searchPlaceholder="Search by event name..."

                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    categoryLabel="Category"

                    options={options}
                    selectedOption="all"
                    onOptionChange={() => { }}
                    optionLabel="Registration Option"
                    optionIcon={<Settings className="w-4 h-4 mr-2" />}
                />
                {!events || events.length <= 0 ? (
                    <div className="text-2xl font-bold text-center w-full flex flex-col items-center justify-center h-full ">
                        <span>There are no events posted yet!</span>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6 h-full">
                        <div className=" overflow-y-scroll  flex flex-col">
                            <div className=" mt-10">
                                <div className="grid grid-cols-1 gap-6">
                                    {isLoading && (
                                        <section>
                                            <Spinner />
                                        </section>
                                    )}
                                    {!isLoading && events[0].otherEvents.map((event) => (
                                        <EventsCard
                                            key={event.documentId}
                                            title={event.title}
                                            description={event.description}
                                            location={event.location}
                                            groupName={event.group?.name}
                                            status={event.eventStatus}
                                            eventId={event.documentId}
                                            rsvpstatus={event.rsvpStatus}
                                            endDate={event.endDate}
                                            endTime={event.endTime}
                                            startDate={event.startDate}
                                            startTime={event.startTime} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CenteredContent>
        </section>
    )
}