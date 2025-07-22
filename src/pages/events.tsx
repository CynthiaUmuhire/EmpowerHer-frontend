import CenteredContent from "@/components/ui/CenteredContent";
import EventsCard from "@/components/ui/eventsCard";
import FilteringCard from "@/components/ui/filteringCard";
import Spinner from "@/components/ui/spinner";
import useEvents from "@/hooks/useEvents";
import { Settings } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import throttle from "lodash.throttle";
import { Event } from "@/types";
export default function Events() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [querySearchTerm, setQuerySearchterm] = useState(searchTerm)
    const [selectedOption, setSelectedOption] = useState('all')
    const { events, isLoading } = useEvents({
        title: querySearchTerm,
        category: selectedCategory,
        option: selectedOption
    })
    const categories = ["Cancelled", "Completed", "Upcoming"]
    const options = ['Reserve', "Decline", "Maybe"]
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const throttledSetQuerySearchTerm = useCallback(
        throttle((value: string) => {
            setQuerySearchterm(value);
        }, 700),
        []
    );
    const handleFilter = () => {
        //TODO: Not used currently
    }

    useEffect(() => {
        throttledSetQuerySearchTerm(searchTerm);

    }, [searchTerm, throttledSetQuerySearchTerm])

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
            <div className="pb-10">
                <CenteredContent>
                    <FilteringCard
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        categoryLabel="Category"
                        options={options}
                        selectedOption={selectedOption}
                        onOptionChange={setSelectedOption}
                        optionLabel="Registration Option"
                        optionIcon={<Settings className="w-4 h-4 mr-2" />}
                        handleOnClick={handleFilter}
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
                                        {!isLoading && events.map((event: Event) => (
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
            </div>
        </section>
    )
}