import api from "@/api/api";
import { EVENTS_QUERY_KEY } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export default function useEvents(filterParams: { title: string, category: string, option: string }) {
    const { data: events, isLoading, isError, error } = useQuery({
        queryKey: [EVENTS_QUERY_KEY, filterParams],
        queryFn: async () => {
            let filterQuery = '';
            if (filterParams.title) {
                if (filterParams.title !== '') {
                    filterQuery += `&filters[title][$containsi]=${filterParams.title}`;
                } else {
                    filterQuery += '';
                }
            }
            if (filterParams.category) {
                if (filterParams.category !== 'all') {
                    filterQuery += `&filters[eventStatus][$eqi]=${filterParams.category}`;
                }
            }
            if (filterParams.option) {
                if (filterParams.option === 'all') {
                    filterQuery += ''
                } else {
                    filterQuery += `&filters[rsvps][rsvpValue][$eqi]=${filterParams.option}`;
                }
            }
            console.log('Filter Query:', filterQuery);
            const response = await api.getEventsByFilters(filterQuery);
            if (!response.data) {
                throw new Error('Failed to fetch events');
            }
            return response.data;
        },
        select: (data) => {
            const userId = localStorage.getItem('userId');
            return data.map((event) => {
                const userRsvp = event.rsvps.find(rsvp => rsvp.user.documentId === userId);
                return {
                    ...event,
                    rsvpStatus: userRsvp ? userRsvp.rsvpValue : null,
                    groupName: event.group?.name,
                    startDate: dayjs(event.startDate).format('YYYY-MM-DD'),
                    endDate: dayjs(event.endDate).format('YYYY-MM-DD'),
                    startTime: dayjs(event.startDate).format('HH:mm'),
                    endTime: dayjs(event.endDate).format('HH:mm')
                };
            });
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