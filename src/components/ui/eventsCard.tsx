import { useState } from "react";
import CustomButton from "./customButton";
import useJoinEvent from "@/hooks/useJoinEvent";
import Spinner from "./spinner";

export default function EventsCard({ title, description, date, time, location, image, groupName, status, eventId, rsvpstatus }: { title: string; description: string; date: string; time: string; status: string; rsvpstatus: string; location: string, eventId: string, image?: string, groupName?: string }) {
    const [startRegistering, setStartRegistering] = useState(false);
    const [message, setMessage] = useState<null | string>(null);
    const { joinEventMutation, isPending, isSuccess } = useJoinEvent({
        eventId,
        onClose: () => setStartRegistering(false)
    });

    const rsvpOptions = [
        { label: "Maybe", value: "Maybe" },
        { label: "Reserve a spot", value: "Reserve" },
        { label: "Will not attend", value: "Decline" }
    ]

    const handleClick = (option: string) => {
        joinEventMutation({
            status: option
        });
        setMessage('Thank you for your response!');
        setStartRegistering(false);

    }

    return (
        <div className="w-full min-w-xs text-sm md:text-md relative  bg-primary-50 rounded-lg flex flex-col py-2 px-2 md:px-4  md:flex-row  items-center border-0 shadow-md hover:shadow-lg">
            <div className=" flex flex-col gap-6 p-2 md:p-4">
                <h1 className="font-bold">{title}</h1>
                {groupName && (
                    <p className="font-light text-xs md:text-sm italic">Organised by: {groupName}</p>
                )}
                <p className="font-light  leading-5 ">{description} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi dignissimos nobis ipsum totam labore corporis dicta vel quisquam, et eos tempora, iusto quibusdam neque dolorum sint inventore repellat? Ut, obcaecati?
                </p>
                <div className="flex justify-between">
                    <p className="font-light text-xs md:text-sm italic ">{date} {time}</p>
                    <p className="font-light text-xs md:text-sm ">📍 {location}</p>
                </div>
                <div className="absolute top-2 text-xs md:text-md right-2 bg-secondary-800 text-center text-secondary-100  px-2 py-2 p-1">
                    <span>{status}</span>
                </div>
                <div className="flex gap-4 items-center w-full">
                    {!["Reserve"].includes(rsvpstatus) ? (
                        <>
                            {!startRegistering && (
                                <CustomButton onClick={() => setStartRegistering(true)}>
                                    RSVP
                                </CustomButton>
                            )}
                            {startRegistering && (
                                <>
                                    {rsvpOptions.filter(option => option.value !== rsvpstatus).map((option) => (
                                        <CustomButton key={option.value} variant="secondary" className="w-full mb-2" disabled={isPending} onClick={() => handleClick(option.value)}>
                                            {option.label}
                                            {isPending && <Spinner />}
                                        </CustomButton>
                                    ))}
                                    <CustomButton variant="destructive" className="w-full" onClick={() => setStartRegistering(false)}>
                                        Cancel
                                    </CustomButton>
                                </>
                            )}
                            {isSuccess && message && (
                                <p className="text-green-500 font-semibold">{message}</p>
                            )}
                        </>
                    ) : (
                        <p className="text-green-500 font-semibold">You already reserved your spot</p>
                    )}

                </div>
            </div>
        </div>
    )
}