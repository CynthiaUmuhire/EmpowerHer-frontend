import RsvpModal from "./rsvpModal";
import { Calendar, Clock } from "lucide-react";

export default function EventsCard({ title, description, startDate, endDate, startTime, endTime, location, groupName, status, eventId, rsvpstatus }: { title: string; description: string; startDate: string; endDate: string; startTime: string; endTime: string; status: string; rsvpstatus: string; location: string, eventId: string, groupName?: string }) {

    return (
        <div className="w-full min-w-xs text-sm md:text-md relative  bg-primary-50 rounded-lg flex flex-col py-2 px-2 md:px-4  md:flex-row  items-center border-0 shadow-md hover:shadow-lg">
            <div className=" flex flex-col gap-6 p-2 md:p-4">
                <h1 className="font-bold">{title}</h1>
                {groupName && (
                    <p className="font-light text-xs md:text-sm italic">Organised by: {groupName}</p>
                )}
                <p className="font-light leading-5 ">{description}</p>
                <div className="flex flex-col gap-2 md:flex-row justify-between">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <p>{startDate}{endDate && ` - ${endDate}`}</p>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <p>{startTime}{endTime && ` - ${endTime}`}</p>
                    </div>
                    <p>📍 {location}</p>
                </div>
                <div className="absolute top-2 text-xs md:text-md right-2 bg-secondary-800 text-center text-secondary-100  px-2 py-2 p-1">
                    <span>{status}</span>
                </div>
                <div>
                    <RsvpModal eventTitle={title} eventLocation={location}
                        endDate={endDate}
                        endTime={endTime}
                        startDate={startDate}
                        startTime={startTime}
                        eventId={eventId}
                        rsvpstatus={rsvpstatus} />
                </div>
            </div>
        </div>
    )
}