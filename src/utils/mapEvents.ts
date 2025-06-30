import generateImageUrl from "./generateImageUrl";

export default function mapEvents(event, userRegisteredEvents, otherEvents) {
    const userId = localStorage.getItem('userId');


    if (event.rsvps && event.rsvps.length > 0) {
        const userRsvp = event.rsvps.find(rsvp => rsvp.user.documentId === userId);
        console.log('User RSVP:', userRsvp);
        if (userRsvp) {
            userRegisteredEvents.push({
                ...event,
                rsvpStatus: userRsvp.rsvpValue,
                groupName: event.group?.name
            });
        }
    } else {
        console.log('Herre too: ✅✅✅✅✅✅✅✅✅✅✅');
        otherEvents.push({
            ...event,
            groupName: event.group?.name,
            image: event.image ? event.image.formats.thumbnail.url : null,
            eventId: event.documentId
        });
    }
    return {
        userRegisteredEvents,
        otherEvents,
        allEvents: [...userRegisteredEvents, ...otherEvents],
        totalEvents: userRegisteredEvents.length + otherEvents.length
    }
}