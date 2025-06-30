import generateImageUrl from "./generateImageUrl";

export default function mapEvents(event) {
    // console.log('Mapping Event:', event);
    const userId = localStorage.getItem('userId');
    const userRegisteredEvents = []
    const otherEvents = []
    if (event.rsvps && event.rsvps.length > 0) {
        const userRsvp = event.rsvps.find(rsvp => rsvp.user.documentId === userId);
        console.log('User RSVP:', userRsvp);
        if (userRsvp) {
            userRegisteredEvents.push({
                ...event,
                rsvpStatus: userRsvp.rsvpValue,
                groupName: event.group?.name
            });
        } else {
            otherEvents.push({
                ...event,
                groupName: event.group?.name,
                image: event.image ? event.image.formats.thumbnail.url : null,
                eventId: event.documentId
            });
        }
    }
    console.log('Mapped Events:', {
        userRegisteredEvents,
        otherEvents,
        allEvents: [...userRegisteredEvents, ...otherEvents],
        totalEvents: userRegisteredEvents.length + otherEvents.length
    })
    return {
        userRegisteredEvents,
        otherEvents,
        allEvents: [...userRegisteredEvents, ...otherEvents],
        totalEvents: userRegisteredEvents.length + otherEvents.length
    }
}