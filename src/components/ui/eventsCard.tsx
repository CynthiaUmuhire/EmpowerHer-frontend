import { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import CustomButton from "./customButton";

export default function EventsCard({ title, description, date, time, location, image, groupName, status }: { title: string; description: string; date: string; time: string; status: string; location: string, image?: string, groupName?: string }) {
    const [startRegistering, setStartRegistering] = useState(false);

    const rsvpOptions = [
        { label: "Maybe", value: "Maybe" },
        { label: "Reserve a spot", value: "Reserve" },
        { label: "Will not attend", value: "Decline" }
    ]
    return (
        <div className="w-full min-w-xs text-sm md:text-md relative  bg-primary-50 rounded-lg flex flex-col  md:flex-row  items-center border-0 shadow-md hover:shadow-lg">
            {/* <div className="w-full md:w-1/3 h-1/3  md:h-fit">
                <img src={image} alt="event image" className="object-cover w-full h-full" />
            </div> */}
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
                    {!startRegistering && (
                        <CustomButton onClick={() => setStartRegistering(true)}>
                            RSVP
                        </CustomButton>
                    )}
                    {startRegistering && (
                        <>
                            {rsvpOptions.map((option) => (
                                <CustomButton key={option.value} variant="secondary" className="w-full mb-2" onClick={() => {
                                    console.log(`User selected: ${option.value}`);
                                }}>
                                    {option.label}
                                </CustomButton>
                            ))}
                            <CustomButton variant="destructive" className="w-full" onClick={() => setStartRegistering(false)}>
                                Cancel
                            </CustomButton>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}