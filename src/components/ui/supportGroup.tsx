import { Link } from "react-router-dom";
import Links from "@/routes/Links";

type SupportGroupProps = {
    title: string;
    description: string;
    members: number;
    coverImage: string
    groupId: string;
}
export default function SupportGroup({ title, description, members, coverImage, groupId }: SupportGroupProps) {
    return (
        <div className="w-xs md:w-sm shrink-0 bg-primary-50 rounded-md flex flex-col gap-2 border-0 shadow-md hover:shadow-lg">
            <div className="h-36">
                <img src={coverImage} alt="profile image" className="object-cover w-full h-full" />
            </div>
            <div className=" text-sm md:text-normal flex flex-col gap-3 p-4">
                <h1 className="font-bold">{title}</h1>
                <p className="font-light leading-5 ">{description}</p>
                <div className="flex justify-between">
                    <p className="font-light italic ">{members} members</p>
                    <Link to={`${Links.protected.Groups}/${groupId}`} className="text-secondary-400 hover:underline flex items-center gap-1 font-extralight" > Read More</Link>
                </div>
            </div>
        </div>
    )
}