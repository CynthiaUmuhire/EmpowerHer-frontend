import { IoIosArrowRoundForward } from "react-icons/io";
import { Card } from "./card";

export default function SuccessStories() {
    return (
        <Card className="bg-secondary-50 gap-6 border-0 shadow-md hover:shadow-lg px-4">
            <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden">
                    <img src="../../../public/simbalike.jpg" alt="profile image" className=" object-fit w-full h-full " />
                </div>
                <div className="">
                    <h2 className="font-semibold">Sarah johnson</h2>
                    <p className="font-light">Tech Womem Rise member</p>
                </div>
            </div>
            <div>
                <p className="font-light">"Finding this community changed my life. I gained confidence, skills, and lifelong friends who support my journey."</p>
            </div>
            <div className="font-light">
                <a href="#" className="text-secondary hover:underline font-medium flex items-center gap-1">
                    Read full story <IoIosArrowRoundForward className="size-6" />
                </a>
            </div>
        </Card>
    )
}