import { Event } from '@/types';
import dayjs from 'dayjs';

export default function mapEvents(event: Event, userRegisteredEvents: Event[], otherEvents: Event[]) {
    const userId = localStorage.getItem('userId');
    if (event.rsvps && event.rsvps.length > 0) {
        const userRsvp = event.rsvps.find(rsvp => rsvp.user.documentId === userId);
        if (userRsvp) {
            userRegisteredEvents.push({
                ...event,
                rsvpStatus: userRsvp.rsvpValue,
                groupName: event.group?.name,
                startDate: dayjs(event.startDate).format('YYYY-MM-DD'),
                endDate: dayjs(event.endDate).format('YYYY-MM-DD'),
                startTime: dayjs(event.startDate).format('HH:mm'),
                endTime: dayjs(event.endDate).format('HH:mm')
            });
        }
    } else {
        otherEvents.push({
            ...event,
            groupName: event.group?.name,
            rsvpStatus: null,
            eventId: event.documentId,
            startDate: dayjs(event.startDate).format('YYYY-MM-DD'),
            endDate: dayjs(event.endDate).format('YYYY-MM-DD'),
            startTime: dayjs(event.startDate).format('HH:mm'),
            endTime: dayjs(event.endDate).format('HH:mm')
        });
    }
    return {
        userRegisteredEvents,
        otherEvents,
        allEvents: [...userRegisteredEvents, ...otherEvents],
        totalEvents: userRegisteredEvents.length + otherEvents.length
    }
}