import { IoIosArrowRoundForward } from "react-icons/io";
import { Card } from "./card";
import { Link } from "react-router-dom";
import Links from "@/routes/Links";

export type SuccessStory = {
    id: string;
    title: string;
    author: string;
    role: string;
    image: string;
    excerpt: string;
};

export default function SuccessStories({ successStory }: { successStory: SuccessStory }) {
    return (
        <Card className="bg-secondary-50 gap-6 border-0 shadow-md hover:shadow-lg px-4">
            <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden">
                    <img src={successStory.image} alt="profile image" className=" object-fit w-full h-full " />
                </div>
                <div className="">
                    <h2 className="font-semibold">{successStory.author}</h2>
                    <p className="font-light">{successStory.role}</p>
                </div>
            </div>
            <div>
                <p className="font-light">{successStory.excerpt}</p>
            </div>
            <div className="font-light">
                <Link
                    to={Links.public.SuccessStoryDetails.replace(":id", successStory.id)}
                    state={successStory}
                    className="text-secondary hover:underline font-medium flex items-center gap-1"
                >
                    Read full story <IoIosArrowRoundForward className="size-6" />
                </Link>
            </div>
        </Card>
    )
}