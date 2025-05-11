import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";

export default function EventsCard({ title, description, date, time, location }: { title: string; description: string; date: string; time: string; location: string }) {
    return (
        <div className="w-xs md:w-lg shrink-0 bg-primary-50 rounded-lg flex flex-col md:flex-row  md:justify-between overflow-y-hidden md:items-center border-0 shadow-md hover:shadow-lg">
            <div className="w-full md:w-1/3  md:h-full bg-yellow-400">
                <img src="../../../simbalike.jpg" alt="profile image" className="object-cover w-full h-full" />
            </div>
            <div className=" flex flex-col gap-3 p-2 md:p-4">
                <h1 className="font-bold">{title}</h1>
                <p className="font-light text-sm md:text-sm leading-5 ">{description}</p>
                <div className="flex justify-between">
                    <p className="font-light text-xs md:text-sm italic ">{date} {time}</p>
                    <p className="font-light text-xs md:text-sm ">📍 {location}</p>
                </div>
                <Link to="#" className="text-secondary-400 hover:underline flex items-center gap-1 font-extralight">
                    Learn more<IoIosArrowRoundForward className="size-6" />
                </Link>
            </div>
        </div>
    )
}