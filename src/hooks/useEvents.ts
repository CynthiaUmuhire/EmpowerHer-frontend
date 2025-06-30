import api from "@/api/api";
import { EVENTS_QUERY_KEY } from "@/constants/queryKeys";
import mapEvents from "@/utils/mapEvents";
import { useQuery } from "@tanstack/react-query";

export default function useEvents() {
    const { data: events, isLoading, isError, error } = useQuery({
        queryKey: EVENTS_QUERY_KEY,
        queryFn: async () => {
            const response = await api.getAllEvents()
            if (!response.data) {
                throw new Error('Failed to fetch events');
            }
            return response.data;
        },
        select: (data) => {
            const userRegisteredEvents = []
            const otherEvents = []
            return data.map((event) => mapEvents(event, userRegisteredEvents, otherEvents));
        },
        staleTime: 0, // 5 minutes
        gcTime: 1000 * 60 * 60, // 1 hour
    });

    return {
        events,
        isLoading,
        isError,
        error,
    };
}